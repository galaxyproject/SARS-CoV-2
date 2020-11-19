---
title: Nanopore direct RNAseq
---
# Evaluation of Nanopore direct RNAseq data in Galaxy

Powered by: <FlatShield label="usegalaxy" message="eu" href="https://usegalaxy.eu"/>

<!--
[Milad Miladi](https://github.com/mmiladi),
[Wolfgang Maier](https://github.com/wm75),
[Florian Heyl](https://github.com/heylf),
[Björn Grüning](https://github.com/bgruening)
-->

Direct RNA sequencing  (DRS) using Oxford Nanopore technologies enables direct sensing of native RNA molecules. The RNA modification detection workflows for DRS data utilize the electrical deviations in the signal to identify RNA modifications directly in vivo by comparing the signal  to unmodified  RNA samples that are transcribed in vitro.

Up to now, two different works have tackled understanding the scope of SARS-CoV-2 genomic and sub-genomic RNAs using Nanopore DRS ([Kim et al.](https://doi.org/10.1016/j.cell.2020.04.011) and [Taiaroa et al.](https://doi.org/10.1101/2020.03.05.976167) ). Here, we provide workflows for the methylation analysis of SARS-CoV-2 within Galaxy framework in a scalable and reproducible fashion. In this way, we can provide a consistent analysis of the two available datasets. Thanks to the scalable nature of the Galaxy workflows, we will be able to consistenly process upcoming DRS data as well.

  1. [Pre-processing of direct RNA data](1-preprocessing)
  2. [RNA methylation](2-epigenetics)


| description |   sample   |    URL    |
|:-----------:|:----------:|:---------:|
| Read mapping to viral genome | Fr1,Fr2,Fr3,Korean | <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/wolfgang-maier/w/sars-cov-2-assign-ont-reads-to-transcripts-mapping" alt="Galaxy workflow" /> |
| SARS-CoV-2: classify ONT reads by candidate junction regions | Fr1,Fr2,Fr3,Korean | <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/wolfgang-maier/w/sars-cov-2-classify-ont-reads-by-discovered-junctions" alt="Galaxy workflow" /> |
| SARS-CoV-2: classify ONT reads by confirmed junction sites | Fr1,Fr2,Fr3,Korean | <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/wolfgang-maier/w/sars-cov-2-classify-ont-reads-by-known-junctions" alt="Galaxy workflow" /> |
| Downsample reads to reduce coverage bias | | <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/wolfgang-maier/w/sars-cov-2-assigned-ont-reads-downsampling-and-coverage-analysis" alt="Galaxy workflow" /> |
| Nanocompore sampcomp modification detection for three samples as one condition | Fr-3, IVT | <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/milad/w/sars-cov-2-ont-nanocompore-sampcomp-3-replicates" alt="Galaxy workflow" /> |
| Tombo sample compare modification detection | All | <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/milad/w/sars-cov-2-ont-tombo-level-compare" alt="Galaxy workflow" /> |
| Map and downsample reads | IVT | <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/milad/w/sars-cov-2-ivt-reads-filter-sample-alignment-v2" alt="Galaxy workflow" /> |
| Variant analysis of isolates | Fr1,Fr2,Fr3 | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/wolfgang-maier/h/freiburg-drs-samples-variation" alt="Galaxy history" /> |
| Construction of the combined human/SARS-CoV-2 reference genome | Fr1,Fr2,Fr3 | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/wolfgang-maier/h/sars-cov-2human-combined-ont-reference" alt="Galaxy history" /> |
| Read mapping and sgRNA assignment | Fr1 | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/wolfgang-maier/h/sars-cov-2-map-ont-reads-to-transcripts-run3" alt="Galaxy history" /> |
| Read mapping and sgRNA assignment | Fr2 | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/wolfgang-maier/h/sars-cov-2-map-ont-reads-to-transcripts-290-5" alt="Galaxy history" /> |
| Read mapping and sgRNA assignment | Fr3 | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/wolfgang-maier/h/sars-cov-2-map-ont-reads-to-transcripts-291-13" alt="Galaxy history" /> |
| Read mapping and sgRNA assignment | Kr | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/wolfgang-maier/h/sars-cov-2-map-ont-reads-to-transcripts-kim-et-al" alt="Galaxy history" /> |
| Read mapping and sgRNA assignment | Au | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/milad/h/sars-cov-2-au---assign-ont-reads-to-transcripts-by-known-junctions" alt="Galaxy history" /> |
| Read mapping and sgRNA assignment | IVT | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/milad/h/sars-cov-2-ivt-alignment-processing-and-filtering-4k-sampling" alt="Galaxy history" /> |
| Nanopolish event alignment results | All | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/milad/h/sars-cov-2-nanopolish-collapse-results-data-4k" alt="Galaxy history" /> |
| Nanocompore modification results | Fr1, Fr2, Fr3 | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/milad/h/sars-cov-2-ont-nanocompore-sampcomp-3-replicates-4k" alt="Galaxy history" /> |
| Tombo modification results | All | <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/milad/h/sars-cov-2-tombo-re-squiggles-results-data-4k" alt="Galaxy history" /> |

