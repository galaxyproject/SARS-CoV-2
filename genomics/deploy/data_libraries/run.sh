#!/bin/bash

export PATH=/usr/local/tools/_conda/bin/:$PATH

CONDA_ENV_NAME="__sra-tools@2.10.3"
BIOBLEND_ENV_NAME="bioblend"

DATA_DIR="/data/5/galaxy_import/galaxy_user_data/covid-19/data/"
sequence_data_dir="${DATA_DIR}/sequences/"

wget -q https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/genomics/4-Variation/current.txt -O current.txt
wget -q https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/genomics/4-Variation/current_metadata_ena.tsv -O current_metadata.tsv

. activate $CONDA_ENV_NAME

parallel --progress -j20 ${DATA_DIR}/../download_accessions.sh ::: `grep '^[[:space:]]*[E|S|D]RR[0-9]\{1,\}[[:space:]]*$' 'current.txt'`


# move everything into the real-final folder
mv output/* ${sequence_data_dir}

# activate bioblend venv and run link datasets into the library
. activate ${BIOBLEND_ENV_NAME}
python covid2library.py
