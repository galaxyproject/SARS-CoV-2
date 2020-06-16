---
title: Artic
---

## Amplicon Analysis using Artic workflows

The [ARTIC Network](https://artic.network) is a collaborative project between a number of laboratories around the world that wants to provide protocols and advice on viral outbreaks. Their website states that part of their goal is to devlop *"an end-to-end system for processing samples from viral outbreaks to generate real-time epidemiological information that is interpretable and actionable by public health bodies."* 

The ARTIC network has made available laboratory protocols, primer sets and bioinformatics workflows. The protocol they use relies upon direct amplification of the virus using tiled, multiplexed primers. According to their website, *this approach has been proven to have high sensitivity and work directly from clinical samples (compared to metagenomics approaches).*

The amplicon approach using the protocol outlined by the ARTIC network has been widely adopted by groups worldwide and a fair percentage of the COVID genome sequences uploaded to GISAID and raw reads uploaded to the SRA have been produced by this method.

Along with the laboratory protocols for sequencing (both for Illumina and Nanopore sequencing technologies), several tools and workflows have been developed to handle what is essentially non-random sequencing data.

The workflow makes use of the [iVar software](https://andersen-lab.github.io/ivar/html/) from the Andersen Lab at the Scripps Research Institute in California. 

## The workflow

[Galaxy workflow for ARTIC analysis of amplicon data from Illumina sequencing](https://gist.github.com/pvanheus/6cae3dc07feff2fc528b0bb775099a0e)

#### Reference:

Nathan D Grubaugh, Karthik Gangavarapu, Joshua Quick, Nathaniel L Matteson, Jaqueline Goes De Jesus, Bradley J Main, Amanda L Tan, Lauren M Paul, Doug E Brackney, Saran Grewal, Nikos Gurfield, Koen KA Van Rompay, Sharon Isern, Scott F Michael, Lark L Coffey, Nicholas J Loman, Kristian G Andersen, An amplicon-based sequencing framework for accurately measuring intrahost virus diversity using PrimalSeq and iVar, Genome Biology 2019 20:8



bioRxiv doi: https://doi.org/10.1101/383513
