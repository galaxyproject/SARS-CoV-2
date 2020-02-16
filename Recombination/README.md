# Recombinaton analysis

## Whats the point?

[Wu et al.](https://doi.org/10.1038/s41586-020-2008-3) showed recombination between COVID-19 and bat coronoviruses located within the *S*-gene. We wanted to confirm this observation and provide a publicly accessible workflow for recombination detecetion.

## Outline

We employed recombination detection algorithm developed by [Kosakovsky Pond et al.](http://mbe.oxfordjournals.org/cgi/content/full/23/10/1891) and implemented in `hyphy` package. To select a representative set of *S*-genes we performed a blast search of [NC_045512](https://www.ncbi.nlm.nih.gov/nuccore/NC_045512) against the `nr` database and represented results as a multiple sequence alignment:

![](blast_msa.png)