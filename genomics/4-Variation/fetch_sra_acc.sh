#!/bin/bash 
set -e -v

touch acc2exclude.txt
touch accession_and_date.tsv
# SRA API errors out at this moment
# pysradb search txid2697049 --saveto /dev/stdout | grep -f acc2exclude.txt -v > .current_metadata.tsv
# Using ENA for now
# cat .current_metadata.tsv metadata_not_txid2697049.tsv > current_metadata.tsv
# rm .current_metadata.tsv
# cut -f 15 current_metadata.tsv|tail -n +2 > current.txt
# # Split into Illumina and GridION datasets
# grep -e 'Illumina\|NextSeq' current_metadata.tsv |cut -f15 > current_illumina.txt
# grep GridION current_metadata.tsv |cut -f15 > current_gridion.txt
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'result=read_run&query=tax_eq(2697049)&fields=accession%2Cbase_count%2Ccell_line%2Ccell_type%2Ccenter_name%2Cchecklist%2Ccollected_by%2Ccollection_date%2Ccountry%2Ccram_index_ftp%2Cdescription%2Cexperiment_accession%2Cexperiment_alias%2Cexperiment_title%2Cfastq_aspera%2Cfastq_bytes%2Cfastq_ftp%2Cfastq_md5%2Cfirst_created%2Cfirst_public%2Chost%2Chost_sex%2Chost_tax_id%2Cinstrument_model%2Cinstrument_platform%2Cinvestigation_type%2Cisolate%2Cisolation_source%2Clast_updated%2Clat%2Clibrary_layout%2Clibrary_name%2Clibrary_selection%2Clibrary_source%2Clibrary_strategy%2Clocation%2Clon%2Cread_count%2Crun_accession%2Crun_alias%2Csample_accession%2Csample_alias%2Csample_description%2Csample_material%2Csample_title%2Csampling_campaign%2Csampling_platform%2Csampling_site%2Cscientific_name%2Csra_aspera%2Csra_bytes%2Csra_ftp%2Csra_md5%2Cstrain%2Cstudy_accession%2Cstudy_alias%2Cstudy_title%2Csub_species%2Csub_strain%2Csubmitted_bytes%2Csubmitted_format%2Csubmitted_host_sex%2Csubmitted_sex%2Ctax_id&format=tsv' "https://www.ebi.ac.uk/ena/portal/api/search" | grep -f acc2exclude.txt -v > current_metadata_ena.tsv
cut -f 39 current_metadata_ena.tsv|tail -n +2 > current.txt
grep -e 'Illumina\|NextSeq' current_metadata_ena.tsv |cut -f 39 > current_illumina.txt
grep GridION current_metadata_ena.tsv |cut -f 39 > current_gridion.txt

# Annotate first seen date

date=$(date +%F)
cut -f1 accession_and_date.tsv > .known_accessions
while read -r acc
do
  printf "%s\t%s\n" "$acc" "$date" >> accession_and_date.tsv
done < <(diff --new-line-format="" --unchanged-line-format="" <(sort current.txt) <(sort .known_accessions))
rm .known_accessions
