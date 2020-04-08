<template>
    <div class="nb-notebook" v-html="notebookHTML"></div>
</template>
<script>
import axios from "axios";
import "!!script-loader!notebookjs";
import "prismjs/prism";
import "prismjs/themes/prism.css";
import './ipython-style.styl'

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
            const nbParser = this.configureNotebookjs();
            this.notebookHTML = nbParser.parse(r.data).render().innerHTML;
        });
    },
    methods: {
        configureNotebookjs(){
            nb.ansi_up = require('ansi_up');
            nb.markdown = require('marked');

            nb.highlighter = ((text, pre, code, lang) => {
                var language = lang || 'text';
                pre.className = 'language-' + language;
                if (typeof code != 'undefined') {
                    code.className = 'language-' + language;
                }
                return this.defineHighlighter(text, language);
            });
            return nb;
        },
        defineHighlighter(code, lang) {
            if (typeof lang === 'undefined') lang = 'markup';

            if (!Prism.languages.hasOwnProperty(lang)) {
                try {
                    require('prismjs/components/prism-' + lang + '.js');
                } catch (e) {
                    console.warn('** failed to load Prism lang: ' + lang);
                    Prism.languages[lang] = false;
                }
            }

            return Prism.languages[lang] ? Prism.highlight(code, Prism.languages[lang]) : code;
        }
    }

}
</script>
