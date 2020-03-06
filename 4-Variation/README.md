| usegalaxy.org | usegalaxy.eu | usegalaxy.org.au | usegalaxy.be |
|:--------:|:------------:|:------------:|:------------:|
| [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org/u/aun1/w/covid-19-variation-analysis) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/w/covid-19-variation-analysis) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org.au/u/simongladman/w/covid-19-variation) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.be/u/ieguinoa/w/covid-19-variation) |
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.org/u/aun1/h/covid-19-variation) | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/wolfgang-maier/h/covid-19-intra-variation) | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.org.au/u/simongladman/h/covid-19-variation) | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.be/u/ieguinoa/h/covid-19-variation) |
| [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) | [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) | [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) | [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) |
# Analysis of variation within individual COVID-19 samples | March 5 2020

## What's the point?

To understand the amount of heterogeneity in individual COVID-19 isolates.

## Outline

As of March 6, 2020 the following datasets are available:

|Run|Bases|BioProject|Center Name|Instrument|LibraryLayout|LibrarySource|Collection_Date|
|---|-----:|----------|-----------|----------|-------------|-------------|---------------|
|SRR11241254|22249638|PRJNA610428|UWash|MiSeq|S|VIRAL RNA|27-Feb-2020|
|SRR11241255|22252301|PRJNA610428|UWash|MiSeq|S|VIRAL RNA|28-Feb-2020|
|SRR11149660|1770539039|PRJNA608224|UMelb|GridION|S|VIRAL RNA|10-Feb-2020|
|SRR11247078|199651225|PRJNA610428|UWash|MiSeq|S|VIRAL RNA|29-Feb-2020|
|SRR11247075|888775|PRJNA610428|UWash|MiSeq|S|VIRAL RNA|01-Mar-2020|
|SRR11247076|11080510|PRJNA610428|UWash|MiSeq|S|VIRAL RNA|01-Mar-2020|
|SRR10948474|284575255|PRJNA601630|HKU|MinION|S|GENOMIC|Jan-2020|
|SRR10948550|146271136|PRJNA601630|HKU|MinION|S|GENOMIC|Jan-2020|
|SRR10902284|90569410|PRJNA601630|UHK|MinION|S|METAGENOMIC|Jan-2020|
|SRR11092056|1484179677|PRJNA605983|WIV|MiSeq|P|METAGENOMIC|30-Dec-2019|
|SRR11092057|1456539874|PRJNA605983|WIV|MiSeq|P|METAGENOMIC|30-Dec-2019|
|SRR11092061|10276752900|PRJNA605983|WIV|HiSeq 3000|P|METAGENOMIC|30-Dec-2019|
|SRR11092064|1036248134|PRJNA605983|WIV|MiSeq|P|METAGENOMIC|30-Dec-2019|
|SRR11085733|3868905116|PRJNA606159|WIV|HiSeq 3000|P|METAGENOMIC|Mar-2018|
|SRR11085736|3458628776|PRJNA606159|WIV|HiSeq 3000|P|METAGENOMIC|Mar-2018|
|SRR11085737|3087725372|PRJNA606159|WIV|HiSeq 3000|P|METAGENOMIC|Mar-2018|
|SRR11085738|4198475966|PRJNA606159|WIV|HiSeq 3000|P|METAGENOMIC|Mar-2018|
|SRR11085740|2755667968|PRJNA606159|WIV|HiSeq 3000|P|METAGENOMIC|Mar-2018|
|SRR11085741|3480540019|PRJNA606159|WIV|HiSeq 3000|P|METAGENOMIC|Mar-2018|
|SRR11085797|3296572317|PRJNA606165|WIV|HiSeq 3000|P|METAGENOMIC|24-Jul-2013|
|SRR11092059|11539256400|PRJNA605983|WIV|HiSeq 3000|P|METAGENOMIC|30-Dec-2019|
|SRR11092060|8902750200|PRJNA605983|WIV|HiSeq 3000|P|METAGENOMIC|30-Dec-2019|
|SRR11092062|18391209000|PRJNA605983|WIV|HiSeq 1000|P|METAGENOMIC|30-Dec-2019|
|SRR11092063|20124958500|PRJNA605983|WIV|HiSeq 3000|P|METAGENOMIC|30-Dec-2019|
|SRR11140747|359000999|PRJNA607948|UW|GridION|S|METAGENOMIC|2020-02-14|
|SRR11140744|226957916|PRJNA607948|UW|MiSeq|P|METAGENOMIC|2020-02-14|
|SRR11140745|260956833|PRJNA607948|UW|GridION|S|METAGENOMIC|2020-02-14|
|SRR11140746|159508570|PRJNA607948|UW|MiSeq|P|METAGENOMIC|2020-02-14|
|SRR11140748|190194752|PRJNA607948|UW|MiSeq|P|METAGENOMIC|2020-02-14|
|SRR11140749|304113442|PRJNA607948|UW|GridION|S|METAGENOMIC|2020-02-14|
|SRR11140750|7650166|PRJNA607948|UW|MiSeq|P|METAGENOMIC|2020-02-14|
|SRR11140751|23696161|PRJNA607948|UW|GridION|S|METAGENOMIC|2020-02-14|
|SRR11092058|2232781003|PRJNA605983|WIV|MiSeq|P|METAGENOMIC|30-Dec-2019|
|SRR10971381|8031043214|PRJNA603194|Fudan|MiniSeq|P|METATRANSCRIPTOMIC|02-Jan-2020|
|SRR10903401|143565674|PRJNA601736|WU|MiSeq|P|METATRANSCRIPTOMIC||
|SRR10903402|203832203|PRJNA601736|WU|MiSeq|P|METATRANSCRIPTOMIC||
|SRR11177792|2817120987|PRJNA608651|UTP|MiSeq|P|GENOMIC|13-Jan-2020|
|SRR11247077|118148011|PRJNA610428|UWash|MiSeq|S|VIRAL RNA|01-Mar-2020|

###### UW = University of Wisconsin; UHG = University of Hong Kong; UWash = University of Washington; WIV = Wuhan Institute OF Virology, Umelb = University of Melbourne, UTP = Universidad Tecnologica De Pereira, HKU = HKU-Shenzhen Hospital, P = Paired, S = Single

This list is a **union** of SRA accessions from [NCBI COVID-19 page](https://www.ncbi.nlm.nih.gov/genbank/sars-cov-2-seqs/) and [SRA](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=2697049).

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

The workflow produces a [table of variants](variant_list.tsv) that looks like this:

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
| `porechop` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/porechop/badges/version.svg)](https://anaconda.org/bioconda/porechop) |
| `filtlong` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/filtlong/badges/version.svg)](https://anaconda.org/bioconda/filtlong) |
| `minimap2` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/minimap2/badges/version.svg)](https://anaconda.org/bioconda/minimap2) |