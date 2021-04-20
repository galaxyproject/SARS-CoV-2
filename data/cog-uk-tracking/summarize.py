import json

from bioblend import galaxy

from find_datasets import show_matching_dataset_info
from find_by_tags import filter_objects_by_tags

class COGUKSummary():
    def __init__(self, summary=None):
        self.gi = gi
        if summary:
            self.summary = summary
        else:
            self.summary = {}

    @classmethod
    def from_file(cls, fname):
        with open(fname) as i:
            summary = json.load(i)
        return cls(summary)

    @property
    def sample_count(self):
        return sum(len(v.get('samples', [])) for v in self.summary.values())

    def save(self, fname, drop_partial=True):
        if drop_partial:
            partial_records = set(self.get_problematic().keys())
            records_to_write = self.__class__(
                {
                    k: v for k, v in self.summary.items()
                    if k not in partial_records
                }
            )
            return records_to_write.save(fname, drop_partial=False)
        with open(fname, 'w') as o:
            json.dump(self.summary, o, indent=2)
        return self.sample_count

    def _update_partial_data(self, gi, histories, partial_data):
        reports_to_find = len(
            [k for k, v in partial_data.items() if 'report' not in v]
        )
        consensi_to_find = len(
            [k for k, v in partial_data.items() if 'consensus' not in v]
        )

        if reports_to_find:
            histories_to_search = [
                h for h in filter_objects_by_tags(
                    ['cog-uk_report'],
                    histories
                ) if h['id'] not in self.get_history_ids('report')
            ]
            # add the links to the corresponding report histories
            for history in histories_to_search:
                annotated_variants, by_sample_report = [
                    ret[0] for ret in show_matching_dataset_info(
                        gi, history['id'],
                        [
                            'Final (SnpEff-) annotated variants',
                            'Combined Variant Report by Sample'
                        ],
                        visible=True
                    )
                ]
                vcf_elements = gi.histories.show_dataset_collection(
                    history['id'], annotated_variants['id']
                )['elements']
                variation_from = vcf_elements[0]['object']['history_id']

                if variation_from in partial_data:
                    sample_names = [e['element_identifier'] for e in vcf_elements]
                    partial_data[variation_from]['samples'] = sample_names
                    partial_data[variation_from]['time'] = by_sample_report['create_time']
                    partial_data[variation_from]['report'] = {
                        'history_link': 'https://usegalaxy.eu' + history['url'],
                        'datamonkey_link':
                            'https://usegalaxy.eu' + by_sample_report['url'] + '/display'
                    }
                    reports_to_find -= 1
                    if not reports_to_find:
                        break

        if consensi_to_find:
            histories_to_search = [
                h for h in filter_objects_by_tags(
                    ['cog-uk_consensus'],
                    histories
                ) if h['id'] not in self.get_history_ids('consensus')
            ]
            # add the links to the corresponding consensus histories
            for history in histories_to_search:
                variation_from = gi.histories.show_dataset_collection(
                    history['id'],
                    show_matching_dataset_info(
                        gi, history['id'],
                        ['Final (SnpEff-) annotated variants'],
                        types='dataset_collection'
                    )[0][0]['id']
                )['elements'][0]['object']['history_id']

                if variation_from in partial_data:
                    partial_data[variation_from][
                        'consensus'
                    ] = 'https://usegalaxy.eu' + history['url']
                    consensi_to_find -= 1
                    if not consensi_to_find:
                        break
        return len(partial_data), reports_to_find, consensi_to_find

    def update(self, gi, histories=None):
        if not histories:
            histories = gi.histories.get_histories()
        # collect the IDs and links to variation histories processed by
        # both the report and the consensus bot
        new_data = {}
        for history in filter_objects_by_tags(
            ['cog-uk_variation', 'report-bot-ok', 'consensus-bot-ok'],
            histories
        ):
            if history['id'] not in self.summary:
                new_data[history['id']] = {
                    'batch_id': history['name'].rsplit(maxsplit=1)[-1],
                    'variation': 'https://usegalaxy.eu' + history['url']
                }
        if not new_data:
            return None

        ret = self._update_partial_data(gi, histories, new_data)
        self.summary.update(new_data)
        return ret

    def get_history_ids(self, history_type):
        ids = []
        for v in self.summary.values():
            if history_type in v:
                if 'history_link' in v[history_type]:
                    ids.append(v[history_type]['history_link'].split('/')[-1])
                else:
                    ids.append(v[history_type].split('/')[-1])
        return ids

    def get_problematic(self):
        problematic = {}
        for k, v in self.summary.items():
            for expected_key in ['samples', 'report', 'consensus']:
                if expected_key not in v:
                    problematic[k] = v
                    break
        return problematic

    def amend(self, gi, histories=None):
        problematic = self.get_problematic()
        if not problematic:
            return
        if not histories:
            histories = gi.histories.get_histories()

        ret = self._update_partial_data(gi, histories, problematic)
        self.summary.update(problematic)
        return ret

    def make_accessible(self, gi, history_type):
        updated_count = 0
        for history_id in self.get_history_ids(history_type):
            if not gi.histories.show_history(history_id)['importable']:
                gi.histories.update_history(history_id, importable=True)
                updated_count += 1

        return updated_count


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-o', '--ofile', required=True,
        help='Name of the json file to generate'
    )
    parser.add_argument(
        '-u', '--update-from-file',
        help='Update from an existing file instead of discovering from scratch'
    )
    parser.add_argument(
        '--fix-file', action='store_true',
        help='When trying to update from a file, try to fix the file before '
             'updating'
    )
    parser.add_argument(
        '--retain-incomplete', action='store_true',
        help='Emit also incomplete records'
    )
    parser.add_argument(
        '-g', '--galaxy-url', required=True,
        help='URL of the Galaxy instance to run query against'
    )
    parser.add_argument(
        '-a', '--api-key', required=True,
        help='API key to use for authenticating on the Galaxy server'
    )

    args = parser.parse_args()
    gi = galaxy.GalaxyInstance(args.galaxy_url, args.api_key)

    if args.update_from_file:
        s = COGUKSummary.from_file(args.update_from_file)
        if args.fix_file:
            s.amend(gi)
    else:
        s = COGUKSummary()
    s.update(gi)
    if args.retain_incomplete:
        n = s.save(args.ofile, drop_partial=False)
    else:
        n = s.save(args.ofile)
    print('Saved metadata for {0} samples'.format(n))
