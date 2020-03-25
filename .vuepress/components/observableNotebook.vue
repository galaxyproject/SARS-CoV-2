<template>
    <div id="hotlinkedNotebookDock"></div>
</template>

<script>
export default {
    props: {
        notebookSource: {
            type: String,
            required: true
        }
    },
    mounted() {
        let notebookScript = document.createElement("script");
        notebookScript.type = 'module';
        notebookScript.async = true;
        notebookScript.innerHTML = `
        import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";

        // Your notebook, compiled as an ES module.
        import notebook from "https://api.observablehq.com/${this.notebookSource}.js?v=3";

        // Load the notebook, observing its cells with a default Inspector
        // that simply renders the value of each cell into the provided DOM node.
        new Runtime().module(notebook, Inspector.into(document.getElementById('hotlinkedNotebookDock')));
    `;
        document.head.appendChild(notebookScript);
    }
};
</script>
