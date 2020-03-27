<template>
    <div>
        <h1>Test JBrowse Component</h1>
          <iframe frameborder="0" height="600" width="960" src="/jbrowse/index.html"></iframe>
    </div>
</template>
<script>
//import "@gmod/jbrowse/dist/browser.bundle.js";
export default {
    mounted() {
      console.debug("Mounted, should be an iframe up there somewhere!");
      /*
        let jbrowseBundle = document.createElement("script");
        jbrowseBundle.type = "text/javascript";
        jbrowseBundle.src = "/jbrowse/browser.bundle.js";
        document.head.appendChild(jbrowseBundle);
        */
    }
};
</script>
<style>
</style>
