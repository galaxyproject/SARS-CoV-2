# -*- coding: utf-8 -*-

import logging
import click
import bioblend.galaxy

from workflow2executable.invocations import InvocationMonitor

log = logging.Logger(__name__)


@click.command("Run Download and SE+PE Illumina Covid Variation Workflow workflow")
@click.option("--nc_45512_genbank_file", type=click.Path(exists=True))
@click.option("--accessions_file", type=click.Path(exists=True))
@click.option('-a', '--api_key', help="API key to use for running workflow")
@click.option('-g', '--galaxy_url', default="https://usegalaxy.org", help="Galaxy URL to use for running workflow", show_default=True)
@click.option('-h', '--history_id', help="History ID that will contain workflow results")
@click.option('-n', '--new_history_name', help="Create a new history with this name. Will not be used if history ID is provided.")
@click.option('--publish/--private', default=False, help="Publish history?")
def run_download_and_se_pe_illumina_covid_variation_workflow(nc_45512_genbank_file, accessions_file, api_key, galaxy_url, history_id, new_history_name, publish):
    """
    Run Download and SE+PE Illumina Covid Variation Workflow workflow
    """
    gi = bioblend.galaxy.GalaxyInstance(galaxy_url, api_key)
    if history_id is None:
       if new_history_name is None:
           new_history_name = 'History for Download and SE+PE Illumina Covid Variation Workflow execution'
       history_id = gi.histories.create_history(name=new_history_name)['id']
    if publish:
        gi.histories.update_history(history_id, published=True, importable=True)
    # This will look a bit awkward,
    # those could become custom click types
    datasets_to_upload = [nc_45512_genbank_file, accessions_file]
    upload_paths = {}
    for dataset in datasets_to_upload:
        log.info("Uploading dataset %s", dataset)
        r = gi.tools.upload_file(path=dataset, history_id=history_id, to_posix_lines=False)
        upload_paths[dataset] = {'src': 'hda', 'id': r['outputs'][0]['id']}
    workflow_id = '053805ad-0607-4c39-afb8-25183fb899fb'
    inputs = {
            'NC_45512 GenBank file': upload_paths.get(nc_45512_genbank_file, nc_45512_genbank_file),
            'Accessions file': upload_paths.get(accessions_file, accessions_file),
    }
    invocation = run_workflow(gi, workflow_id, history_id, inputs)
    im = InvocationMonitor(gi)
    im.monitor_invocation(invocation['id'])


def run_workflow(gi, workflow_id, history_id, inputs):
    r = gi.workflows.invoke_workflow(
        workflow_id,
        inputs=inputs,
        history_id=history_id,
        inputs_by='name',
    )
    return r


if __name__ == '__main__':
    run_download_and_se_pe_illumina_covid_variation_workflow()
