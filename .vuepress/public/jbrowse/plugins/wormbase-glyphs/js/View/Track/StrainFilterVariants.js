define([
    'dojo/_base/declare',
    'JBrowse/View/Track/CanvasFeatures',
    'dijit/ConfirmDialog'
],
function(
    declare,
    CanvasFeatures,
    ConfirmDialog
) {
    return declare(CanvasFeatures, {
        constructor: function() {
            console.log('FilterVariationPlugin track added');
        },
        _trackMenuOptions: function() {
            var opts = this.inherited(arguments);
            var thisB = this;
            opts.push({
                label: "Add strain filter?",
                type: "dijit/MenuItem",
                onClick: function() {
                    new ConfirmDialog({
content: 'Hello world!', onExecute: function() {
                        thisB.addFeatureFilter(function(feat) {
                            return feat.get('strain').indexOf('CB4856')!=-1
                        }, 'myfilter');
                    thisB.config.filterEnabled = this.checked;
                    thisB.redraw();
} }).show() 

                }
            });
            return opts;
        }
    });
});
