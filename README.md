
[![DOI](https://zenodo.org/badge/240286467.svg)](https://zenodo.org/badge/latestdoi/240286467)


# Initial analysis of COVID-19 data using Galaxy, BioConda and public research infrastructure (XSEDE, de.NBI-cloud)

[Dannon Baker](https://github.com/dannon),
[Marius Van Den Beek](https://github.com/mvdbeek), 
[John Chilton]( https://github.com/jmchilton), 
[Nate Coraor](https://github.com/natefoo), 
[Björn Grüning](https://github.com/bgruening),
[Delphine Larivière](https://github.com/Delphine-L), 
[Nicholas Keener](https://github.com/nickeener), 
[Sergei Kosakovsky](https://github.com/spond), 
[Wolfgang Maier](https://github.com/wm75),
[Anton Nekrutenko](https://github.com/nekrut), 
[James Taylor](https://github.com/jxtx), 
[Steven Weaver](https://github.com/stevenweaver)

This repo serves as a companion to our study describing the analysis of early COVID-19 data. It contains descriptions of workflows and exact versions of all software used. The goals of this study were to:

 1. Underscore the importance of access to raw data
 2. Demonstrate that existing community efforts in curation and deployment of biomedical software can reliably support rapid reproducible research during global crises 

Our analysis was divided into six parts listed below. Each part has a dedicated page that provides links to input datasets, intermediate and final results, workflows, and Galaxy histories that list all details for each analysis. These workflows can be re-run by anyone on two global Galaxy instances in the [US](http://usegalaxy.org) and in [Europe](http://usegalaxy.eu).

  1. [Pre-processing of raw read data](https://github.com/galaxyproject/SARS-CoV-2/tree/master/1-PreProcessing)
  2. [Assembly of COVID-19 genome](https://github.com/galaxyproject/SARS-CoV-2/tree/master/2-Assembly)
  3. [Estimation of timing for most common recent ancestor (MCRA)](https://github.com/galaxyproject/SARS-CoV-2/tree/master/3-MCRA)
  4. [Analysis of variation within individual isolates](https://github.com/galaxyproject/SARS-CoV-2/tree/master/4-Variation)
  5. [Analysis of Spike protein substitutions](https://github.com/galaxyproject/SARS-CoV-2/tree/master/5-S-analysis)
  6. [Analysis of recombination and selection](https://github.com/galaxyproject/SARS-CoV-2/tree/master/6-RecombinationSelection)

 The analyses have been performed using the [Galaxy](http://galaxyproject.org) platform and open source tools from [BioConda](https://bioconda.github.io/). Tool runs used [XSEDE](https://www.xsede.org/) resources maintained by the Texas Advanced Computing Center ([TACC](https://www.tacc.utexas.edu/)), Pittsburgh Supercomputing Center ([PSC](https://www.psc.edu/)), and [Indiana University](https://jetstream-cloud.org/) in the U.S., and [de.NBI](https://www.denbi.de/) cloud resources on the European side.

 <p align="center">
  <a href="https://galaxyproject.org">  <img src="img/galaxy_logo.png" width= "22%" alt="Galaxy Project" /></a> &nbsp; 
  <a href="https://galaxyproject.eu">  <img src="https://raw.githubusercontent.com/usegalaxy-eu/branding/master/galaxy-eu/galaxy-eu.256.png" width= "20%" alt="European Galaxy Project" /></a> &nbsp; 
  <a href="https://bioconda.org">       <img src="img/bioconda_logo.png" width="20%" alt="bioconda" /></a> &nbsp; 
  <a href="https://xsede.org">          <img src="img/xsede_logo.png" width="20%" alt="XSEDE" /></a> &nbsp;
  <a href="https://www.tacc.utexas.edu"><img src="img/tacc_logo.png" width="20%" alt="TACC" /></a> &nbsp;
  <a href="https://www.denbi.de"><img src="img/denbi-logo-color.svg" width="20%" alt="de.NBI" /></a> &nbsp;
  <a href="https://www.psc.edu">        <img src="img/psc_logo.jpg" width="20%" alt="PSC" /></a> &nbsp;
  <a href="https://www.iu.edu">         <img src="img/iu_logo.jpg" width="20%" alt="Indiana Univeristy" /></a> &nbsp;
</p>
