<template>
    <div class="nb-notebook" v-html="notebookHTML"></div>
</template>
<script>
import "!!script-loader!notebookjs";
import "./ipython-style.styl";
import "prismjs/themes/prism.css";
import Prism from "prismjs/prism";
import axios from "axios";
import ansi_up from "ansi_up";
import markdown from "marked";

function defineHighlighter(code, lang) {
    if (typeof lang === "undefined") lang = "markup";

    if (!Prism.languages.hasOwnProperty(lang)) {
        try {
            require("prismjs/components/prism-" + lang + ".js");
        } catch (e) {
            console.warn("** failed to load Prism lang: " + lang);
            Prism.languages[lang] = false;
        }
    }

    return Prism.languages[lang] ? Prism.highlight(code, Prism.languages[lang]) : code;
}

/* configure global 'nb' */
nb.ansi_up = ansi_up;
nb.markdown = markdown;

nb.highlighter = (text, pre, code, lang) => {
    var language = lang || "text";
    pre.className = "language-" + language;
    if (typeof code != "undefined") {
        code.className = "language-" + language;
    }
    return defineHighlighter(text, language);
};

export default {
    data: function() {
        return {
            notebookHTML: ""
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
            this.notebookHTML = nb.parse(r.data).render().innerHTML;
        });
    }
};
</script>
