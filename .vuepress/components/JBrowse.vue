<template>
    <div>
        <h1>Example JBrowse Component -- GRCH38 Reference Sequence</h1>
        <iframe ref="jbframe" @load="load" frameborder="0" height="600" width="960" src="/jbrowse/index.html"></iframe>
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
    },
    methods: {
        load() {
            this.$refs.jbframe.contentWindow.instantiateBrowserWithConfig({
                defaultLocation: this.defaultLocation,
                refSeqs: this.refSeqs,
                defaultTracks: this.defaultTracks,
                tracks: this.tracks
            });
        }
    }
};
</script>
<style></style>
