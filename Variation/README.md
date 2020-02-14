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

### Worlflow

1. GenBank file for the reference SARS-CoV-2 [genome](https://www.ncbi.nlm.nih.gov/nuccore/NC_045512). The GenBank record is used by `snpeff` to generate a database for variant annotation.
2. Set illumina reads (in this case a collection of unfiltered reads from `SRR10903401`, `SRR10903402`, and `SRR10971381`)

### Jupyter notebook

Jupyter notebook requires GenBank file (#1 above) and the output of the workflow described below. 

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

here most fields names are descriptive. **SB** = the Phred-scaled probability of strand bias as calculated by [lofreq](https://csb5.github.io/lofreq/) (0 = no strand bias); **DP4** = strand-specific depth for reference and alternative observations (Forward reference, reverse reference, forward alternative, reverse alternative).

The variants we identified were distributed across SARC-CoV-2 genome in the following way:

![](var_map.png)

<style  type="text/css" >
        
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 13.234985205768849%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 2.051986868244319%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 1.8839388064986602%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 5.5014734213985195%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 1.0265936057712506%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 42.125447878093134%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col6 {
            
                width:  10em;
            
                 height:  80%;
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 2.202029780517229%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 0.8531439991837659%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 100.0%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 2.721178256981496%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 9.3581764384614%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 2.6830673572641786%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 25.44247654829281%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 3.071978585875563%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 19.55239198410746%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 10.09398688024775%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 1.8560308248158959%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 2.810903918520697%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 2.458002988854813%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 0.23886831633847222%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 0.5998715632670967%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 4.622822127128359%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 4.811576110767676%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 7.889256327309613%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 0.7286083819972531%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 4.54810075681645%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 1.6330670571783537%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 5.556389127290405%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 7.6764954777066245%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 20.49436138735678%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 1.0896116289258733%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 0.9560734370029852%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 6.739027361825483%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 3.9347253314447967%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 2.1318096975735075%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 1.7519010436984985%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 2.721178256981496%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 5.561790672132227%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 1.7597032751366914%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 1.8992431835504957%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 3.5026017440988104%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 18.38745881322058%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 4.897400656587784%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 0.6148758544943881%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 8.341785750724707%, transparent 0%);
            
            }
        
            #T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col6 {
            
                width:  10em;
            
                 height:  80%;
            
                background:  linear-gradient(90deg,#d65f5f 0.30848822763310335%, transparent 0%);
            
            }
        
        </style>

        <table id="T_29470a9a_4f4b_11ea_97e6_02420aff003d" None>
        

        <thead>
            
            <tr>
                
                
                <th class="blank level0" >
                  
                
                
                
                <th class="col_heading level0 col0" colspan=1>
                  Sample
                
                
                
                <th class="col_heading level0 col1" colspan=1>
                  CHROM
                
                
                
                <th class="col_heading level0 col2" colspan=1>
                  POS
                
                
                
                <th class="col_heading level0 col3" colspan=1>
                  REF
                
                
                
                <th class="col_heading level0 col4" colspan=1>
                  ALT
                
                
                
                <th class="col_heading level0 col5" colspan=1>
                  DP
                
                
                
                <th class="col_heading level0 col6" colspan=1>
                  AF
                
                
                
                <th class="col_heading level0 col7" colspan=1>
                  SB
                
                
                
                <th class="col_heading level0 col8" colspan=1>
                  DP4
                
                
                
                <th class="col_heading level0 col9" colspan=1>
                  IMPACT
                
                
                
                <th class="col_heading level0 col10" colspan=1>
                  FUNCLASS
                
                
                
                <th class="col_heading level0 col11" colspan=1>
                  EFFECT
                
                
                
                <th class="col_heading level0 col12" colspan=1>
                  GENE
                
                
                
                <th class="col_heading level0 col13" colspan=1>
                  CODON
                
                
                
                <th class="col_heading level0 col14" colspan=1>
                  type
                
                
            </tr>
            
        </thead>
        <tbody>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row0" rowspan=1>
                    1
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col0"
                 class="data row0 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col1"
                 class="data row0 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col2"
                 class="data row0 col2" >
                    1821
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col3"
                 class="data row0 col3" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col4"
                 class="data row0 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col5"
                 class="data row0 col5" >
                    95
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col6"
                 class="data row0 col6" >
                    0.094737
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col7"
                 class="data row0 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col8"
                 class="data row0 col8" >
                    49,37,5,4
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col9"
                 class="data row0 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col10"
                 class="data row0 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col11"
                 class="data row0 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col12"
                 class="data row0 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col13"
                 class="data row0 col13" >
                    gGt/gAt
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow0_col14"
                 class="data row0 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row1" rowspan=1>
                    7
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col0"
                 class="data row1 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col1"
                 class="data row1 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col2"
                 class="data row1 col2" >
                    5210
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col3"
                 class="data row1 col3" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col4"
                 class="data row1 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col5"
                 class="data row1 col5" >
                    87
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col6"
                 class="data row1 col6" >
                    0.057471
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col7"
                 class="data row1 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col8"
                 class="data row1 col8" >
                    42,40,3,2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col9"
                 class="data row1 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col10"
                 class="data row1 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col11"
                 class="data row1 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col12"
                 class="data row1 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col13"
                 class="data row1 col13" >
                    Gca/Tca
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow1_col14"
                 class="data row1 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row2" rowspan=1>
                    8
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col0"
                 class="data row2 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col1"
                 class="data row2 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col2"
                 class="data row2 col2" >
                    5702
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col3"
                 class="data row2 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col4"
                 class="data row2 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col5"
                 class="data row2 col5" >
                    246
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col6"
                 class="data row2 col6" >
                    0.056911
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col7"
                 class="data row2 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col8"
                 class="data row2 col8" >
                    112,120,7,7
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col9"
                 class="data row2 col9" >
                    HIGH
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col10"
                 class="data row2 col10" >
                    NONSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col11"
                 class="data row2 col11" >
                    STOP_GAINED
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col12"
                 class="data row2 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col13"
                 class="data row2 col13" >
                    Cag/Tag
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow2_col14"
                 class="data row2 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row3" rowspan=1>
                    17
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col0"
                 class="data row3 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col1"
                 class="data row3 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col2"
                 class="data row3 col2" >
                    8976
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col3"
                 class="data row3 col3" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col4"
                 class="data row3 col4" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col5"
                 class="data row3 col5" >
                    58
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col6"
                 class="data row3 col6" >
                    0.068966
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col7"
                 class="data row3 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col8"
                 class="data row3 col8" >
                    28,26,2,2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col9"
                 class="data row3 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col10"
                 class="data row3 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col11"
                 class="data row3 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col12"
                 class="data row3 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col13"
                 class="data row3 col13" >
                    gAg/gGg
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow3_col14"
                 class="data row3 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row4" rowspan=1>
                    27
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col0"
                 class="data row4 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col1"
                 class="data row4 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col2"
                 class="data row4 col2" >
                    13075
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col3"
                 class="data row4 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col4"
                 class="data row4 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col5"
                 class="data row4 col5" >
                    111
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col6"
                 class="data row4 col6" >
                    0.054054
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col7"
                 class="data row4 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col8"
                 class="data row4 col8" >
                    48,57,3,3
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col9"
                 class="data row4 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col10"
                 class="data row4 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col11"
                 class="data row4 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col12"
                 class="data row4 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col13"
                 class="data row4 col13" >
                    tgT/tgC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow4_col14"
                 class="data row4 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row5" rowspan=1>
                    46
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col0"
                 class="data row5 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col1"
                 class="data row5 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col2"
                 class="data row5 col2" >
                    19164
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col3"
                 class="data row5 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col4"
                 class="data row5 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col5"
                 class="data row5 col5" >
                    89
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col6"
                 class="data row5 col6" >
                    0.191011
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col7"
                 class="data row5 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col8"
                 class="data row5 col8" >
                    34,38,8,9
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col9"
                 class="data row5 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col10"
                 class="data row5 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col11"
                 class="data row5 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col12"
                 class="data row5 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col13"
                 class="data row5 col13" >
                    gaC/gaT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow5_col14"
                 class="data row5 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row6" rowspan=1>
                    47
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col0"
                 class="data row6 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col1"
                 class="data row6 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col2"
                 class="data row6 col2" >
                    19229
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col3"
                 class="data row6 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col4"
                 class="data row6 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col5"
                 class="data row6 col5" >
                    79
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col6"
                 class="data row6 col6" >
                    0.050633
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col7"
                 class="data row6 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col8"
                 class="data row6 col8" >
                    41,34,2,2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col9"
                 class="data row6 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col10"
                 class="data row6 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col11"
                 class="data row6 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col12"
                 class="data row6 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col13"
                 class="data row6 col13" >
                    aTt/aCt
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow6_col14"
                 class="data row6 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row7" rowspan=1>
                    49
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col0"
                 class="data row7 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col1"
                 class="data row7 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col2"
                 class="data row7 col2" >
                    20235
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col3"
                 class="data row7 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col4"
                 class="data row7 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col5"
                 class="data row7 col5" >
                    69
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col6"
                 class="data row7 col6" >
                    0.057971
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col7"
                 class="data row7 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col8"
                 class="data row7 col8" >
                    36,28,2,2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col9"
                 class="data row7 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col10"
                 class="data row7 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col11"
                 class="data row7 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col12"
                 class="data row7 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col13"
                 class="data row7 col13" >
                    ccC/ccA
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow7_col14"
                 class="data row7 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row8" rowspan=1>
                    56
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col0"
                 class="data row8 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col1"
                 class="data row8 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col2"
                 class="data row8 col2" >
                    22270
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col3"
                 class="data row8 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col4"
                 class="data row8 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col5"
                 class="data row8 col5" >
                    187
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col6"
                 class="data row8 col6" >
                    0.053476
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col7"
                 class="data row8 col7" >
                    2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col8"
                 class="data row8 col8" >
                    80,97,3,7
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col9"
                 class="data row8 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col10"
                 class="data row8 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col11"
                 class="data row8 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col12"
                 class="data row8 col12" >
                    S
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col13"
                 class="data row8 col13" >
                    acT/acC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow8_col14"
                 class="data row8 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row9" rowspan=1>
                    60
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col0"
                 class="data row9 col0" >
                    SRR10903401
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col1"
                 class="data row9 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col2"
                 class="data row9 col2" >
                    24323
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col3"
                 class="data row9 col3" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col4"
                 class="data row9 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col5"
                 class="data row9 col5" >
                    310
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col6"
                 class="data row9 col6" >
                    0.383871
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col7"
                 class="data row9 col7" >
                    3
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col8"
                 class="data row9 col8" >
                    98,91,56,64
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col9"
                 class="data row9 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col10"
                 class="data row9 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col11"
                 class="data row9 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col12"
                 class="data row9 col12" >
                    S
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col13"
                 class="data row9 col13" >
                    Aaa/Caa
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow9_col14"
                 class="data row9 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row10" rowspan=1>
                    73
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col0"
                 class="data row10 col0" >
                    SRR10903402
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col1"
                 class="data row10 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col2"
                 class="data row10 col2" >
                    171
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col3"
                 class="data row10 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col4"
                 class="data row10 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col5"
                 class="data row10 col5" >
                    67
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col6"
                 class="data row10 col6" >
                    0.059701
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col7"
                 class="data row10 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col8"
                 class="data row10 col8" >
                    35,28,2,2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col9"
                 class="data row10 col9" >
                    .
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col10"
                 class="data row10 col10" >
                    .
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col11"
                 class="data row10 col11" >
                    .
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col12"
                 class="data row10 col12" >
                    .
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col13"
                 class="data row10 col13" >
                    .
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow10_col14"
                 class="data row10 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row11" rowspan=1>
                    126
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col0"
                 class="data row11 col0" >
                    SRR10903402
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col1"
                 class="data row11 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col2"
                 class="data row11 col2" >
                    10779
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col3"
                 class="data row11 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col4"
                 class="data row11 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col5"
                 class="data row11 col5" >
                    330
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col6"
                 class="data row11 col6" >
                    0.081818
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col7"
                 class="data row11 col7" >
                    1
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col8"
                 class="data row11 col8" >
                    126,177,10,17
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col9"
                 class="data row11 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col10"
                 class="data row11 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col11"
                 class="data row11 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col12"
                 class="data row11 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col13"
                 class="data row11 col13" >
                    cTa/cAa
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow11_col14"
                 class="data row11 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row12" rowspan=1>
                    132
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col0"
                 class="data row12 col0" >
                    SRR10903402
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col1"
                 class="data row12 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col2"
                 class="data row12 col2" >
                    11367
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col3"
                 class="data row12 col3" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col4"
                 class="data row12 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col5"
                 class="data row12 col5" >
                    235
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col6"
                 class="data row12 col6" >
                    0.059574
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col7"
                 class="data row12 col7" >
                    5
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col8"
                 class="data row12 col8" >
                    101,120,9,5
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col9"
                 class="data row12 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col10"
                 class="data row12 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col11"
                 class="data row12 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col12"
                 class="data row12 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col13"
                 class="data row12 col13" >
                    tAt/tTt
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow12_col14"
                 class="data row12 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row13" rowspan=1>
                    134
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col0"
                 class="data row13 col0" >
                    SRR10903402
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col1"
                 class="data row13 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col2"
                 class="data row13 col2" >
                    11563
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col3"
                 class="data row13 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col4"
                 class="data row13 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col5"
                 class="data row13 col5" >
                    384
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col6"
                 class="data row13 col6" >
                    0.135417
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col7"
                 class="data row13 col7" >
                    3
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col8"
                 class="data row13 col8" >
                    175,156,31,22
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col9"
                 class="data row13 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col10"
                 class="data row13 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col11"
                 class="data row13 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col12"
                 class="data row13 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col13"
                 class="data row13 col13" >
                    tgC/tgT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow13_col14"
                 class="data row13 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row14" rowspan=1>
                    146
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col0"
                 class="data row14 col0" >
                    SRR10903402
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col1"
                 class="data row14 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col2"
                 class="data row14 col2" >
                    13693
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col3"
                 class="data row14 col3" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col4"
                 class="data row14 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col5"
                 class="data row14 col5" >
                    345
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col6"
                 class="data row14 col6" >
                    0.06087
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col7"
                 class="data row14 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col8"
                 class="data row14 col8" >
                    183,141,12,9
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col9"
                 class="data row14 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col10"
                 class="data row14 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col11"
                 class="data row14 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col12"
                 class="data row14 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col13"
                 class="data row14 col13" >
                    Aca/Tca
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow14_col14"
                 class="data row14 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row15" rowspan=1>
                    319
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col0"
                 class="data row15 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col1"
                 class="data row15 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col2"
                 class="data row15 col2" >
                    2628
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col3"
                 class="data row15 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col4"
                 class="data row15 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col5"
                 class="data row15 col5" >
                    285
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col6"
                 class="data row15 col6" >
                    0.115789
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col7"
                 class="data row15 col7" >
                    3
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col8"
                 class="data row15 col8" >
                    131,109,17,19
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col9"
                 class="data row15 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col10"
                 class="data row15 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col11"
                 class="data row15 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col12"
                 class="data row15 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col13"
                 class="data row15 col13" >
                    cTt/cAt
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow15_col14"
                 class="data row15 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row16" rowspan=1>
                    346
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col0"
                 class="data row16 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col1"
                 class="data row16 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col2"
                 class="data row16 col2" >
                    4281
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col3"
                 class="data row16 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col4"
                 class="data row16 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col5"
                 class="data row16 col5" >
                    534
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col6"
                 class="data row16 col6" >
                    0.08427
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col7"
                 class="data row16 col7" >
                    21
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col8"
                 class="data row16 col8" >
                    184,300,9,39
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col9"
                 class="data row16 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col10"
                 class="data row16 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col11"
                 class="data row16 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col12"
                 class="data row16 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col13"
                 class="data row16 col13" >
                    gTa/gCa
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow16_col14"
                 class="data row16 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row17" rowspan=1>
                    368
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col0"
                 class="data row17 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col1"
                 class="data row17 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col2"
                 class="data row17 col2" >
                    6553
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col3"
                 class="data row17 col3" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col4"
                 class="data row17 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col5"
                 class="data row17 col5" >
                    88
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col6"
                 class="data row17 col6" >
                    0.056818
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col7"
                 class="data row17 col7" >
                    1
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col8"
                 class="data row17 col8" >
                    54,28,3,3
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col9"
                 class="data row17 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col10"
                 class="data row17 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col11"
                 class="data row17 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col12"
                 class="data row17 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col13"
                 class="data row17 col13" >
                    atG/atC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow17_col14"
                 class="data row17 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row18" rowspan=1>
                    369
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col0"
                 class="data row18 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col1"
                 class="data row18 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col2"
                 class="data row18 col2" >
                    6745
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col3"
                 class="data row18 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col4"
                 class="data row18 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col5"
                 class="data row18 col5" >
                    150
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col6"
                 class="data row18 col6" >
                    0.06
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col7"
                 class="data row18 col7" >
                    4
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col8"
                 class="data row18 col8" >
                    72,68,3,6
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col9"
                 class="data row18 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col10"
                 class="data row18 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col11"
                 class="data row18 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col12"
                 class="data row18 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col13"
                 class="data row18 col13" >
                    tgT/tgC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow18_col14"
                 class="data row18 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row19" rowspan=1>
                    370
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col0"
                 class="data row19 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col1"
                 class="data row19 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col2"
                 class="data row19 col2" >
                    6762
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col3"
                 class="data row19 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col4"
                 class="data row19 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col5"
                 class="data row19 col5" >
                    136
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col6"
                 class="data row19 col6" >
                    0.058824
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col7"
                 class="data row19 col7" >
                    1
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col8"
                 class="data row19 col8" >
                    56,72,4,4
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col9"
                 class="data row19 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col10"
                 class="data row19 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col11"
                 class="data row19 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col12"
                 class="data row19 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col13"
                 class="data row19 col13" >
                    aCt/aTt
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow19_col14"
                 class="data row19 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row20" rowspan=1>
                    376
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col0"
                 class="data row20 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col1"
                 class="data row20 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col2"
                 class="data row20 col2" >
                    7976
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col3"
                 class="data row20 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col4"
                 class="data row20 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col5"
                 class="data row20 col5" >
                    175
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col6"
                 class="data row20 col6" >
                    0.051429
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col7"
                 class="data row20 col7" >
                    1
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col8"
                 class="data row20 col8" >
                    95,68,5,5
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col9"
                 class="data row20 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col10"
                 class="data row20 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col11"
                 class="data row20 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col12"
                 class="data row20 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col13"
                 class="data row20 col13" >
                    Tta/Cta
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow20_col14"
                 class="data row20 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row21" rowspan=1>
                    390
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col0"
                 class="data row21 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col1"
                 class="data row21 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col2"
                 class="data row21 col2" >
                    9312
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col3"
                 class="data row21 col3" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col4"
                 class="data row21 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col5"
                 class="data row21 col5" >
                    266
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col6"
                 class="data row21 col6" >
                    0.052632
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col7"
                 class="data row21 col7" >
                    15
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col8"
                 class="data row21 col8" >
                    114,136,2,12
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col9"
                 class="data row21 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col10"
                 class="data row21 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col11"
                 class="data row21 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col12"
                 class="data row21 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col13"
                 class="data row21 col13" >
                    gGa/gAa
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow21_col14"
                 class="data row21 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row22" rowspan=1>
                    392
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col0"
                 class="data row22 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col1"
                 class="data row22 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col2"
                 class="data row22 col2" >
                    9464
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col3"
                 class="data row22 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col4"
                 class="data row22 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col5"
                 class="data row22 col5" >
                    106
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col6"
                 class="data row22 col6" >
                    0.066038
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col7"
                 class="data row22 col7" >
                    6
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col8"
                 class="data row22 col8" >
                    43,56,1,6
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col9"
                 class="data row22 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col10"
                 class="data row22 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col11"
                 class="data row22 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col12"
                 class="data row22 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col13"
                 class="data row22 col13" >
                    Ttt/Ctt
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow22_col14"
                 class="data row22 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row23" rowspan=1>
                    393
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col0"
                 class="data row23 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col1"
                 class="data row23 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col2"
                 class="data row23 col2" >
                    9502
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col3"
                 class="data row23 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col4"
                 class="data row23 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col5"
                 class="data row23 col5" >
                    60
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col6"
                 class="data row23 col6" >
                    0.066667
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col7"
                 class="data row23 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col8"
                 class="data row23 col8" >
                    30,26,2,2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col9"
                 class="data row23 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col10"
                 class="data row23 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col11"
                 class="data row23 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col12"
                 class="data row23 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col13"
                 class="data row23 col13" >
                    gcC/gcT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow23_col14"
                 class="data row23 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row24" rowspan=1>
                    394
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col0"
                 class="data row24 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col1"
                 class="data row24 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col2"
                 class="data row24 col2" >
                    9623
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col3"
                 class="data row24 col3" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col4"
                 class="data row24 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col5"
                 class="data row24 col5" >
                    52
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col6"
                 class="data row24 col6" >
                    0.076923
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col7"
                 class="data row24 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col8"
                 class="data row24 col8" >
                    28,20,2,2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col9"
                 class="data row24 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col10"
                 class="data row24 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col11"
                 class="data row24 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col12"
                 class="data row24 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col13"
                 class="data row24 col13" >
                    Gtt/Ttt
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow24_col14"
                 class="data row24 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row25" rowspan=1>
                    396
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col0"
                 class="data row25 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col1"
                 class="data row25 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col2"
                 class="data row25 col2" >
                    9919
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col3"
                 class="data row25 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col4"
                 class="data row25 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col5"
                 class="data row25 col5" >
                    245
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col6"
                 class="data row25 col6" >
                    0.053061
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col7"
                 class="data row25 col7" >
                    7
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col8"
                 class="data row25 col8" >
                    86,142,3,13
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col9"
                 class="data row25 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col10"
                 class="data row25 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col11"
                 class="data row25 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col12"
                 class="data row25 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col13"
                 class="data row25 col13" >
                    agT/agC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow25_col14"
                 class="data row25 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row26" rowspan=1>
                    397
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col0"
                 class="data row26 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col1"
                 class="data row26 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col2"
                 class="data row26 col2" >
                    10026
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col3"
                 class="data row26 col3" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col4"
                 class="data row26 col4" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col5"
                 class="data row26 col5" >
                    152
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col6"
                 class="data row26 col6" >
                    0.065789
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col7"
                 class="data row26 col7" >
                    11
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col8"
                 class="data row26 col8" >
                    76,63,3,9
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col9"
                 class="data row26 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col10"
                 class="data row26 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col11"
                 class="data row26 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col12"
                 class="data row26 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col13"
                 class="data row26 col13" >
                    cAa/cGa
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow26_col14"
                 class="data row26 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row27" rowspan=1>
                    402
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col0"
                 class="data row27 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col1"
                 class="data row27 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col2"
                 class="data row27 col2" >
                    10747
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col3"
                 class="data row27 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col4"
                 class="data row27 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col5"
                 class="data row27 col5" >
                    214
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col6"
                 class="data row27 col6" >
                    0.056075
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col7"
                 class="data row27 col7" >
                    2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col8"
                 class="data row27 col8" >
                    79,117,6,6
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col9"
                 class="data row27 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col10"
                 class="data row27 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col11"
                 class="data row27 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col12"
                 class="data row27 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col13"
                 class="data row27 col13" >
                    aaC/aaT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow27_col14"
                 class="data row27 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row28" rowspan=1>
                    408
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col0"
                 class="data row28 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col1"
                 class="data row28 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col2"
                 class="data row28 col2" >
                    11380
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col3"
                 class="data row28 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col4"
                 class="data row28 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col5"
                 class="data row28 col5" >
                    188
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col6"
                 class="data row28 col6" >
                    0.069149
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col7"
                 class="data row28 col7" >
                    2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col8"
                 class="data row28 col8" >
                    95,68,7,7
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col9"
                 class="data row28 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col10"
                 class="data row28 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col11"
                 class="data row28 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col12"
                 class="data row28 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col13"
                 class="data row28 col13" >
                    gcT/gcC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow28_col14"
                 class="data row28 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row29" rowspan=1>
                    420
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col0"
                 class="data row29 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col1"
                 class="data row29 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col2"
                 class="data row29 col2" >
                    12313
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col3"
                 class="data row29 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col4"
                 class="data row29 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col5"
                 class="data row29 col5" >
                    1194
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col6"
                 class="data row29 col6" >
                    0.076214
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col7"
                 class="data row29 col7" >
                    51
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col8"
                 class="data row29 col8" >
                    364,542,17,80
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col9"
                 class="data row29 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col10"
                 class="data row29 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col11"
                 class="data row29 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col12"
                 class="data row29 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col13"
                 class="data row29 col13" >
                    gcT/gcA
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow29_col14"
                 class="data row29 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row30" rowspan=1>
                    421
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col0"
                 class="data row30 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col1"
                 class="data row30 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col2"
                 class="data row30 col2" >
                    12313
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col3"
                 class="data row30 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col4"
                 class="data row30 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col5"
                 class="data row30 col5" >
                    1194
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col6"
                 class="data row30 col6" >
                    0.118928
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col7"
                 class="data row30 col7" >
                    67
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col8"
                 class="data row30 col8" >
                    364,542,30,128
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col9"
                 class="data row30 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col10"
                 class="data row30 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col11"
                 class="data row30 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col12"
                 class="data row30 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col13"
                 class="data row30 col13" >
                    gcT/gcC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow30_col14"
                 class="data row30 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row31" rowspan=1>
                    435
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col0"
                 class="data row31 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col1"
                 class="data row31 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col2"
                 class="data row31 col2" >
                    12842
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col3"
                 class="data row31 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col4"
                 class="data row31 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col5"
                 class="data row31 col5" >
                    258
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col6"
                 class="data row31 col6" >
                    0.054264
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col7"
                 class="data row31 col7" >
                    2
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col8"
                 class="data row31 col8" >
                    75,166,3,11
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col9"
                 class="data row31 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col10"
                 class="data row31 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col11"
                 class="data row31 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col12"
                 class="data row31 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col13"
                 class="data row31 col13" >
                    Tgg/Cgg
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow31_col14"
                 class="data row31 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row32" rowspan=1>
                    457
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col0"
                 class="data row32 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col1"
                 class="data row32 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col2"
                 class="data row32 col2" >
                    14263
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col3"
                 class="data row32 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col4"
                 class="data row32 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col5"
                 class="data row32 col5" >
                    576
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col6"
                 class="data row32 col6" >
                    0.053819
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col7"
                 class="data row32 col7" >
                    1
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col8"
                 class="data row32 col8" >
                    205,336,13,18
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col9"
                 class="data row32 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col10"
                 class="data row32 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col11"
                 class="data row32 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col12"
                 class="data row32 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col13"
                 class="data row32 col13" >
                    Ttc/Atc
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow32_col14"
                 class="data row32 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row33" rowspan=1>
                    463
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col0"
                 class="data row33 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col1"
                 class="data row33 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col2"
                 class="data row33 col2" >
                    14313
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col3"
                 class="data row33 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col4"
                 class="data row33 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col5"
                 class="data row33 col5" >
                    301
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col6"
                 class="data row33 col6" >
                    0.07309
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col7"
                 class="data row33 col7" >
                    21
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col8"
                 class="data row33 col8" >
                    109,158,3,20
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col9"
                 class="data row33 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col10"
                 class="data row33 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col11"
                 class="data row33 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col12"
                 class="data row33 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col13"
                 class="data row33 col13" >
                    gaT/gaC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow33_col14"
                 class="data row33 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row34" rowspan=1>
                    474
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col0"
                 class="data row34 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col1"
                 class="data row34 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col2"
                 class="data row34 col2" >
                    15298
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col3"
                 class="data row34 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col4"
                 class="data row34 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col5"
                 class="data row34 col5" >
                    251
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col6"
                 class="data row34 col6" >
                    0.063745
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col7"
                 class="data row34 col7" >
                    5
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col8"
                 class="data row34 col8" >
                    147,85,9,9
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col9"
                 class="data row34 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col10"
                 class="data row34 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col11"
                 class="data row34 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col12"
                 class="data row34 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col13"
                 class="data row34 col13" >
                    Cct/Tct
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow34_col14"
                 class="data row34 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row35" rowspan=1>
                    478
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col0"
                 class="data row35 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col1"
                 class="data row35 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col2"
                 class="data row35 col2" >
                    15909
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col3"
                 class="data row35 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col4"
                 class="data row35 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col5"
                 class="data row35 col5" >
                    433
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col6"
                 class="data row35 col6" >
                    0.057737
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col7"
                 class="data row35 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col8"
                 class="data row35 col8" >
                    129,259,9,17
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col9"
                 class="data row35 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col10"
                 class="data row35 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col11"
                 class="data row35 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col12"
                 class="data row35 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col13"
                 class="data row35 col13" >
                    ggT/ggC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow35_col14"
                 class="data row35 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row36" rowspan=1>
                    488
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col0"
                 class="data row36 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col1"
                 class="data row36 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col2"
                 class="data row36 col2" >
                    17462
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col3"
                 class="data row36 col3" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col4"
                 class="data row36 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col5"
                 class="data row36 col5" >
                    425
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col6"
                 class="data row36 col6" >
                    0.056471
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col7"
                 class="data row36 col7" >
                    34
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col8"
                 class="data row36 col8" >
                    186,207,3,23
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col9"
                 class="data row36 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col10"
                 class="data row36 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col11"
                 class="data row36 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col12"
                 class="data row36 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col13"
                 class="data row36 col13" >
                    cGc/cAc
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow36_col14"
                 class="data row36 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row37" rowspan=1>
                    513
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col0"
                 class="data row37 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col1"
                 class="data row37 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col2"
                 class="data row37 col2" >
                    19185
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col3"
                 class="data row37 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col4"
                 class="data row37 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col5"
                 class="data row37 col5" >
                    201
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col6"
                 class="data row37 col6" >
                    0.059701
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col7"
                 class="data row37 col7" >
                    0
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col8"
                 class="data row37 col8" >
                    88,98,7,7
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col9"
                 class="data row37 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col10"
                 class="data row37 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col11"
                 class="data row37 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col12"
                 class="data row37 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col13"
                 class="data row37 col13" >
                    tgC/tgT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow37_col14"
                 class="data row37 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row38" rowspan=1>
                    524
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col0"
                 class="data row38 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col1"
                 class="data row38 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col2"
                 class="data row38 col2" >
                    20238
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col3"
                 class="data row38 col3" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col4"
                 class="data row38 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col5"
                 class="data row38 col5" >
                    1200
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col6"
                 class="data row38 col6" >
                    0.069167
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col7"
                 class="data row38 col7" >
                    104
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col8"
                 class="data row38 col8" >
                    591,487,17,72
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col9"
                 class="data row38 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col10"
                 class="data row38 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col11"
                 class="data row38 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col12"
                 class="data row38 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col13"
                 class="data row38 col13" >
                    agG/agA
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow38_col14"
                 class="data row38 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row39" rowspan=1>
                    535
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col0"
                 class="data row39 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col1"
                 class="data row39 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col2"
                 class="data row39 col2" >
                    21108
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col3"
                 class="data row39 col3" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col4"
                 class="data row39 col4" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col5"
                 class="data row39 col5" >
                    177
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col6"
                 class="data row39 col6" >
                    0.056497
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col7"
                 class="data row39 col7" >
                    1
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col8"
                 class="data row39 col8" >
                    93,73,5,5
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col9"
                 class="data row39 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col10"
                 class="data row39 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col11"
                 class="data row39 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col12"
                 class="data row39 col12" >
                    orf1ab
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col13"
                 class="data row39 col13" >
                    ttC/ttT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow39_col14"
                 class="data row39 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row40" rowspan=1>
                    541
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col0"
                 class="data row40 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col1"
                 class="data row40 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col2"
                 class="data row40 col2" >
                    21872
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col3"
                 class="data row40 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col4"
                 class="data row40 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col5"
                 class="data row40 col5" >
                    158
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col6"
                 class="data row40 col6" >
                    0.056962
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col7"
                 class="data row40 col7" >
                    23
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col8"
                 class="data row40 col8" >
                    69,78,0,9
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col9"
                 class="data row40 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col10"
                 class="data row40 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col11"
                 class="data row40 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col12"
                 class="data row40 col12" >
                    S
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col13"
                 class="data row40 col13" >
                    Tgg/Agg
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow40_col14"
                 class="data row40 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row41" rowspan=1>
                    548
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col0"
                 class="data row41 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col1"
                 class="data row41 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col2"
                 class="data row41 col2" >
                    22618
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col3"
                 class="data row41 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col4"
                 class="data row41 col4" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col5"
                 class="data row41 col5" >
                    321
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col6"
                 class="data row41 col6" >
                    0.062305
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col7"
                 class="data row41 col7" >
                    4
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col8"
                 class="data row41 col8" >
                    138,144,9,14
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col9"
                 class="data row41 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col10"
                 class="data row41 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col11"
                 class="data row41 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col12"
                 class="data row41 col12" >
                    S
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col13"
                 class="data row41 col13" >
                    gcT/gcG
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow41_col14"
                 class="data row41 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row42" rowspan=1>
                    560
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col0"
                 class="data row42 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col1"
                 class="data row42 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col2"
                 class="data row42 col2" >
                    23434
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col3"
                 class="data row42 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col4"
                 class="data row42 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col5"
                 class="data row42 col5" >
                    1117
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col6"
                 class="data row42 col6" >
                    0.111907
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col7"
                 class="data row42 col7" >
                    36
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col8"
                 class="data row42 col8" >
                    391,557,31,96
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col9"
                 class="data row42 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col10"
                 class="data row42 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col11"
                 class="data row42 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col12"
                 class="data row42 col12" >
                    S
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col13"
                 class="data row42 col13" >
                    atT/atC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow42_col14"
                 class="data row42 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row43" rowspan=1>
                    598
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col0"
                 class="data row43 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col1"
                 class="data row43 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col2"
                 class="data row43 col2" >
                    26524
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col3"
                 class="data row43 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col4"
                 class="data row43 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col5"
                 class="data row43 col5" >
                    1165
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col6"
                 class="data row43 col6" >
                    0.066953
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col7"
                 class="data row43 col7" >
                    9
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col8"
                 class="data row43 col8" >
                    190,710,10,68
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col9"
                 class="data row43 col9" >
                    HIGH
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col10"
                 class="data row43 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col11"
                 class="data row43 col11" >
                    START_LOST
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col12"
                 class="data row43 col12" >
                    M
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col13"
                 class="data row43 col13" >
                    aTg/aAg
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow43_col14"
                 class="data row43 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row44" rowspan=1>
                    602
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col0"
                 class="data row44 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col1"
                 class="data row44 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col2"
                 class="data row44 col2" >
                    26526
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col3"
                 class="data row44 col3" >
                    G
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col4"
                 class="data row44 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col5"
                 class="data row44 col5" >
                    1044
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col6"
                 class="data row44 col6" >
                    0.052682
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col7"
                 class="data row44 col7" >
                    17
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col8"
                 class="data row44 col8" >
                    216,726,6,55
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col9"
                 class="data row44 col9" >
                    MODERATE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col10"
                 class="data row44 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col11"
                 class="data row44 col11" >
                    NON_SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col12"
                 class="data row44 col12" >
                    M
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col13"
                 class="data row44 col13" >
                    Gca/Aca
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow44_col14"
                 class="data row44 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row45" rowspan=1>
                    604
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col0"
                 class="data row45 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col1"
                 class="data row45 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col2"
                 class="data row45 col2" >
                    26528
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col3"
                 class="data row45 col3" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col4"
                 class="data row45 col4" >
                    C
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col5"
                 class="data row45 col5" >
                    204
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col6"
                 class="data row45 col6" >
                    0.078431
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col7"
                 class="data row45 col7" >
                    25
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col8"
                 class="data row45 col8" >
                    102,70,3,13
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col9"
                 class="data row45 col9" >
                    LOW
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col10"
                 class="data row45 col10" >
                    SILENT
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col11"
                 class="data row45 col11" >
                    SYNONYMOUS_CODING
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col12"
                 class="data row45 col12" >
                    M
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col13"
                 class="data row45 col13" >
                    gcA/gcC
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow45_col14"
                 class="data row45 col14" >
                    S
                
                
            </tr>
            
            <tr>
                
                
                <th id="T_29470a9a_4f4b_11ea_97e6_02420aff003d"
                 class="row_heading level0 row46" rowspan=1>
                    630
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col0"
                 class="data row46 col0" >
                    SRR10971381
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col1"
                 class="data row46 col1" >
                    NC_045512
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col2"
                 class="data row46 col2" >
                    27885
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col3"
                 class="data row46 col3" >
                    T
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col4"
                 class="data row46 col4" >
                    A
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col5"
                 class="data row46 col5" >
                    271
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col6"
                 class="data row46 col6" >
                    0.051661
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col7"
                 class="data row46 col7" >
                    11
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col8"
                 class="data row46 col8" >
                    156,97,6,10
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col9"
                 class="data row46 col9" >
                    HIGH
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col10"
                 class="data row46 col10" >
                    MISSENSE
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col11"
                 class="data row46 col11" >
                    STOP_LOST+SPLICE_SITE_REGION
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col12"
                 class="data row46 col12" >
                    ORF7b
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col13"
                 class="data row46 col13" >
                    Taa/Aaa
                
                
                
                <td id="T_29470a9a_4f4b_11ea_97e6_02420aff003drow46_col14"
                 class="data row46 col14" >
                    S
                
                
            </tr>
            
        </tbody>
        </table>

