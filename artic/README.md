---
title: Artic
---

## Live Resources

| usegalaxy.eu | usegalaxy.org.au |
|:--------:|:------------:|
| <FlatShield label="data" message="view" href="https://usegalaxy.eu/library/list#folders/F2a32545de855d335" alt="Raw data" /> | |
| <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/bgruening/w/sars-cov2-amplicon-artic" alt="Galaxy workflow" /> | |


## Amplicon Analysis using Artic workflows

The [ARTIC Network](https://artic.network) is a collaborative project between a number of laboratories around the world that wants to provide protocols and advice on viral outbreaks. Their website states that part of their goal is to devlop *"an end-to-end system for processing samples from viral outbreaks to generate real-time epidemiological information that is interpretable and actionable by public health bodies."* 

The ARTIC network has made available laboratory protocols, primer sets and bioinformatics workflows. The protocol they use relies upon direct amplification of the virus using tiled, multiplexed primers. According to their website, *this approach has been proven to have high sensitivity and work directly from clinical samples (compared to metagenomics approaches).*

The amplicon approach using the protocol outlined by the ARTIC network has been widely adopted by groups worldwide and a fair percentage of the COVID genome sequences uploaded to GISAID and raw reads uploaded to the SRA have been produced by this method.

Along with the laboratory protocols for sequencing (both for Illumina and Nanopore sequencing technologies), several tools and workflows have been developed to handle what is essentially non-random sequencing data.

The workflow makes use of the [iVar software](https://andersen-lab.github.io/ivar/html/) from the Andersen Lab at the Scripps Research Institute in California.

## The workflow

| ![](./img/wf.png) |
|:------------------:|
| Galaxy workflow for ARTIC analysis of amplicon data from Illumina sequencing |


<p align="center">
  <a href="https://bccdc.ca/">    <img src="img/bc-cdc-logo.png" width="22%" alt="BC CDC" /> </a>
  <a href="https://quadram.ac.uk/">    <img src="img/quadram-logo.png" width="22%" alt="Quadram Institute" /> </a>
  <a href="https://www.sanbi.ac.za/">   <img src="img/sanbi-logo.png" width="22%" alt="South African National Bioinformatics Institute (SANBI, UWC)" /> </a>
  <a href="https://www.unimelb.edu.au/">    <img src="img/uni-melbourne-logo.png" width="22%" alt="University of Melbourne" /> </a>
</p>

### Reference:

Nathan D Grubaugh, Karthik Gangavarapu, Joshua Quick, Nathaniel L Matteson, Jaqueline Goes De Jesus, Bradley J Main, Amanda L Tan, Lauren M Paul, Doug E Brackney, Saran Grewal, Nikos Gurfield, Koen KA Van Rompay, Sharon Isern, Scott F Michael, Lark L Coffey, Nicholas J Loman, Kristian G Andersen, An amplicon-based sequencing framework for accurately measuring intrahost virus diversity using PrimalSeq and iVar, Genome Biology 2019 20:8



bioRxiv doi: https://doi.org/10.1101/383513
