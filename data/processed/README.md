## Files

This directory contains processed variant lists:

| Files | Nicknames | Origin |
|-----|------------------|--------|
| boston_by_sample.tsv.gz <br>bos_by_var.tsv.gz| **"Boston"** | Entire PRJNA622837 |
|cog_pre_by_sample.tsv.gz <br>cog_pre_by_var.tsv.gz| **"COG-Pre"** | Pre B.1.1.7 portion of PRJEB37886 |
| cog_post_by_sample.tsv.gz <br>cog_pos_by_var.tsv.gz| **"COG-Post"** | Post B.1.1.7 portion of PRJEB37886 |

These are modified versions of files in `../var` directory. Files are modified by:

1. Adding annotation about sites under selection from `../selection/` directory.
2. Adding annotation about variants of concern (VOC) from `../voc/` directory.
3. Simplifying column names

The following two sections provide field (column) descriptions:

## Dataset `by_sample`

| Column          | Example            | Meaning |
|:----------------|:-------------------|---------|
| `Sample`          | ERR4603708         | SRA run ID |
| `POS`             | 240                | Position in [NC_045512.2](https://www.ncbi.nlm.nih.gov/nuccore/1798174254)|
| `FILTER`          | PASS               | Filter field from VCF|
| `REF`             | C                  | Reference base|
| `ALT`             | T                  | Alternative base|
| `DP`              | 56227              | Sequencing depth|
| `AF`              | 0.8663629999999999 | Alternative allele frequency|
| `SB`              | 1                  | Strand bias P-value from Fisher's exact test calculated by lofreq|
| `DP4`             | 4,6,18685,37216    | Depth for Forward Ref Counts, Reverse Ref Counts, Forward Alt Counts, Reverse Alt Counts|
| `IMPACT`          | .                  | Functional impact (from SNPEff)|
| `FUNCLASS`        | Non-coding         | Funclass for change (from SNPEff)|
| `EFFECT`          | .                  | Effect of change (from SNPEff)|
| `GENE`            | .                  | Gene name|
| `CODON`           | .                  | Codon|
| `AA`              | .                  | Amino acid|
| `TRID`            | .                  | Short name for the gene|
| `mAF`             | 0.000408           | Minimum Alternative Allele Freq across all samples containing this change<sup>1</sup>|
| `xAF`             | 1.0                | Maximum Alternative Allele Freq across all samples containing this change<sup>1</sup>|
| `unique_change`   | 4                  | Number of distinct types of changes at this site across all samples|
| `unique_funclass` | 1                  | Number of distinct types of `FUNCLASS` across all samples|
| `change`          | C>T                | The actual change at this site in this sample|
| `fel_p`           | nan                | FEL *p*-value for this codon in selection dataset|
| `meme_p`          | nan                | MEME *p*-value for this codon in selection dataset|
| `freq`            | nan                | frequency of changes in GISAID data (from selection dataset)|
| `B1351`           |                    | Does this site overlap with [B.1.351](https://cov-lineages.org/global_report_B.1.351.html) sites?|
| `P1`              |                    | Does this site overlap with [P.1](https://cov-lineages.org/global_report_P.1.html) sites?|
| `B117`            |                    | Does this site overlap with [B.1.1.7](https://cov-lineages.org/global_report_B.1.1.7.html) sites?|
| `BLOOM`           |                    | Does this site overlap with [BLOOM](https://www.biorxiv.org/content/10.1101/2020.12.31.425021v1) sites?|
| `A321`            |                    | Does this site overlap with [A.23.1](https://cov-lineages.org/global_report_A.23.1.html) sites?|
| `type`            | SNP                | SNP or Indel?|
| `samples`         | 405                | Number of distinct samples where this variant has AF > threshold (5%)|

## Dataset `by_variant`

| Column                          | Example                    | Meaning                      |
|:--------------------------|:----------------------|------------------------|
| POS                       | 348                   | See above |
| REF                       | A                     | See above |
| ALT                       | G                     | See above |
| IMPACT                    | LOW                   | See above |
| FUNCLASS                  | Synonymous            | See above |
| EFFECT                    | SYNONYMOUS_CODING     | See above |
| GENE                      | ORF1ab                | See above |
| CODON                     | gtA/gtG               | See above |
| AA                        | V28                   | See above |
| TRID                      | leader                | See above |
| all_samples               | 2                     | Number of samples (SRA accession) where this sample is present at *any* frequency |
| mAF                       | 0.001883              | See above |
| xAF                       | 0.26705300000000004   | See above |
| SAMPLES(above-thresholds) | ERR4604207            | SRA accession for samples where this variant is present at frequency above the threshold (5%) |
| SAMPLES(all)              | ERR4604207,ERR4604096 | SRA accession for samples where this variant is present at *any* frequency |
| AFs(all)                  | 0.267053,0.001883     | AF for all variants (at *any* frequency)
| change                    | A>G                   | See above |
| fel_p                     | nan                   | See above |
| meme_p                    | nan                   | See above |
| freq                      | nan                   | See above |
| B1351                     |                       | See above |
| P1                        |                       | See above |
| B117                      |                       | See above |
| BLOOM                     |                       | See above |
| A321                      |                       | See above |
| type                      | SNP                   | See above |
| samples                   | 1                     | See above |


 <sup>1</sup>All samples = including those where AF is below threshold set by Galaxy workflow (typically 5%)
