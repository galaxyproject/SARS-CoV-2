define("wormbase-glyphs/View/FeatureGlyph/LinkedEST", [
           'dojo/_base/declare',
           'dojo/_base/lang',
           'dojo/_base/array',
           'JBrowse/View/FeatureGlyph/Segments',
           'JBrowse/View/FeatureGlyph/ProcessedTranscript'
       ],
       function(
           declare,
           lang,
           array,
           SegmentsGlyph,
           ProcessedTranscriptGlyph
       ) {

return declare( SegmentsGlyph, {

_defaultConfig: function() {
    return this._mergeConfigs(
        this.inherited(arguments),
        {
            transcriptType: 'expressed_sequence_match',
            subpart: 'match_part',
            style: {
                transcriptLabelFont: 'normal 10px Univers,Helvetica,Arial,sans-serif',
                transcriptLabelColor: 'black',
                textFont: 'bold 12px Univers,Helvetica,Arial,sans-serif'
            },
            labelTranscripts: false,
            marginBottom: 0
        });
},

_segmentsGlyph: function() {
    return this.__segmentsGlyph || ( this.__segmentsGlyph = new SegmentsGlyph({ track: this.track, browser: this.browser, config: this.config }) );
},
_ptGlyph: function() {
    return this.__ptGlyph || ( this.__ptGlyph = new ProcessedTranscriptGlyph({ track: this.track, browser: this.browser, config: this.config }) );
},

_getFeatureRectangle: function( viewArgs, feature ) {

    // lay out rects for each of the subfeatures
    var subArgs = lang.mixin( {}, viewArgs );
    subArgs.showDescriptions = subArgs.showLabels = false;
    var subfeatures = feature.children();

    // get the rects for the children
    var padding = 1;
    var fRect = {
        l: 0,
        h: 0,
        r: 0,
        w: 0,
        subRects: [],
        viewInfo: viewArgs,
        f: feature,
        glyph: this
    };
    
    var EST1 = '';
    var EST2 = false;
    if( subfeatures && subfeatures.length ) {
        // sort the children by start
        //subfeatures.sort( function( a, b ) { return (a.get('name') || '').localeCompare( b.get('name')||'' ); } );
        subfeatures.sort( function( a, b ) { return (a.get('start') || 0) > ( b.get('start')|| 0 ); } );

        fRect.l = Infinity;
        fRect.r = -Infinity;

        var overlaps   = false;

        var end1 = -1;
        var start2 = -1;

        var transcriptType = this.getConfForFeature( 'transcriptType', feature );
        for( var i = 0; i < subfeatures.length; i++ ) {
            var subRect = ( subfeatures[i].get('type') == transcriptType
                            ? this._ptGlyph()
                            : this._segmentsGlyph()
                          )._getFeatureRectangle( subArgs, subfeatures[i] );

            if (subfeatures[i].get('type') == transcriptType) {
                if (end1 <0) {
                    EST1 = subfeatures[i];
                    end1 = EST1.get('end');
                }
                else if (end1 > subfeatures[i].get('start')){
                    overlaps = true;
                    EST2 = subfeatures[i];
                    start2 = EST2.get('start');
                }
                else 
                {
                    EST2 = subfeatures[i];
                    start2 = EST2.get('start');
                }
            }

            padding = i == subfeatures.length-1 ? 0 : 1;

            //figure out if the forward and reverse overlap
            subRect.t = 0;
            if (overlaps) {
                subRect.t = subRect.rect.t = fRect.h && viewArgs.displayMode != 'collapsed' ? fRect.h+padding : 0;
            }

            if( viewArgs.showLabels && this.getConfForFeature( 'labelTranscripts', subfeatures[i] ) ) {
                var transcriptLabel = this.makeSideLabel(
                    this.getFeatureLabel(subfeatures[i]),
                    this.getStyle( subfeatures[i], 'transcriptLabelFont'),
                    subRect
                );
                if( transcriptLabel ) {
                    transcriptLabel.fill = this.getStyle( subfeatures[i], 'transcriptLabelColor' );
                    subRect.label = transcriptLabel;
                    subRect.l -= transcriptLabel.w;
                    subRect.w += transcriptLabel.w;
                    if( transcriptLabel.h > subRect.h )
                        subRect.h = transcriptLabel.h;
                    transcriptLabel.yOffset = Math.floor(subRect.h/2);
                    transcriptLabel.xOffset = 0;
                }
            }

            fRect.subRects.push( subRect );
            fRect.r = Math.max( fRect.r, subRect.l+subRect.w-1 );
            fRect.l = Math.min( fRect.l, subRect.l );
            fRect.h = subRect.t+subRect.h+padding;
        }

    }

    // calculate the width
    fRect.w = Math.max( fRect.r - fRect.l + 1, 2 );
    delete fRect.r;
    fRect.rect = { l: fRect.l, h: fRect.h, w: fRect.w };
    if( viewArgs.displayMode != 'compact' )
        fRect.h += this.getStyle( feature, 'marginBottom' ) || 0;

    // no labels or descriptions if displayMode is collapsed, so stop here
    if( viewArgs.displayMode == "collapsed")
        return fRect;

    // expand the fRect to accommodate labels if necessary
    this._expandRectangleWithLabels( viewArgs, feature, fRect );
    this._addMasksToRect( viewArgs, feature, fRect );

    //get the canvas coordinates for the introny-thingy
    if (overlaps) {return fRect};
    if (!EST2) {return fRect};
    var viewInfo = fRect.viewInfo;
    fRect.EST1End = viewInfo.block.bpToX(end1);
    fRect.ESTgapWidth = viewInfo.block.bpToX(start2) - fRect.EST1End;

    //console.log(fRect);

    

    return fRect;
},

layoutFeature: function( viewInfo, layout, feature ) {
    var fRect = this.inherited( arguments );
    if( fRect )
        array.forEach( fRect.subRects, function( subrect ) {
                           subrect.t += fRect.t;
                           subrect.rect.t += fRect.t;
                       });
    return fRect;
},

renderFeature: function( context, fRect ) {
    if( fRect.viewInfo.displayMode != 'collapsed' )
        context.clearRect( Math.floor(fRect.l), fRect.t, Math.ceil(fRect.w-Math.floor(fRect.l)+fRect.l), fRect.h );

    var subRects = fRect.subRects;
    for( var i = 0; i < subRects.length; i++ ) {
        subRects[i].glyph.renderFeature( context, subRects[i] );
    }

    //draw the introny-thingy
    if (fRect.ESTgapWidth) {
        var viewInfo = fRect.viewInfo;
        var top = fRect.t;
                var overallHeight = fRect.rect.h;

                var height = overallHeight / 2 -1;
                var left = fRect.EST1End;
                var width = fRect.ESTgapWidth;
                var mid = width/2;

                // butt line cap (top line)
                context.beginPath();
                context.setLineDash([7,12]);
                context.moveTo(left,top+height);
                context.lineTo(left+width,top+height);
                context.lineWidth = 1;
                context.strokeStyle = '#202020';
                //context.lineCap = 'square';
                context.stroke();
    }

    this.renderLabel( context, fRect );
    this.renderDescription( context, fRect );
},

updateStaticElements: function( context, fRect, viewArgs ) {
    this.inherited( arguments );

    var subRects = fRect.subRects;
    for( var i = 0; i < subRects.length; i++ ) {
        subRects[i].glyph.updateStaticElements( context, subRects[i], viewArgs );
    }
}

});
});
