<template>
    <div>
        <p>Jupyter Notebook!</p>
        <div v-html="notebookHTML"></div>
    </div>
</template>
<script>

import axios from "axios";
import "!!script-loader!notebookjs";

export default {
    data: function() {
        return {
            notebookRaw: null,
        };
    },
    props: {
        notebookURL: {
            type: String,
            required: true
        }
    },
    computed: {
        notebookHTML() {
            return this.notebookRaw === null ? "" : nb.parse(this.notebookRaw).render().innerHTML;
        }
    },
    mounted() {
        axios.get(this.notebookURL).then(r => {
            this.notebookRaw = r.data;
        });
    }
};
</script>
<style></style>
