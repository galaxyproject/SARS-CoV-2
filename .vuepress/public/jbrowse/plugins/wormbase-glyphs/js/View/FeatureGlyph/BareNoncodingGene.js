define("wormbase-glyphs/View/FeatureGlyph/NoncodingGene", [
           'dojo/_base/declare',
           'wormbase-glyphs/View/FeatureGlyph/ExonTranscript',
           'JBrowse/View/FeatureGlyph/Gene'
       ],
       function(
           declare,
           Gene
       ) {

return declare( Gene, {

_defaultConfig: function() {
    return this._mergeConfigs(
        this.inherited(arguments),
        {
            transcriptType: 'pseudogenic_transcript',
        });
},

_ptGlyph: function() {
    return this.__ptGlyph || ( this.__ptGlyph = new ExonTranscriptGlyph({ track: this.track, browser: this.browser, config: this.config }) );
}

});
});
