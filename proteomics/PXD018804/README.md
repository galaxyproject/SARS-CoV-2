---
title: Reanalysis of PXD018804
---
# Deep proteomic analysis of CoviD-19 virus infected Vero cells.

## Live Resources

| usegalaxy.eu |
|:--------:|:------------:|:------------:|:------------:|:------------:|
| <FlatShield label="data" message="view" href="https://usegalaxy.eu/library/list#folders/F0b0b362a64328086" alt="Raw data" /> |
| <FlatShield label="workflow" message="run" href="https://proteomics.usegalaxy.eu/u/subina/w/imported-search-pxd018804-workflow" alt="Galaxy workflow" /> |
| <FlatShield label="PDX018804-Q10486-90 history" message="view" href="https://usegalaxy.eu/u/subina/h/imported-search-pxd018804-q10486-90" alt="Galaxy history" /> |
| <FlatShield label="PDX018804-Q10511-15 history" message="view" href="https://usegalaxy.eu/u/subina/h/imported-search-pxd018804-q10511-15" alt="Galaxy history" /> |

## Description

[Gouveia et al](https://onlinelibrary.wiley.com/doi/abs/10.1002/pmic.202000107) processed SARS-CoV-2 infected Vero cells to
generate a high-resolution mass spectrometry dataset.
The original study proposes a list of experimentally observed peptides for their possible use in targeted method development.
The bioinformatic workflow used a stepwise search wherein a first search against contaminant and bovine proteins was used to
eliminate spectra that were associated with any adventitious proteins. In the second step, the data was searched against
the protein database with Chlorocebus sequences and the Italy-INMI1 SARS-CoV-2 sequences to detect SARS-CoV-2 peptides.
The peptides detected from six viral proteins were further analyzed for their proteotypicity and specificity.

## Workflow

![](../img/wf.png)

The Galaxy workflow presented here follows most of the original workflow, wherein RAW data is initially
converted to MGF and mzML format. The MGF files are searched against the contaminant database using X!tandem,
MSGF+, OMSSA and C search algorithms. Later, spectra associated with adventitious proteins were eliminated
using MSMS Extractor. In the second step, the dataset was searched against the protein database with
Chlorocebus sequences and the Italy-INMI1 SARS-CoV-2 sequences. This resulted in detection of 106 peptides from six SARS-CoV-2 proteins. 


The detected peptides were later subjected to analysis by PepQuery and Lorikeet to ascertain the quality of peptide identification.


