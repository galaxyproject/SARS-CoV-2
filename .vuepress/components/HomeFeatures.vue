<template>
    <div>
        <div class="features">
            <h2 class="title">Genomics</h2>

            <RouterLink :to="'/genomics/global_platform/'">
                <div class="h-feature">
                    <div class="h-feature-content">
                        <h3>
                            Global Platform<sup><font color="red">new</font></sup>
                        </h3>
                        <p>Freely accessible ready to use global infrastructure for SARS-CoV-2 monitoring</p>
                    </div>
                    <div class="h-feature-focus">
                        <img :src="$withBase('./genomics/global_platform/figs/fig2.png')" />
                    </div>
                </div>
            </RouterLink>

            <RouterLink :to="'/genomics/no-more-business-as-usual/'">
                <div class="h-feature">
                    <div class="h-feature-content">
                        <h3>PLoS Pathogens 2020</h3>
                        <p>
                            No more business as usual - Agile and effective responses to emerging pathogen threats require open data and open analytics
                        </p>
                    </div>
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/gn.png')" />
                    </div>
                </div>
            </RouterLink>

            <a href="https://observablehq.com/@spond/revised-sars-cov-2-analytics-page">
                <div class="h-feature">
                    <div class="h-feature-content">
                        <h3>Evolution</h3>
                        <p>The SARS-CoV-2 Selection Pressure Analyses</p>
                    </div>
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/evo.png')" />
                    </div>
                </div>
            </a>

            <RouterLink :to="'/artic/'">
                <div class="h-feature">
                    <div class="h-feature-content">
                        <h3>ARTIC</h3>
                        <p>Amplicon based data analysis</p>
                    </div>
                    <div class="h-feature-focus">
                        <img :src="$withBase('../img/artic.png')" />
                    </div>
                </div>
            </RouterLink>

            <RouterLink :to="'/direct-rnaseq/'">
                <div class="h-feature">
                    <div class="h-feature-content">
                        <h3>Direct RNA seq</h3>
                        <p>Analysis of SARS-CoV-2 transcription using Oxford Nanopore direct RNA sequencing.</p>
                    </div>
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/drna.png')" />
                    </div>
                </div>
            </RouterLink>

            <RouterLink :to="'/cheminformatics/'">
                <h2>Cheminformatics</h2>
                <div class="h-feature">
                    <div class="h-feature-content">
                        <p>Docking simulations on the SARS-CoV-2 main protease. A Galaxy workflow for performing and evaluating molecular docking on a massive scale, based on the set of fragment hits which are known experimentally to bind to the protein.</p>
                    </div>
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/mp.png')" />
                    </div>
                </div>
            </RouterLink>

            <RouterLink :to="'/proteomics/'">
                <h2>Proteomics</h2>
                <div class="h-feature">
                    <div class="h-feature-content">
                        <h4>Mass Spectrometry</h4>
                        <p>Galaxy workflows for analysis of Mass Spectrometry datasets from cell culture samples, clinical samples and protein-protein interaction datasets as well as functionality for performing metaproteomics analyses.</p>
                    </div>
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/pro.png')" />
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>
<script>
export default {
    name: "home-features"
};
</script>
