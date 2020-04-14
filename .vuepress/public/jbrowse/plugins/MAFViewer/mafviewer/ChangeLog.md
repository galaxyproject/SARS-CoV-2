- Add fix for JBrowse 13+ stylesheets in main.css
- Fix off-by-one in maf2bed not outputting last row

# Version 1.0.1

- Add fix for JBrowse post 1.16.0 which changed the lineToFeature API

# Version 1.0.0

- Add large maxHeight in order to prevent parent CanvasFeautures track from filtering alignments when zoomed out far (issue #16)

# Version 0.9.0

- Accuracy improvements
- Canvas path based rendering optimization

# Version 0.8.0

- Features
  - Add BigMaf support. This is a UCSC format based on BigBed. Requires 1.14.0 on JBrowse. See https://genome.ucsc.edu/FAQ/FAQformat.html#format9.3 for information on generating the bigMAF file format
  - Improve performance significantly by only getting the substring to be rendered in each block
- Bug fixes
  - Fix a bug where the match color was drawn over areas even where there was a gap
  - Removed bug related to canvas off-screen drawing that prevented content from being rendered at different zoom levels
- Changes
  - Disabled mouseover and click due to glitchyness and performance optimization

# Version 0.7.0

- Allow coloring mismatches by base (thanks @petersbr)

# Version 0.6.0

- Make the glyph look better when zoomed out very far
- Fix track height in areas where no alignment data is present
- Fix mouseover clearRect boundaries

# Version 0.5.0

- Made subpixel rendering more accurate
- Made it so you can specify full species name in addition to short name, and add colors/tooltips

# Version 0.4.0

- Further improve rendering by reducing off-screen rendering

# Version 0.3.0

- Add store class optimizations to avoid excessive GC
- Add rendering optimizations to avoid excessive canvas repainting

# Version 0.2.0

- Fix bug where it needs to check lower case
- Include ability to draw base pairs

# Version 0.1.0

- Include converter from MAF to pseudo-bed format
- Include storeClass that removes gapped alignments in reference (which can't be displayed using ref coord system)
