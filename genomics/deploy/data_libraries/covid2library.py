import bioblend
import os
import sys
import time
from bioblend import galaxy

import pandas as pd
import numpy as np

#url = "http://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/genomics/4-Variation/current_metadata.tsv"
metadata = pd.read_csv('current_metadata.tsv', sep='\t')

## change the API key and the folder IDs to the ones of the local instance
api_key = "c19721472864266ff4654eeb040e605c"
ion_torrent_folder_id="Ffabedfbfd961377c"
nanopore_folder_id="F6ff2ddf61501960e"
illumina_folder_id="F961500e3d8a41849"

server_dir = '/data/5/galaxy_import/galaxy_user_data/covid-19/data/sequences/'
library_id='71512c9351743762'
galaxy_url = 'https://usegalaxy.eu'

print('Start script')
gi = galaxy.GalaxyInstance(url=galaxy_url, key=api_key)

uploaded_elements = dict()
for elem in gi.libraries.show_library(library_id=library_id, contents=True):
    if elem['type'] == 'file':
        library_elem_name = elem['name'].split('/')[-1]
        uploaded_elements.update({library_elem_name: elem})

print(f'In data library: {uploaded_elements}')


for filename in os.listdir(server_dir):
    already_uploaded = False
    dataset_id = None
    print(filename)
    if filename in uploaded_elements:
        already_uploaded = True
    filepath = os.path.join(server_dir, filename)

    dataset_accession = filename.split('.')[0]
    dataset_accession = dataset_accession.split('_')[0]

    if not already_uploaded:
        print(f'Upload of: {filepath}')

        instrument = metadata.query(f'run_accession == "{dataset_accession}"')['instrument_model'].item().lower()
        if "illumina" in instrument or 'nextseq' in instrument or 'bgiseq' in instrument:
            folder_id = illumina_folder_id
        elif 'minion' in instrument or 'gridion' in instrument:
            folder_id = nanopore_folder_id
        elif 'torrent' in instrument:
            folder_id = ion_torrent_folder_id
        else:
            continue
            sys.exit(f'Found unknown instrument ({instrument}) for {filepath}')
        
        new = gi.libraries.upload_from_galaxy_filesystem(library_id=library_id,
                                                    folder_id=folder_id,
                                                    filesystem_paths=filepath,
                                                    file_type="fastqsanger.gz",
                                                    dbkey="NC_045512.2",
                                                    link_data_only='link_to_files',
                                                    tag_using_filenames=False,)
                                                    #,
                                                    #tags=['covid-19'])
        print('Newly added enty:', new)
        time.sleep(1)
        dataset_id = new[-1]['id']

    if not dataset_id:
        dataset_id = uploaded_elements[filename]['id']

    print('accession', dataset_accession, dataset_id)
    desc = None
    
    meta = metadata.query(f'run_accession == "{dataset_accession}"')
    if not meta.empty:
        desc = metadata.query(f'run_accession == "{dataset_accession}"')['description'].item()
        country = metadata.query(f'run_accession == "{dataset_accession}"')['country'].item()
        if desc:
            if country != np.nan:
                country = '[%s]' % country
            else:
                country = ''
            info = f'{desc} {country} (https://www.ebi.ac.uk/ena/data/view/{dataset_accession})'
            gi.libraries.update_library_dataset(dataset_id, misc_info=info)

