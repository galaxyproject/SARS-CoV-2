<template>
    <div>
        <p>Jupyter Notebook!</p>
        <div id="mainContent"></div>
    </div>
</template>
<script>

import "!!script-loader!notebookjs";
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
        axios.get(this.notebookURL).then(r => {
            this.notebookRaw = nb.parse(r.data).render();
            document.getElementById("mainContent").appendChild(this.notebookRaw);
        });
    }
};
</script>
<style></style>
