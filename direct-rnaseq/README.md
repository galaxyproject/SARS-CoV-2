---
title: Nanopore direct RNAseq
---
# Evaluation of Nanopore direct RNAseq data in Galaxy

Powered by: <FlatShield label="usegalaxy" message="eu" href="https://usegalaxy.eu"/>

[Milad Miladi](https://github.com/mmiladi),
[Wolfgang Maier](https://github.com/wm75),
[Florian Heyl](https://github.com/heylf),
[Björn Grüning](https://github.com/bgruening)

Direct RNA sequencing  (DRS) using Oxford Nanopore technologies enables direct sensing of native RNA molecules. The RNA modification detection workflows for DRS data utilize the electrical deviations in the signal to identify RNA modifications directly in vivo by comparing the signal  to unmodified  RNA samples that are transcribed in vitro.

Uo to now, two different works have tackled understanding the scope of SARS-CoV-2 genomic and sub-genomic RNAs using Nanopore DRS ([Kim et al.](https://doi.org/10.1016/j.cell.2020.04.011) and [Taiaroa et al.](https://doi.org/10.1101/2020.03.05.976167) ). Here, we provide workflows for the methylation analysis of SARS-CoV-2 within Galaxy framework in a scalable and reproducible fashion. In this way, we can provide a consistent analysis of the two available datasets. Thanks to the scalable nature of the Galaxy workflows, we will be able to consistenly process upcoming DRS data as well.

  1. [Pre-processing of direct RNA data](1-preprocessing)
  2. [RNA methylation](2-methylation)
