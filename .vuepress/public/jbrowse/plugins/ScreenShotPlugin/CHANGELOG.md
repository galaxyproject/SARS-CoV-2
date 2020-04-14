# Change Log

## [Unreleased]

## [v1.7.0] - 2018-04-10
- ADDED tests
  - unit tests
  - phantomJS Cloud tests
  - local installation integration test
- ADDED test dataset
- FIXED error setting height when style not defined in track config

## [v1.6.10] - 2017-09-26
- ADDED support for extended modifications (4mC, 5hmC, 6mA) for methylation plugin

## [v1.6.9] - 2017-08-28
- DELETED support for NucleotideDensityPlugin since it was rebranded as MotifDensityPlugin
- ADDED support for MotifDensityPlugin

## [v1.6.8] - 2017-08-22
- ADDED Nucleotide density plugin SVG support

## [v1.6.7] - 2017-08-18
- bug fixes

## [v1.6.6] - 2017-08-17
- Support for SVG-style XYPlot and Density tracks with WiggleSVGPlotPlugin
- Additional plugins must have specified plugin ID
- updated README to include Wiggle SVG Plot plugin and exact plugin id
- Density tracks do not have y-scale option

## [v1.6.5] - 2017-08-16
- minor bug fixes

## [v1.6.4] - 2017-08-11
- ADDED HTML style available or stranded xy tracks
- UPDATED version checks for small rna plugin, methylation plugin, stranded plot plugin to ensure html/svg tracks are included

## [v1.6.3] - 2017-08-08
- ADDED HTML style available for methylation tracks (must have latest version of methylation plugin)

## [v1.6.2] - 2017-08-03
- ADDED HTML style feature options available for small rna alignments, canvas feature tracks, and alignment2 tracks

## [v1.6.1] - 2017-08-02
- FIXED with canvas features/html features option

## [v1.6.0] - 2017-07-28
- Refactor ScreenShotDialog file to separate out parameter logic
- ADDED option to convert CanvasFeature tracks to HTMLFeature tracks
  - this is useful for PDF rendering so annotation objects are movable
- Bug fix for plugin configuration

## [v1.5.0] - 2017-07-27
- ADDED option to use a custom apikey
- useful for getting aroung 100 page/day limit of the default apikey

## [v1.4.1] - 2017-03-16
- ADDED support for SNPCoverage tracks

## [v1.4.0] - 2017-03-16
- ADDED option to allow for extra rendering time
- default max render time is 35 s; can be increased to 5 min (300 s)

## [v1.3.3] - 2017-03-09
- FIXED data undefined issue

## [v1.3.2] - 2016-12-19
- FIXED small rna hide/show in screenshot (previously no small rna's were hidden when taking the screenshot)

## [v1.3.1] - 2016-11-31
- UPDATE for formatting

## [v1.3.0] - 2016-11-30
- ADDED support for small rna plugin (see readme for additional details)

## [v1.2.0] - 2016-11-04
- allows for pdf output option with some pdf specific parameters
- PDF output requires selecting a page size and orientation
- height/width parameters are used for "viewport" not output page size

## [v1.1.1] - 2016-09-12
- FIXXED bug for SeqViewsPlugin configuration

## [v1.1.0] - 2016-09-12
- for canvas-feature type tracks, now can specificy display mode (normal, compact, collapsed)
- when SeqViewsPlugin is activated, can also specificy display style (default, features, histograms)

## [v1.0.5] - 2016-09-08
- FIXED issue with track-specific y-scale radio buttons not correctly checked when dialog is open
- UPDATED check for XYPlots which includes StrandedXYPlots from StrandedPlotPlugin

## [v1.0.4] - 2016-08-30
- ADDED animal methylation coloring

## [v1.0.3] - 2016-08-30
- ADDED methylPlugin configuration parameter to correctly handle MethylationPlugin
- FIXED path to methylation plugin for checkboxes to work properly

## [v1.0.2] - 2016-08-30
- UPDATED dialog so track-specific settings are at the bottom
- track specific setting uses tab container instead of accordian since accordian had problems with more than 8-ish tracks

## [v1.0.1] - 2016-08-29
- FIXED issue with track specific setting where settings for tracks 10+ were ignored

## [v1.0.0] - 2016-08-11
- ADDED track-specific settings

## [v0.0.4] - 2016-08-03
- ADDED render quality as output option
- dialog box is reorganized

## [v0.0.3] - 2016-07-22
- DELETED PDF functionality as it is not functional

## [v0.0.2] - 2016-07-22
- functional with methylation context corrected
- hide track label not supported

## [v0.0.1]
- first functional version

## [v0.0.0] - 2016-07-18
- initial set-up