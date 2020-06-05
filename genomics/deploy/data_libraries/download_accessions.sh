#!/bin/bash

CONDA_ENV_NAME="__sra-tools@2.10.3"
DATA_DIR="/data/5/galaxy_import/galaxy_user_data/covid-19/data/"
sequence_data_dir="${DATA_DIR}/sequences/"


pushd ${DATA_DIR}/../


download_log=downloaded_`date -I`.txt
touch $download_log

acc=$@
echo "Processing $acc"

if (ls -l "${sequence_data_dir}" | grep -q "$acc")
then
    echo "$acc is already_available";
else
    export PATH=/usr/local/tools/_conda/bin/:$PATH;
    . activate $CONDA_ENV_NAME;

    vdb-config --restore-defaults  vdb-config -s /http/timeout/read=10000 || true;
    fasterq-dump "$acc" -t /dev/shm -e 20 --split-3 --skip-technical >> faster_dump.log 2>&1;
    mkdir -p output;
    mkdir -p outputOther;
    count=`ls "$acc"*.fastq | wc -l`;
    echo "There are $count fastq for $acc";
    data=($(ls "$acc"*.fastq));
    if [ "$count" -eq 1 ];
    then
        echo "single file";
        gzip -c "${data[0]}" > output/"${acc}".fastq.gz;
        echo $sequence_data_dir/"${acc}".fastq.gz >> $download_log;
        rm "${data[0]}";
    elif [ "--split-3" = "--split-3" ];
    then
        echo "split case"
        ls -l ./
        if [ -e "${acc}".fastq ];
        then
            gzip -c "${acc}".fastq > outputOther/"${acc}".fastq.gz;
        fi
        if [ -e "${acc}"_1.fastq ];
        then
            gzip -c "${acc}"_1.fastq > output/"${acc}"_1.fastq.gz;
            gzip -c "${acc}"_2.fastq > output/"${acc}"_2.fastq.gz;
            echo "$sequence_data_dir"/"${acc}"_1.fastq.gz >> "${download_log}";
            echo "$sequence_data_dir"/"${acc}"_2.fastq.gz >> "${download_log}";
        fi
            rm "${acc}"*.fastq;
        else
            echo "all other case";
            for file in ${data[*]};
            do
                gzip -c "$file" > outputOther/"$file"sanger.gz;
                rm "$file";
            done;
        fi;
        conda deactivate;
fi;



popd
