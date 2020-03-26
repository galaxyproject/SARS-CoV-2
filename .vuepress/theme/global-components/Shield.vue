<template>
    <a class="shield" :href="href" v-html="getShieldSVG" target="_blank" rel="noopener noreferrer"> </a>
</template>

<script>
import { makeBadge } from "../util/ghShield.js";

export default {
    props: {
        leftText: {
            type: String,
            default: ""
        },
        rightText: {
            type: String,
            default: ""
        },
        href: {
            type: String,
            default: null
        }
    },
    computed: {
        getShieldSVG: function() {
            return makeBadge({
                text: [this.leftText, this.rightText],
                format: "svg",
                template: "flat"
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.shield
  padding 0px
</style>
