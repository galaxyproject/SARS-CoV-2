define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom',
    "dojo/dom-attr",
    'dojo/dom-construct',
    'dijit/form/Button',
    'dijit/registry',
    'ScreenShotPlugin/View/Dialog/ScreenShotDialog',
    'ScreenShotPlugin/EncodeDecodeUtil',
    'JBrowse/Plugin',
    "JBrowse/Browser"
],
  function (
    declare,
    lang,
    array,
    dom,
    domAttr,
    domConstr,
    dijitButton,
    dijitRegistry,
    ScreenShotDialog,
    Util,
    JBrowsePlugin,
    Browser
  ) {

    return declare(JBrowsePlugin, {
      constructor: function (args) {
        console.log('l');
        var baseUrl = this._defaultConfig().baseUrl;
        var browser = this.browser;
        this.isScreenshot = false;
        this.config.version = '1.7.0';
        console.log('ScreenShotPlugin starting - v'+this.config.version);

        // PhantomJS Username
        this.config.apiKey = 'a-demo-key-with-low-quota-per-ip-address';
        if (args.apiKey !== undefined)
          this.config.apiKey = args.apiKey;
        // Debug mode (does not make call to PhantomJS)
        this.config.debug = false;
        if (args.debugMode !== undefined)
          this.config.debug = args.debugMode;
        this.config.dialog = false;
        if(args.dialogMode !== undefined)
          this.config.dialog = args.dialogMode;
        // Include option for Canvas Features -> HTML features
        this.config.htmlFeatures = {
          general: false
        };
        if (args.htmlFeatures !== undefined)
          this.config.htmlFeatures = args.htmlFeatures;
        var thisB = this;

        // other plugins
        browser.afterMilestone('initPlugins', function () {
          thisB._determinePluginSupport(args);
          // check for screenshot query parameters
          if (browser.config.queryParams.hasOwnProperty('screenshot')) {
            thisB.isScreenshot = true;
            var encoded = browser.config.queryParams.screenshot;
            var trackList = browser.config.queryParams.tracks;
            var decoded = Util.decode(encoded, trackList);
            // apply
            thisB._applyScreenshotConfig(decoded);
            browser.afterMilestone('loadConfig', function () {
              thisB._applyMethSmRNAConfig(decoded.general.methylation, decoded.general.smallrna);
              thisB._applyTracksConfig(decoded.tracks);
            });
          }
        });

        browser.afterMilestone('initView', function () {
          // create screenshot button (possibly tools menu)
          var menuBar = browser.menuBar;

          function showScreenShotDialog() {
            new ScreenShotDialog({
              requestUrl: thisB._getPhantomJSUrl(),
              browser: browser,
              config: thisB.config
            }).show();
          }

          if (browser.config.show_nav && browser.config.show_menu && (thisB.isScreenshot === false || thisB.config.dialog)) {
            var button = new dijitButton({
              className: 'screenshot-button',
              innerHTML: 'Screen Shot',
              id: 'screenshot-button',
              title: 'take screen shot of browser',
              onClick: showScreenShotDialog
            });
            menuBar.appendChild(button.domNode);
          }
          // shortcut key
          browser.setGlobalKeyboardShortcut('s', showScreenShotDialog);
        });
        browser.afterMilestone('completely initialized', function(){
          if (thisB.config.dialog){
            if(browser.view.tracks.length < 1){
              setTimeout(function(){
            var button = dijitRegistry.byId('screenshot-button');
            button.onClick();
                }, 700)
            }
          }
        })
      }, // end constructor

      _getPhantomJSUrl: function () {
        return 'https://phantomjscloud.com/api/browser/v2/';
      },

      _determinePluginSupport: function (args) {
        var config = this.config;
        var browser = this.browser;
        /* METHYLATION PLUGIN */
        config.methylPlugin = false;
        // test that browser has the plugin
        if (browser.plugins.hasOwnProperty('MethylationPlugin')) {
          config.methylPlugin = true;
          // test version for html features -> 3.1.0
          config.htmlFeatures['methyl'] = (browser.plugins.MethylationPlugin.config.hasOwnProperty('version')) ? (browser.plugins.MethylationPlugin.config.version >= '3.1.0') : false;
        }

        /* SMALL RNA PLUGIN */
        config.smrnaPlugin = false;
        if (browser.plugins.hasOwnProperty('SmallRNAPlugin')) {
          config.smrnaPlugin = true;
          // test version for html features -> "1.4.0"
          config.htmlFeatures['smrna'] = (browser.plugins.SmallRNAPlugin.config.hasOwnProperty('version')) ? (browser.plugins.SmallRNAPlugin.config.version >= '1.4.0') : false;
        }

        /* STRANDED XYPLOT PLUGIN */
        config.strandedPlugin = false;
        if (browser.plugins.hasOwnProperty('StrandedPlotPlugin')) {
          config.strandedPlugin = true;
          // test version for html features -> "1.1.0"
          config.htmlFeatures['strandedplot'] = (browser.plugins.StrandedPlotPlugin.config.hasOwnProperty('version')) ? (browser.plugins.StrandedPlotPlugin.config.version >= '1.1.0') : false;
        }

        /* MOTIF DENSITY PLUGIN */
        config.motifDensPlugin = false;
        if(browser.plugins.hasOwnProperty('MotifDensityPlugin')){
          config.motifDensPlugin = true;
          config.htmlFeatures['motifdens'] = (browser.plugins.MotifDensityPlugin.config.hasOwnProperty('version')) ? (browser.plugins.MotifDensityPlugin.config.version >= '2.0.0') : false;
        }

        /* WIGGLE SVG PLOT PLUGIN */
        config.wiggleSVGPlugin = false;
        if (browser.plugins.hasOwnProperty('WiggleSVGPlotPlugin')) {
          config.wiggleSVGPlugin = true;
          config.htmlFeatures['wiggle'] = true;
        }

        // this is a true or false value since we don't actually need the path
        // just need to know if it exists
        config.seqViewsPlugin = browser.plugins.hasOwnProperty('SeqViewsPlugin');
        if (args.seqViewsPlugin !== undefined)
          config.seqViewsPlugin = args.seqViewsPlugin;
      },

      _applyScreenshotConfig: function (params) {
        // params have general and track-specific
        // params.general have basic, methylation, view, labels
        // Note: this.browser.config gets overwritten with each mixin
        lang.mixin(this.browser.config, params.general.basic);
        lang.mixin(this.browser.config.view, params.general.view);
      },

      _applyMethSmRNAConfig: function (mParams, sParams) {
        // filter mParams by extended modifications if necessary
        if(!this.browser.plugins.MethylationPlugin.config.extendedMods){
          var rmTypes = ['4mC', '5hmC', '6mA'];
          array.forEach(rmTypes, function(t){
            if(mParams.hasOwnProperty(t))
              delete mParams[t]
          });
        }
        var thisB = this;
        var s, m, t;
        var mmix = {};
        for (m in mParams) {
          if (mParams[m] === false) {
            mmix['show' + m] = false;
          }
        }
        var smix = {};
        for (s in sParams) {
          if (sParams[s] === true) {
            smix['hide' + s] = true;
          }
        }
        var tracks = lang.clone(thisB.browser.trackConfigsByName);
        for (t in tracks) {
          if (thisB._testMethylation(tracks[t].type)) {
            lang.mixin(thisB.browser.trackConfigsByName[t], mmix);
          } else if (thisB._testSmallRNA(tracks[t].type)) {
            lang.mixin(thisB.browser.trackConfigsByName[t], smix);
          }
        }

      },

      _testMethylation: function (trackType) {
        if (trackType === undefined || trackType === null)
          return false;
        return ((/(Methyl.*Plot$)/.test(trackType)));
      },

      _testSmallRNA: function (trackType) {
        if (trackType === undefined || trackType === null)
          return false;
        return (/(sm.*Alignments$)/.test(trackType));
      },

      _applyTracksConfig: function (params) {
        var thisB = this;
        var tracks = lang.clone(thisB.browser.trackConfigsByName);
        // loop through tracks
        var t;
        for (t in tracks) {
          if (params.hasOwnProperty(t)) {
            // check small rna html features
            // handle changes to html feature styles
            if (params[t].type === 'ChangeHTMLFeatures') {
              if (thisB._testSmallRNA(tracks[t].type)) {
                params[t].type = 'SmallRNAPlugin/View/Track/smHTMLAlignments'
              } else if (/CanvasFeatures$/.test(tracks[t].type)) {
                params[t].type = 'JBrowse/View/Track/HTMLFeatures';
                params[t].trackType = "HTMLFeatures";
              } else if (/CanvasVariants$/.test(tracks[t].type)) {
                params[t].type = 'JBrowse/View/Track/HTMLVariants';
                params[t].trackType = "HTMLVariants";
              } else if (/Alignments2$/.test(tracks[t].type)) {
                params[t].type = 'JBrowse/View/Track/Alignments';
              } else if (/MethylPlot$/.test(tracks[t].type)) {
                params[t].type = 'MethylationPlugin/View/Track/Wiggle/MethylHTMLPlot';
                params[t].maxHeight = params[t].style.height;
                delete params[t].style.height;
              } else if (/StrandedXYPlot$/.test(tracks[t].type)) {
                params[t].type = 'StrandedPlotPlugin/View/Track/Wiggle/StrandedSVGPlot';
              } else if (/\b(XYPlot)/.test(tracks[t].type)){
                params[t].type = 'WiggleSVGPlotPlugin/View/Track/Wiggle/SVGXYPlot';
              } else if (/\b(Density)/.test(tracks[t].type)){
                params[t].type = 'WiggleSVGPlotPlugin/View/Track/Wiggle/SVGDensity';
              } else if(/\b(MotifDensity)/.test(tracks[t].type)){
                params[t].type = 'MotifDensityPlugin/View/Track/MotifSVGDensity';
              }
            }
            // pull out histograms and/or style
            var hist = params[t].histograms;
            if (hist !== undefined) {
              lang.mixin(thisB.browser.trackConfigsByName[t]['histograms'], hist);
              delete params[t].histograms;
            }
            var style = params[t].style;
            thisB.browser.trackConfigsByName[t].style = thisB.browser.trackConfigsByName[t]['style'] || {};
            if (style !== undefined) {
              lang.mixin(thisB.browser.trackConfigsByName[t]['style'], style);
              delete params[t].style;
            }
            lang.mixin(thisB.browser.trackConfigsByName[t], params[t]);
          }
        }
      },

      _applyTrackLabelConfig: function () {
        var thisB = this;
        if (thisB.browser.plugins.hasOwnProperty('HideTrackLabels')) {
          //console.log('call')
          thisB.browser.showTrackLabels((thisB.browser.config.show_tracklabels ? 'show' : 'hide'))
        }
      }
    });
  });
