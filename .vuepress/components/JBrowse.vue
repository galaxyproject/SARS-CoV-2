<template>
    <div>
        <h1>Embedded JBrowse Component</h1>
        <div class="jbrowse" id="GenomeBrowser">
            <div id="LoadingScreen" style="padding: 50px;">
                <h1>Loading...</h1>
            </div>
        </div>
    </div>
</template>
<script>
//import "@gmod/jbrowse/dist/browser.bundle.js";
export default {
    mounted() {
        let jbrowseBundle = document.createElement("script");
        jbrowseBundle.type = "text/javascript";
        jbrowseBundle.src = "/jbrowse/browser.bundle.js";
        document.head.appendChild(jbrowseBundle);
    }
};
</script>
<style>
</style>
