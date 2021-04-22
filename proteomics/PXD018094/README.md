---
title: Reanalysis of PXD018094
---

# Proteomics analysis of COVID-19 lung tissues

## Live Resources

| usegalaxy.eu |
|:--------:|:------------:|:------------:|:------------:|:------------:|
| <FlatShield label="Input data" message="view" href="https://usegalaxy.eu/u/subina/h/pxd018094-lung-samples" alt="Raw data" /> |
| <FlatShield label="PXD018094 normal history" message="view" href="https://usegalaxy.eu/u/arajczewski/h/imported-pxd018094-lung-samples-normal" alt="Galaxy history" /> |
| <FlatShield label="PXD018094 infected history" message="view" href="https://usegalaxy.eu/u/arajczewski/h/imported-pxd018094-lung-samples-infected" alt="Galaxy history" /> |
| <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/arajczewski/w/imported-workflow-for-covid-19-peptide-validation-pxd018094-and-pxd022085" /> |


## Description

**[Leng et al](https://www.nature.com/articles/s41392-020-00355-9)** performed MS/MS analysis to characterize molecular mechanisms underlying COVID-19 pathogenesis in fresh lung tissues obtained from newly deceased patients with COVID-19 pneumonia. 


## Workflow

The Galaxy workflow includes RAW data conversion to MGF and mzML format. The MGF files are searched against the combined database of Human 
Uniprot proteome, contaminant proteins and SARS-Cov-2 proteins database using PepQUery Validation workflow. This resulted in detection of
 peptides from SARS-CoV-2 proteins in both positive and negative patients. 
 ![](./../img/wfVal.png)
The detected peptides were searched against NCBInr to ascertain that these peptides were specific to SARS-CoV-2 proteins. The detected peptides 
were later subjected Lorikeet analysis to ascertain the quality of peptide identification. However, when we ran the database searching workflow on the RAW files,
we did not find any COVID-19 peptides.
![](./../img/wfDB.png)



## Results

The COVID-19 positive patient samples detected 16 SARS-CoV-2 peptides and we also detected 26 peptides from negative samples.


