# export PATH=/usr/local/tools/_conda/bin/:$PATH

CONDA_ENV_NAME="__sra-tools@2.10.3"
BIOBLEND_ENV_NAME="bioblend"

DATA_DIR="/data/5/galaxy_import/galaxy_user_data/covid-19/data/"
sequence_data_dir="${DATA_DIR}/sequences/"

conda activate $CONDA_ENV_NAME

pushd ${DATA_DIR}

wget -q https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/genomics/4-Variation/current.txt -O current.txt
wget -q https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/genomics/4-Variation/current_metadata.tsv -O current_metadata.csv

download_log=downloaded_`date -I`.txt
touch $download_log

for acc in ` grep '^[[:space:]]*[E|S|D]RR[0-9]\{1,\}[[:space:]]*$' 'current.txt'` ;
    do
        if (ls -l "${sequence_data_dir}" | grep -q "$acc")
            then
                echo "$acc is already_available";
            else
                vdb-config --restore-defaults  vdb-config -s /http/timeout/read=10000 || true;
                fasterq-dump "$acc" -t /dev/shm -e 20 --split-3 --skip-technical >> faster_dump.log 2>&1;
                mkdir -p output;
                mkdir -p outputOther;
                count=`ls *.fastq | wc -l`;
                echo "There are $count fastq for $acc";
                data=($(ls *.fastq));
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
                            then gzip -c "${acc}".fastq > outputOther/"${acc}".fastq.gz;
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
            fi;
done


# move everything into the real-final folder
mv output/* ${sequence_data_dir}

# activate bioblend venv and run link datasets into the library
. activate ${BIOBLEND_ENV_NAME}
python covid2library.py

popd
