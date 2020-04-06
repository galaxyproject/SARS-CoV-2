<template>
    <div class="nb-notebook" v-html="notebookHTML"></div>
</template>
<style src="./ipython-style.css"></style>

<script>

import axios from "axios";
import "!!script-loader!notebookjs";
import "prismjs/prism"

export default {
    data: function() {
        return {
            notebookHTML: "",
        };
    },
    props: {
        notebookURL: {
            type: String,
            required: true
        }
    },
    mounted() {
        axios.get(this.notebookURL).then(r => {
            nb.ansi_up = require('ansi_up');
            nb.markdown = require('marked');
            this.notebookHTML = nb.parse(r.data).render().innerHTML;
            this.$nextTick(function () {
                this.highlight()
            })
        });

    },
    methods: {
        highlight: function () {
            require('prismjs/components/prism-python.min');
            Prism.highlightAll();
        }
    }
};
</script>
<style></style>
