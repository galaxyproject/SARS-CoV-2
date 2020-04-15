<template>
    <div>
        <iframe ref="jbframe" @load="load" frameborder="0" height="650" width="100%" src="/jbrowse/index.html"></iframe>
    </div>
</template>
<script>
//import ssr from "./jbrowse-data/ssr.json";
//import trackList from "./jbrowse-data/trackList.json";
//trackList.tracks = { ...trackList.tracks, ...ssr.tracks };
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
    methods: {
        load() {
            const baseConfig = {
                include: [],
                defaultLocation: this.defaultLocation,
                refSeqs: this.refSeqs,
                defaultTracks: this.defaultTracks,
                /*
                aboutThisBrowser: {
                    title: this.title,
                    description: this.description,
                },
                GENERAL: {
                    classicMenu: false,
                    highResolutionMode: 4,
                    refSeqOrder: false
                }
                */
            };
            this.$refs.jbframe.contentWindow.instantiateBrowserWithConfig(baseConfig); // , ...trackList, ...ssr });
        }
    }
};
</script>
<style></style>
