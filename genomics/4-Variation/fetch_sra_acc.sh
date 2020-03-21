#!/bin/bash 
set -e

# From genbank
curl -s https://www.ncbi.nlm.nih.gov/core/assets/genbank/files/ncov-sequences.yaml | grep -o "SRR[[:digit:]]\+" > genbank.txt

# From SRA
IDS=$(curl 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=sra&term=txid2697049\[Organism%3Anoexp\]&retmax=1000' | grep "<Id>" | grep -o "[[:digit:]]\+" | tr "\n" ",")
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sra&amp;id=$IDS" | grep -o "SRR[[:digit:]]\+" | sort | uniq > sra.txt

cat genbank.txt sra.txt | sort | uniq > union.txt
grep -f acc2exclude.txt -v union.txt > current.txt

# Annotate combined accession with metadata
pysradb metadata $(<current.txt) --saveto current_metadata.txt

# Split into Illumina and GridION datasets
grep -e 'Illumina\|NextSeq' current_metadata.txt |cut -f15 > current_illumina.txt
grep GridION current_metadata.txt |cut -f15 > current_gridion.txt
