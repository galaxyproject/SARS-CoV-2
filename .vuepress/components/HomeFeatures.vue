<template>
    <div>
        <div class="features">
            <RouterLink :to="'/genomics/'">
                <h2 class="title">Genomics</h2>
                <div class="h-feature">
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/gn.png')" />
                    </div>
                    <div class="h-feature-content">
                        <p>Global infrastructure for SARS-CoV-2 monitoring</p>
                        <ul>
                            <li>
                                <RouterLink :to="'/genomics/no-more-business-as-usual/'">
                                    PLoS Pathogens 2020
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="'/genomics/direct-rnaseq/'">Direct RNAseq</RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="'/evolution/'">Adaptive Evolution</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </RouterLink>

            <RouterLink :to="'/cheminformatics/'">
                <h2>Cheminformatics</h2>
                <div class="h-feature">
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/mp.png')" />
                    </div>
                    <div class="h-feature-content">
                        <h4>Screening of the main protease</h4>
                    </div>
                </div>
            </RouterLink>

            <RouterLink :to="'/proteomics/'">
                <h2>Proteomics</h2>
                <div class="h-feature">
                    <div class="h-feature-focus">
                        <img :src="$withBase('./img/pro.png')" />
                    </div>
                    <div class="h-feature-content">
                        <h4>Mass Spectrometry</h4>
                        <p>More text about mass spec</p>
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
