 Analsys of variation within individual samples

## What's the point?

To understand the amount of heterogeneity in individual SARS-CoV-2 isolates.

## Outline

As of writing (2/13/2020) there were just three Illumina datasets from SARS-nCoV-2 patients:

```
- sra-study: SRP242226
  bioproject: PRJNA601736
  biosample: SAMN13872787
  sra-sample: SRS6007144
  sra-experiment: SRX7571571
  sra-run: SRR10903401

- sra-study: SRP242226
  bioproject: PRJNA601736
  biosample: SAMN13872786
  sra-sample: SRS6007143
  sra-experiment: SRX7571570
  sra-run: SRR10903402

- sra-study: SRP245409
  bioproject: PRJNA603194
  biosample: SAMN13922059
  sra-sample: SRS6067521
  sra-experiment: SRX7636886
  sra-run: SRR10971381
 ```

to understand the extent of sequence variation within these samples we performed the following analysis. First we use a Galaxy workflow to perform the following steps:


 1. Mapped all reads against SARS-CoV-2 reference [NC_045512.2](https://www.ncbi.nlm.nih.gov/nuccore/NC_045512) using `bwa mem`
 2. Filtered reads with mapping quality of at least 20, that were mapped as proper pairs
 3. Performed realignments using `lofreq viterbi` 
 4. Called variants using `lofreq call`
 5. Annotated variants using `snpeff` against database created from NC_045512.2 GenBank file
 6. Converted VCFs into tab delimited datasets

 Next we analyzed tab delimited data in a Jupyter notebook