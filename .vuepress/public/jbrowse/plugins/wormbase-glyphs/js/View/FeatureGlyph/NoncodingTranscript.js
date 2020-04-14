//This glyph is intended to support transcripts who have as there only
// subpart (or subpart that matters) as a "noncoding_exon" (instead of
// the more typical in just about every instance, "exon").  This is the
// style that SGD uses for their noncoding genes like tRNA_gene.

define("wormbase-glyphs/View/FeatureGlyph/NoncodingTranscript", [
           'dojo/_base/declare',
           'JBrowse/View/FeatureGlyph/ProcessedTranscript'
       ],  
       function(
           declare,
           ProcessedTranscript 
       ) { 

return declare( ProcessedTranscript, {

_defaultConfig: function() {
    return this._mergeConfigs(
        this.inherited(arguments),
        {   
            subParts: 'noncoding_exon'
        }); 
}

});
});
