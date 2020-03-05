| usegalaxy.org | usegalaxy.eu | usegalaxy.org.au | usegalaxy.be |
|:--------:|:------------:|:------------:|:------------:|
| [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org/u/aun1/w/covid-19-variation-analysis) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/w/covid-19-variation-analysis) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org.au/u/simongladman/w/covid-19-variation) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.be/u/ieguinoa/w/covid-19-variation) |
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.org/u/aun1/h/covid-19-variation) | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/h/covid-19-intra-variation) | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.org.au/u/simongladman/h/covid-19-variation) | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.be/u/ieguinoa/h/covid-19-variation) |
| [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) | [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) | [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) | [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) |
# Analysis of variation within individual COVID-19 samples | March 5 2020

## What's the point?

To understand the amount of heterogeneity in individual COVID-19 isolates.

## Outline

As of March 5, 2020 the following datasets are available:

|#|Run|Center Name|Collection_Date|Instrument|LibraryLayout|MBases|
|--|---|-----------|---------------|----------|-------------|------|
|1.|SRR10903401|WIV| - |Illumina MiSeq|PAIRED|143|
|2.|SRR10903402|WIV| - |Illumina MiSeq|PAIRED|203|
|3.|SRR10971381|Fudan|Illumina MiniSeq|PAIRED|8030|
|4.|SRR10948474|HKU-SHENZHEN HOSPITAL|Jan-2020|MinION|SINGLE|284|
|5.|SRR10948550|HKU-SHENZHEN HOSPITAL|Jan-2020|MinION|SINGLE|146|
|6.|SRR11140744|UW|2020-02-14|Illumina MiSeq|PAIRED|226|
|7.|SRR11140745|UW|2020-02-14|GridION|SINGLE|260|
|8.|SRR11140746|UW|2020-02-14|Illumina MiSeq|PAIRED|159|
|9.|SRR11140748|UW|2020-02-14|Illumina MiSeq|PAIRED|190|
|10.|SRR11140749|UW|2020-02-14|GridION|SINGLE|304|
|11.|SRR11140750|UW|2020-02-14|Illumina MiSeq|PAIRED|7|
|12.|SRR11140751|UW|2020-02-14|GridION|SINGLE|23|
|13.|SRR10902284|UHK|Jan-2020|MinION|SINGLE|90|
|14.|SRR11177792|UNIVERSIDAD TECNOLOGICA DE PEREIRA|13-Jan-2020|Illumina MiSeq|PAIRED|2817|
|15.|SRR11140747|UW|2020-02-14|GridION|SINGLE|359|
|16.|SRR11092056|WIV|30-Dec-2019|Illumina MiSeq|PAIRED|1484|
|17.|SRR11092057|WIV|30-Dec-2019|Illumina MiSeq|PAIRED|1456|
|18.|SRR11092059|WIV|30-Dec-2019|Illumina HiSeq 3000|PAIRED|11539|
|19.|SRR11092060|WIV|30-Dec-2019|Illumina HiSeq 3000|PAIRED|8902|
|20.|SRR11092061|WIV|30-Dec-2019|Illumina HiSeq 3000|PAIRED|10276|
|21.|SRR11092062|WIV|30-Dec-2019|Illumina HiSeq 1000|PAIRED|18391|
|22.|SRR11092063|WIV|30-Dec-2019|Illumina HiSeq 3000|PAIRED|20124|
|23.|SRR11092064|WIV|30-Dec-2019|Illumina MiSeq|PAIRED|1036|
|24.|SRR11092058|WIV|30-Dec-2019|Illumina MiSeq|PAIRED|2232|
|25.|SRR11241255|UWash|28-Feb-2020|Illumina MiSeq|SINGLE|22|
|26.|SRR11241254|UWash|27-Feb-2020|Illumina MiSeq|SINGLE|22|

###### UW = University of Wisconsin; UHK = University of Hong Kong; UWash = University of Washington; WIV = Wuhan Institute OF Virology

This list is obtained by intersecting SRA accessions from [NCBI COVID-19 page](https://www.ncbi.nlm.nih.gov/genbank/sars-cov-2-seqs/) and [SRA](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=2697049).

To understand the extent of sequence variation within these samples we performed the following analysis. 

### Analysis of Illumina data

 1. Map all reads against COVID-19 reference [NC_045512.2](https://www.ncbi.nlm.nih.gov/nuccore/NC_045512) using `bwa mem`
 2. Filter reads with mapping quality of at least 20, that were mapped as proper pairs
 3. Perform realignments using `lofreq viterbi`
 4. Call variants using `lofreq call`
 5. Annotate variants using `snpeff` against database created from NC_045512.2 GenBank file
 6. Convert VCFs into tab delimited dataset

### Analysis of ONT data

 1. Process reads using `porechop`
 2. Filter reads using `filtlong` using Illumina data as "reference" to exclude non-typical *k*-mers
 3. Map reads against COVID-19 reference [NC_045512.2](https://www.ncbi.nlm.nih.gov/nuccore/NC_045512) using `minimap2`
 4. Call variants using `lofreq call`
 5. Annotate variants using `snpeff` against database created from NC_045512.2 GenBank file
 6. Convert VCFs into tab delimited dataset

:warning: We obtained vastly different results depending on whether the reads were filtered with `filtlong` or now. As a result we did not incorporate variation from ONT data into our report at this time. 


The combined file containing variants from all currently available datasets is available [here](variant_list.tsv)

Next, we analyzed this tab delimited data in a [Jupyter notebook](variation_analysis.ipynb).

## Inputs

### Workflow

1. GenBank file for the reference COVID-19 [genome](https://www.ncbi.nlm.nih.gov/nuccore/NC_045512).
   The GenBank record is used by `snpeff` to generate a database for variant annotation.
2. Accession numbers of reads

### Jupyter notebook

The Jupyter notebook requires the GenBank file (#1 from above) and the output of the workflow described below.

## Outputs

The workflow produces a table of variants that looks like this:

<div>
<table>
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Sample</th>
      <th>CHROM</th>
      <th>POS</th>
      <th>REF</th>
      <th>ALT</th>
      <th>DP</th>
      <th>AF</th>
      <th>SB</th>
      <th>DP4</th>
      <th>IMPACT</th>
      <th>FUNCLASS</th>
      <th>EFFECT</th>
      <th>GENE</th>
      <th>CODON</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>SRR10903401</td>
      <td>NC_045512</td>
      <td>1409</td>
      <td>C</td>
      <td>T</td>
      <td>124</td>
      <td>0.040323</td>
      <td>1</td>
      <td>66,53,2,3</td>
      <td>MODERATE</td>
      <td>MISSENSE</td>
      <td>NON_SYNONYMOUS_CODING</td>
      <td>orf1ab</td>
      <td>Cat/Tat</td>
    </tr>
    <tr>
      <th>1</th>
      <td>SRR10903401</td>
      <td>NC_045512</td>
      <td>1821</td>
      <td>G</td>
      <td>A</td>
      <td>95</td>
      <td>0.094737</td>
      <td>0</td>
      <td>49,37,5,4</td>
      <td>MODERATE</td>
      <td>MISSENSE</td>
      <td>NON_SYNONYMOUS_CODING</td>
      <td>orf1ab</td>
      <td>gGt/gAt</td>
    </tr>
    <tr>
      <th>2</th>
      <td>SRR10903401</td>
      <td>NC_045512</td>
      <td>1895</td>
      <td>G</td>
      <td>A</td>
      <td>107</td>
      <td>0.037383</td>
      <td>0</td>
      <td>51,52,2,2</td>
      <td>MODERATE</td>
      <td>MISSENSE</td>
      <td>NON_SYNONYMOUS_CODING</td>
      <td>orf1ab</td>
      <td>Gta/Ata</td>
    </tr>
    <tr>
      <th>3</th>
      <td>SRR10903401</td>
      <td>NC_045512</td>
      <td>2407</td>
      <td>G</td>
      <td>T</td>
      <td>122</td>
      <td>0.024590</td>
      <td>0</td>
      <td>57,62,1,2</td>
      <td>MODERATE</td>
      <td>MISSENSE</td>
      <td>NON_SYNONYMOUS_CODING</td>
      <td>orf1ab</td>
      <td>aaG/aaT</td>
    </tr>
    <tr>
      <th>4</th>
      <td>SRR10903401</td>
      <td>NC_045512</td>
      <td>3379</td>
      <td>A</td>
      <td>G</td>
      <td>121</td>
      <td>0.024793</td>
      <td>0</td>
      <td>56,62,1,2</td>
      <td>LOW</td>
      <td>SILENT</td>
      <td>SYNONYMOUS_CODING</td>
      <td>orf1ab</td>
      <td>gtA/gtG</td>
    </tr>
  </tbody>
</table>
</div>

Here, most fields names are descriptive. **SB** = the Phred-scaled probability of strand bias as calculated by [lofreq](https://csb5.github.io/lofreq/) (0 = no strand bias); **DP4** = strand-specific depth for reference and alternate allele observations (Forward reference, reverse reference, forward alternate, reverse alternate).

The variants we identified were distributed across the SARS-CoV-2 genome in the following way:

![](var_map.png)

The following table describes variants with frequencies above 10%:

![](S_var.png)

## History and workflow

A Galaxy workspace (history) containing the most current analysis can be imported from [here](https://usegalaxy.org/u/aun1/h/covid-19-variation).

The publicly accessible [workflow](https://usegalaxy.org/u/aun1/w/covid-19-variation-analysis) can be downloaded and installed on any Galaxy instance. It contains version information for all tools used in this analysis.

![](var_wf.png)

## BioConda

Tools used in this analysis are also available from BioConda:

| Name | Link |
|------|----------------|
| `bwa` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/bwa/badges/version.svg)](https://anaconda.org/bioconda/bwa) |
| `samtools` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/samtools/badges/version.svg)](https://anaconda.org/bioconda/samtools) |
| `lofreq` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/lofreq/badges/version.svg)](https://anaconda.org/bioconda/lofreq) |
| `snpeff` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/snpeff/badges/version.svg)](https://anaconda.org/bioconda/snpeff) |
| `snpsift` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/snpsift/badges/version.svg)](https://anaconda.org/bioconda/snpsift) |
