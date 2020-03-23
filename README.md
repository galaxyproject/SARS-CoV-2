---
home: true
---
# Best practices for the analysis of SARS-CoV-2 data: Genomics and Chemoinformatics

*Using open source tools and public cyberinfrastructure for transparent, reproducible analyses of viral datasets.*

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3685264.svg)](https://doi.org/10.5281/zenodo.3685264)

Powered by: [![usegalaxy.org](https://img.shields.io/static/v1?label=usegalaxy&message=org&color=green)](https://usegalaxy.org)
[![usegalaxy.eu](https://img.shields.io/static/v1?label=usegalaxy&message=eu&color=green)](https://usegalaxy.eu)
[![usegalaxy.be](https://img.shields.io/static/v1?label=usegalaxy&message=be&color=green)](https://usegalaxy.be)
[![usegalaxy.org.au](https://img.shields.io/static/v1?label=usegalaxy&message=org.au&color=green)](https://usegalaxy.org.au)

The goal of this resource is to provide publicly accessible infrastructure and workflows for SARS-CoV-2 data analyses. We currently feature two different projects:

| [Genomics](./genomics) | [Chemoinformatics](./cheminformatics) |
|-----------|----------------|
|[![](./img/gn.png)](./genomics)|[![](./img/mp.png)](./cheminformatics)|
|**Analysis of SARS-CoV-2 raw reads and genomes**<br> &#8226; [Assembly](genomics/2-Assembly/) <br> &#8226; [MRCA timing](genomics/3-MRCA/) <br>&#8226; [Variation analysis](genomics/4-Variation/) <br>&#8226; [Selection and recombination](genomics/6-RecombinationSelection/)   | **Virtual screening on the SARS-CoV-2 main protease**<br>&#8226; [Compound enumeration](cheminformatics/1-DockingPrep/) <br>&#8226; [Generation of 3D conformations](cheminformatics/2-ActiveSitePrep/) <br>&#8226; [Docking](cheminformatics/3-Docking/) <br>&#8226; [Scoring](cheminformatics/4-Scoring/) |

The analyses have been performed using the [Galaxy](http://galaxyproject.org) platform and open source tools from [BioConda](https://bioconda.github.io/). Tools were run using [XSEDE](https://www.xsede.org/) resources maintained by the Texas Advanced Computing Center ([TACC](https://www.tacc.utexas.edu/)),
Pittsburgh Supercomputing Center ([PSC](https://www.psc.edu/)), and [Indiana University](https://jetstream-cloud.org/) in the U.S., [de.NBI](https://www.denbi.de/) and [VSC](https://www.vscentrum.be) cloud resources on the European side, [STFC-IRIS](https://stfc.ukri.org/) at the Diamond Light Source, and [ARDC](https://ardc.edu.au) cloud resources in Australia.


 <p align="center">
  <a href="https://galaxyproject.org">   <img src="./genomics/img/galaxy_logo.png" width= "22%" alt="Galaxy Project" /></a> &nbsp;
  <a href="https://galaxyproject.eu">    <img src="https://raw.githubusercontent.com/usegalaxy-eu/branding/master/galaxy-eu/galaxy-eu.256.png" width= "20%" alt="European Galaxy Project" /></a> &nbsp;
  <a href="https://usegalaxy-au.github.io/">    <img src="./genomics/img/galaxy_australia.png" width="20%" alt="Australian Galaxy Project" /></a> &nbsp;
  <a href="https://bioconda.org">        <img src="./genomics/img/bioconda_logo.png" width="20%" alt="bioconda" /></a> &nbsp;
  <a href="https://xsede.org">           <img src="./genomics/img/xsede_logo.png" width="20%" alt="XSEDE" /></a> &nbsp;
  <a href="https://www.tacc.utexas.edu"> <img src="./genomics/img/tacc_logo.png" width="20%" alt="TACC" /></a> &nbsp;
  <a href="https://www.denbi.de">        <img src="./genomics/img/denbi-logo-color.svg" width="20%" alt="de.NBI" /></a> &nbsp;
  <a href="https://elixir-europe.org">   <img src="./genomics/img/elixir_logo.png" width="15%" alt="ELIXIR" /></a> &nbsp;
  <a href="https://www.psc.edu">         <img src="./genomics/img/psc_logo.jpg" width="20%" alt="PSC" /></a> &nbsp;
  <a href="https://www.iu.edu">          <img src="./genomics/img/iu_logo.jpg" width="20%" alt="Indiana University" /></a> &nbsp;
  <a href="https://training.galaxyproject.org"> <img src="./genomics/img/gtn_logo.png" width="20%" alt="Galaxy Training Network" /></a> &nbsp;
  <a href="https://bioplatforms.com">    <img src="./genomics/img/bpa_logo.png" width="20%" alt="Bio Platforms Australia" /></a> &nbsp;
  <a href="https://ardc.ed.au">          <img src="./genomics/img/ardc_logo.png" width="20%" alt="Australian Research Data Commons" /></a> &nbsp;
  <a href="http://www.vib.be/">          <img src="./genomics/img/vib_tagline_pos_rgb.png" width="15%" alt="VIB" /></a> &nbsp;
  <a href="https://www.elixir-belgium.org">          <img src="./genomics/img/ELIXIR_BELGIUM_white_background.png" width="15%" alt="ELIXIR Belgium" /></a> &nbsp;
  <a href="https://www.vscentrum.be">          <img src="./genomics/img/VSC-logo.png" width="25%" alt="Vlaams Supercomputer Center" /></a> &nbsp;
  <a href="https://www.eosc-life.eu">          <img src="./genomics/img/eosclife.png" width="10%" alt="EOSC-Life" /></a> &nbsp;
  <a href="https://datamonkey.org">          <img src="./genomics/img/datamonkey.svg" alt="Datamonkey" width = "150px" /></a> &nbsp;
  </p>
