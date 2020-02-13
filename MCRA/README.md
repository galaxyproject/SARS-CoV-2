# Dating the most common recent ancestor (MCRA) of SARS-CoV-2

----------------

## The methodology

To estimate the time of MCRA we use [methodology](https://doi.org/10.1093/bioinformatics/16.4.395) developed by [Andrew Rambaut](https://scholar.google.com/citations?user=JiYPDfoAAAAJ&hl=en&oi=ao).
It correlates an estimate of branch lengths (evolutionary rate) with isolation times of sequences used to contruct the tree.

-------------

## The outline

This analysis consists of two components - a Galaxy workflow and Jupyter notebook. 

The workflow is used to extract full length sequences of SARS-CoV-2, Bat-CoV, and SARS-CoV, tidy up their names in FASTA files, produce a multiple sequences alignemnt and compute a maximum likelyhood tree.

The Jupyter notebook is used to correlate branch lengths with collection dates in order to estimate the data of MCRA.

--------

## The inputs

One input is required: a comma-separated [file](acc_date.txt) containing accession numbers and collection dates:

```
Accession,Collection_Date
MT019531,2019-12-30
MT019529,2019-12-23
MT007544,2020-01-25
MN975262,2020-01-11
...
```

Such file can be obtained directly from viral resource at NCBI [Viral Resource](https://www.ncbi.nlm.nih.gov/labs/virus/). The collection times are taken from GenBank `/collection_date` tag. However, not all entries have such tag. In the case of the original SARS virus collection information had to be deducted from the submission time (e.g., see [here](https://www.ncbi.nlm.nih.gov/nucleotide/AY395003.1?report=genbank&log$=nuclalign&blast_rank=13&RID=4AX441XM016)), which may not be accurate. 
