---
title: 'No more business as usual'
---


# No more business as usual - Agile and effective responses to emerging pathogen threats require open data and open analytics

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3685264.svg)](https://doi.org/10.5281/zenodo.3685264)

<p class="shieldlist">
Powered by:
<FlatShield label="usegalaxy" message="org" href="https://usegalaxy.org"/>
<FlatShield label="usegalaxy" message="eu" href="https://usegalaxy.eu"/>
<FlatShield label="usegalaxy" message="be" href="https://usegalaxy.be"/>
<FlatShield label="usegalaxy" message="org.au" href="https://usegalaxy.org.au"/>
<FlatShield label="usegalaxy" message="fr" href="https://usegalaxy.fr"/>
</p>

[Dannon Baker](https://github.com/dannon),
[Marius van den Beek](https://github.com/mvdbeek),
[Dave Bouvier](https://github.com/davebx),
[John Chilton](https://github.com/jmchilton),
[Nate Coraor](https://github.com/natefoo),
[Frederik Coppens](frederikcoppens),
[Bert Droesbeke](https://github.com/bedroesb),
[Ignacio Eguinoa](https://github.com/ieguinoa),
[Simon Gladman](https://github.com/slugger70),
[Björn Grüning](https://github.com/bgruening),
[Delphine Larivière](https://github.com/Delphine-L),
[Gildas Le Corguillé](https://github.com/lecorguille),
[Andrew Lonie](https://github.com/alonie),
[Nicholas Keener](https://github.com/nickeener),
[Sergei Kosakovsky Pond](https://github.com/spond),
[Wolfgang Maier](https://github.com/wm75),
[Anton Nekrutenko](https://github.com/nekrut),
[James Taylor](https://github.com/jxtx),
[Steven Weaver](https://github.com/stevenweaver)

This repo serves as a companion to our study describing the analysis of early COVID-19 data:

> [No more business as usual: agile and effective responses to emerging pathogen threats require open data and open analytics](https://doi.org/10.1371/journal.ppat.1008643). usegalaxy.org, usegalaxy.eu, usegalaxy.org.au, usegalaxy.be and hyphy.org development teams, Anton Nekrutenko, Sergei L Kosakovsky Pond. *Plos-Pathogens* August 13, 2020; doi: https://doi.org/10.1371/journal.ppat.1008643

It contains descriptions of workflows and exact versions of all software used. The goals of this study were to:

 1. Underscore the importance of access to raw data
 2. Demonstrate that existing community efforts in curation and deployment of biomedical software can reliably support rapid reproducible research during global crises

Our analysis was divided into six parts listed below (we also added "Updates" section where will be keeping track of new data as it appears). Each part has a dedicated page that provides links to input datasets, intermediate and final results, workflows, and Galaxy histories that list all details for each analysis. These workflows can be re-run by any of three global Galaxy instances in the [US](http://usegalaxy.org), in [Europe](http://usegalaxy.eu) and in [Australia](https://usegalaxy.org.au), as well as in the [ELIXIR Belgium](https://usegalaxy.be) Galaxy instance. *NOTE:* if you are analysing data generated using the ARTIC sequencing protocol look at the [ARTIC page](../../artic/README.md).

  1. [Pre-processing of raw read data](1-PreProcessing)
  2. [Assembly of SARS-CoV-2 genome](2-Assembly)
  3. [Estimation of timing for most recent common ancestor (MRCA)](3-MRCA)
  4. [Analysis of variation within individual isolates](4-Variation)
  5. [Functionnal annotation](5-annotation)
  6. [Analysis of recombination and selection](6-RecombinationSelection)


In addition we will be looking at newly released data here &#8594; [Updates: Analysis of additional data](updates)

 The analyses have been performed using the [Galaxy](http://galaxyproject.org) platform and open source tools from 
 [BioConda](https://bioconda.github.io/). Tool runs used [XSEDE](https://www.xsede.org/) resources maintained by the Texas Advanced Computing Center (
[TACC](https://www.tacc.utexas.edu/)), Pittsburgh Supercomputing Center ([PSC](https://www.psc.edu/)), and 
[Indiana University](https://jetstream-cloud.org/) in the U.S., [de.NBI](https://www.denbi.de/) and [VSC](https://www.vscentrum.be) 
cloud resources on the European side, and [ARDC](https://ardc.edu.au) cloud resources in Australia.

 <p align="center">
  <a href="https://galaxyproject.org">   <img src="../img/galaxy_logo.png" width= "22%" alt="Galaxy Project" /></a> &nbsp;
  <a href="https://galaxyproject.eu">    <img src="https://raw.githubusercontent.com/usegalaxy-eu/branding/master/galaxy-eu/galaxy-eu.256.png" width= "20%" alt="European Galaxy Project" /></a> &nbsp;
  <a href="https://usegalaxy-au.github.io/">    <img src="../img/galaxy_australia.png" width="20%" alt="Australian Galaxy Project" /></a> &nbsp;
  <a href="https://bioconda.org">        <img src="../img/bioconda_logo.png" width="20%" alt="bioconda" /></a> &nbsp;
  <a href="https://xsede.org">           <img src="../img/xsede_logo.png" width="20%" alt="XSEDE" /></a> &nbsp;
  <a href="https://www.tacc.utexas.edu"> <img src="../img/tacc_logo.png" width="20%" alt="TACC" /></a> &nbsp;
  <a href="https://www.denbi.de">        <img src="../img/denbi-logo-color.svg" width="20%" alt="de.NBI" /></a> &nbsp;
  <a href="https://elixir-europe.org">   <img src="../img/elixir_logo.png" width="15%" alt="ELIXIR" /></a> &nbsp;
  <a href="https://www.psc.edu">         <img src="../img/psc_logo.jpg" width="20%" alt="PSC" /></a> &nbsp;
  <a href="https://www.iu.edu">          <img src="../img/iu_logo.jpg" width="20%" alt="Indiana University" /></a> &nbsp;
  <a href="https://training.galaxyproject.org"> <img src="../img/gtn_logo.png" width="20%" alt="Galaxy Training Network" /></a> &nbsp;
  <a href="https://bioplatforms.com">    <img src="../img/bpa_logo.png" width="20%" alt="Bio Platforms Australia" /></a> &nbsp;
  <a href="https://ardc.ed.au">          <img src="../img/ardc_logo.png" width="20%" alt="Australian Research Data Commons" /></a> &nbsp;
  <a href="http://www.vib.be/">          <img src="../img/vib_tagline_pos_rgb.png" width="15%" alt="VIB" /></a> &nbsp;
  <a href="https://www.elixir-belgium.org">    <img src="../img/ELIXIR_BELGIUM_white_background.png" width="15%" alt="ELIXIR Belgium" /></a> &nbsp;
  <a href="https://www.vscentrum.be">          <img src="../img/VSC-logo.png" width="25%" alt="Vlaams Supercomputer Center" /></a> &nbsp;
  <a href="https://www.eosc-life.eu">          <img src="../img/eosclife.png" width="10%" alt="EOSC-Life" /></a> &nbsp;
  <a href="https://datamonkey.org">          <img src="../img/datamonkey.svg" alt="Datamonkey" width = "150px" /></a> &nbsp;
  <a href="https://www.france-bioinformatique.fr/en">          <img src="../img/ifb.png" alt="IFB" width = "20%" /></a> &nbsp;
</p>
