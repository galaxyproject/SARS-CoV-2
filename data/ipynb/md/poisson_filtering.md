
## Poisson estimation of allelic variant exclusion threshold and error rate


The initial dataset contains 13,037,198 variants distributed across 27,792 sites in 315,042 samples from 1,619 batches. Because we expect that some fraction of these variants are erroneous for each batch we compute allelic variant (AV) exclusion threshold (*T*) and error rate. *T* is the number of samples in a given batch a variant must be observed in. This logic comes from the assumption that a fraction of allelic variants with low frequencies are random errors, modeled by a simple Poisson distribution with per-site error rate λ. We tabulate, for each position in the genome, the number of samples that contained an AV with 0.05 ≤ AF ≤ 0.5, inferred λ using a closed form ML estimator (the mean of per-base counts), and plotted the observed number of genome positions with *N* = 0,1,2… and so on AVs.  We that compute the point where the predicted Poisson distribution diverges from the observed distribution, which gives us the *T* (for details see [this script](https://github.com/usegalaxy-eu/ena-cog-uk-wfs/blob/aggregate-observable-data/aggregator.py)). The distribution of error rates across analysis batches is shown below:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/poisson.json"/>
</div> 

### The filtered set

Using *T* value for each sample we then filtered allelic variants in every batch by removing all variants that have allele frequency below 50% and appear in less than *T* samples within this batch. 
