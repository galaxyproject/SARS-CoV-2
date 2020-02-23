| usegalaxy.org | usegalaxy.eu | usegalaxy.org.au |
|:--------:|:------------:|:------------:|
| [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org/u/aun1/w/covid-19-pre-pp) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/w/covid-19-read-pre-processing) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org.au/u/simongladman/w/covid-19-read-pre-processing) |
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.org/u/aun1/h/covid-19-pre-processing) | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/h/covid-19-read-pre-processing-without-downloading-from-sra) | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)]() |


# Preprocessing of raw SARS-CoV-2 reads

The raw reads available so far are generated from bronchoalveolar lavage fluid (BALF) and are metagenomic in nature: they contain human reads, reads from potential bacterial co-infections as well as true COVID-19 reads.

## What's the point?

Assess quality of reads, remove adapters and remove reads mapping to human genome.

## The outline

Illumina and Oxford nanopore reads are pulled from the NCBI SRA (links to SRA accessions are available [here](https://www.ncbi.nlm.nih.gov/genbank/sars-cov-2-seqs/)). They are then processed separately as described in the [workflow section](#the-history-and-the-workflow).

## Inputs

Only SRA accessions are required for this analysis. The described analysis was performed with all SRA SARS-CoV accessions available as of Feb 20, 2020:

1. Illumina reads

   ```
   SRR10903401
   SRR10903402
   SRR10971381
   ```

2. Oxford Nanopore reads

   ```
   SRR10948550
   SRR10948474
   SRR10902284
   ```

## Outputs

This workflow produces three outputs that are used in tow subsequent analyses:

| #  | Output | Used in |
|----|------|---------|
| 1. | A combined set of adapter-free Illumina reads without human contamination | [Assembly](https://github.com/galaxyproject/SARS-CoV-2/tree/master/2-Assembly) |
| 2. | A combined set of Oxford Nanopore reads without human contamination | [Assembly](https://github.com/galaxyproject/SARS-CoV-2/tree/master/2-Assembly) |
| 3. | A collection of adapter-free Illumina reads from which human reads *have not* been removed | [Variation detection](https://github.com/galaxyproject/SARS-CoV-2/tree/master/4-Variation) |

## The history and the workflow

A Galaxy workspace (history) containing the most current analysis can be imported from [here](https://usegalaxy.org/u/aun1/h/covid-19-pre-processing).

The publicly accessible [workflow](https://usegalaxy.org/u/aun1/w/covid-19-pre-pp) can be downloaded and installed on any Galaxy instance. It contains version information for all tools used in this analysis.

The workflow performs the following steps:

### Illumina

 - Illumina reads are QC'ed and adapter sequences are removed using `fastp`
 - Quality metrics are computed and visualized using `fastqc`  and `multiqc`
 - Reads are mapped against human genome version `hg38` using `bwa mem`
 - Reads that **do not map** to `hg38` are filtered out using `samtools view`
 - Reads are converted back to fastq format using `samtools fastx`

### Oxford nanopore

 - Reads are QC'ed using `nanoplot`
 - Quality metrics are computed and visualized using `fastqc`  and `multiqc`
 - Reads are mapped against human genome version `hg38` using `minimap2`
 - Reads that **do not map** to `hg38` are filtered out using `samtools view`
 - Reads are converted back to fastq format using `samtools fastx`

![](pp_wf.png)

## BioConda

Tools used in this analysis are also available from BioConda:

| Name | Link |
|------|----------------|
| `sra-tools` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/sra-tools/badges/version.svg)](https://anaconda.org/bioconda/sra-tools) |
| `fastqc` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/fastqc/badges/version.svg)](https://anaconda.org/bioconda/fastqc) |
| `multiqc` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/multiqc/badges/version.svg)](https://anaconda.org/bioconda/multiqc) |
| `fastp` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/fastp/badges/version.svg)](https://anaconda.org/bioconda/fastp) |
| `nanoplot` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/nanoplot/badges/version.svg)](https://anaconda.org/bioconda/nanoplot) |
| `bwa` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/bwa/badges/version.svg)](https://anaconda.org/bioconda/bwa) |
| `picard` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/picard/badges/version.svg)](https://anaconda.org/bioconda/picard) |
| `samtools` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/samtools/badges/version.svg)](https://anaconda.org/bioconda/samtools) |

## Alternate Workflow

An alternate starting point has been created for those not wanting to wait for the data to be downloaded from the NCBI SRA. (This can especially be an issue in Australia or Europe.)

There is a shared [history](https://usegalaxy.org.au/u/simongladman/h/covid-19-raw-data) containing all of the starting data in appropriate collections and an alternate [workflow](https://usegalaxy.org.au/u/simongladman/w/covid-19-alternate-pre-processing) able to make use of this alternate input. Apart from a slightly different starting point, the workflow and the outputs it produces are identical to that above.

| usegalaxy.eu | usegalaxy.org.au |
|:------------:|:----------------:|
[![Galaxy input history](https://img.shields.io/static/v1?label=input_history&message=view&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/h/covid-19-raw-data) | [![Galaxy input history](https://img.shields.io/static/v1?label=input_history&message=view&color=blue)](https://usegalaxy.org.au/u/simongladman/h/covid-19-raw-data) |
| [![Galaxy alternate workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/w/copy-of-covid-19-read-pre-processing-with-download) | [![Galaxy alternate workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org.au/u/simongladman/w/covid-19-alternate-pre-processing) |
[![Galaxy final history](https://img.shields.io/static/v1?label=final_history&message=view&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/h/covid-19-read-pre-processing-without-downloading-from-sra) | [![Galaxy final history](https://img.shields.io/static/v1?label=final_history&message=view&color=blue)](https://usegalaxy.org.au/u/simongladman/h/covid-19-alternate-pre-processing) |
