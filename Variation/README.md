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

 Next we analyzed tab delimited data in a [Jupyter notebook](variation_analysis.ipynb).

## Inputs

1. GenBank file for the reference SARS-CoV-2 [genome](https://www.ncbi.nlm.nih.gov/nuccore/NC_045512). The GenBak=nk record is used by `snpeff` to generate a database for variant annotation.
2. Set illumina reads (in this case a collection of infiltered reads from `SRR10903401`, `SRR10903402`, and `SRR10971381`)

## Outputs

The worflow produces a table of varinats that looks like this:

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

