<template>
    <div>
        <div ref="igvdiv"></div>
    </div>
</template>
<script>
export default {
    props: {
        locus: {
            type: String,
            default: "chr3"
        },
        showNavigation: {
            type: Boolean,
            default: true
        },
        showRuler: {
            type: Boolean,
            default: true
        },
        genome: {
            type: String,
            default: "hg38"
        },
        tracks: {
            type: Array,
            default: () => [
                {
                    type: "variant",
                    format: "vcf",
                    url:
                        "https://usegalaxy.org/display_application/bbd44e69cb8906b5f2777bc55853e839/igv_vcf/local_default/None/data/galaxy_bbd44e69cb8906b5f2777bc55853e839.vcf.gz",
                    indexURL:
                        "https://usegalaxy.org/display_application/bbd44e69cb8906b5f2777bc55853e839/igv_vcf/local_default/None/data/galaxy_bbd44e69cb8906b5f2777bc55853e839.vcf.gz.tbi",
                    name: "SARS-CoV-2 variant test"
                }
            ]
        }
    },
    mounted() {
        // This is stupid.
        window.global = window;
        import("igv").then(igv => {
            const options = {
                showNavigation: this.showNavigation,
                showRuler: this.showRuler,
                reference: {
                    id: "wuhCor1",
                    name: "SARS-CoV-2",
                    indexURL: "https://usegalaxy.org/datasets/bbd44e69cb8906b5bd1377fabf8242b3/display?to_ext=interval",
                    fastaURL: "https://usegalaxy.org/datasets/bbd44e69cb8906b541142e7127c4657b/display?to_ext=fasta"
                },
                tracks: this.tracks
            };
            igv.createBrowser(this.$refs.igvdiv, options).then(function(browser) {
                console.log("IGV Loaded.");
            });
        });
    }
};
</script>
