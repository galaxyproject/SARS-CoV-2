# -*- coding: utf-8 -*-

import logging
from urllib.parse import urljoin

import click
import bioblend.galaxy

from workflow2executable.invocations import InvocationMonitor

log = logging.Logger(__name__)
log.setLevel(logging.INFO)
# create a console handler with INFO loglevel
ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
log.addHandler(ch)


@click.command("Run Download and SE+PE Illumina Covid Variation Workflow workflow")
@click.option("--nc_45512_genbank_file", type=click.Path(exists=True))
@click.option("--accessions_file", type=click.Path(exists=True))
@click.option('-a', '--api_key', help="API key to use for running workflow")
@click.option('-g', '--galaxy_url', default="https://usegalaxy.org", help="Galaxy URL to use for running workflow", show_default=True)
@click.option('-h', '--history_id', help="History ID that will contain workflow results")
@click.option('-n', '--new_history_name', help="Create a new history with this name. Will not be used if history ID is provided.")
@click.option('--publish/--private', default=False, help="Publish history?")
@click.option('--monitor_invocation/--no_monitor_invocation', default=False, help="Print workflow invocation status updates?")
@click.option('--quiet', default=False, help='Decrease logging output')
def run_download_and_se_pe_illumina_covid_variation_workflow(nc_45512_genbank_file, accessions_file, api_key, galaxy_url, history_id, new_history_name, publish, monitor_invocation, quiet):
    """
    Run Download and SE+PE Illumina Covid Variation Workflow workflow
    """
    if quiet:
        log.setLevel(logging.ERROR)
    gi = bioblend.galaxy.GalaxyInstance(galaxy_url, api_key)
    workflow_id = '1014c058-5bb1-409c-b107-cbfd4f509ffe'
    try:
        gi.workflows.show_workflow(workflow_id)
    except Exception as e:
        if "No such workflow" in str(e):
            raise Exception("Workflow with id '%s' not uploaded or not accessible" % workflow_id)
        else:
            raise e
    if history_id is None:
        if new_history_name is None:
            new_history_name = 'History for Download and SE+PE Illumina Covid Variation Workflow execution'
        history = gi.histories.create_history(name=new_history_name)
    else:
        history = gi.histories.show_history(history_id)
    history_id = history['id']
    if publish:
        history = gi.histories.update_history(history_id, published=True, importable=True)
        history_url = urljoin(galaxy_url, history['username_and_slug'])
    else:
        history_url = urljoin(galaxy_url, "histories/view?id=%s" % history_id)
    # This will look a bit awkward,
    # those could become custom click types
    datasets_to_upload = [nc_45512_genbank_file, accessions_file]
    upload_paths = {}
    for dataset in datasets_to_upload:
        log.info("Uploading dataset '%s' to history %s", dataset, history_url)
        r = gi.tools.upload_file(path=dataset, history_id=history_id, to_posix_lines=False)
        upload_paths[dataset] = {'src': 'hda', 'id': r['outputs'][0]['id']}
    inputs = {
        'NC_45512 GenBank file': upload_paths.get(nc_45512_genbank_file, nc_45512_genbank_file),
        'Accessions file': upload_paths.get(accessions_file, accessions_file),
    }
    invocation = run_workflow(gi, workflow_id, history_id, inputs)
    assert invocation['state'] == 'new', "Expected invocation state to be 'new', but invocation is %s" % invocation
    log.info("Workflow '%s' started with invocation id '%s'. Results will appear in history %s", workflow_id, invocation['id'], history_url)
    if monitor_invocation:
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
