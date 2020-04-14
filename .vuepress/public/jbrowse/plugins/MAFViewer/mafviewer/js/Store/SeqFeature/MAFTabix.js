define([
    'dojo/_base/declare',
    'JBrowse/Store/SeqFeature/BEDTabix',
    'JBrowse/Model/SimpleFeature'
],
function (
    declare,
    BEDTabix,
    SimpleFeature
) {
    return declare(BEDTabix, {
        lineToFeature: function (columnNumbers, line) {
            const oldVersion = line === undefined; // old lineToFeature API only passes one argument
            var fields;
            var line_start, line_end, line_ref;
            if (oldVersion) {
                fields = columnNumbers.fields;
                line_start = columnNumbers.start;
                line_end = columnNumbers.end;
                line_ref = columnNumbers.ref;
            } else {
                fields = line.split('\t');
                line_start = +fields[columnNumbers.start - 1];
                line_end = +fields[columnNumbers.end - 1];
                line_ref = fields[columnNumbers.ref - 1];
            }
            for (var l = 0; l < fields.length; l++) {
                if (fields[l] === '.') {
                    fields[l] = null;
                }
            }
            var data = fields[5].split(',');
            var alignments = {};
            var main = data[0];
            var aln = dojo.clone(main.split(':')[5]);
            var alns = data.map(function (elt) {
                return elt.split(':')[5];
            });
            var alns2 = data.map(function (/* elt*/) {
                return '';
            });
            // remove extraneous data in other alignments
            // reason being: cannot represent missing data in main species that are in others)
            for (var i = 0, o = 0; i < aln.length; i++, o++) {
                if (aln[i] !== '-') {
                    for (var j = 0; j < data.length; j++) {
                        alns2[j] += alns[j][i];
                    }
                }
            }
            alns = null;

            data.forEach(function (elt, k) {
                var ad = elt.split(':');
                var org = ad[0].split('.')[0];
                var chr = ad[0].split('.')[1];

                alignments[org] = {
                    chr: chr,
                    start: +ad[1],
                    srcSize: +ad[2],
                    strand: ad[3],
                    unknown: +ad[4],
                    data: alns2[k]
                };
            });

            var featureData = {
                start: line_start,
                end: line_end,
                seq_id: line_ref,
                name: fields[3],
                score: +fields[4],
                alignments: alignments,
                seq: alns2[0]
            };

            var f = new SimpleFeature({
                id: fields.slice(0, 5).join('/'),
                data: featureData,
                fields: fields
            });

            return f;
        }
    });
});
