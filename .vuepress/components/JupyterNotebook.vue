<template>
    <div>
        <p>Jupyter Notebook!</p>
        <div v-html="notebookRender"></div>
    </div>
</template>
<script>
/*
Quick hack of what an ipython component could work like -- not functional yet.
*/
import nb from "notebookjs";
import axios from "axios";

export default {
    data: function() {
        return {
            notebookRaw: {}
        };
    },
    props: {
        notebookURL: {
            type: String,
            required: true
        }
    },
    computed: {
        notebookRender() {
            return nb.parse(this.notebookRaw);
        }
    },
    mounted() {
        // Do this elsewhere, but for now...
        axios.get(this.notebookURL).then(r => {
            this.notebookRaw = r.data;
        });
    }
};
</script>
<style></style>
