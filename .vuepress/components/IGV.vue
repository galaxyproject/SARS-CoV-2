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
                    format: "mut",
                    url: "/genomics/variant_list.05.mut",
                    name: "Mut test"
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
                    indexURL: "/genomics/wuhCor1.fasta.fai",
                    fastaURL: "/genomics/wuhCor1.fasta"
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
