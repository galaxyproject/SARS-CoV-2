# Dating the most common recent ancestor (MCRA) of SARS-CoV-2

##  What's the point?


For this we used simple root-to-tip regression [Korber et al. 2000](https://www.ncbi.nlm.nih.gov/pubmed/10846155) (more complex and powerful phylodynamics methods could certainly be used, but for this data with very low levels of sequence divergence, simpler and faster methods suffice). Using a set of sequences from all COVID-19 sequences available as of Feb 16, 2020 we obtained an MCRA date of Nov 14, 2019, which is close to other existing estimates [Rambaut 2020](http://virological.org/t/phylodynamic-analysis-115-genomes-20-feb-2020/356).

## Outline

This analysis consists of two components - a Galaxy workflow and a Jupyter notebook. 

The workflow is used to extract full length sequences of SARS-CoV-2, tidy up their names in FASTA files, produce a multiple sequences alignment and compute a maximum likelihood tree.

The [Jupyter notebook](./MCRA_Estimation_Notebook.ipynb) is used to correlate branch lengths with collection dates in order to estimate MCRA timing.

## Inputs

One input is required: a comma-separated [file](acc_date.txt) containing accession numbers and collection dates:

```
Accession,Collection_Date
MT019531,2019-12-30
MT019529,2019-12-23
MT007544,2020-01-25
MN975262,2020-01-11
...
```

An up-to-date version of this file can be generated directly from the [NCBI Virus](https://www.ncbi.nlm.nih.gov/labs/virus/) resource by

1. searching for SARS-CoV-2 (NCBI taxid: 2697049) sequences
2. configuring the list of results to display only the `Accession` and `Collection date` columns
3. downloading the `Current table view result` in `CSV format`

The collection dates will be taken from the corresponding GenBank record's `/collection_date` tag. 

## Outputs



## History and workflow

A Galaxy workspace (history) containing the most current analysis can be imported from [here](https://usegalaxy.org/u/aun1/h/ncov-mcra-timing).

The publicly accessible [workflow](https://usegalaxy.org/u/aun1/w/mcra) can be downloaded and installed on any Galaxy instance. It contains version information for all tools used in this analysis. 

![](mcra_wf.png)


## BioConda

Tools used in this analysis are also available from BioConda:

| Name | Link |
|------|----------------|
| `picard` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/picard/badges/version.svg)](https://anaconda.org/bioconda/picard) |
| `mafft` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/mafft/badges/version.svg)](https://anaconda.org/bioconda/mafft) |
| `iqtree` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/iqtree/badges/version.svg)](https://anaconda.org/bioconda/iqtree) |

