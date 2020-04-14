define([
    'dojo/_base/declare',
    'JBrowse/Store/SeqFeature/BigBed',
    'JBrowse/Model/SimpleFeature'
],
function (
    declare,
    BigBed,
    SimpleFeature
) {
    return declare(BigBed, {
        getFeatures: function (query, featureCallback, errorCallback) {
            return this.inherited(arguments, [query, function (feature) {
                var maf = feature.get('maf_block');
                var blocks = maf.split(';');
                var aln;
                var alns = [];
                var alignments = {};
                var blocks2 = [];
                var i;
                for (i = 0; i < blocks.length; i++) {
                    if (blocks[i][0] === 's') {
                        if (!aln) {
                            aln = blocks[i].split(/ +/)[6];
                            alns.push(aln);
                            blocks2.push(blocks[i]);
                        } else {
                            alns.push(blocks[i].split(/ +/)[6]);
                            blocks2.push(blocks[i]);
                        }
                    }
                }
                var alns2 = alns.map(function (/* elt*/) {
                    return '';
                });

                for (i = 0; i < aln.length; i++) {
                    if (aln[i] !== '-') {
                        for (var j = 0; j < alns.length; j++) {
                            alns2[j] += alns[j][i];
                        }
                    }
                }
                alns = null;

                for (var k = 0; k < blocks2.length; k++) {
                    var elt = blocks2[k];
                    var ad = elt.split(/ +/);
                    var y = ad[1].split('.');
                    var org = y[0];
                    var chr = y[1];

                    alignments[org] = {
                        chr: chr,
                        start: +ad[1],
                        srcSize: +ad[2],
                        strand: ad[3],
                        unknown: +ad[4],
                        data: alns2[k]
                    };
                }

                featureCallback(new SimpleFeature({
                    id: feature._uniqueID,
                    data: {
                        start: feature.get('start'),
                        end: feature.get('end'),
                        seq_id: feature.get('seq_id'),
                        seq: alns2[0],
                        alignments: alignments
                    }
                }));
            }, errorCallback]);
        }
    });
});
