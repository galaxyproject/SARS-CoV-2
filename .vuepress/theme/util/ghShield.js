/*
ripped/adapted from github.com/badges/shields because I couldn't get vuepress/webpack to cooperate with it configured as a library
CC0 1.0 Universal https://github.com/badges/shields/blob/master/gh-badges/LICENSE
*/

import { ana } from "./ana.js";

import { normalizeColor, toSvgColor } from "gh-badges/lib/color";

export function getBadgeContext({
    text,
    colorscheme,
    color,
    colorA,
    colorB,
    labelColor,
}) {
    // String coercion and whitespace removal.
    text = text.map(value => `${value}`.trim());

    let [left, right] = text;

    color = normalizeColor(color || colorB || colorscheme);
    labelColor = normalizeColor(labelColor || colorA);

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

    return {
        text: [left, right],
        widths: [leftWidth + 10, rightWidth + 10],
        colorA: toSvgColor(labelColor),
        colorB: toSvgColor(color),
    };
}