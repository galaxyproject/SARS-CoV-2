# Initial analysis of SARS-CoV-2 data using Galaxy, BioConda and XSEDE

[Marius Van Den Beek](https://github.com/mvdbeek), 
[John Chilton]( https://github.com/jmchilton), 
[Nate Coroar](https://github.com/natefoo), 
[Delphine LaRiviere](https://github.com/Delphine-L), 
[Nicholas Keener](https://github.com/nickeener), 
[Sergei Kosakovsky](https://github.com/spond), 
[Anton Nekrutenko](https://github.com/nekrut), 
[James Taylor](https://github.com/jxtx), 
[Steven Weaver](https://github.com/stevenweaver)

The is a companion to the manuscript describing the analysis of early SARS-CoV-2 data. It contains description of workflows and exact versions of all software used. 

It contains the following steps:

  1. [Pre-processing of raw read data](https://github.com/galaxyproject/SARS-CoV-2/tree/master/PreProcessing)
  2. [Assembly of SARS-CoV-2 genome](https://github.com/galaxyproject/SARS-CoV-2/tree/master/Assembly)
  3. Comparative analysis of SARS-CoV-2 and closely related coronaviruses
  4. [Estimation of timing for most common recent ancestor (MCRA)](https://github.com/galaxyproject/SARS-CoV-2/tree/master/MCRA)
  5. [Analysis of variation within individual isolates](https://github.com/galaxyproject/SARS-CoV-2/tree/master/Variation)
  6. [Analysis of Spike protein substitutions](https://github.com/galaxyproject/SARS-CoV-2/tree/master/Alignment)
  7. Analysis of recombination

  The analyses have been performed on [Galaxy](http://galaxyproject.org) platform using open source tools from [BioConda](https://bioconda.github.io/). All tools were run on [XSEDE](https://www.xsede.org/) resources maintained by the Texas Advanced Computing Center ([TACC](https://www.tacc.utexas.edu/)), Pittsburgh Supercomputing Center ([PSC](https://www.psc.edu/)), and [Indiana University](https://jetstream-cloud.org/).

 <p align="center">
  <a href="https://galaxyproject.org/"><img src="img/galaxy_logo.png" width= "22%" alt="Galaxy Project" /></a> &nbsp; 
  <a href="https://bioconda.org/">    <img src="img/bioconda_logo.png" width="20%" alt="bioconda" /></a> &nbsp; 
  <a href="https://xsede.org/">          <img src="img/xsede_logo.png" width="20%" alt="XSEDE" /></a> &nbsp;
  <a href="https://www.tacc.utexas.edu/"> <img src="img/tacc_logo.png" width="20%" alt="TACC" /></a> &nbsp;
  <a href="https://www.psc.edu/">          <img src="img/psc_logo.jpg" width="20%" alt="PSC" /></a> &nbsp;
  <a href="https://www.iu.edu/">            <img src="img/iu_logo.jpg" width="20%" alt="Indiana Univeristy" /></a> &nbsp;
</p>
