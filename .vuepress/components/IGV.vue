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
            default: "hg19"
        },
        tracks: {
            type: Array,
            default: [
                {
                    url: "https://data.broadinstitute.org/igvdata/test/igv-web/segmented_data_080520.seg.gz",
                    indexed: false,
                    isLog: true,
                    name: "Segmented CN"
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
                genome: this.genome,
                locus: this.locus,
                tracks: this.tracks
            };
            igv.createBrowser(this.$refs.igvdiv, options).then(function(browser) {
                console.log("IGV Loaded.");
            });
        });
    }
};
</script>
