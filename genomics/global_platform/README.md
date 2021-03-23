---
title: Global platform
---

# Global platform for SARS-CoV-2 analysis

## Workflows for discovery of sequence variants

We developed five analysis workflows to support the identification of allelic variants in SARS-CoV-2 from deep sequencing reads (Table 1). A user begins the analysis by uploading reads in FASTQ format into Galaxy (Fig. 1) as a dataset collection (a dataset collection is a way to represent an arbitrarily large collection of samples as a singular entity within a user's workspace; see Ref. 11). These datasets can either be uploaded by the user, obtained from local data mirrors or retrieved directly from the Sequence Read Archive at NCBI. The four primary analysis workflows (#1-4 in Table 1) convert FASTQ data to annotated AVs through a series of steps that include quality control, trimming, mapping, deduplication, AV calling, and filtering. All Illumina workflows use lofreq12 as the principal AV caller. We selected it based on extensive testing (Methods). All four workflows produce identically annotated VCF output that is further processed by the Reporting workflow (#5 in Table 1) to generate data tables describing AVs. These data tables are further processed with Jupyter directly in Galaxy and with ObservableHQ to generate all figures and tables such as those shown in the paper.

#### Table 1. 
Workflow description. Clicking <kbd>EU</kbd>, <kbd>EU</kbd>, or <kbd>AU</kbd> buttons will take you to workflow at US (https://usegalaxy.org), European (https://usegalaxy.eu), or Australian (https://usegalaxy.org.au) instance.

| Workflow | Input data | Read aligner | Variant caller |
|----------|-------------|---|---|---|
|1. Illumina RNAseq SE<br>[<kbd>EU</kbd>](https://usegalaxy.eu/u/wolfgang-maier/w/covid-19-variation-analysis-on-se-data)[<kbd>US</kbd>](https://usegalaxy.org/u/aun1/w/covid-19-variation-analysis-on-wgs-se-data)[<kbd>AU</kbd>](https://usegalaxy.org.au/u/nekrut/w/covid-19-variation-analysis-on-wgs-se-data) |  Single end data derived from RNAseq experiments | `bowtie2` | `lofreq` |
|2.  Illumina RNAseq PE<br>[<kbd>EU</kbd>](https://usegalaxy.eu/u/wolfgang-maier/w/covid-19-variation-analysis-on-pe-data)[<kbd>US</kbd>](https://usegalaxy.org/u/aun1/w/covid-19-variation-analysis-on-wgs-pe-data)[<kbd>AU</kbd>](https://usegalaxy.org.au/u/nekrut/w/covid-19-variation-analysis-on-wgs-pe-data) |  Paired end data derived from RNAseq experiments | `bwa-mem` | `lofreq` |
|3.  Illumina ARTIC<br>[<kbd>EU</kbd>](https://usegalaxy.eu/u/wolfgang-maier/w/covid19-variation-analysis-on-artic-pe)[<kbd>US</kbd>](https://usegalaxy.org/u/aun1/w/covid-19-variation-analysis-on-artic-pe-data-1)[<kbd>AU</kbd>](https://usegalaxy.org.au/u/nekrut/w/covid-19-variation-analysis-on-artic-pe-data) |   Paired-end data generated with ARTIC protocols | `bwa-mem` | `lofreq` |
|4.  ONT ARTIC<br>[<kbd>EU</kbd>](https://usegalaxy.eu/u/wolfgang-maier/w/covid-19-variation-analysis-of-artic-ont-data)[<kbd>US</kbd>](https://usegalaxy.org/u/aun1/w/covid-19-variation-analysis-of-artic-ont-data)[<kbd>AU</kbd>](https://usegalaxy.org.au/u/nekrut/w/covid-19-variation-analysis-of-artic-ont-data ) |  ONT fastq files generated with ARTIC protocols | `minimap2` | `medaka` |
|5.  Reporting<br>[<kbd>EU</kbd>](https://usegalaxy.eu/u/wolfgang-maier/w/covid19-variation-analysis-reporting)[<kbd>US</kbd>](https://usegalaxy.org/u/aun1/w/covid-19-variation-analysis-reporting)[<kbd>AU</kbd>](https://usegalaxy.org.au/u/nekrut/w/covid-19-variation-analysis-reporting)| Output of any of the above workflows | - | - |

----
#### Figure 1. 
Relationship between analysis workflows and datatypes.

![](https://i.imgur.com/keCW7UK.png)

----

## Characterizing intrahost allelic-variants

As of late January 2021 the NCBI sequence read archive contained 190,288 raw read SARS-CoV-2 datasets ([Fig. 2](#figure_2)). There are three primary types of data: (1) Illumina-based Ampliconic, (2) Oxford nanopore (ONT)-based Ampliconic, and (3) Illumina-based RNASeq. Illumina-based RNASeq is the most suitable experimental approach for accurate assessment of intra-host SARS-CoV-2 sequence variability—the main focus of our example application.  It avoids amplification biases characteristic of PCR-based enrichment approaches such as PrimalSeq13—a primary methodology used to generate Illumina- and ONT-based ampliconic datasets. However, because one of the key objectives of this study is to provide freely accessible workflows for the analysis of all types of SARS-CoV-2 sequence data we developed procedures for handling ampliconic data as well. Thus here we will describe two distinct analytical strategies: one for Illumina-based RNASeq data and another for Amplicon data. We have also developed workflows for the analysis of ONT data including AV analysis, for consensus sequence building from variants called with any of our upstream workflows, and for processing of direct RNA sequencing data.  These will be described in a separate report.

----

#### Figure 2. 
Counts of SRA datasets stratified by platform (Y-axis) and library strategy (X-axis).

![](https://i.imgur.com/EUDGnzP.png)

----

For each of the Illumina RNA-seq and Illumina ARTIC data generation approaches we initially identified the ten studies utilizing these approaches that yielded the largest numbers of individual read datasets ([Supplementary Table 1](#supplemental-table-1)). From these ten studies, we filtered out all those without associated publications.  Because metadata for SRA datasets are generally of low quality, associated publications reveal important information about the datasets such as, for example, which ARTIC primer set versions were used or how RNA was isolated. Of datasets with associated publications we settled on two ([PRJNA622837](https://www.ncbi.nlm.nih.gov/bioproject/PRJNA622837/) and [PRJEB37886](https://www.ncbi.nlm.nih.gov/bioproject/PRJEB37886/)), for subsequent analysis (see [Methods](#methods)). Whereas PRJNA622837 focused on the a[nalysis of SARS-CoV-2 transmission in the Boston area of the USA](https://science.sciencemag.org/content/early/2020/12/09/science.abe3261), PRJEB37886 is from the ongoing [UK genomic surveillance effort](https://science.sciencemag.org/content/early/2021/01/07/science.abf2946). While the entire PRJNA622837 dataset was gathered before September 2020, prior to emergence of N501Y lineages of concern (B.1.1.7, B.1.351 and P.1), the PRJEB37886 dataset contains samples isolated both before and after the emergence of these lineages. Since we were interested in determining whether signature mutations found in the N501Y lineages were detectable, and possibly detectably evolving under positive selection, in the datasets prior to the emergence of the N501Y lineages, we separated the PRJEB37886 dataset into a pre-N501Y lineage emergence dataset, hereafter called “COG-Pre” (containing accessions ERR4603708 - ERR4604210) and a post-N501Y lineage emergence dataset, hereafter called “COG-Post” (accessions ERR4859723 - ERR4861540).

We generated raw AV lists for all these datasets ([Table 2](#table_2)) by applying the Illumina RNAseq workflow (#2 in [Table 1](#table_1)) to the Boston dataset and the ARTIC workflow (#3 in [Table 1](#table_1)) to  the COG-Pre and COG-Post datasets.  Only AVs that both occurred at an allele frequency (AF) 5% or greater, and were supported by 10 or more reads were included (see [Methods](#methods)). After identifying AVs we used the reporting workflow to generate a final AV summary—a single dataset listing all AVs in all samples. For each AV, the report was richly annotated, including information on per strand counts and allele frequencies for all samples, and potential functional impacts of each AV. Reports can be accessed from Galaxy, GitHub, and Viral Beacon ([Table 2](#table_2)).

#### Table 2  

Allelic-variant (AV) counts pre/post filtering. AVs= number of all detected AVs; Sites = number of distinct variable sites across SARS-CoV-2 genome; Samples = number of samples in the corresponding dataset

| Dataset | Links | AVs | Sites | Samples |
|---------|-------|-----|-------|---------|
| "Boston" | Galaxy\|GitHub\|VB | 9,249/8,492 | 1,027/315 | 639 |
| "COG-Pre" | Galaxy\|GitHub\|VB | 7,338/4,761 | 2,747/287 | 503 |
| "COG-Post" | Galaxy\|GitHub\|VB | 38,919/38,813 | 5,760/1,795 | 1,818 |

Any set of AV calls unavoidably includes erroneous calls that need to be filtered out. We assumed that a fraction of AVs with low frequencies are random errors, modeled by a simple Poisson distribution with per-site error rate λ. We then tabulated, for each position in the genome, the number of samples that contained an AV with 0.05 ≤ AF ≤ 0.5, inferred λ using a closed form ML estimator (the mean of per-base counts), and plotted the observed number of genome positions with *N* = 0,1,2… AV ([Fig. S1](#figure_s1)). In all three datasets the point where the predicted Poisson distribution clearly diverged from the observed distribution (*N* = 3 for the Boston dataset, and *N* = 2 for the COG-Pre and COG-Post datasets) could be taken as the error-vs-real threshold ([Fig. S1](#figure_s1)). Applying these thresholds to the data reduced AV counts as shown in [Table 2](#table_2). 


When considering AVs with all AFs, the dominant patterns of co-occurrence were clade-segregating sites in the data, e.g. high frequency AVs that exist in strong linkage disequilibrium (e.g. the 241/3037/14408/24403/25563 set seen as thick vertical lines in Fig. 3A,B). A more interesting pattern was observed when we restricted our attention only to relatively common low frequency AVs (Fig. 3C) among which there were several groups that co-occured in multiple samples (all exclusively at low frequencies). A cluster of eight low frequency AVs was identified in eight samples (Table 4; the probability of this occurring by chance is < 10-8). No similar low AF clusters were detected in either the COG-pre or COG-post datasets, but a cluster of two medium AF AVs (9096:C→T, 29692:G→T) co-occurred three times (expected p < 0.01).

#### Table 4
A cluster of **eight** low frequency variants occured in 8 samples (the probability of this occurring by chance is < 10<sup>-8</sup>). These variants were 

|Nucleotide Variant|Sample count|Effect|
|------------------|------|--------------------|
| 4338:C&rarr;T    |  29   | nsp3/S540F        |
| 6604:A&rarr;G    | 54    | nsp3/L1295        |
| 9535:C&rarr;T    | 37   |  nsp4/T327                  |
| 12413:A&rarr;C    | 63     |  nsp8/N108H                  |
| 13755:A&rarr;C    | 53     |          RdRp/R105S          |
| 14304:A&rarr;C    |30     |     RdRp/K288N               |
| 17934:C&rarr;A    |30     |     helicase/T566               |
| 20716:A&rarr;T    |37     |     MethTr/M20L               |
| 26433:A&rarr;C    |35     |    E/K63N                |



Any newly identified AV set should be compared against a list of sites with known biological significance. In our analysis we selected two such site lists : (1) the signature or defining mutation sites found in the variants of concern, B.1.1.7, B.1.351 and P.1 (referred to hereafter as VOC sites); and (2) genomic sites detectably evolving under positive or negative selection in the global SARS-CoV-2 dataset (referred to hereafter as selected sites). 

The emergence of VOC starting with the B.1.1.7 lineage in the UK, raised intriguing questions about the genesis of this lineage, and a hypothesis that the variant arose in a chronically infected immunocompromised host19. We were interested in how many of the clade defining mutations20 were detectable at sub-consensus allele frequencies. Specifically, we analyzed the overlap between our data and five distinct mutation sets: B.1.1.7, P.1, B.1.351, A.23.1 as well as receptor-binding domain mutations identified by Greaney et al. 21 (Fig. 4). Very few N501Y lineage mutations are detectable in pre B.1.1.7 datasets (Fig. 4). The L18F mutation (P.1, gene S) is present in ~0.5% of Boston samples. It is completely absent in "COG-Pre", while in "COG-Post" it reaches fixation in ~40% of samples. On the other hand the population frequency of E92K (P.1, gene S) stays constant for "COG-Pre" and "COG-Post" samples at ~3%. Only two of the mutations reported by Greaney et al. 21 are observed at appreciable frequency. 

The selected sites list is continuously updated by the DataMonkey team using GISAID data as it accumulates (http://covid19.datamonkey.org). This list included all SARS-CoV-2 codon sites identified with FEL16 and MEME 17 methods to be evolving under positive or negative selection with a p≤0.0001 significance cutoff on Feb 01, 2021. Because selection analyses identify codons (not individual genome positions) responsible for potential selective amino acid changes, we considered all non-synonymous nucleotide substitutions with AFs< 80% that fell within the boundaries of codons with the signature of selection. There were two, three, and ten AVs overlapping with codons under selection in the Boston, COG-Pre, and COG-Pos" datasets, respectively (Table 5). The two sites in the Boston dataset are below the consensus (<50%) frequency. The identification of low frequency AVs at codon sites displaying evidence of positive selection could provide an early indication of AVs that are adaptive mutations and therefore warrant closer monitoring as the pandemic unfolds. 
Continuous analysis of pandemic data with the Galaxy API

Genome surveillance projects at national levels like COG-UK produce sequencing data for unprecedented numbers of samples. To demonstrate that our system can satisfy the analysis needs of such projects, we are performing near real-time analysis of COG-UK sequencing data as it is being submitted to the European Sequence Archive (ENA). We set up an automated analysis system that runs our ARTIC AV-calling workflow and the reporting workflow programmatically on all new COG-UK ARTIC paired-end data via Galaxy's openly accessible API. The system also handles data organization into Galaxy histories and exports of resulting datasets. The resulting AV information will be made available through the viral beacon project soon.






Exploratory analysis of AV data was then carried out in Jupyter and ObservableHQ notebooks (Table 3). For demonstration purposes we performed similar types of analysis in both Jupyter and ObservableHQ to highlight their utility. The notebooks include a number of data manipulation steps that calculate general descriptive statistics, plot the distributions of AVs across the genome and perform a variety of additional analyses that are important for contextualizing SARS-CoV-2 AVs. These additional analyses are briefly summarized below. 

## Methods



## Supplemental Tables

### Supplemental Table 1.

Top 10 SRA BioProjects for three experimental strategies. BioProject IDs with a hyperlink correspond to a study chosen for subsequent analysis (Illumina RNAseq = Illumina Paired RNAseq data; Illumina Amp = Illumina Paired Artic data; *N* = number of SRA datasets in a given BioProject)

| Illumina RNAseq   |    *N* | Illumina Amp   |      *N* |
|:-------------|-----:|:-------------|-------:|:-------------|------:|
| [PRJNA622837](https://science.sciencemag.org/content/early/2020/12/09/science.abe3261)  | 1,564 | [PRJEB37886](https://science.sciencemag.org/content/early/2021/01/07/science.abf2946)    | 104,984 | PRJEB37886   | 20968 |
| PRJNA612578  |  964 | PRJNA613958  |  14,860 | 
| PRJNA650245  |  617 | PRJNA614995  |   3,967 | 
| PRJNA610428  |   42 | PRJNA645906  |   2,286 |
| PRJEB38546   |   26 | PRJNA639066  |   1,931 | 
| PRJNA634356  |   25 | PRJNA625551  |   1,163 |
| PRJNA650134  |   22 | PRJNA656534  |    567 | 
| PRJNA661544  |   15 | PRJNA686984  |    543 | 
| PRJNA638211  |   10 | PRJEB38723   |    542 |
| PRJNA605983  |    9 | PRJEB42024   |    539 |

## Supplemental Figures 

#### Figure S1

Observed (red) versus predicted (orange) counts of samples sharing *N*=0, 1, 2, … varinants as a function of allelic-variant number for each dataset. The intersection of the lines gives the cutoff that was applied to each dataset.

**Boston**

<embed type="text/html" src="figs/thresholding_Boston.html" width="600" height="300"></embed>


