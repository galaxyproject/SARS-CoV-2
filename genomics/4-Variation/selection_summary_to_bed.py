"""Takes a dump of the selection summary from https://observablehq.com/@spond/natural-selection-analysis-of-sars-cov-2-covid-19 and turns it into a bed file."""
import json

import pandas as pd


CHROMS = [('ncbi', 'NC_045512.2'), ('ucsc', 'NC_045512v2')]


with open('summary.json') as fh:
    summary = json.load(fh)

df = pd.DataFrame.from_records(summary['plot'])
# Neither IGV nor UCSC support spaces in the name field
df['kind'] = df['kind'].str.replace(' ', '_')
df['start'] = df['position'] -1
df['end'] = df['start'] + 2
df['strand'] = '+'

for (convention, chrom) in CHROMS:
    df['chrom'] = chrom
    df[['chrom', 'start', 'end', 'kind', 'score']].to_csv(
        "selection_analysis_%s.bed" % convention, sep='\t', index=None, header=None,
    )
