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
                            No more business as usual: Agile and effective responses to emerging pathogen threats
                            require open data and open analytics
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
                        <p>Natural Selection Analysis and Visualizations</p>
                    </div>
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/evo.png')" />
                    </div>
                </div>
            </a>

            <RouterLink :to="'/cheminformatics/'">
                <h2>Cheminformatics</h2>
                <div class="h-feature">
                    <div class="h-feature-content">
                        <h4>Screening of the main protease</h4>
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
                        <p>More text about mass spec</p>
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
