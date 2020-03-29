<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :width="svgWidth" height="20">
        <linearGradient :id="smooth" x2="0" y2="100%">
            <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
            <stop offset="1" stop-opacity=".1" />
        </linearGradient>

        <clipPath :id="clipPath">
            <!-- Add ref here w/ uuid? -->
            <rect :width="combinedWidth" height="20" rx="3" fill="#fff" />
        </clipPath>

        <g :clip-path="urlClipPath">
            <rect :width="w0" height="20" :fill="getFill" />
            <rect :x="w0" :width="w1" height="20" :fill="colorB" />
            <rect :width="combinedWidth" height="20" :fill="urlSmooth" />
        </g>

        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
            <!-- left text -->
            <text
                :x="ltX"
                y="150"
                fill="#010101"
                fill-opacity=".3"
                transform="scale(0.1)"
                :textLength="ltLength"
                lengthAdjust="spacing"
            >
                {{ it.text[0] }}
            </text>
            <text :x="ltX" y="140" transform="scale(0.1)" :textLength="ltLength" lengthAdjust="spacing">
                {{ it.text[0] }}
            </text>


            <!-- right text -->
            <text
                :x="rtX"
                y="150"
                fill="#010101"
                fill-opacity=".3"
                transform="scale(0.1)"
                :textLength="rtLength"
                lengthAdjust="spacing"
            >
                {{ it.text[1] }}
            </text>
            <text :x="rtX" y="140" transform="scale(0.1)" :textLength="rtLength" lengthAdjust="spacing">
                {{ it.text[1] }}
            </text>
        </g>
        <!--
        {{?(it.links[0] && it.links[0].length)}}
        <a target="_blank" xlink:href="{{=it.links[0]}}">
            <rect width="{{=it.widths[0]}}" height="20" fill="rgba(0,0,0,0)" />
        </a>
        {{?}}
        {{?(it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)}}
        <a target="_blank" xlink:href="{{=it.links[1] || it.links[0]}}">
            <rect x="{{=it.widths[0]}}" width="{{=it.widths[1]}}" height="20" fill="rgba(0,0,0,0)" />
        </a>
        {{?}}
        -->
    </svg>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { getBadgeContext } from "../util/ghShield.js";

export default {
    data() {
        return {
            clipPath: "",
            smooth: ""
        };
    },
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
        it() {
            return getBadgeContext({
                text: [this.leftText, this.rightText]
            });
        },
        svgWidth: function() {
            /* Probablynotright? */
            //width="{{=(it.widths[0] -= it.text[0].length ? 0 : (it.logo ? (it.colorA ? 0 : 7) : 11))+it.widths[1]}}"
            return this.combinedWidth;
        },
        colorA() {
            return this.it.colorA;
        },
        colorB() {
            return this.it.colorb || "#4c1";
        },
        w0() {
            return this.it.widths[0];
        },
        w1() {
            return this.it.widths[1];
        },
        ltX() {
            return (((this.it.widths[0])/2)+1)*10
        },
        ltLength() {
            return (this.it.widths[0] - 10) * 10;
        },
        rtX() {
            return (this.w0 + this.w1 / 2 - 1) * 10;
        },
        rtLength() {
            return (this.it.widths[1] - 10) * 10;
        },
        getFill() {
            return this.it.text[0].length ? this.it.colorA || "#555" : this.it.colorB || "#4c1";
        },
        combinedWidth() {
            return this.w0 + this.w1;
        },
        urlSmooth() {
            return `url(#${this.smooth})`;
        },
        urlClipPath() {
            return `url(#${this.clipPath})`;
        }
    },
    mounted() {
        this.clipPath = uuidv4();
        this.smooth = uuidv4();
    }
};
</script>

<style lang="stylus" scoped>
.shield
  padding 0px
</style>
