<template>
    <div>
        <div ref="igvdiv"></div>
    </div>
</template>
<script>
export default {
    props: {
        containerID: {
            type: String,
            default: "GenomeBrowser"
        },
        defaultLocation: {
            type: String
        },
        refSeqs: Object,
        tracks: Array,
        defaultTracks: String,
        title: String,
        description: String
    },
    mounted() {
        // This is stupid.
        window.global = window;
        import("igv").then(igv => {
            const options = {
                showNavigation: true,
                showRuler: true,
                genome: "hg19",
                locus: "chr7",
                tracks: [
                    {
                        url: "https://data.broadinstitute.org/igvdata/test/igv-web/segmented_data_080520.seg.gz",
                        indexed: false,
                        isLog: true,
                        name: "Segmented CN"
                    }
                ]
            };
            igv.createBrowser(this.$refs.igvdiv, options).then(function(browser) {
                console.log("IGV Loaded.");
            });
        });
    }
};
</script>