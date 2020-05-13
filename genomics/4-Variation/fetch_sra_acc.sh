#!/bin/bash 
set -e -v

touch acc2exclude.txt
touch accession_and_date.tsv
pysradb search txid2697049 --saveto /dev/stdout | grep -f acc2exclude.txt -v > .current_metadata.tsv
cat .current_metadata.tsv metadata_not_txid2697049.tsv > current_metadata.tsv
rm .current_metadata.tsv
cut -f 15 current_metadata.tsv|tail -n +2 > current.txt

# Split into Illumina and GridION datasets
grep -e 'Illumina\|NextSeq' current_metadata.tsv |cut -f15 > current_illumina.txt
grep GridION current_metadata.tsv |cut -f15 > current_gridion.txt

# Annotate first seen date

date=$(date +%F)
cut -f1 accession_and_date.tsv > .known_accessions
while read -r acc
do
  printf "%s\t%s\n" "$acc" "$date" >> accession_and_date.tsv
done < <(diff --new-line-format="" --unchanged-line-format="" <(sort current.txt) <(sort .known_accessions))
rm .known_accessions
