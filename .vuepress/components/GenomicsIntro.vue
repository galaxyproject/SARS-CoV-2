<template>
    <div class="features">
        <h1 style="text-align: center">
            Best practices for the analysis of SARS-CoV-2 data: Genomics, Proteomics, Evolution, and Cheminformatics
        </h1>
        <div class="feature">
            <RouterLink :to="'/genomics/'">
                <h2>Genomics</h2>
                <h4>Assembly and intra-host variation</h4>
                <img :src="'../img/gn.png'"/>
            </RouterLink>
            <ul>
                <li>
                    <RouterLink :to="'/genomics/2-Assembly/'">Assembly</RouterLink>
                </li>
                <li>
                    <RouterLink :to="'/genomics/3-MRCA/'">MRCA timing</RouterLink>
                </li>
                <li>
                    <RouterLink :to="'/genomics/4-Variation/'">Variation analysis</RouterLink>
                </li>
                <li>
                    <RouterLink :to="'/genomics/6-RecombinationSelection/'">Selection and recombination</RouterLink>
                </li>
            </ul>
        </div>

        <div class="feature">
            <RouterLink :to="'/evolution/'">
                <h2>Evolution</h2>
                <h4>Sites under selection</h4>
                <img :src="('../img/evo.png')"/>
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
                <img :src="('../img/mp.png')"/>
            </RouterLink>
            <ul>
                <li>
                    <RouterLink :to="'/cheminformatics/1-DockingPrep/'">Compound enumeration</RouterLink>
                </li>
                <li>
                    <RouterLink :to="'/cheminformatics/2-ActiveSitePrep/'"
                    >Generation of 3D conformations
                    </RouterLink
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
                    >Selection of compounds for synthesis
                    </RouterLink
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "genomics-intro"
    }
</script>

<style scoped lang="stylus">
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
</style>