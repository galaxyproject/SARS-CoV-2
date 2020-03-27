<template>
    <div>
        <h1>Test JBrowse Component</h1>
        <iframe ref="jbframe" @load="load" frameborder="0" height="600" width="960" src="/jbrowse/index.html"></iframe>
    </div>
</template>
<script>
//import "@gmod/jbrowse/dist/browser.bundle.js";
export default {
    methods: {
        load() {
            const features = [];
            // Add some features
            const config = {
                containerID: "GenomeBrowser",
                baseUrl: "/jbrowse/",
                refSeqs: {
                    url:
                        "https://s3.amazonaws.com/1000genomes/technical/reference/GRCh38_reference_genome/GRCh38_full_analysis_set_plus_decoy_hla.fa.fai"
                },
                tracks: [
                    {
                        key: "GRCH38 Reference Sequence",
                        label: "GRCH38 Reference Sequence",
                        urlTemplate:
                            "https://s3.amazonaws.com/1000genomes/technical/reference/GRCh38_reference_genome/GRCh38_full_analysis_set_plus_decoy_hla.fa"
                    },
                    {
                        key: "MyTrack",
                        label: "MyTrack",
                        storeClass: "JBrowse/Store/SeqFeature/FromConfig",
                        features: features,
                        type: "CanvasVariants"
                    }
                ]
            };
            this.$refs.jbframe.contentWindow.instantiateBrowserWithConfig(config);
        }
    }
};
</script>
<style></style>
