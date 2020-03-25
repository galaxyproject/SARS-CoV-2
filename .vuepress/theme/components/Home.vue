<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <h1 id="main-title">
        Best practices for the analysis of SARS-CoV-2 data: Genomics and Cheminformatics
      </h1>
      <p class="description">
        Using open source tools and public cyberinfrastructure for transparent, reproducible analyses of viral datasets.
      </p>
    </header>
    <div class="features">
      <p class="shields">
          <a href="https://doi.org/10.5281/zenodo.3685264" target="_blank" rel="noopener noreferrer"><img
              src="https://zenodo.org/badge/DOI/10.5281/zenodo.3685264.svg" alt="DOI">
          </a>
      </p>
      <p class="shields">
          Powered by:
          <a href="https://usegalaxy.org" target="_blank" rel="noopener noreferrer"><img
              src="https://img.shields.io/static/v1?label=usegalaxy&amp;message=org&amp;color=green" alt="usegalaxy.org">
          </a>
          <a href="https://usegalaxy.eu" target="_blank" rel="noopener noreferrer"><img
              src="https://img.shields.io/static/v1?label=usegalaxy&amp;message=eu&amp;color=green" alt="usegalaxy.eu">
          </a>
          <a href="https://usegalaxy.be" target="_blank" rel="noopener noreferrer"><img
              src="https://img.shields.io/static/v1?label=usegalaxy&amp;message=be&amp;color=green" alt="usegalaxy.be">
          </a>
          <a href="https://usegalaxy.org.au" target="_blank" rel="noopener noreferrer"><img
              src="https://img.shields.io/static/v1?label=usegalaxy&amp;message=org.au&amp;color=green" alt="usegalaxy.org.au">
          </a>
          <a href="https://usegalaxy.fr" target="_blank" rel="noopener noreferrer"><img
              src="https://img.shields.io/static/v1?label=usegalaxy&amp;message=fr&amp;color=green" alt="usegalaxy.fr">
          </a>
      </p>
      <p>
        The goal of this resource is to provide publicly accessible infrastructure and workflows for SARS-CoV-2 data analyses. We currently feature two different projects:
      </p>
      <Badge text="BADGE SAMPLE"/>
      <Shield text="SHIELD SAMPLE"/>
      <div class="feature">
        <RouterLink :to="'/genomics/'">
          <h2>Genomics</h2>
          <img :src="$withBase('./img/gn.png')">
        </RouterLink>
        <h4>Analysis of SARS-CoV-2 raw reads and genomes</h4>
        <p>
        <ul>
          <li><RouterLink :to="'/genomics/2-Assembly/'">Assembly</RouterLink></li>
          <li><RouterLink :to="'/genomics/3-MRCA/'">MRCA timing</RouterLink></li>
          <li><RouterLink :to="'/genomics/4-Variation/'">Variation analysis</RouterLink></li>
          <li><RouterLink :to="'/genomics/6-RecombinationSelection/'">Selection and recombination</RouterLink></li>
        </ul>
        </p>
      </div>
      <div class="feature">
        <RouterLink :to="'/cheminformatics/'">
          <h2>Cheminformatics</h2>
          <img :src="$withBase('./img/mp.png')">
        </RouterLink>
        <h4>Virtual screening on the SARS-CoV-2 main protease</h4>
        <p>
          <ul>
            <li><RouterLink :to="'/cheminformatics/1-DockingPrep/'">Compound enumeration</RouterLink></li>
            <li><RouterLink :to="'/cheminformatics/2-ActiveSitePrep/'">Generation of 3D conformations</RouterLink></li>
            <li><RouterLink :to="'/cheminformatics/3-Docking/'">Docking</RouterLink></li>
            <li><RouterLink :to="'/cheminformatics/4-Scoring/'">Scoring</RouterLink></li>
            <li><RouterLink :to="'/cheminformatics/5-Selection/'">Selection of compounds for synthesis</RouterLink></li>
          </ul>
        </p>
      </div>
    </div>
    <h2>Project Video Update</h2>
    <iframe src="https://player.vimeo.com/video/400035951" width="960" height="540" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
    <Content class="theme-default-content custom" />
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',

  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
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
    .shields
      line-height 20px
      img 
        vertical-align bottom
  .feature
    flex-grow 1
    width 100%
    max-width 45%
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
    p
      padding-left 1rem
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
