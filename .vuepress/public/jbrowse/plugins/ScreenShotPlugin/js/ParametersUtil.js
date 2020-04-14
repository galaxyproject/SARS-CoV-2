define('ScreenShotPlugin/ParametersUtil', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/json'
    ],
  function (
    declare,
    array,
    lang,
    json
  ) {
    var ParametersUtil;
    ParametersUtil = {

      // get initial parameters
      getInitialParameters: function (browserConfig, storedConfig) {
        // get browser parameters
        var config = browserConfig;
        // spinner -> zoom and trackSpacing
        var zoom = {
          value: config.highResolutionMode,
          title: 'Zoom factor'
        };
        if (typeof zoom.value !== 'number')
          zoom.value = 1
        var trackSpacing = {
          value: 20,
          title: 'Track spacing'
        };
        if (config.view !== undefined && config.view.trackPadding !== undefined)
          trackSpacing.value = config.view.trackPadding;
        // check boxes -> location overview, tracklist, nav, menu bars, track labels
        var locOver = {
          value: config.show_overview,
          title: 'Show location overview'
        };
        var trackList = {
          value: config.show_tracklist,
          title: 'Show track list'
        };
        var nav = {
          value: config.show_nav,
          title: 'Show navigation bar'
        };
        var menu = {
          value: config.show_menu,
          title: 'Show menu bar'
        };
        var labels = {
          value: config.show_tracklabels,
          title: 'Show track labels'
        };
        // output parameters
        zoom['min'] = 0;
        zoom['max'] = 10;
        zoom['delta'] = 1;
        var format = {
          value: 'JPG',
          title: 'Output format'
        };
        var width = {
          value: 3300,
          title: 'Width (px)',
          min: 100,
          max: 10000,
          delta: 100
        };
        var height = {
          value: 2400,
          title: 'Height (px)',
          min: 100,
          max: 10000,
          delta: 100
        };
        var quality = {
          value: 70,
          title: 'Render quality',
          min: 0,
          max: 100,
          delta: 10
        };
        var pdfOpt = {
          value: 'letter landscape',
          title: 'Page format'
        };
        var pdfWidth = {
          value: 1800,
          title: 'View width (px)',
          min: 100,
          max: 10000,
          delta: 100
        };
        var pdfHeight = {
          value: 1200,
          title: 'View height (px)',
          min: 100,
          max: 10000,
          delta: 100
        };
        var time = {
          value: false,
          title: 'Extra render time',
          extra: {
            value: 40,
            title: 'Max (s)',
            min: 40,
            max: 300,
            delta: 10
          }
        };
        var key = {
          value: false,
          title: 'Use custom ApiKey',
          extra: {
            value: '',
            title: ''
          }
        };

        var smrna = {
          '21': {
            value: true,
            color: 'blue',
            label: '21-mers'
          },
          '22': {
            value: true,
            color: 'green',
            label: '22-mers'
          },
          '23': {
            value: true,
            color: 'purple',
            label: '23-mers'
          },
          '24': {
            value: true,
            color: 'orange',
            label: '24-mers'
          },
          'pi': {
            value: true,
            color: 'red',
            label: 'piRNAs'
          },
          'Others': {
            value: true,
            color: 'gray',
            label: 'others'
          }
        };

        return {
          view: {
            trackSpacing: trackSpacing,
            locOver: locOver,
            trackList: trackList,
            nav: nav,
            menu: menu,
            labels: labels
          },
          methylation: {
            CG: true,
            CHG: true,
            CHH: true,
            '4mC': true,
            '5hmC': true,
            '6mA': true
          },
          output: {
            format: format,
            zoom: zoom,
            quality: quality,
            image: {
              width: width,
              height: height
            },
            pdf: {
              page: pdfOpt,
              pdfWidth: pdfWidth,
              pdfHeight: pdfHeight
            },
            time: time,
            key: key
          },
          smallrna: smrna
        };
      },

      getTrackParameters: function (visibleTracks, pluginConfigs) {
        var thisB = this;
        var out = {};
        array.forEach(visibleTracks, function (track, i) {
          var tType = track.config.type;
          var tConfig = track.config;
          // due to weirdness with displayMode, update config.mixin if necessary
          // handle parameters by type
          if (track.hasOwnProperty('displayMode'))
            tConfig.displayMode = track.displayMode;
          out[track.config.label] = thisB._handleTrackTypeParameters(i, tType, tConfig, pluginConfigs);
        });
        return out;
      },

      _handleTrackTypeParameters: function (iter, tType, config, pluginConfigs) {
        var out = {
          key: config.key,
          trackNum: iter
        };
        // DNA sequence has no options for now
        if (/\b(Sequence)/.test(tType)) {
          lang.mixin(out, {
            opts: false
          });
          return out;
        }
        // test methylation tracks
        if (/\b(Methyl.*Plot)/.test(tType)) {
          lang.mixin(out, this._methylationParameters(config));
          if (/\b(MethylPlot)/.test(tType) && pluginConfigs.htmlFeatures.methyl)
            lang.mixin(out, this._htmlParameters(pluginConfigs));
        }
        // test bigwig and SNPCoverage
        else if (/\b(XYPlot)/.test(tType) || /XYPlot$/.test(tType) || /SNPCoverage$/.test(tType)) {
          lang.mixin(out, this._xyParameters(config));
        }
        // test for wiggle density (same as xy but no y axis)
        else if (/\b(Density)/.test(tType) || /Density$/.test(tType)) {
          lang.mixin(out, this._densityParameters(config));
        }
        // else get track height from maxHeight and set ypos = false
        else {
          lang.mixin(out, this._basicParameters(config));
        }

        // html features - canvas/alignments, smallrna, stranded, xyplot/density
        if (/CanvasFeatures$/.test(tType) || /Alignments2$/.test(tType) || /CanvasVariants$/.test(tType)) {
          lang.mixin(out, this._htmlParameters(pluginConfigs));
        } else if (/smAlignments$/.test(tType) && pluginConfigs.htmlFeatures.smrna) {
          lang.mixin(out, this._htmlParameters(pluginConfigs));
        } else if (/StrandedXYPlot$/.test(tType) && pluginConfigs.htmlFeatures.strandedplot) {
          lang.mixin(out, this._htmlParameters(pluginConfigs));
        } else if ((/\b(XYPlot)/.test(tType) || /\b(Density)/.test(tType)) && pluginConfigs.htmlFeatures.wiggle) {
          lang.mixin(out, this._htmlParameters(pluginConfigs));
        } else if (/\b(MotifDensity)/.test(tType) && pluginConfigs.htmlFeatures.motifdens) {
          lang.mixin(out, this._htmlParameters(pluginConfigs));
        }
        // Canvas/Alignments2/smAlignments have maxHeight option and possibly histogram with min/max and height
        // test for histograms and not SNPCoverage
        if (config.histograms !== undefined && !/SNPCoverage$/.test(tType)) {
          lang.mixin(out, this._histogramParameters(config));
        }

        // test canvas features and alignments
        if (/(Canvas|HTML)Features$/.test(tType) || /Alignments2$/.test(tType) || /smAlignments$/.test(tType)) {
          // check for SeqViews plugin
          lang.mixin(out, this._seqViewParameters(config, pluginConfigs));
        }

        return out;
      },

      _methylationParameters: function (config) {
        return {
          height: {
            title: 'Track height',
            value: (config.style ? config.style.height : config.style),
            delta: 10
          },
          ypos: {
            title: 'Y-scale position',
            value: (config.hasOwnProperty('yScalePosition') ? config.yScalePosition : 'center')
          },
          min: {
            title: 'Min. score',
            value: config.min_score,
            delta: 0.1
          },
          max: {
            title: 'Max. score',
            value: config.max_score,
            delta: 0.1
          },
          quant: true
        };
      },

      _xyParameters: function (config) {
        return {
          height: {
            title: 'Track height',
            value: (config.style ? config.style.height : config.style),
            delta: 10
          },
          ypos: {
            title: 'Y-scale position',
            value: (config.hasOwnProperty('yScalePosition') ? config.yScalePosition : 'center')
          },
          min: {
            title: 'Min. score',
            value: config.min_score,
            delta: 10
          },
          max: {
            title: 'Max. score',
            value: config.max_score,
            delta: 10
          },
          quant: true
        };
      },

      _densityParameters: function (config) {
        return {
          height: {
            title: 'Track height',
            value: (config.style ? config.style.height : config.style),
            delta: 10
          },
          min: {
            title: 'Min. score',
            value: config.min_score,
            delta: 10
          },
          max: {
            title: 'Max. score',
            value: config.max_score,
            delta: 10
          },
          quant: true
        };
      },

      _basicParameters: function (config) {
        return {
          height: {
            title: 'Track height',
            value: config.maxHeight,
            delta: 10
          },
          ypos: false
        };
      },

      _histogramParameters: function (config) {
        return {
          ypos: {
            title: 'Y-scale position',
            value: (config.hasOwnProperty('yScalePosition') ? config.yScalePosition : 'center')
          },
          min: {
            title: 'Min. score',
            value: config.histograms.min,
            delta: 10
          },
          max: {
            title: 'Max. score',
            value: config.histograms.max,
            delta: 10
          },
          quant: false
        }
      },

      _seqViewParameters: function (config, pluginConfig) {
        var newM = {};
        if(config.displayMode !== undefined){
          newM = {
          mode: {
            title: 'Display mode',
            value: config.displayMode
          }
        };
        }
        if (pluginConfig.seqViewsPlugin) {
          lang.mixin(newM, {
            style: {
              title: 'Feature style',
              value: (config.displayStyle === undefined ? 'default' : config.displayStyle)
            }
          });
        }
        return newM;
      },

      _htmlParameters: function (pluginConfig) {
        return {
          html: {
            title: 'HTML/SVG features',
            value: pluginConfig.htmlFeatures.general
          }
        };
      }

    }
    return ParametersUtil;
  });
