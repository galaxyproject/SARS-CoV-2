define('ScreenShotPlugin/EncodeDecodeUtil', [
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
    var EncodeDecodeUtil;
    EncodeDecodeUtil = {
      encode: function (inputs) {
        // returns string with encode options for screenshot
        var gInputs = inputs.general;
        var tInputs = inputs.tracks;
        //console.log(tInputs);
        return this._encodeGeneralSettings(gInputs) + this._endcodeTrackSettings(tInputs);
      },

      encodePhantomJSSettings: function (params) {
        // params include url, format, height, width, zoom, time
        // ?request={url:"http://www.highcharts.com/demo/pie-donut",renderType:"jpg",renderSettings:{zoomFactor:2,viewport:{width:100,height:500}}}
        // split parameters into pdf type and image type
        var outDict = {
          url: params.url,
          renderType: params.format.value
        };
        var renderDict = {
          zoomFactor: params.zoom.value,
          quality: params.quality.value
        };
        //var outDict = {url: params.url, renderType: params.format.value, renderSettings: {zoomFactor: params.zoom.value, viewport: {width:params.width.value, height: params.height.value}}};
        // check PDF
        if (params.format.value === 'PDF') {
          // page needs split by space, then format, orientation
          var pageFormat = params.pdf.page.value;
          pageFormat = pageFormat.split(' ');
          renderDict['pdfOptions'] = {
            format: pageFormat[0],
            orientation: pageFormat[1],
            footer: null
          };
          renderDict['viewport'] = {
            width: params.pdf.pdfWidth.value,
            height: params.pdf.pdfHeight.value
          };
        } else {
          renderDict['viewport'] = {
            width: params.image.width.value,
            height: params.image.height.value
          };
        }
        // check for extra time
        if (params.time && params.time.value) {
          outDict['requestSettings'] = {
            maxWait: (params.time.extra.value * 1000)
          };
        }
        outDict['renderSettings'] = renderDict;
        var outString = json.stringify(outDict);
        outString = outString.replace(/\"([^(\")"]+)\":/g, "$1:");
        return '?request=' + outString;
      },

      decode: function (inStr, tracks) {
        // returns javascript object to be applied
        // split inStr
        var opts = inStr.split('~');
        var trackList = tracks.split(',')
        var gSettings = this._decodeGeneralSettings(opts[0])
        var tSettings = this._decodeTrackSettings(opts.slice(1), trackList);
        //console.log(tSettings);
        return {
          general: gSettings,
          tracks: tSettings
        };
      },

      _encodeGeneralSettings: function (params) {
        // locOver, menu, methylation, nav, trackList, trackSpacing, labels, zoom, small rna
        var output = '';
        var eLabels = {
          zoom: 'z',
          trackSpacing: 'p',
          locOver: 'o',
          trackList: 'r',
          nav: 'n',
          menu: 'u',
          labels: 'b',
          methylation: 'm',
          smallrna: 's'
        };
        var param;
        var thisB = this;
        for (param in params) {
          var data = params[param];
          if (param === 'methylation'){
            var typesM = ['CG', 'CHG', 'CHH', '4mC', '5hmC', '6mA'];
            output += eLabels[param];
            array.forEach(typesM, function (t) {
              output += thisB._encodeBoolean(data[t])
            });
          }
          else if (param === 'smallrna') {
            output += eLabels[param];
            var typesS = ['21', '22', '23', '24', 'pi', 'Others'];
            array.forEach(typesS, function (t) {
              output += thisB._encodeBoolean(data[t])
            });
          } else if ((param === 'zoom') || (param === 'trackSpacing'))
            output += eLabels[param] + data.value;
          else
            output += eLabels[param] + this._encodeBoolean(data.value);
        }
        return output;
      },

      _endcodeTrackSettings: function (tracks) {
        var output = '';
        // go through object
        var t, params;
        for (t in tracks) {
          params = tracks[t];
          // if we need to encode params
          if (params.hasOwnProperty('opts') === false) {
            output += this._encodeTrack(params);
          }
        }
        return (output);
      },

      _encodeTrack: function (params) {
        // q[0|1] quantitative, y[0|1|2|3] yscale none, center, left, right
        // h# track height, i# min, x# max v[0|1] html features
        // d[0|1|2] display mode normal, compact, collapse
        // f[0|1|2] display style default, features, histograms
        var eLabels = {
          height: 'h',
          min: 'i',
          max: 'x',
          quant: 'q',
          ypos: 'y',
          mode: 'd',
          style: 'f',
          html: 'v'
        };
        var optsDict = {
          ypos: {
            'none': 0,
            'center': 1,
            'left': 2,
            'right': 3
          },
          mode: {
            'normal': 0,
            'compact': 1,
            'collapsed': 2
          },
          style: {
            'default': 0,
            'features': 1,
            'histograms': 2
          }
        };
        var defaultOpts = {
          ypos: 1,
          mode: 0,
          style: 0
        };
        var param, data;

        var output = '~' + params.trackNum;
        // loop through parameters
        for (param in params) {
          data = params[param];
          if (param in {
              'quant': 1
            })
            output += eLabels[param] + this._encodeBoolean(data);
          else if (param in {
              'html': 1
            })
            output += eLabels[param] + this._encodeBoolean(data.value);
          else if (!(data === undefined || data.value === undefined || data.value === null || eLabels.hasOwnProperty(param) === false)) {
            output += eLabels[param]
            // ypos, mode, style
            if (param in {
                ypos: 1,
                mode: 1,
                style: 1
              }) {
              if (optsDict[param][data.value] === undefined){
                console.warn('missing value for ' + param + ', ' + data.value);
                output += defaultOpts[param];
              }
              else
                output += optsDict[param][data.value];
            } else
              output += data.value;
          }
        } // end param
        return (output)
      },

      _encodeBoolean: function (input) {
        return (input ? '1' : '0');
      },

      _decodeBoolen: function (input) {
        return (input === '1' ? true : false)
      },

      _decodeGeneralSettings: function (input) {
        var outProp = {
          basic: {},
          view: {},
          methylation: {},
          smallrna: {}
        };
        // zoom
        var resultZ = /z([0-9]+)/gi.exec(input);
        if (resultZ != null)
          outProp.basic['highResolutionMode'] = parseInt(resultZ[1]);
        // overview
        var resultO = /o([0-1])/gi.exec(input);
        if (resultO != null)
          outProp.basic['show_overview'] = this._decodeBoolen(resultO[1]);
        // tracklist
        var resultR = /r([0-1])/gi.exec(input);
        if (resultR != null)
          outProp.basic['show_tracklist'] = this._decodeBoolen(resultR[1]);
        // navigation
        var resultN = /n([0-1])/gi.exec(input);
        if (resultN != null)
          outProp.basic['show_nav'] = this._decodeBoolen(resultN[1]);
        // menu
        var resultU = /u([0-1])/gi.exec(input);
        if (resultU != null)
          outProp.basic['show_menu'] = this._decodeBoolen(resultU[1]);
        // labels
        var resultB = /b([0-1])/gi.exec(input);
        if (resultB != null)
          outProp.basic['show_tracklabels'] = this._decodeBoolen(resultB[1]);

        // track padding
        var resultP = /p([0-9]+)/gi.exec(input);
        if (resultP != null)
          outProp.view['trackPadding'] = parseInt(resultP[1]);
        // methylation
        var resultM = /m([0-9]+)/gi.exec(input);
        if (resultM != null) {
          outProp.methylation['CG'] = this._decodeBoolen(resultM[1].substring(0, 1));
          outProp.methylation['CHG'] = this._decodeBoolen(resultM[1].substring(1, 2));
          outProp.methylation['CHH'] = this._decodeBoolen(resultM[1].substring(2, 3));
          if(resultM[1].length > 3){
            outProp.methylation['4mC'] = this._decodeBoolen(resultM[1].substring(3, 4));
            outProp.methylation['5hmC'] = this._decodeBoolen(resultM[1].substring(4, 5));
            outProp.methylation['6mA'] = this._decodeBoolen(resultM[1].substring(5, 6));
          }
        }
        var resultS = /s([0-9]+)/gi.exec(input);
        if (resultS != null) {
          outProp.smallrna['21'] = this._decodeBoolen(resultS[1].substring(0, 1));
          outProp.smallrna['22'] = this._decodeBoolen(resultS[1].substring(1, 2));
          outProp.smallrna['23'] = this._decodeBoolen(resultS[1].substring(2, 3));
          outProp.smallrna['24'] = this._decodeBoolen(resultS[1].substring(3, 4));
          outProp.smallrna['pi'] = this._decodeBoolen(resultS[1].substring(4, 5));
          outProp.smallrna['Others'] = this._decodeBoolen(resultS[1].substring(5, 6));
        }
        return outProp;
      },

      _decodeTrackSettings: function (input, trackLabels) {
        var thisB = this;
        // input and trackLabels are both arrays -- iterate through input
        var out = {};
        array.forEach(input, function (parmStr) {

          var resultT = /^[0-9]+/.exec(parmStr);
          if (resultT === null)
            return;
          var tInt = parseInt(resultT[0]);
          var tLabel = trackLabels[tInt];
          parmStr = parmStr.slice(1);
          out[tLabel] = {};
          var isQuant = null;
          // get quant
          var resultQ = /q([0-1])/gi.exec(parmStr);
          if (resultQ != null) {
            isQuant = thisB._decodeBoolen(resultQ[1]);
            if (isQuant)
              out[tLabel]['style'] = {};
            else
              out[tLabel]['histograms'] = {}
          }
          // get html features
          var isHtml = false;
          var resultV = /v([0-1])/gi.exec(parmStr);
          if (resultV != null) {
            isHtml = thisB._decodeBoolen(resultV[1]);
            if (isHtml) {
              out[tLabel]['type'] = 'ChangeHTMLFeatures';
            }
          }
          // get min
          var resultI = /i(-?[0-9]+(\.[0-9])?)/gi.exec(parmStr);
          //console.log(resultI);
          if (resultI != null) {
            var min = parseFloat(resultI[1]);
            if (isQuant)
              out[tLabel]['min_score'] = min;
            else
              out[tLabel]['histograms']['min'] = min;
          }
          // get max
          var resultX = /x(-?[0-9]+(\.[0-9])?)/gi.exec(parmStr);
          //console.log(resultX);
          if (resultX != null) {
            var max = parseFloat(resultX[1]);
            if (isQuant)
              out[tLabel]['max_score'] = max;
            else
              out[tLabel]['histograms']['max'] = max;
          }
          // get height
          var resultH = /h([0-9]+)/gi.exec(parmStr);
          //console.log(resultH);
          if (resultH != null) {
            var height = parseInt(resultH[1]);
            if (isQuant)
              out[tLabel]['style']['height'] = height;
            else if (isQuant === false) {
              out[tLabel]['maxHeight'] = height;
              out[tLabel]['histograms']['height'] = height;
            } else {
              out[tLabel]['maxHeight'] = height;
            }
          }
          // get ypos
          var resultY = /y([0-3])/gi.exec(parmStr);
          //console.log(resultY);
          if (resultY != null) {
            var locList = ['none', 'center', 'left', 'right'];
            var yposI = parseInt(resultY[1]);
            out[tLabel]['yScalePosition'] = locList[yposI];
          }
          // get mode
          var resultD = /d([0-2])/gi.exec(parmStr);
          //console.log(resultY);
          if (resultD != null) {
            var modeList = ['normal', 'compact', 'collapsed'];
            var modeI = parseInt(resultD[1]);
            out[tLabel]['displayMode'] = modeList[modeI];
          }
          // get style
          var resultF = /f([0-2])/gi.exec(parmStr);
          //console.log(resultY);
          if (resultF != null) {
            var styleList = ['default', 'features', 'histograms'];
            var styleI = parseInt(resultF[1]);
            out[tLabel]['displayStyle'] = styleList[styleI];
          }
        });
        return out;
      }

    }
    return EncodeDecodeUtil;
  });
