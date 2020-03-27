<template>
    <div>
        <h1>Example JBrowse Component -- GRCH38 Reference Sequence</h1>
        <iframe ref="jbframe" @load="load" frameborder="0" height="600" width="960" src="/jbrowse/index.html"></iframe>
    </div>
</template>
<script>
export default {
    methods: {
        load() {
            const features = [];
            // Add some features
            const config = {
                containerID: "GenomeBrowser",
                defaultLocation: "chr1:187326438..187326472",
                refSeqs: {
                    url:
                        "https://s3.amazonaws.com/1000genomes/technical/reference/GRCh38_reference_genome/GRCh38_full_analysis_set_plus_decoy_hla.fa.fai"
                },
                defaultTracks: "GRCH38 Reference Sequence",
                tracks: [
                    {
                        key: "GRCH38 Reference Sequence",
                        label: "GRCH38 Reference Sequence",
                        urlTemplate:
                            "https://s3.amazonaws.com/1000genomes/technical/reference/GRCh38_reference_genome/GRCh38_full_analysis_set_plus_decoy_hla.fa"
                    },
                ]
            };
            this.$refs.jbframe.contentWindow.instantiateBrowserWithConfig(config);
        }
    }
};
</script>
<style></style>
