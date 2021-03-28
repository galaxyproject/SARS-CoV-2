---
home: true
heroText: "Global platform for the analysis of SARS-CoV-2 data: Genomics, Cheminformatics, and Proteomics"
description: "Using open source tools and public cyberinfrastructure for transparent, reproducible analyses of viral datasets."
---
<p>
    The goal of this resource is to provide publicly accessible infrastructure
    and workflows for SARS-CoV-2 data analyses. We currently feature three
    different types of analyses:
</p>
<div class="features">
    <div class="feature">
    <RouterLink :to="'/genomics/'">
        <h2>Genomics</h2>
        <h4>Global infrastructure for SARS-CoV-2 monitoring</h4>
        <img :src="$withBase('./img/gn.png')" />
    </RouterLink>
    <ul>
        <li>
        <RouterLink :to="'/genomics/no-more-business-as-usual/'"
            >PLoS Pathogens 2020</RouterLink
        >
        </li>
        <li>
        <RouterLink :to="'/genomics/direct-rnaseq/'"
            >Direct RNAseq</RouterLink
        >
        </li>
        <li>
        <RouterLink :to="'/evolution/'">Adaptive Evolution</RouterLink>
        </li>
    </ul>
</div>

<div class="feature">
    <RouterLink :to="'/cheminformatics/'">
        <h2>Cheminformatics</h2>
        <h4>Screening of the main protease</h4>
        <img :src="$withBase('./img/mp.png')" />
    </RouterLink>
    <ul>
        <li>
        <RouterLink :to="'/cheminformatics/1-DockingPrep/'"
            >Compound enumeration</RouterLink
        >
        </li>
        <li>
        <RouterLink :to="'/cheminformatics/2-ActiveSitePrep/'"
            >Generation of 3D conformations</RouterLink
        >
        </li>
        <li>
        <RouterLink :to="'/cheminformatics/3-Docking/'">Docking</RouterLink>
        </li>
        <li>
        <RouterLink :to="'/cheminformatics/4-Scoring/'">Scoring</RouterLink>
        </li>
        <li>
        <RouterLink :to="'/cheminformatics/5-Selection/'"
            >Selection of compounds for synthesis</RouterLink
        >
        </li>
    </ul>
    </div>
    <div class="feature">
    <RouterLink :to="'/proteomics/'">
        <h2>Proteomics</h2>
        <h4>Mass Spectrometry</h4>
        <img :src="$withBase('./img/pro.png')" />
    </RouterLink>
    </div>
</div>

<h1>Results</h1>
<p>
    Each analysis section is continuously updated as new data becomes
    available. The main highlights are:
</p>
<div class="features">
    <div class="h-feature">
        <div class="h-feature-focus">
            <RouterLink :to="'/genomics/'">
                <h2>Genomics</h2>
            </RouterLink>
        </div>
        <p>
            There are many complete genomes but only a handful of raw sequencing
            read datasets. We provide lists of raw read accessions for
            <a
            href="https://github.com/galaxyproject/SARS-CoV-2/blob/master/genomics/4-Variation/current_illumina.txt"
            >Illumina</a
            >
            and
            <a
            href="https://github.com/galaxyproject/SARS-CoV-2/blob/master/genomics/4-Variation/current_gridion.txt"
            >ONT</a
            >. These lists are updated daily.
            <strong
            >There are 4,899 distinct variable sites showing intra-host
            variation across 1,093 samples (with frequencies between 5% and
            100%) from 28 studies representing 24 geographic locations.</strong
            >
            <a
            href="https://github.com/galaxyproject/SARS-CoV-2/blob/master/genomics/4-Variation/variant_list.05.tsv"
            >Variant lists</a
            >
            and
            <a
            href="https://github.com/galaxyproject/SARS-CoV-2/tree/master/genomics/4-Variation"
            >VCF files</a
            >
            are updated as new data comes in. Intra-host polymorphisms may reveal
            <RouterLink :to="'/genomics/5-Annotation/'">sites</RouterLink>
            affecting the pathogenicity of the virus.
        </p>
    </div>

<div class="h-feature">
    <div class="h-feature-focus"><RouterLink :to="'/evolution/'"><h2>Evolution</h2></RouterLink></div>
    <p>
        Which positions in the SARS-CoV-2 genome may be subject to positive
        selection (involved in adaptation), or negative selection (conserved
        during evolution)? We are using comparative evolutionary techniques to
        run daily analyses identify potential candidates using genomes from
        GISAID.
        <strong
        >At present, ~5 genomic positions may merit further investigation
        because they may be subject to diversifying positive
        selection</strong
        >. See live results presented as continuously updated
        <RouterLink :to="'/evolution/'">notebooks</RouterLink>.
    </p>
</div>

<div class="h-feature">
    <div class="h-feature-focus">
        <RouterLink :to="'/cheminformatics/'">
        <h2>Cheminformatics</h2>
        </RouterLink>
    </div>
        <p>
            Nonstructural proteins (nsps) vital for the life-cycle of SARS-CoV-2
            are cleaved from a large precursor (encoded by <i>ORF1ab</i>) by
            enzymes such as the main protease (Mpro). We performed computational
            analyses (using protein-ligand docking) to identify potentially
            inhibitory compounds that can bind to MPro and can be used to control
            viral proliferation.
            <strong
            >This work analyzed over 40,000 compounds considered to be likely to
            bind, which were chosen based on recently published X-ray crystal
            structures, and identified 500 high scoring compounds</strong
            >. Workflows used for this analysis as well as individual compound
            list can be accessed
            <RouterLink :to="'/cheminformatics/Histories/'">here.</RouterLink>
        </p>
    </div>
</div>

The analyses have been performed using the [Galaxy](http://galaxyproject.org) platform and open source tools from [BioConda](https://bioconda.github.io/). Tools were run using [XSEDE](https://www.xsede.org/) resources maintained by the Texas Advanced Computing Center ([TACC](https://www.tacc.utexas.edu/)),
Pittsburgh Supercomputing Center ([PSC](https://www.psc.edu/)), and [Indiana University](https://jetstream-cloud.org/) in the U.S., [de.NBI](https://www.denbi.de/), [VSC](https://www.vscentrum.be) cloud resources and [IFB](https://www.france-bioinformatique.fr/en/cluster) cluster resources on the European side, [STFC-IRIS](https://stfc.ukri.org/) at the Diamond Light Source, and [ARDC](https://ardc.edu.au) cloud resources in Australia.


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
  <a href="https://www.france-bioinformatique.fr/en">          <img src="./genomics/img/ifb.png" alt="IFB" width = "20%" /></a> &nbsp;
  <a href="http://galaxyp.org/">          <img src="./proteomics/img/galaxyp.png" alt="GalaxyP" width = "10%" /></a> &nbsp;
  </p>
