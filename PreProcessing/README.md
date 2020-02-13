# Preprocessing of raw SARS-CoV-2 reads

The raw reads available so far are generated from bronchoalveolar lavage fluid (BALF) and are metagenomic in nature: they contain human reads, reads from potential bacterial co-infections as well as true SARS-CoV-2 reads.

## The methodology

Map reads against human genome to identify non-human reads.

## The outline

Illumina and Oxford nanopore reads are pulled from NCBI SRA (links to SRA accessions are available [here](https://www.ncbi.nlm.nih.gov/genbank/sars-cov-2-seqs/)). They are then processed separately.

### Illumina

 - Illumina reads are QC'ed and adapter sequences are removed using `fastp`
 - Quality metrics are computed and visualized using `fastqc`  and 'multiqc'
 - Reads are mapped against human genome `hg38` using `bwa mem`
 - Reads that **do not map** to `hg38` are filtered out using `samtools view`
 - Reads are converted back to fastq format using `samtools fastx`

### Oxford nanopore

 - Reads are QC'ed using `nanopolt`
 - Quality metrics are computed and visualized using `fastqc`  and 'multiqc'
 - Reads are mapped against human genome `hg38` using `minimap2`
 - Reads that **do not map** to `hg38` are filtered out using `samtools view`
 - Reads are converted back to fastq format using `samtools fastx`

## The inputs

Only SRA accessions are required for this analysis. The described analysis was performed all SRA SARS-CoV accessions available as of Feb 13, 2020:

```
SRR10903401
SRR10903402
SRR10971381
SRR10948550
SRR10948474
SRR10902284
```

## The history and the workflow

Galaxy workspace (history) containing the most current analysis can be imported from [here](https://usegalaxy.org/u/aun1/h/ncov-pp).

The [workflow](https://usegalaxy.org/u/aun1/w/ncov-pp) is available at Galaxy public site and can downloaded and installed on any Galaxy instance.

![](pp_wf.png)
