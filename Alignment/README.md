# Alignment of COVID-19 Spike protein with other Coronaviruses spike proteins

## What's the point?

Aligning Spike protein sequences to detect structural variations and impact of polymorphisms.

## Outline

We generated a codon alignment for a set of coronovaruses in order to track polymorphism uncovered by the analysis of v[ariation in individual samples](https://github.com/galaxyproject/SARS-CoV-2/tree/master/Variation).


## Input

We downloaded CDS sequences of coronavirus Spike proteins from [NCBI Viral Resource](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/virus?SeqType_s=Nucleotide&VirusLineage_ss=SARS-CoV-2,%20taxid:2697049) for the following coronaviruses:

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
```

## Output

We produced two alignments, one nucleic and one amino acid, of Betacoronavirus spike proteins.

| Alignments of Spike proteins |
|:-------------------------------:|
| ![Nucleic Alignment of Spike proteins](Spike_CDS_Alignment.png) |
| **A**. CDS alignments |
| ![Proteic Alignment of Spike proteins](Spike_Protein_Alignment.png) |
| **B**. Protein alignment |

These alignment are visualized with the software [`AliView`](https://github.com/AliView/AliView)

They can also be visualized with the `Multiple Sequence Alignment` visualization in Galaxy

![Visualization of amino acid alignment in Galaxy](align_galaxy_viz.png)

## Workflow

The Galaxy history containing the latest analysis can be found [here](https://usegalaxy.org/u/delphinel/h/coronavirus-spike-proteins-alignments). The workfow for this analysis is available on the public Galaxy [usegalaxy.org](https://usegalaxy.org/u/delphinel/w/cov-alignment) and contain all information about tool versions and parameters.

![Analysis Workflow](Workflow_snapshot.png)

The first steps are used to sort the fasta files according to description, so that the sequence from same species are grouped together and the alignments are easier to read. This is done through the `FASTA-to-tabular` to transform the fasta file into a tabulated file containing the genome ID, the genome description, and the sequence. We then use the `Sort` tool to order the sequences alphabetically according to the genome description. The `Text reformating` tools allows us to use a `awk` command to transform the tabulated file back into a fasta file.
The `Transeq`  file converts the CDS sequences into proteic sequences. We use `MAFFT` to align these proteic sequences. The output is fed into `tranalign` along with the nucleic sequences. `tranalign` produces a nucleic alignment coherent with the proteic alignment.

## BioConda

Tools used in this analysis are also available from BioConda:

| Name | Link |
|------|----------------|
| `MAFFT` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/mafft/badges/version.svg)](https://anaconda.org/bioconda/mafft) |
| `EMBOSS:transeq and tranalign` | [![Anaconda-Server Badge](https://anaconda.org/bioconda/emboss/badges/version.svg)](https://anaconda.org/bioconda/emboss) |
