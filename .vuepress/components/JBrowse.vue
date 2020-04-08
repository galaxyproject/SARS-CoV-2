<template>
    <div>
        <iframe ref="jbframe" @load="load" frameborder="0" height="600" width="960" src="/jbrowse/index.html"></iframe>
    </div>
</template>
<script>
import ssr from "./jbrowse-data/ssr.json";
import trackList from "./jbrowse-data/trackList.json";
trackList.tracks = { ...trackList.tracks, ...ssr.tracks };
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
        defaultTracks: String
    },
    methods: {
        load() {
            const baseConfig = {
                include: [],
                defaultLocation: this.defaultLocation,
                refSeqs: this.refSeqs,
                defaultTracks: this.defaultTracks,
                aboutThisBrowser: {
                    title: "SARS-CoV-2 browser",
                    description: "TODO: Description."
                },
                GENERAL: {
                    classicMenu: false,
                    highResolutionMode: 4,
                    refSeqOrder: false
                }
            };
            this.$refs.jbframe.contentWindow.instantiateBrowserWithConfig({ ...baseConfig, ...trackList, ...ssr });
        }
    }
};
</script>
<style></style>
