# Example JBrowse integration showing GRCH38 Reference Sequence

<JBrowse
        defaultLocation="chr1:187326438..187326472"
        defaultTracks="GRCH38 Reference Sequence"
        :refSeqs="{
            url:'https://s3.amazonaws.com/1000genomes/technical/reference/GRCh38_reference_genome/GRCh38_full_analysis_set_plus_decoy_hla.fa.fai'
            }"
        :tracks="[
                    {
                        key: 'GRCH38 Reference Sequence',
                        label: 'GRCH38 Reference Sequence',
                        urlTemplate:
                            'https://s3.amazonaws.com/1000genomes/technical/reference/GRCh38_reference_genome/GRCh38_full_analysis_set_plus_decoy_hla.fa'
                    }
                ]"
        />
