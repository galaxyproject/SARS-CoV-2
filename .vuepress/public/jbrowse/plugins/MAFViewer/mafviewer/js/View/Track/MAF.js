define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/on',
    'JBrowse/View/Track/CanvasFeatures',
    'JBrowse/Util',
    'dijit/Tooltip'
],
function (
    declare,
    array,
    lang,
    on,
    CanvasFeatures,
    Util,
    Tooltip
) {
    return declare(CanvasFeatures, {
        _defaultConfig: function () {
            return Util.deepUpdate(lang.clone(this.inherited(arguments)), {
                glyph: 'MAFViewer/View/FeatureGlyph/MAF',
                labelWidth: 75,
                maxHeight: 15000,
                showTooltips: true,
                showLabels: true,
                style: {
                    height: 20,
                    mismatchColor: 'blue',
                    showLabels: false,
                    matchColor: 'green',
                    gapColor: 'red',
                    mismatchFont: 'bold 10px Courier New,monospace'
                }
            });
        },

        makeTrackLabel: function () {
            var thisB = this;
            var c = this.config;

            thisB.sublabels = array.map(c.samples, function (key, i) {
                var width = c.labelWidth ? c.labelWidth + 'px' : null;
                var htmlnode = dojo.create('div', {
                    className: 'maftrack-sublabel' + (i === c.samples.length - 1 ? ' last' : ''),
                    id: thisB.config.label + '_' + (lang.isObject(key) ? key.label : key),
                    style: {
                        position: 'absolute',
                        height: c.style.height - 1 + 'px',
                        width: c.showLabels ? width : '10px',
                        font: c.labelFont,
                        top: i * c.style.height + 'px',
                        backgroundColor: lang.isObject(key) ? (key.color ? key.color : 'rgba(255,255,255,0.6)') : 'rgba(255,255,255,0.6)'
                    },
                    innerHTML: c.showLabels ? (lang.isObject(key) ? key.label : key) : ''
                }, thisB.div);

                if (c.showTooltips) {
                    on(htmlnode, c.clickTooltips ? 'click' : 'mouseover', function () {
                        Tooltip.show((lang.isObject(key) ? (key.id + '<br />' + key.label || '' + '<br />' + key.description || '') : key), htmlnode);
                    });
                    on(htmlnode, 'mouseleave', function () {
                        Tooltip.hide(htmlnode);
                    });
                }
                return htmlnode;
            });

            this.inherited(arguments);
        },

        updateStaticElements: function (coords) {
            this.inherited(arguments);
            if ('x' in coords) {
                array.forEach(this.sublabels, function (sublabel) {
                    sublabel.style.left = coords.x + 'px';
                });
            }
        },


        // override getLayout to access addRect method
        _getLayout: function () {
            var thisB = this;
            var layout = this.inherited(arguments);
            return declare.safeMixin(layout, {
                getTotalHeight: function () {
                    return thisB.totalHeight;
                }
            });
        },
        fillBlock: function (args) {
            this.totalHeight = this.config.samples.length * this.config.style.height;
            this.heightUpdate(this.totalHeight, args.blockIndex);
            this.inherited(arguments);
        }
    });
});
