/*
ripped/adapted from github.com/badges/shields because I couldn't get vuepress/webpack to cooperate with it configured as a library
CC0 1.0 Universal https://github.com/badges/shields/blob/master/gh-badges/LICENSE
*/

import { ana } from "./ana.js";

const TEMPLATEBLOBS = {
    "plastic-template.svg": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{{=(it.widths[0] -= it.text[0].length ? 0 : (it.logo ? (it.colorA ? 0 : 7) : 11))+it.widths[1]}}" height="18">
  <linearGradient id="smooth" x2="0" y2="100%">
    <stop offset="0"  stop-color="#fff" stop-opacity=".7"/>
    <stop offset=".1" stop-color="#aaa" stop-opacity=".1"/>
    <stop offset=".9" stop-color="#000" stop-opacity=".3"/>
    <stop offset="1"  stop-color="#000" stop-opacity=".5"/>
  </linearGradient>

  <clipPath id="round">
    <rect width="{{=it.widths[0]+it.widths[1]}}" height="18" rx="4" fill="#fff"/>
  </clipPath>

  <g clip-path="url(#round)">
    <rect width="{{=it.widths[0]}}" height="18" fill="{{=it.escapeXml(it.text[0].length || it.logo && it.colorA ? (it.colorA||"#555") : (it.colorB||"#4c1"))}}"/>
    <rect x="{{=it.widths[0]}}" width="{{=it.widths[1]}}" height="18" fill="{{=it.escapeXml(it.colorB||"#4c1")}}"/>
    <rect width="{{=it.widths[0]+it.widths[1]}}" height="18" fill="url(#smooth)"/>
  </g>

  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
    {{?it.logo}}
      <image x="5" y="3" width="{{=it.logoWidth}}" height="14" xlink:href="{{=it.logo}}"/>
    {{?}}
    {{?it.text[0].length}}
        <text x="{{=(((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10}}" y="140" fill="#010101" fill-opacity=".3" transform="scale(0.1)" textLength="{{=(it.widths[0]-(10+it.logoWidth+it.logoPadding))*10}}" lengthAdjust="spacing">{{=it.escapedText[0]}}</text>
        <text x="{{=(((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10}}" y="130" transform="scale(0.1)" textLength="{{=(it.widths[0]-(10+it.logoWidth+it.logoPadding))*10}}" lengthAdjust="spacing">{{=it.escapedText[0]}}</text>
    {{?}}
    <text x="{{=(it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0))*10}}" y="140" fill="#010101" fill-opacity=".3" transform="scale(0.1)" textLength="{{=(it.widths[1]-10)*10}}" lengthAdjust="spacing">{{=it.escapedText[1]}}</text>
    <text x="{{=(it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0))*10}}" y="130" transform="scale(0.1)" textLength="{{=(it.widths[1]-10)*10}}" lengthAdjust="spacing">{{=it.escapedText[1]}}</text>
  </g>

  {{?(it.links[0] && it.links[0].length)}}
    <a target="_blank" xlink:href="{{=it.links[0]}}">
      <rect width="{{=it.widths[0]}}" height="18" fill="rgba(0,0,0,0)"/>
    </a>
  {{?}}
  {{?(it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)}}
    <a target="_blank" xlink:href="{{=it.links[1] || it.links[0]}}">
      <rect x="{{=it.widths[0]}}" width="{{=it.widths[1]}}" height="18" fill="rgba(0,0,0,0)"/>
    </a>
  {{?}}
</svg>`,
    "flat-template.svg": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{{=(it.widths[0] -= it.text[0].length ? 0 : (it.logo ? (it.colorA ? 0 : 7) : 11))+it.widths[1]}}" height="20">
  <linearGradient id="smooth" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>

  <clipPath id="round">
    <rect width="{{=it.widths[0]+it.widths[1]}}" height="20" rx="3" fill="#fff"/>
  </clipPath>

  <g clip-path="url(#round)">
    <rect width="{{=it.widths[0]}}" height="20" fill="{{=it.escapeXml(it.text[0].length || it.logo && it.colorA ? (it.colorA||"#555") : (it.colorB||"#4c1"))}}"/>
    <rect x="{{=it.widths[0]}}" width="{{=it.widths[1]}}" height="20" fill="{{=it.escapeXml(it.colorB||"#4c1")}}"/>
    <rect width="{{=it.widths[0]+it.widths[1]}}" height="20" fill="url(#smooth)"/>
  </g>

  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
    {{?it.logo}}
      <image x="5" y="3" width="{{=it.logoWidth}}" height="14" xlink:href="{{=it.logo}}"/>
    {{?}}
    {{?it.text[0].length}}
        <text x="{{=(((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10}}" y="150" fill="#010101" fill-opacity=".3" transform="scale(0.1)" textLength="{{=(it.widths[0]-(10+it.logoWidth+it.logoPadding))*10}}" lengthAdjust="spacing">{{=it.escapedText[0]}}</text>
        <text x="{{=(((it.widths[0]+it.logoWidth+it.logoPadding)/2)+1)*10}}" y="140" transform="scale(0.1)" textLength="{{=(it.widths[0]-(10+it.logoWidth+it.logoPadding))*10}}" lengthAdjust="spacing">{{=it.escapedText[0]}}</text>
    {{?}}
    <text x="{{=(it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0 ))*10}}" y="150" fill="#010101" fill-opacity=".3" transform="scale(0.1)" textLength="{{=(it.widths[1]-10)*10}}" lengthAdjust="spacing">{{=it.escapedText[1]}}</text>
    <text x="{{=(it.widths[0]+it.widths[1]/2-(it.text[0].length ? 1 : 0 ))*10}}" y="140" transform="scale(0.1)" textLength="{{=(it.widths[1]-10)*10}}" lengthAdjust="spacing">{{=it.escapedText[1]}}</text>
  </g>

  {{?(it.links[0] && it.links[0].length)}}
    <a target="_blank" xlink:href="{{=it.links[0]}}">
      <rect width="{{=it.widths[0]}}" height="20" fill="rgba(0,0,0,0)"/>
    </a>
  {{?}}
  {{?(it.links[0] && it.links[0].length || it.links[1] && it.links[1].length)}}
    <a target="_blank" xlink:href="{{=it.links[1] || it.links[0]}}">
      <rect x="{{=it.widths[0]}}" width="{{=it.widths[1]}}" height="20" fill="rgba(0,0,0,0)"/>
    </a>
  {{?}}
</svg>`
};

//import * as SVGO from "svgo";
import * as dot from "dot";
import { normalizeColor, toSvgColor } from "gh-badges/lib/color";
//import * as anafanafo from "anafanafo";
import * as bs from "binary-search";

//console.debug(anafanafo);
const templates = {};
dot.templateSettings.strip = false; // Do not strip whitespace.

for (const [filename, templateData] of Object.entries(TEMPLATEBLOBS)) {
    const extension = "svg";
    const style = filename.slice(0, -`-template.${extension}`.length);
    // Compile the template. Necessary to always have a working template.
    templates[style] = dot.template(templateData);
    // Substitute dot code.
    const mapping = new Map();
    let mappingIndex = 1;
    const untemplatedSvg = templateData.replace(/{{.*?}}/g, match => {
        // Weird substitution that currently works for all templates.
        const mapKey = `99999990${mappingIndex}.1`;
        mappingIndex++;
        mapping.set(mapKey, match);
        return mapKey;
    });

    //const svgo = new SVGO();
    //const { data, error } = svgo.optimize(untemplatedSvg);

    //if (error !== undefined) {
    //    console.error(
    //        `Template ${filename}: ${error}\n` + "  Generated untemplated SVG:\n" + `---\n${untemplatedSvg}---\n`
    //    );
    //}

    // Substitute dot code back.
    let svg = templateData;
    const unmappedKeys = [];
    mapping.forEach((value, key) => {
        let keySubstituted = false;
        svg = svg.replace(RegExp(key, "g"), () => {
            keySubstituted = true;
            return value;
        });
        if (!keySubstituted) {
            unmappedKeys.push(key);
        }
    });
    if (unmappedKeys.length > 0) {
        console.error(
            `Template ${filename} has unmapped keys ` +
                `${unmappedKeys.join(", ")}.\n` +
                "  Generated untemplated SVG:\n" +
                `---\n${untemplatedSvg}\n---\n` +
                "  Generated template:\n" +
                `---\n${svg}\n---\n`
        );
    }

    templates[style] = dot.template(svg);
}

function escapeXml(s) {
    if (s === undefined || typeof s !== "string") {
        return undefined;
    } else {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function makeBadge({
    format,
    template,
    text,
    colorscheme,
    color,
    colorA,
    colorB,
    labelColor,
    logo,
    logoPosition,
    logoWidth,
    links = ["", ""]
}) {
    // String coercion and whitespace removal.
    text = text.map(value => `${value}`.trim());

    let [left, right] = text;

    color = normalizeColor(color || colorB || colorscheme);
    labelColor = normalizeColor(labelColor || colorA);

    // This ought to be the responsibility of the server, not `makeBadge`.
    if (format === "json") {
        return JSON.stringify({
            label: left,
            message: right,
            logoWidth,
            color,
            labelColor,
            link: links,
            name: left,
            value: right
        });
    }

    if (!(template in templates)) {
        if (template === "popout-square") {
            template = "flat-square";
        } else {
            template = "flat";
        }
    }
    if (template === "social") {
        left = capitalize(left);
    } else if (template === "for-the-badge") {
        left = left.toUpperCase();
        right = right.toUpperCase();
    }

    let leftWidth = (ana.widthOf(left) / 10) | 0;
    // Increase chances of pixel grid alignment.
    if (leftWidth % 2 === 0) {
        leftWidth++;
    }
    let rightWidth = (ana.widthOf(right) / 10) | 0;
    // Increase chances of pixel grid alignment.
    if (rightWidth % 2 === 0) {
        rightWidth++;
    }

    logoWidth = +logoWidth || (logo ? 14 : 0);

    let logoPadding;
    if (left.length === 0) {
        logoPadding = 0;
    } else {
        logoPadding = logo ? 3 : 0;
    }

    const context = {
        text: [left, right],
        escapedText: [left, right].map(escapeXml),
        widths: [leftWidth + 10 + logoWidth + logoPadding, rightWidth + 10],
        links: links.map(escapeXml),
        logo: escapeXml(logo),
        logoPosition,
        logoWidth,
        logoPadding,
        colorA: toSvgColor(labelColor),
        colorB: toSvgColor(color),
        escapeXml
    };

    const templateFn = templates[template];

    // The call to template() can raise an exception.
    return templateFn(context);
}
