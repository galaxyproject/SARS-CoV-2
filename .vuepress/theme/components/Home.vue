<template>
    <main class="home" aria-labelledby="main-title">
        <header class="hero">
            <h1 id="main-title">
                Best practices for the analysis of SARS-CoV-2 data: Genomics, Evolution, and Cheminformatics
            </h1>
            <p class="description">
                Using open source tools and public cyberinfrastructure for transparent, reproducible analyses of viral
                datasets.
            </p>
            <p class="shieldlist">
                <!-- not a list, but we want it aligned with the right side, which is, so apply the same style -->
                <a href="https://doi.org/10.5281/zenodo.3685264" target="_blank" rel="noopener noreferrer">
                    <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.3685264.svg" alt="DOI" />
                </a>
                Powered by:
                <FlatShield label="usegalaxy" message="org" href="https://usegalaxy.org" />
                <FlatShield label="usegalaxy" message="eu" href="https://usegalaxy.eu" />
                <FlatShield label="usegalaxy" message="be" href="https://usegalaxy.be" />
                <FlatShield label="usegalaxy" message="org.au" href="https://usegalaxy.org.au" />
                <FlatShield label="usegalaxy" message="fr" href="https://usegalaxy.fr" />
            </p>
        </header>
        <h1>Workflows</h1>
        <p>
            The goal of this resource is to provide publicly accessible infrastructure and workflows for SARS-CoV-2 data
            analyses. We currently feature three different types of analyses:
        </p>
        <div class="features">
            <div class="feature">
                <RouterLink :to="'/genomics/'">
                    <h2>Genomics</h2>
                    <h4>Assembly and intra-host variation</h4>
                    <img :src="$withBase('./img/gn.png')" />
                </RouterLink>
                <ul>
                    <li><RouterLink :to="'/genomics/2-Assembly/'">Assembly</RouterLink></li>
                    <li><RouterLink :to="'/genomics/3-MRCA/'">MRCA timing</RouterLink></li>
                    <li><RouterLink :to="'/genomics/4-Variation/'">Variation analysis</RouterLink></li>
                    <li>
                        <RouterLink :to="'/genomics/6-RecombinationSelection/'">Selection and recombination</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="feature">
                <RouterLink :to="'/evolution/'">
                    <h2>Evolution</h2>
                    <h4>Sites under selection</h4>
                    <img :src="$withBase('./img/evo.png')" />
                    <ul>
                        <li>Natural Selection Analysis</li>
                        <li>Analysis</li>
                        <li>Visualizations</li>
                        <li>Observable Notebooks</li>
                    </ul>
                </RouterLink>
            </div>

            <div class="feature">
                <RouterLink :to="'/cheminformatics/'">
                    <h2>Cheminformatics</h2>
                    <h4>Screening of the main protease</h4>
                    <img :src="$withBase('./img/mp.png')" />
                </RouterLink>
                <ul>
                    <li><RouterLink :to="'/cheminformatics/1-DockingPrep/'">Compound enumeration</RouterLink></li>
                    <li>
                        <RouterLink :to="'/cheminformatics/2-ActiveSitePrep/'"
                            >Generation of 3D conformations</RouterLink
                        >
                    </li>
                    <li><RouterLink :to="'/cheminformatics/3-Docking/'">Docking</RouterLink></li>
                    <li><RouterLink :to="'/cheminformatics/4-Scoring/'">Scoring</RouterLink></li>
                    <li>
                        <RouterLink :to="'/cheminformatics/5-Selection/'"
                            >Selection of compounds for synthesis</RouterLink
                        >
                    </li>
                </ul>
            </div>
        </div>
        <h1>Results</h1>
        <p>Each analysis section is continuously updated as new data becomes available. The main highlights are:</p>
        <div class="features">
            <div class="h-feature">
                <div class="h-feature-focus">
                    <RouterLink :to="'/genomics/'">
                        <h2>Genomics</h2>
                    </RouterLink>
                </div>
                <p>
                    There are many complete genomes but
                    only a handful of raw sequencing read datasets. We provide lists of raw read accessions for
                    <a
                        href="https://github.com/galaxyproject/SARS-CoV-2/blob/master/genomics/4-Variation/current_illumina.txt"
                        >Illumina</a
                    >
                    and
                    <a
                        href="https://github.com/galaxyproject/SARS-CoV-2/blob/master/genomics/4-Variation/current_gridion.txt"
                        >ONT</a
                    >. These lists are updated daily.
                    <strong>There are 4,899 distinct variable sites showing intra-host variation across 1,093 samples (with frequencies between 5% and
                    100%) from 28 studies representing 24 geographic locations.</strong> 
                    <a
                        href="https://github.com/galaxyproject/SARS-CoV-2/blob/master/genomics/4-Variation/variant_list.05.tsv"
                        >Variant lists</a
                    >
                    and
                    <a href="https://github.com/galaxyproject/SARS-CoV-2/tree/master/genomics/4-Variation">VCF files</a>
                    are updated as new data comes in. Intra-host polymorphisms may reveal
                    <RouterLink :to="'/genomics/5-S-analysis/'">sites</RouterLink> affecting the pathogenicity of the
                    virus.
                </p>
            </div>

            <div class="h-feature">
                <div class="h-feature-focus">
                    <RouterLink :to="'/evolution/'">
                        <h2>Evolution</h2>
                    </RouterLink>
                </div>
                <p>
                    Which positions in the SARS-CoV-2 genome may be subject to positive selection (involved in
                    adaptation), or negative selection (conserved during evolution)? We are using comparative
                    evolutionary techniques to run daily analyses identify potential candidates using genomes from
                    GISAID. <strong>At present, ~5 genomic positions may merit further investigation because they may be subject
                    to diversifying positive selection</strong>. See live results presented as continuously updated
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
                    Nonstructural proteins (nsps) vital for the life-cycle of SARS-CoV-2 are cleaved from a large
                    precursor (encoded by <i>ORF1ab</i>) by enzymes such as the main protease (Mpro). We performed
                    computational analyses (using protein-ligand docking) to identify potentially inhibitory compounds
                    that can bind to MPro and can be used to control viral proliferation. <strong>This work analyzed over 40,000
                    compounds considered to be likely to bind, which were chosen based on recently published X-ray
                    crystal structures, and identified 500 high scoring compounds</strong>. Workflows used for this analysis as
                    well as individual compound list can be accessed
                    <RouterLink :to="'/cheminformatics/Histories/'">here.</RouterLink>
                </p>
            </div>
        </div>

        <h2>Project Video Introduction</h2>
        <iframe
            width="960"
            height="540"
            src="https://www.youtube.com/embed/UKg9kpyQbzI"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
        <Content class="theme-default-content custom" />
    </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";

export default {
    name: "Home",

    components: { NavLink },

    computed: {
        data() {
            return this.$page.frontmatter;
        },

        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText
            };
        }
    }
};
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 2.2rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.4rem
      line-height 1.3
      color lighten($textColor, 20%)
      font-style: italic;
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    padding 1rem 0
    margin-top 2rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .h-feature
    display flex
    .h-feature-focus
      flex 30%
    img
      max-width: 100%
      display block
      margin 3rem auto 1.5rem
    h2
      font-size 1.6rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      flex 65%
      text-align left

  .feature
    flex-grow 1
    width 100%
    max-width 30%
    text-align center
    img
      max-width: 100%
      display block
      margin 3rem auto 1.5rem
    h2
      font-size 1.6rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p, ul
      text-align left
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
