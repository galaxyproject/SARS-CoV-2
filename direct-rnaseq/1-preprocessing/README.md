---
title: Pre-processing
---

## Live Resources

| usegalaxy.eu |
|:--------:|:------------:|:------------:|:------------:|:------------:|
| <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/wolfgang-maier/w/sars-cov-2-assign-ont-reads-to-transcripts" alt="Galaxy workflow" /> |
| |


## Data pre-processing
Due to the nature of SARS-CoV-2 transcriptions, the sub-genomic RNAs (sgRNA) that encode the structural proteins are overlapping with each other. This requests for special care in mapping the sequencing data and correct assignments of the reads to the associated ORF and sgRNA. The [pre-processing workflow](https://usegalaxy.eu/u/wolfgang-maier/w/sars-cov-2-assign-ont-reads-to-transcripts) performs the alignment step for the whole datasets, and follows up with categorizing the reads based on the identified ORF origin of the transcript.  

![A snapshot of pre-processing workflow for analyzing DRS SARS-CoV-2 data in Galaxy.](../img/preprocessing-snapshot.png)

