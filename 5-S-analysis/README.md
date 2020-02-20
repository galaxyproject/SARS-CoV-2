| usegalaxy.org | usegalaxy.org.au | usegalaxy.eu |
|:--------:|:------:|:------------:|
| [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org/u/aun1/h/ncov-intrasample-variation) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org/u/aun1/h/ncov-intrasample-variation) | [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.org/u/aun1/h/ncov-intrasample-variation) |
| [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) | [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) | [![Jupyter Notebook](https://img.shields.io/static/v1?label=Jupyter%20Notebook&message=run&color=blue)](variation_analysis.ipynb) |


# Alignment of COVID-19 Spike protein with homologs from other coronaviruses

## What's the point?

Aligning Spike protein sequences to detect structural variations and impact of polymorphisms.

## Outline

We generate a codon alignment for a set of coronaviruses in order to track polymorphisms uncovered by the analysis of [variation in individual samples](https://github.com/galaxyproject/SARS-CoV-2/tree/master/Variation).


## Input

Downloaded CDS sequences of coronavirus Spike proteins from [NCBI Viral Resource](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/virus?SeqType_s=Nucleotide&VirusLineage_ss=SARS-CoV-2,%20taxid:2697049) for the following coronaviruses:

```
FJ588692.1	Bat SARS Coronavirus Rs806/2006
KR559017.1	Bat SARS-like coronavirus BatCoV/BB9904/BGR/2008
KC881007.1	Bat SARS-like coronavirus WIV1
KT357810.1	MERS coronavirus isolate Riyadh_1175/KSA/2014
KT357811.1	MERS coronavirus isolate Riyadh_1337/KSA/2014
KT357812.1	MERS coronavirus isolate Riyadh_1340/KSA/2014
KF811036.1	MERS coronavirus strain Tunisia-Qatar_2013
AB593383.1	Murine hepatitis virus
AF190406.1	Murine hepatitis virus strain TY
AY687355.1	SARS coronavirus A013
AY687356.1	SARS coronavirus A021
AY687361.1	SARS coronavirus B029
AY687365.1	SARS coronavirus C013
AY687368.1	SARS coronavirus C018
AY648300.1	SARS coronavirus HHS-2004
DQ412594.1	SARS coronavirus isolate CUHKtc10NP
DQ412596.1	SARS coronavirus isolate CUHKtc14NP
DQ412609.1	SARS coronavirus isolate CUHKtc32NP
MN996528.1	nCov-2019
MN996527.1	nCov-2019
NC_045512.2	nCov-2019
NC_002306.3	Feline infectious peritonitis virus
NC_028806.1	Swine enteric coronavirus strain Italy/213306/2009
NC_038861.1	Transmissible gastroenteritis virus
```

## Output

We produce two alignments, one at the nucleotide and one at the amino acid level, of Betacoronavirus spike proteins. The alignments can be visualized with the `Multiple Sequence Alignment` visualization in Galaxy :

 ![Visualization of amino acid alignment in Galaxy](align_galaxy_viz.png)

Or with locally installed softwares, here [`AliView`](https://github.com/AliView/AliView).


| Alignments of Spike proteins |
|:-------------------------------:|
| ![Nucleic Alignment of Spike proteins](Spike_CDS_Alignment.png) |
| **A**. CDS alignments |
| ![Proteic Alignment of Spike proteins](Spike_Protein_Alignment.png) |
| **B**. Protein alignment |



## Workflow

The Galaxy history containing the latest analysis can be found [here](https://usegalaxy.org/u/delphinel/h/s-proteins-alignment). The publicly accessible [workflow](https://usegalaxy.org/u/delphinel/w/cov-alignment) can be downloaded and installed on any Galaxy instance. It contains all information about tool versions and parameters used in this analysis.

![Analysis Workflow](Workflow_snapshot.png)

The `Transeq` tool converts the CDS sequences into protein sequences, which we then align to each other using `MAFFT`. The output is fed into `tranalign` along with the nucleotide sequences. `tranalign` produces a nucleotide alignment coherent with the protein alignment.

## BioConda

Tools used in this analysis are also available from BioConda:

| Name | Link |
|------|----------------|
| `MAFFT` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/mafft/badges/version.svg)](https://anaconda.org/bioconda/mafft) |
| `EMBOSS:transeq and tranalign` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/emboss/badges/version.svg)](https://anaconda.org/bioconda/emboss) |
