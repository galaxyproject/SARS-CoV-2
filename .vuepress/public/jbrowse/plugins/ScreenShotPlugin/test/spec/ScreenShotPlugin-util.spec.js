/* globals console, expect, describe, it, beforeEach */
require([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/request',
  'JBrowse/Browser',
  'ScreenShotPlugin/View/Dialog/ScreenShotDialog',
  'ScreenShotPlugin/ParametersUtil',
  'ScreenShotPlugin/EncodeDecodeUtil'
], function (
  declare,
  array,
  lang,
  request,
  Browser,
  ScreenShotDialog,
  parametersUtil,
  encodeDecodeUtil
) {

  console.log('TESTING PROGRAM LOGIC');
  describe('Inital test', function () {
    var test = true;
    it('jasimine is working', function () {
      expect(test).toBe(true);
    });
  });

  describe('Test ParametersUtil', function () {
    // browser config has: highResolutionMode, view.trackPadding, show_overview, show_tracklist, show_nav, show_menu, show_tracklabels
    var browserConfig = {
      highResolutionMode: 'auto',
      show_overview: true,
      show_tracklist: true,
      show_nav: true,
      show_menu: true,
      show_tracklabels: true,
      view: {
        trackPadding: 20
      }
    };

    describe('test initial parameters', function () {
      var parameters;
      beforeEach(function (done) {
        parameters = parametersUtil.getInitialParameters(browserConfig, {});
        done();
      });

      it('should have correct browser parameters', function () {
        var viewParam = parameters['view'];
        expect(viewParam).toBeDefined();
        expect(viewParam.trackSpacing).toEqual({
          value: 20,
          title: 'Track spacing'
        });
        expect(viewParam.locOver).toEqual({
          value: true,
          title: 'Show location overview'
        });
        expect(viewParam.trackList).toEqual({
          value: true,
          title: 'Show track list'
        });
        expect(viewParam.nav).toEqual({
          value: true,
          title: 'Show navigation bar'
        });
        expect(viewParam.menu).toEqual({
          value: true,
          title: 'Show menu bar'
        });
        expect(viewParam.labels).toEqual({
          value: true,
          title: 'Show track labels'
        });
      }); // end should have correct browser parameters

      it('should have default output parameters', function () {
        var outParam = parameters['output'];
        expect(outParam).toBeDefined();
        expect(outParam.format).toEqual({
          value: 'JPG',
          title: 'Output format'
        });
        expect(outParam.zoom).toEqual({
          value: 1,
          title: 'Zoom factor',
          min: 0,
          max: 10,
          delta: 1
        });

        expect(outParam.image).toBeDefined();
        expect(outParam.image.width).toEqual({
          value: 3300,
          title: 'Width (px)',
          min: 100,
          max: 10000,
          delta: 100
        });
        expect(outParam.image.height).toEqual({
          value: 2400,
          title: 'Height (px)',
          min: 100,
          max: 10000,
          delta: 100
        });

        expect(outParam.quality).toEqual({
          value: 70,
          title: 'Render quality',
          min: 0,
          max: 100,
          delta: 10
        });

        var pdfParam = outParam.pdf;
        expect(pdfParam).toBeDefined();
        expect(pdfParam.page).toEqual({
          value: 'letter landscape',
          title: 'Page format'
        });
        expect(pdfParam.pdfWidth).toEqual({
          value: 1800,
          title: 'View width (px)',
          min: 100,
          max: 10000,
          delta: 100
        });
        expect(pdfParam.pdfHeight).toEqual({
          value: 1200,
          title: 'View height (px)',
          min: 100,
          max: 10000,
          delta: 100
        });
        //page, pdfWidth, pdfHeight
        expect(outParam.time).toEqual({
          value: false,
          title: 'Extra render time',
          extra: {
            value: 40,
            title: 'Max (s)',
            min: 40,
            max: 300,
            delta: 10
          }
        });
        expect(outParam.key).toEqual({
          value: false,
          title: 'Use custom ApiKey',
          extra: {
            value: '',
            title: ''
          }
        });
      }); // end should have default output parameters

      it('should have default small rna parameters', function () {
        var smParam = parameters['smallrna'];
        expect(smParam).toBeDefined();
        expect(smParam['21']).toEqual({
          value: true,
          color: 'blue',
          label: '21-mers'
        });
        expect(smParam['22']).toEqual({
          value: true,
          color: 'green',
          label: '22-mers'
        });
        expect(smParam['23']).toEqual({
          value: true,
          color: 'purple',
          label: '23-mers'
        });
        expect(smParam['24']).toEqual({
          value: true,
          color: 'orange',
          label: '24-mers'
        });
        expect(smParam['pi']).toEqual({
          value: true,
          color: 'red',
          label: 'piRNAs'
        });
        expect(smParam['Others']).toEqual({
          value: true,
          color: 'gray',
          label: 'others'
        });
      }); // end should have default small rna parameters

      it('should have default methylation parameters', function () {
        var methylParam = parameters['methylation'];
        expect(methylParam).toBeDefined();
        expect(methylParam['CG']).toBe(true);
        expect(methylParam['CHG']).toBe(true);
        expect(methylParam['CHH']).toBe(true);
        expect(methylParam['4mC']).toBe(true);
        expect(methylParam['5hmC']).toBe(true);
        expect(methylParam['6mA']).toBe(true);
      }); // end should have default methylation parameters
    }); // end test initial parameters

    describe('Test track parameters', function () {
      var pluginConfig;
      var tracks;
      beforeEach(function (done) {
        browser = new Browser({
          unitTestMode: true
        });
        pluginConfig = {
          apiKey: 'a-demo-key-with-low-quota-per-ip-address',
          dialog: false,
          debug: false,
          htmlFeatures: {
            general: false,
            methyl: true,
            smrna: true,
            strandedplot: true,
            motifdens: true,
            wiggle: true
          },
          methylPlugin: true,
          smrnaPlugin: true,
          strandedPlugin: true,
          motifDensPlugin: true,
          wiggleSVGPlugin: true,
          seqViewsPlugin: true
        }
        tracks = request('./data/trackList.json', {
          handleAs: 'json'
        }).then(function (data) {
          tracks = data.tracks;
          done();
        }, function (err) {
          console.log(err);
          return;
          //done();
        });
      }); // end beforeEach

      it('should get parameters for Sequence', function () {
        var trackParam = tracks[0];
        var params = parametersUtil._handleTrackTypeParameters(0, 'JBrowse/View/Track/Sequence', trackParam, pluginConfig);
        // has key, trackNum, opts
        expect(params.key).toBe(trackParam.key);
        expect(params.trackNum).toBe(0);
        expect(params.opts).toBe(false);
      }); // end should get parameters for Sequence

      it('should get parameters for CanvasFeatures', function () {
        var trackParam = tracks[1];
        // track defaults - maxHeight, histograms.height, histograms.min, displayStyle
        lang.mixin(trackParam, {
          maxHeight: 600,
          histograms: {
            height: 100,
            min: 0
          }
        });
        var params = parametersUtil._handleTrackTypeParameters(1, trackParam.type, trackParam, pluginConfig);
        expect(params.key).toBe(trackParam.key);
        expect(params.trackNum).toBe(1);

        // maxHeight, html, histograms, seqviews
        expect(params.height).toEqual({
          title: 'Track height',
          value: 600,
          delta: 10
        });
        // histogram stuff
        expect(params.ypos).toEqual({
          title: 'Y-scale position',
          value: 'center'
        });
        expect(params.min).toEqual({
          title: 'Min. score',
          value: 0,
          delta: 10
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: undefined,
          delta: 10
        });
        expect(params.quant).toBe(false);
        // seq views
        expect(params.style).toEqual({
          title: 'Feature style',
          value: 'default'
        });
        // html
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });
      }); // end should get parameters for CanvasFeatures

      it('should get parameters for HTMLFeatures', function () {
        var trackParam = tracks[2];
        // defaults = maxHeight
        trackParam.maxHeight = 1000;
        var params = parametersUtil._handleTrackTypeParameters(2, trackParam.type, trackParam, pluginConfig);
        expect(params.key).toBe(trackParam.key);
        expect(params.trackNum).toBe(2);
        // maxHeight, ypos=false
        expect(params.height).toEqual({
          title: 'Track height',
          value: 1000,
          delta: 10
        });
        expect(params.ypos).toBe(false);
        expect(params.html).not.toBeDefined();
      }); // end should get parameters for HTMLFeatures

      it('should get parameters for CanvasVariants', function () {
        var trackParam = tracks[3];
        // add default
        trackParam.maxHeight = 1000;
        var params = parametersUtil._handleTrackTypeParameters(3, trackParam.type, trackParam, pluginConfig);
        expect(params.key).toBe(trackParam.key);
        expect(params.trackNum).toBe(3);
        // height, ypos=false
        expect(params.height).toEqual({
          title: 'Track height',
          value: 1000,
          delta: 10
        });
        expect(params.ypos).toBe(false);
        // html
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });
      }); // end should get parameters for CanvasVariants

      it('should get parameters for HTMLVariants', function () {
        var trackParam = tracks[4];
        // add default
        trackParam.maxHeight = 1000;
        var params = parametersUtil._handleTrackTypeParameters(4, trackParam.type, trackParam, pluginConfig);
        expect(params.key).toBe(trackParam.key);
        expect(params.trackNum).toBe(4);
        // height, ypos=false
        expect(params.height).toEqual({
          title: 'Track height',
          value: 1000,
          delta: 10
        });
        expect(params.ypos).toBe(false);
        expect(params.html).not.toBeDefined();
      }); // end should get parameters for HTMLVariants

      it('should get parameters for Alignments2', function () {
        var trackConfig = tracks[5];
        // add defaults - display style, display mode, histogram.min, histograms.height, max.height
        lang.mixin(trackConfig, {
          maxHeight: 600,
          histograms: {
            height: 100,
            min: 0
          },
          displayMode: 'normal',
          displayStyle: 'default'
        });
        var params = parametersUtil._handleTrackTypeParameters(5, trackConfig.type, trackConfig, pluginConfig);
        expect(params.key).toBe(trackConfig.key);
        expect(params.trackNum).toBe(5);

        // maxHeight, html, histograms, seqviews
        expect(params.height).toEqual({
          title: 'Track height',
          value: 600,
          delta: 10
        });
        // histogram stuff
        expect(params.ypos).toEqual({
          title: 'Y-scale position',
          value: 'center'
        });
        expect(params.min).toEqual({
          title: 'Min. score',
          value: 0,
          delta: 10
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: undefined,
          delta: 10
        });
        expect(params.quant).toBe(false);
        // seq views
        expect(params.mode).toEqual({
          title: 'Display mode',
          value: 'normal'
        });
        expect(params.style).toEqual({
          title: 'Feature style',
          value: 'default'
        });
        // html
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });
      }); // end should get parameters for Alignments2

      it('should get parameters for SNP Coverage', function () {
        var trackParam = tracks[6];
        // add defaults - min.score
        lang.mixin(trackParam, {
          'min_score': 0
        });
        var params = parametersUtil._handleTrackTypeParameters(6, trackParam.type, trackParam, pluginConfig);
        expect(params.key).toBe(trackParam.key);
        expect(params.trackNum).toBe(6);
        expect(params.height).toEqual({
          title: 'Track height',
          value: undefined,
          delta: 10
        });
        expect(params.ypos).toEqual({
          title: 'Y-scale position',
          value: 'center'
        });
        expect(params.min).toEqual({
          title: 'Min. score',
          value: 0,
          delta: 10
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: undefined,
          delta: 10
        });
        expect(params.quant).toBe(true);
        expect(params.html).not.toBeDefined();
      }); // end should get parameters for SNP Coverage

      it('should get parameters for Alignments', function () {
        var trackConfig = tracks[7];
        trackConfig.maxHeight = 1000;
        var params = parametersUtil._handleTrackTypeParameters(7, trackConfig.type, trackConfig, pluginConfig);
        expect(params.key).toBe(trackConfig.key);
        expect(params.trackNum).toBe(7);
        expect(params.height).toEqual({
          title: 'Track height',
          value: 1000,
          delta: 10
        });
      }); // end should get parameters for Alignments

      it('should get parameters for Wiggle XYPlot', function () {
        var trackConfig = tracks[8];
        lang.mixin(trackConfig, {
          style: {
            height: 100
          }
        });
        var params = parametersUtil._handleTrackTypeParameters(8, trackConfig.type, trackConfig, pluginConfig);
        expect(params.key).toBe(trackConfig.key);
        expect(params.trackNum).toBe(8);
        // height, ypos, html, min, max, quant, html
        expect(params.height).toEqual({
          title: 'Track height',
          value: 100,
          delta: 10
        });
        expect(params.ypos).toEqual({
          title: 'Y-scale position',
          value: 'center'
        });
        expect(params.min).toEqual({
          title: 'Min. score',
          value: undefined,
          delta: 10
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: undefined,
          delta: 10
        });
        expect(params.quant).toBe(true);
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });
      }); // end should get parameters for Wiggle XYPlot

      it('should get parameters for Wiggle Density', function () {
        var trackConfig = tracks[9];
        // add default height
        lang.mixin(trackConfig, {
          style: {
            height: 31
          }
        });
        var params = parametersUtil._handleTrackTypeParameters(9, trackConfig.type, trackConfig, pluginConfig);
        expect(params.key).toBe(trackConfig.key);
        expect(params.trackNum).toBe(9);
        // height, ypos, html, min, max, quant, html
        expect(params.height).toEqual({
          title: 'Track height',
          value: 31,
          delta: 10
        });
        expect(params.ypos).not.toBeDefined();
        expect(params.min).toEqual({
          title: 'Min. score',
          value: undefined,
          delta: 10
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: undefined,
          delta: 10
        });
        expect(params.quant).toBe(true);
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });

      }); // end should get parameters for Wiggle Density

      it('should get parameters for Small RNA Alignments', function () {
        var trackConfig = tracks[10];
        // defaults - displayStyle, displayMode, maxHeight, histograms.height, histograms.min
        lang.mixin(trackConfig, {
          maxHeight: 400,
          displayMode: 'normal',
          displayStyle: 'default',
          histograms: {
            height: 100,
            min: 0
          }
        });
        var params = parametersUtil._handleTrackTypeParameters(10, trackConfig.type, trackConfig, pluginConfig);
        expect(params.key).toBe(trackConfig.key);
        expect(params.trackNum).toBe(10);
        // height, html, style
        expect(params.height).toEqual({
          title: 'Track height',
          value: 400,
          delta: 10
        });
        expect(params.ypos).toEqual({
          title: 'Y-scale position',
          value: 'center'
        });
        expect(params.min).toEqual({
          title: 'Min. score',
          value: 0,
          delta: 10
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: undefined,
          delta: 10
        });
        expect(params.style).toEqual({
          title: 'Feature style',
          value: 'default'
        });
        expect(params.quant).toBe(false);
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });
      }); // end should get parameters for Small RNA Alignments

      it('should get parameters for Methylation', function () {
        var trackConfig = tracks[11];
        // defaults - min_score, max_score
        lang.mixin(trackConfig, {
          min_score: -1,
          max_score: 1
        });
        var params = parametersUtil._handleTrackTypeParameters(11, trackConfig.type, trackConfig, pluginConfig);
        expect(params.key).toBe(trackConfig.key);
        expect(params.trackNum).toBe(11);
        // height, ypos, min, max, html, quant
        expect(params.height).toEqual({
          title: 'Track height',
          value: undefined,
          delta: 10
        });
        expect(params.ypos).toEqual({
          title: 'Y-scale position',
          value: 'center'
        });
        expect(params.min).toEqual({
          title: 'Min. score',
          value: -1,
          delta: 0.1
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: 1,
          delta: 0.1
        });
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });
        expect(params.quant).toBe(true);
      }); // end should get parameters for Methylation

      it('should get parameters for StrandedXYPlot', function () {
        var trackConfig = tracks[12];
        var params = parametersUtil._handleTrackTypeParameters(12, trackConfig.type, trackConfig, pluginConfig);
        expect(params.key).toBe(trackConfig.key);
        expect(params.trackNum).toBe(12);
        // height, ypos, min, max, html
        expect(params.height).toEqual({
          title: 'Track height',
          value: undefined,
          delta: 10
        });
        expect(params.ypos).toEqual({
          title: 'Y-scale position',
          value: 'center'
        });
        expect(params.min).toEqual({
          title: 'Min. score',
          value: undefined,
          delta: 10
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: undefined,
          delta: 10
        });
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });
      }); // end should get parameters for StrandedXYPlot

      it('should get parameters for MotifDensity', function () {
        var trackConfig = tracks[13];
        // defaults min_score: 0, max_score: 1, style.height: 100
        lang.mixin(trackConfig, {
          min_score: 0,
          max_score: 1,
          style: {
            height: 100
          }
        });
        var params = parametersUtil._handleTrackTypeParameters(13, trackConfig.type, trackConfig, pluginConfig);
        expect(params.key).toBe(trackConfig.key);
        expect(params.trackNum).toBe(13);
        // height, min, max, quant, html
        expect(params.height).toEqual({
          title: 'Track height',
          value: 100,
          delta: 10
        });
        expect(params.min).toEqual({
          title: 'Min. score',
          value: 0,
          delta: 10
        });
        expect(params.max).toEqual({
          title: 'Max. score',
          value: 1,
          delta: 10
        });
        expect(params.quant).toBe(true);
        expect(params.html).toEqual({
          title: 'HTML/SVG features',
          value: false
        });
      }); // end shoud get parameters for MotifDensity

      it('should get parameters for list of tracks', function () {
        var testTracks = tracks.slice(0, 14);
        var visibleTracks = testTracks.map(function (el) {
          return {
            label: el.label,
            config: el
          }
        });
        var params = parametersUtil.getTrackParameters(visibleTracks, pluginConfig);
        var trackKeys = Object.keys(params);
        expect(trackKeys.length).toBe(14);
      }); // end should get parameters for list of tracks
    }); // end Test track parameters

  }); // end Test ParametersUtil

  describe('Test EncodeDecodeUtil', function () {
    describe('Test encode methods', function () {
      describe('Test PhantomJS encode', function () {
        it('should encode for non-PDF output', function () {
          var params = {
            url: 'http://url.com',
            format: {
              value: 'PNG'
            },
            zoom: {
              value: 2
            },
            quality: {
              value: 80
            },
            image: {
              width: {
                value: 2400
              },
              height: {
                value: 3200
              }
            }
          };
          var paramsUrl = encodeDecodeUtil.encodePhantomJSSettings(params);
          var expected = '?request={url:"http://url.com",renderType:"PNG",renderSettings:{zoomFactor:2,quality:80,viewPort:{width:2400,height:3200}}}'
          expect(paramsUrl.toLowerCase()).toEqual(expected.toLowerCase());
        }); // should get output for non-PDF output

        it('should encode for PDF output', function () {
          var params = {
            url: 'http://url.com',
            format: {
              value: 'PDF'
            },
            zoom: {
              value: 1
            },
            quality: {
              value: 80
            },
            pdf: {
              pdfWidth: {
                value: 1800
              },
              pdfHeight: {
                value: 2400
              },
              page: {
                value: 'letter landscape'
              }
            }
          };
          var paramsUrl = encodeDecodeUtil.encodePhantomJSSettings(params);
          var expected = '?request={url:"http://url.com",renderType:"PDF",renderSettings:{zoomFactor:1,quality:80,pdfOptions:{format:"letter",orientation:"landscape",footer:null},viewPort:{width:1800,height:2400}}}'
          expect(paramsUrl.toLowerCase()).toEqual(expected.toLowerCase());
        }); // should get output for PDF output

        it('should encode for extra time', function () {
          var params = {
            url: 'http://url.com',
            format: {
              value: 'JPG'
            },
            zoom: {
              value: 2
            },
            quality: {
              value: 100
            },
            image: {
              width: {
                value: 2800
              },
              height: {
                value: 3000
              }
            },
            time: {
              value: true,
              extra: {
                value: 50
              }
            }
          };
          var paramsUrl = encodeDecodeUtil.encodePhantomJSSettings(params);
          var expected = '?request={url:"http://url.com",renderType:"JPG",requestSettings:{maxWait:50000},renderSettings:{zoomFactor:2,quality:100,viewPort:{width:2800,height:3000}}}'
          expect(paramsUrl.toLowerCase()).toEqual(expected.toLowerCase());
        }); // should get output for extra time
      }); // end Test PhantomJS encode

      describe('Test general settings encode', function () {

        var defaultParams = {
          trackSpacing: {
            value: 20
          },
          locOver: {
            value: true
          },
          trackList: {
            value: true
          },
          nav: {
            value: true
          },
          menu: {
            value: true
          },
          labels: {
            value: true
          },
          zoom: {
            value: 1
          },
          methylation: {
            CG: true,
            CHG: true,
            CHH: true,
            '4mC': true,
            '5hmC': true,
            '6mA': true
          },
          smallrna: {
            '21': false,
            '22': false,
            '23': false,
            '24': false,
            'pi': false,
            Others: false
          }
        };
        it('should encode for defaults', function () {
          var params = lang.clone(defaultParams);
          var paramsUrl = encodeDecodeUtil._encodeGeneralSettings(params);
          var expected = 'p20o1r1n1u1b1z1m111111s000000'
          expect(paramsUrl.toLowerCase()).toEqual(expected.toLowerCase());
        }); // end should get defaults

        it('should encode for hiding nav, locOver, menu, trackList', function () {
          var params = lang.mixin(lang.clone(defaultParams), {
            locOver: {
              value: false
            },
            trackList: {
              value: false
            },
            nav: {
              value: false
            },
            menu: {
              value: false
            }
          });

          var paramsUrl = encodeDecodeUtil._encodeGeneralSettings(params);
          var expected = 'p20o0r0n0u0b1z1m111111s000000'
          expect(paramsUrl.toLowerCase()).toEqual(expected.toLowerCase());
        }); // end should get for hiding nav, locOver, menu, trackList

        it('should encode for hiding some methylation', function () {
          var params = lang.clone(defaultParams);
          params.trackList.value = false;
          lang.mixin(params.methylation, {
            CHG: false,
            CHH: false
          });
          var paramsUrl = encodeDecodeUtil._encodeGeneralSettings(params);
          var expected = 'p20o1r0n1u1b1z1m100111s000000'
          expect(paramsUrl.toLowerCase()).toEqual(expected.toLowerCase());
          var params2 = lang.clone(params);
          lang.mixin(params2.methylation, {
            CHG: true,
            CHH: true,
            '4mC': false,
            '5hmC': false,
            '6mA': false
          });
          var paramsUrl2 = encodeDecodeUtil._encodeGeneralSettings(params2);
          var expected2 = 'p20o1r0n1u1b1z1m111000s000000'
          expect(paramsUrl2.toLowerCase()).toEqual(expected2.toLowerCase());
        }); // end should get for hiding some methylation

        it('should encode for hiding some small rna', function () {
          // small rna in form: {size: boolean,size:boolean}
          var params = lang.clone(defaultParams);
          params.menu.value = false;
          lang.mixin(params.smallrna, {
            '22': true,
            '23': true,
            'pi': true
          });
          var paramsUrl = encodeDecodeUtil._encodeGeneralSettings(params);
          var expected = 'p20o1r1n1u0b1z1m111111s011010'
          expect(paramsUrl.toLowerCase()).toEqual(expected.toLowerCase());
          var params2 = lang.clone(params);
          lang.mixin(params2.smallrna, {
            '21': true,
            '22': true,
            '23': true,
            'pi': true,
            'Others': true
          });
          var paramsUrl2 = encodeDecodeUtil._encodeGeneralSettings(params2);
          var expected2 = 'p20o1r1n1u0b1z1m111111s111011'
          expect(paramsUrl2.toLowerCase()).toEqual(expected2.toLowerCase());
        }); // end should get for hiding some small rna

      }); // end Test general settings encode

      describe('Test track settings encode', function () {
        // params: key, trackNum, height, ypos, min,  max, style, mode, html\
        it('should encode for CanvasFeatures', function () {
          var params = {
            key: 'CanvasFeatures',
            trackNum: 1,
            height: {
              value: 600
            },
            ypos: {
              value: 'center'
            },
            min: {
              value: 0
            },
            max: {
              value: undefined
            },
            quant: false,
            style: {
              value: 'default'
            },
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~1h600y1i0q0f0v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for CanvasFeatures

        it('should encode for HTMLFeatures', function () {
          var params = {
            key: 'HTMLFeatures',
            trackNum: 2,
            height: {
              value: 1000
            },
            ypos: false
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~2h1000';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for HTMLFeatures

        it('should encode for CanvasVariants', function () {
          var params = {
            key: 'CanvasVariants',
            trackNum: 3,
            height: {
              value: 1000
            },
            ypos: false,
            html: {
              value: true
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~3h1000v1';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for CanvasVariants

        it('should encode for HTMLVariants', function () {
          var params = {
            key: 'HTMLVariants',
            trackNum: 4,
            height: {
              value: 1000
            },
            ypos: false
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~4h1000';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for HTMLVariants

        it('should encode for Alignments2', function () {
          var params = {
            key: 'Alignments2',
            trackNum: 5,
            height: {
              value: 600
            },
            ypos: {
              value: 'center'
            },
            min: {
              value: 0
            },
            max: {
              value: undefined
            },
            quant: false,
            mode: {
              value: 'normal'
            },
            style: {
              value: 'default'
            },
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~5h600y1i0q0d0f0v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for Alignments2

        it('should encode for SNPCoverage', function () {
          var params = {
            key: 'SNPCoverage',
            trackNum: 6,
            height: {
              value: 100
            },
            ypos: {
              value: 'center'
            },
            min: {},
            max: {},
            quant: true,
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~6h100y1q1v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for SNPCoverage

        it('should get encode for Alignments', function () {
          var params = {
            key: 'Alignments',
            trackNum: 7,
            height: {
              value: 1000
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~7h1000';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for Alignments

        it('should get encode for Wiggle XY', function () {
          var params = {
            key: 'Wiggle XY',
            trackNum: 8,
            height: {
              value: 100
            },
            ypos: {
              value: 'center'
            },
            min: {},
            max: {},
            quant: true,
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~8h100y1q1v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for Wiggle XY

        it('should get encode for Wiggle Density', function () {
          var params = {
            key: 'Wiggle Density',
            trackNum: 9,
            height: {
              value: 31
            },
            min: {},
            max: {},
            quant: true,
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~9h31q1v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for Wiggle Density

        it('should get encode for Small RNA Alignments', function () {
          var params = {
            key: 'smAlignments',
            trackNum: 10,
            height: {
              value: 400
            },
            ypos: {
              value: 'center'
            },
            min: {
              value: 0
            },
            max: {},
            style: {
              value: 'default'
            },
            quant: false,
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~10h400y1i0f0q0v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for Small RNA Alignments

        it('should get encode for Methylation', function () {
          var params = {
            key: 'MethylPlot',
            trackNum: 11,
            ypos: {
              value: 'center'
            },
            min: {
              value: -1
            },
            max: {
              value: 1
            },
            quant: true,
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~11y1i-1x1q1v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for Methylation

        it('should get encode for StrandedXYPlot', function () {
          var params = {
            key: 'StrandedXYPlot',
            trackNum: 12,
            ypos: {
              value: 'center'
            },
            min: {},
            max: {},
            quant: true,
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~12y1q1v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for StrandedXYPlot

        it('should get encode for MotifDensity', function () {
          var params = {
            key: 'MotifDensity',
            trackNum: 13,
            height: {
              value: 100
            },
            min: {
              value: 0
            },
            max: {
              value: 1
            },
            quant: true,
            html: {
              value: false
            }
          };
          var paramsUrl = encodeDecodeUtil._encodeTrack(params);
          var expected = '~13h100i0x1q1v0';
          expect(paramsUrl).toBe(expected);
        }); // end should get encode for MotifDensity

        it('should encode different y-scale positions', function () {
          var posList = ['center', 'left', 'right', 'none'];
          var trackList = posList.map(function (el, i) {
            return {
              trackNum: i,
              height: {
                value: 75
              },
              ypos: {
                value: el
              }
            }
          });
          var paramsUrl = encodeDecodeUtil._endcodeTrackSettings(trackList);
          var expected = '~0h75y1~1h75y2~2h75y3~3h75y0';
          expect(paramsUrl).toBe(expected);
        }); // end should encode different y-scale positions

        it('should encode different display modes', function () {
          var modeList = ['compact', 'normal', 'collapsed'];
          var trackList = modeList.map(function (el, i) {
            return {
              trackNum: i,
              height: {
                value: 50
              },
              mode: {
                value: el
              }
            }
          });
          var paramsUrl = encodeDecodeUtil._endcodeTrackSettings(trackList);
          var expected = '~0h50d1~1h50d0~2h50d2';
          expect(paramsUrl).toBe(expected);
        }); // end should encode different display modes

        it('should encode different feature styles', function () {
          var styleList = ['histograms', 'features', 'default'];
          var trackList = styleList.map(function (el, i) {
            return {
              trackNum: i,
              height: {
                value: 100
              },
              style: {
                value: el
              },
              html: {
                value: true
              }
            }
          });
          var paramsUrl = encodeDecodeUtil._endcodeTrackSettings(trackList);
          var expected = '~0h100f2v1~1h100f1v1~2h100f0v1';
          expect(paramsUrl).toBe(expected);
        }); // end should encode different feature styles

      }); // end Test track settings encode

      it('should get full encode', function () {
        var generalParams = {
          trackSpacing: {
            value: 15
          },
          locOver: {
            value: true
          },
          trackList: {
            value: false
          },
          nav: {
            value: false
          },
          menu: {
            value: true
          },
          labels: {
            value: true
          },
          zoom: {
            value: 1
          },
          methylation: {
            CG: true,
            CHG: true,
            CHH: true,
            '4mC': false,
            '5hmC': true,
            '6mA': true
          },
          smallrna: {
            '21': false,
            '22': false,
            '23': false,
            '24': false,
            'pi': false,
            Others: true
          }
        };
        var trackParams = [
          {
            key: 'CanvasFeatures',
            trackNum: 0,
            height: {
              value: 600
            },
            ypos: {
              value: 'center'
            },
            min: {
              value: 0
            },
            max: {
              value: undefined
            },
            quant: false,
            style: {
              value: 'default'
            },
            html: {
              value: false
            }
        },
          {
            key: 'Alignments2',
            trackNum: 1,
            height: {
              value: 600
            },
            ypos: {
              value: 'center'
            },
            min: {
              value: 0
            },
            max: {
              value: 700
            },
            quant: false,
            mode: {
              value: 'compact'
            },
            style: {
              value: 'default'
            },
            html: {
              value: false
            }
        },
          {
            key: 'MethylPlot',
            trackNum: 2,
            ypos: {
              value: 'center'
            },
            min: {
              value: -1
            },
            max: {
              value: 1
            },
            quant: true,
            html: {
              value: false
            }
        },
          {
            key: 'smAlignments',
            trackNum: 3,
            height: {
              value: 400
            },
            ypos: {
              value: 'center'
            },
            min: {
              value: 0
            },
            max: {},
            style: {
              value: 'features'
            },
            quant: false,
            html: {
              value: true
            }
        },
          {
            key: 'Wiggle XY',
            trackNum: 4,
            height: {
              value: 100
            },
            ypos: {
              value: 'left'
            },
            min: {},
            max: {},
            quant: true,
            html: {
              value: true
            }
          }];

        var params = {
          general: generalParams,
          tracks: trackParams
        };
        var encodeUrl = encodeDecodeUtil.encode(params);
        var expected = 'p15o1r0n0u1b1z1m111011s000001~0h600y1i0q0f0v0~1h600y1i0x700q0d1f0v0~2y1i-1x1q1v0~3h400y1i0f1q0v1~4h100y2q1v1';
        expect(encodeUrl.toLowerCase()).toEqual(expected.toLowerCase());
      }); // end Test full encode
    }); // end Test encode methods

    describe('Test decode methods', function () {
      describe('Test general settings decode', function () {
        it('should decode for defaults', function () {
          var inUrl = 'p20o1r1n1u1b1z1m111111s000000';
          var settings = encodeDecodeUtil._decodeGeneralSettings(inUrl);
          // settings has basic, view, methylation, smallrna
          expect(settings.basic).toEqual({
            highResolutionMode: 1,
            'show_overview': true,
            'show_tracklist': true,
            'show_nav': true,
            'show_menu': true,
            'show_tracklabels': true
          });
          expect(settings.view).toEqual({
            trackPadding: 20
          });
          expect(settings.methylation).toEqual({
            CG: true,
            CHG: true,
            CHH: true,
            '4mC': true,
            '5hmC': true,
            '6mA': true
          });
          expect(settings.smallrna).toEqual({
            '21': false,
            '22': false,
            '23': false,
            '24': false,
            'pi': false,
            'Others': false
          });
        }); // end it should decode defaults

        it('should decode for hiding nav, locOver, menu, trackList', function () {
          var inUrl = 'p20o0r0n0u0b1z1m111111s000000'
          var settings = encodeDecodeUtil._decodeGeneralSettings(inUrl);
          // settings has basic, view, methylation, smallrna
          expect(settings.basic).toEqual({
            highResolutionMode: 1,
            'show_overview': false,
            'show_tracklist': false,
            'show_nav': false,
            'show_menu': false,
            'show_tracklabels': true
          });
          expect(settings.view).toEqual({
            trackPadding: 20
          });
          expect(settings.methylation).toEqual({
            CG: true,
            CHG: true,
            CHH: true,
            '4mC': true,
            '5hmC': true,
            '6mA': true
          });
          expect(settings.smallrna).toEqual({
            '21': false,
            '22': false,
            '23': false,
            '24': false,
            'pi': false,
            'Others': false
          });
        }); // end should get for hiding nav, locOver, menu, trackList

        it('should get for hiding some methylation', function () {
          var inUrl = 'p20o1r0n1u1b0z4m100111s000000'
          var settings = encodeDecodeUtil._decodeGeneralSettings(inUrl);
          // settings has basic, view, methylation, smallrna
          expect(settings.basic).toEqual({
            highResolutionMode: 4,
            'show_overview': true,
            'show_tracklist': false,
            'show_nav': true,
            'show_menu': true,
            'show_tracklabels': false
          });
          expect(settings.view).toEqual({
            trackPadding: 20
          });
          expect(settings.methylation).toEqual({
            CG: true,
            CHG: false,
            CHH: false,
            '4mC': true,
            '5hmC': true,
            '6mA': true
          });
          expect(settings.smallrna).toEqual({
            '21': false,
            '22': false,
            '23': false,
            '24': false,
            'pi': false,
            'Others': false
          });
        }); // end should get for hiding some methylation

        it('should decode for hiding most small rna', function () {
          var inUrl = 'p10o1r1n1u0b1z1m111111s111011'
          var settings = encodeDecodeUtil._decodeGeneralSettings(inUrl);
          // settings has basic, view, methylation, smallrna
          expect(settings.basic).toEqual({
            highResolutionMode: 1,
            'show_overview': true,
            'show_tracklist': true,
            'show_nav': true,
            'show_menu': false,
            'show_tracklabels': true
          });
          expect(settings.view).toEqual({
            trackPadding: 10
          });
          expect(settings.methylation).toEqual({
            CG: true,
            CHG: true,
            CHH: true,
            '4mC': true,
            '5hmC': true,
            '6mA': true
          });
          expect(settings.smallrna).toEqual({
            '21': true,
            '22': true,
            '23': true,
            '24': false,
            'pi': true,
            'Others': true
          });
        }); // end should decode for hiding most small rna
      }); // end Test general settings decode

      describe('Test track settings decode', function () {
        it('should decode CanvasFeatures', function(){
          var tLabels =['canvasfeatures'];
          var params = ['0h600y1i0q0f0v0'];
          var expected = {histograms: {min:0, height:600}, maxHeight:600, yScalePosition: 'center', displayStyle: 'default'};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({canvasfeatures: expected});
        }); // end should decode CanvasFeatures

        it('should decode HTMLFeatures', function(){
          var tLabels =['htmlfeatures'];
          var params = ['0h800'];
          var expected = {maxHeight:800};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({htmlfeatures: expected});
        }); // end should decode HTMLFeatures

        it('should decode CanvasVariants', function(){
          var tLabels =['canvasvariants'];
          var params = ['0h1000v1'];
          var expected = {type: 'ChangeHTMLFeatures', maxHeight: 1000};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({canvasvariants: expected});
        }); // end should decode CanvasVariants

        it('should decode HTMLVariants', function(){
          var tLabels =['htmlvariants'];
          var params = ['0h1000'];
          var expected = {maxHeight: 1000};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({htmlvariants: expected});
        }); // end should decode HTMLVariants

        it('should decode Alignments2', function(){
          var tLabels =['alignments2'];
          var params = ['0h600y1i0q0d0f0v0'];
          var expected = {histograms: {min:0, height:600}, maxHeight:600, yScalePosition: 'center', displayStyle: 'default', displayMode: 'normal'};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({alignments2: expected});
        }); // end should decode Alignments2

        it('should decode SNPCoverage', function(){
          var tLabels =['snpcoverage'];
          var params = ['0h100y1q1v0'];
          var expected = {style: {height:100}, yScalePosition: 'center'};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({snpcoverage: expected});
        }); // end should decode SNPCoverage

          it('should decode Alignments', function(){
          var tLabels =['alignments'];
          var params = ['0h1000'];
          var expected = {maxHeight:1000};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({alignments: expected});
        }); // end should decode Alignments

        it('should decode Wiggle XY', function(){
          var tLabels =['wigglexy'];
          var params = ['0h100i0y1q1v0'];
          var expected = {style: {height: 100}, 'min_score': 0, yScalePosition: 'center'};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({wigglexy: expected});
        }); // end should decode Wiggle XY

        it('should decode Wiggle Density', function(){
          var tLabels =['wiggledensity'];
          var params = ['0h31x40q1v0'];
          var expected = {style: {height: 31}, 'max_score': 40};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({wiggledensity: expected});
        }); // end should decode Wiggle Density

        it('should decode Small RNA Alignments', function(){
          var tLabels =['smalignments'];
          var params = ['0h400y1i0f0q0v0'];
          var expected = {maxHeight: 400, histograms: {min: 0, height: 400}, displayStyle: 'default', yScalePosition: 'center'};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({smalignments: expected});
        }); // end should decode small RNA Alignments

        it('should decode Methylation', function(){
          var tLabels =['methylation'];
          var params = ['0y1i-1x1q1v0'];
          var expected = {'min_score':-1, 'max_score':1, yScalePosition: 'center', style: {}};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({methylation: expected});
        }); // end should decode small RNA Alignments

        it('should decode StrandedXYPlot', function(){
          var tLabels =['strandedxyplot'];
          var params = ['0h75y1i-200x100q1v0'];
          var expected = {'min_score':-200, 'max_score':100, yScalePosition: 'center', style: {height: 75}};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({strandedxyplot: expected});
        }); // end should decode StrandedXYPlot

        it('should decode MotifDensity', function(){
          var tLabels =['motifdensity'];
          var params = ['0h100i0x1q1v0'];
          var expected = {'min_score':0, 'max_score':1, style: {height: 100}};
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          expect(decoded).toEqual({motifdensity: expected});
        }); // end should decode MotifDensity

        it('should decode different y-scale positions', function(){
          var tLabels = ['right', 'left', 'none', 'center'];
          var params = ['0h75y3','1h75y2','2h75y0','3h75y1'];
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          var tmp;
          tLabels.forEach(function(el){
            tmp = decoded[el];
            expect(tmp.maxHeight).toBe(75);
            expect(tmp.yScalePosition).toBe(el);
          });
        }); // end should decode different y-scale positions

        it('should decode different display modes', function(){
          var tLabels = ['collapsed', 'compact', 'normal'];
          var params = ['0h50d2','1h50d1','2h50d0'];
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          var tmp;
          tLabels.forEach(function(el){
            tmp = decoded[el];
            expect(tmp.maxHeight).toBe(50);
            expect(tmp.displayMode).toBe(el);
          });
        }); // end should decode different display modes

        it('should decode different display feature styles', function(){
          var tLabels = ['features', 'default', 'histograms'];
          var params = ['0h75f1','1h75f0','2h75f2'];
          var decoded = encodeDecodeUtil._decodeTrackSettings(params, tLabels);
          var tmp;
          tLabels.forEach(function(el){
            tmp = decoded[el];
            expect(tmp.maxHeight).toBe(75);
            expect(tmp.displayStyle).toBe(el);
          });
        }); // end should decode different display feature styles

      }); // end Test track settings decode

    it('should full decode', function(){
      var inUrl ='p15o1r0n0u1b1z1m111011s000001~0h600y1i0q0f0v0~1h600y1i0x700q0d1f0v0~2y1i-1x1q1v0~3h400y1i0f1q0v1~4h100y2q1v1';
      var trackList = 'canvasfeatures,alignments2,methylplot,smalignments,wigglexy';
      var expectedGeneral = {
        basic: {highResolutionMode: 1,
            'show_overview': true,
            'show_tracklist': false,
            'show_nav': false,
            'show_menu': true,
            'show_tracklabels': true
        }, view: {trackPadding: 15},
        methylation: {
          CG: true,
            CHG: true,
            CHH: true,
            '4mC': false,
            '5hmC': true,
            '6mA': true
        }, smallrna: {
          '21': false,
            '22': false,
            '23': false,
            '24': false,
            'pi': false,
            'Others': true
        }

      };
      var expectedTracks = {
        canvasfeatures: {maxHeight: 600, histograms: {height: 600, min: 0}, yScalePosition: 'center', displayStyle: 'default'},
        alignments2: {maxHeight: 600, histograms: {height: 600, min: 0, max: 700}, displayMode: 'compact', displayStyle: 'default', yScalePosition: 'center'},
        methylplot: {yScalePosition: 'center', 'min_score': -1, 'max_score': 1, style: {}},
        smalignments: {maxHeight: 400, histograms: {height: 400, min: 0}, yScalePosition: 'center', displayStyle: 'features', type: 'ChangeHTMLFeatures'},
        wigglexy: {style: {height: 100}, yScalePosition: 'left', type: 'ChangeHTMLFeatures'}
      };
      var decoded = encodeDecodeUtil.decode(inUrl, trackList);
      expect(decoded.general).toEqual(expectedGeneral);
      expect(decoded.tracks).toEqual(expectedTracks);
    }); // end should full decode
    }); // end Test decode methods
  }); // end Test EncodeDecodeUtil

  /*describe('Browser test', function(){
    var browser = new Browser({unitTestMode: true});
  }); // end*/
});
