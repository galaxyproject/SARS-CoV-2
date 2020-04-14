# colorbycds

A JBrowse plugin for viewing the frame that a coding sequences of a gene is in and coloring the DNA track and gene appropriately

## Screenshots

![](img/1.png)

Figure 1: Picture of gene with alternate splicing that shows differring frame usage and stop codons depending on which exons are included.

![](img/2.png)

Figure 2: Picture of genes and the DNA track with the plugin enabled. The coloring of the CDS boxes corresponds to the colored rows of the DNA track

## Example

    {
     "label" : "genes",
     "urlTemplate" : "tracks/genes/{refseq}/trackData.json",
     "storeClass" : "JBrowse/Store/SeqFeature/NCList",
     "type" : "CanvasFeatures",
     "glyph" : "ColorByCDS/View/FeatureGlyph/Gene"
    }

Note that if you loaded your data with two levels e.g. mRNA->exon/cds instead of three levels e.g. gene->mRNA->exon/cds then use "ColorByCDS/View/FeatureGlyph/ProcessedTranscript" as the glyph, otherwise you will see your feature is exploded into tiny pieces and not connected by introns.

## Installation

Download to plugins/ColorByCDS and add

    "plugins": ["ColorByCDS"]

to jbrowse_conf.json or trackList.json. See JBrowse FAQ on installing plugins for more details


## Notes

Relies on the phase field (column 8) of your GFF to be calculated correctly. Use genometools `gt gff3 -tidy yourfile.gff > yourfile_fixed.gff` to recalculate phase properly

