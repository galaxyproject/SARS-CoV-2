---
title: RNA dependant RNA polymerase
---
# RNA dependant RNA polymerase (RdRp)

## Structure

RdRp is shaped like a cupped right hand with fingers, palm and thumb subdomains. The average length of the core RdRp domain is 500 amino acids. Active sites resemble other enzymes such as reverse transcriptase and DNA polymerase, indicating a  similar role in nucleotides transfer reactions ( enzymatic function : [2.7.1.68](https://www.genome.jp/dbget-bin/www_bget?ec:2.7.1.68) )
RdRp catalyzes RNA template dependent formation of phosphodiester bonds between ribonucleotide in presence of divalent metal ions.

Domains:
  - Palm: Junction of fingers and thumbs. Most of structurally conserved elements in the Palm domain are involved in catalysis. Contains: catalytic aspartate and the RNA Recognizing Motif (RRM).
  - Thumb: Harbor residues involved in packing against template RNA and stabilizing the initiating NTPs on the template. Unique C-terminus that folds back into the active site clift regulating RNA synthesis.
  - Fingers: Hold the template RNA in place and facilitate polymerization. Index, middle and pinky.

![](./nsp7-8-12-complex.jpg)

In addition of the RdRp domain, coronaviruses contain an Nidovirus RdRp-associated nucleotidyltransferase (NiRAN) specific to nidoviruses. This domain is linked to the RdRp domain by an interface domain.


### Motifs

RdRp Contains 7 structural motifs, A to G. They present a high similarity in structure and disposition across various groups of viruses.
A to E: Palm domain
F, G : Fingers


#### Motif A

<img src="https://latex.codecogs.com/svg.latex?&space;\beta"/>-strand, continues as helix/loop into the finger subdomain.

Contains a catalytic motif <img src="https://latex.codecogs.com/svg.latex?&space;DX_{2-4}D"/>

The first Aspartate is invariant in various RdRps. The second aspartate act with a conserved asparagine from B and plays a role in the discriminate of NTPs over dNTPs.

A conserved lysine replace the second Aspartate in RdRps of ss(-) RNA viruses, allowing them to use manganese instead of magnesium as cofactor.

In SARS-CoV : <img src="https://latex.codecogs.com/svg.latex?&space;612 - \text{PHLMGW\pmb{D}YPKC\pmb{D}RAM}"/>



#### Motif B

Assist the binding of template RNA and substrate discrimination.
Mainly a loop that connect a <img src="https://latex.codecogs.com/svg.latex?&space;\beta"/>-strand of fingers to N-terminal helix arrrising from the palm.
Conserved glycine at the junction of the loop and the helix: indispensable for polymerase function. Threonine within the <img src="https://latex.codecogs.com/svg.latex?&space;\alpha"/> helix facing the active so he conserved in most group IV and dsRNA viruses but absent in group V viruses.

In SARS-CoV : <img src="https://latex.codecogs.com/svg.latex?&space;678 - \text{GGTS\pmb{SG}DATTAYA\pmb{N}SVFNICQAVTANVNALLST}"/>



#### Motif C

Composed of one loop and one flanking <img src="https://latex.codecogs.com/svg.latex?&space;\beta"/>-strands.
The loop contains a conserved GDD motif essential for metal ions.
The C motif is juxtaposed with A motif and contribute to RRM. Conserved aspartates from GDD and first aspartate of <img src="https://latex.codecogs.com/svg.latex?&space;DX_{2-4}D"/>  align at the tip of the RRM, aiding on efficient catalysis.

In SARS-CoV : <img src="https://latex.codecogs.com/svg.latex?&space;753 - \text{FSMMIL\pmb{SDD}AVVCYN}"/>



#### Motif D

Composed of a  <img src="https://latex.codecogs.com/svg.latex?&space;\alpha"/>-helix and a flexible loop adjacent to the <img src="https://latex.codecogs.com/svg.latex?&space;\beta"/>-sheet of palm domain. Contains a conserved glycine. When an incorrect nucleotide is incorporated, the D motif is unable to achieve optimal conformation. The conserved lysine serves as general acid in the function of deprotonation of the pyrophosphate leaving group.

In SARS-CoV : <img src="https://latex.codecogs.com/svg.latex?&space;771 - \text{AAQGLVASIKN\pmb{F}KAV\pmb{LYY}QNNVFMSE}"/>


#### Motif E
<img src="https://latex.codecogs.com/svg.latex?&space;\beta"/> hairpin at the junction of palm and thumb subdomains. Termed as "primer grip" aid
the correct positioning of the 3' hydroxyl group of the primer for catalysis. An aromatic residue at the N-ter side faces C motif, residue the most conserved of the motif.


In SARS-CoV : <img src="https://latex.codecogs.com/svg.latex?&space;810 - \text{HE\pmb{FCS}QHTMLV}"/>


#### Motif F

Composed of a loop and a <img src="https://latex.codecogs.com/svg.latex?&space;\beta"/>-strand. Interacts with phosphate group of incoming NTPs. Made of positively charged residues that shields the negative charges of the phosphate groups of incoming NTP. Contains a conserved Arginine in the C-terminal region.


In SARS-CoV : <img src="https://latex.codecogs.com/svg.latex?&space;544 - \text{L\pmb{K}YAISA\pmb{K}N\pmb{R}ARTVAGV}"/>



#### Motif G

Compose a loop part of the template entrance tunnel in ss(+) RNA viruses and finger domains in dsRNA viruses. In segmented ss(-) RNA viruses, G is composed of a helix that interacts with the priming NTPs.

In SARS-CoV : <img src="https://latex.codecogs.com/svg.latex?&space;499 - \text{DK\pmb{SAGFP}FNKWG\pmb{K}}"/>



### Channels

Entry channels
Lined with positively charged residues, which favor entry of NTP and template RNA into the active site.
  - Nucleotide entry Channel: Entry of substrate and divalent cations. Participate in the release of pyrophosphate moiety after polymerization
  - Template channel: Template recognition and driving NTB toward the catalytic center. G motif line the entry of the template channel, and B forms the base.


RNA exit channel: Formed by both palm and thumb. Exit for the template and newly synthesized RNA.


### RdRp complexes

Most common; divalent metal ions. Crucial for polymerization: they coordinate the catalytic aspartate and facilitate the formation of phosphodiester bonds between NTP.
2 metal ions: 1 permanently bound, the other is weakly associated and stabilize at different stages of catalyses.


## References


Venkataraman, Sangita, Burra VLS Prasad, and Ramasamy Selvarajan. "RNA dependent RNA polymerases: insights from structure, function and evolution." Viruses 10.2 (2018): 76.


Gao, Yan, et al. "Structure of the RNA-dependent RNA polymerase from COVID-19 virus." Science (2020).

Xu, Xiang, et al. "Molecular model of SARS coronavirus polymerase: implications for biochemical functions and drug design." Nucleic acids research 31.24 (2003): 7117-7130.
