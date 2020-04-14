define(['dojo/_base/declare',
           'dojo/_base/lang',
           'JBrowse/View/FeatureGlyph/Box'],
       function(declare,
           lang,
           Box) {

return declare(Box, {

    renderBox: function( context, viewInfo, feature, top, overallHeight, parentFeature, style ) {

        var center_on_left = false;
        var minwidth = 8;
        var left  = viewInfo.block.bpToX( feature.get('start') );
        var width = viewInfo.block.bpToX( feature.get('end') ) - left;

        if (width < minwidth) {
            width = minwidth;
            center_on_left = true;
        }


        //left = Math.round( left );
        //width = Math.round( width );

        style = style || lang.hitch( this, 'getStyle' );

        var height = this._getFeatureHeight( viewInfo, feature );
        if( ! height )
            return;
        if( height != overallHeight )
            top += Math.round( (overallHeight - height)/2 );

        // background
        var bgcolor = style( feature, 'color' );
        if (center_on_left) {
            if (bgcolor) {
                context.fillStyle = bgcolor;
                context.beginPath();
                context.moveTo(left-width/2,top+height/2);
                context.lineTo(left,top);
                context.lineTo(left+width/2,top+height/2);
                context.lineTo(left,top+height);
                context.closePath();
                context.fill();
            }
            else {
                context.clearRect( left-width/2, top, left+width/2, height );
            }
        }
        else {
            if( bgcolor ) {
                context.fillStyle = bgcolor;
                context.beginPath();
                context.moveTo(left,top+height/2);
                context.lineTo(left + Math.max(minwidth,width)/2,top);
                context.lineTo(left+Math.max(minwidth,width),top+height/2);
                context.lineTo(left + Math.max(minwidth,width)/2,top+height);
                context.closePath();
                context.fill();
            }
            else {
                context.clearRect( left, top, Math.max(8,width), height );
            }
        }

        // foreground border
        var borderColor, lineWidth;
        if( (borderColor = style( feature, 'borderColor' )) && ( lineWidth = style( feature, 'borderWidth')) ) {
            if (center_on_left) {
                context.lineWidth = lineWidth;
                context.strokeStyle = borderColor;

                context.beginPath();
                context.moveTo(left-width/2,top+height/2);
                context.lineTo(left,top);
                context.lineTo(left+width/2,top+height/2);
                context.lineTo(left,top+height);
                context.closePath();
                context.stroke();
            }
            else {
                context.lineWidth = lineWidth;
                context.strokeStyle = borderColor;

                context.beginPath();
                context.moveTo(left,top+height/2);
                context.lineTo(left + Math.max(minwidth,width)/2,top);
                context.lineTo(left+Math.max(minwidth,width),top+height/2);
                context.lineTo(left + Math.max(minwidth,width)/2,top+height);
                context.closePath();
                context.stroke();
            }

        }
    }

});
});
