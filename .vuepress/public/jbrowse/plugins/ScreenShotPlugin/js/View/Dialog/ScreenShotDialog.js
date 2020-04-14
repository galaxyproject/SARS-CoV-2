define("ScreenShotPlugin/View/Dialog/ScreenShotDialog", [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/dom-attr',
    'dojo/_base/array',
    'dojo/on',
    'dijit/focus',
    "dijit/registry",
    'dijit/form/CheckBox',
    'dijit/form/NumberSpinner',
    'dijit/form/RadioButton',
    "dijit/form/Select",
    "dijit/form/ValidationTextBox",
    'dijit/layout/ContentPane',
    'dijit/layout/TabContainer',
    'dijit/form/Button',
    'JBrowse/View/Dialog/WithActionBar',
    'JBrowse/Model/Location',
    'ScreenShotPlugin/EncodeDecodeUtil',
    'ScreenShotPlugin/ParametersUtil'
    ],
  function (
    declare,
    lang,
    dom,
    domStyle,
    domAttr,
    array,
    on,
    focus,
    registry,
    dijitCheckBox,
    dijitNumberSpinner,
    dijitRadioButton,
    dijitSelect,
    dijitTextBox,
    dijitContentPane,
    dijitTabContainer,
    Button,
    ActionBarDialog,
    Location,
    Util,
    Parameters
  ) {

    return declare(ActionBarDialog, {
      /**
       * Dijit Dialog subclass to take a screenshot
       */

      title: 'Take screenshot',
      autofocus: false,

      constructor: function (args) {
        this.browser = args.browser;
        this.parameters = this._getInitialParameters();
        this.requestUrl = args.requestUrl;
        this.defaultApi = args.config.apiKey;
        this.setCallback = args.setCallback || function () {};
        this.cancelCallback = args.cancelCallback || function () {};
        this.vTracks = this.browser.view.visibleTracks();
        //console.log(this.vTracks);
        this.pluginConfig = args.config || {};
        //console.log(this.pluginConfig);
        this.trackParameters = this._getTrackParameters();
      },

      _fillActionBar: function (actionBar) {
        dojo.addClass(actionBar, 'screenshot-dialog-actionbar');
        var ok_button = new Button({
          label: "Render",
          onClick: lang.hitch(this, function () {
            // screenshot parameters
            //console.log(this.parameters);
            var gParams = this.parameters.view;
            gParams.methylation = this.parameters.methylation;
            gParams.smallrna = {};
            for (var s in this.parameters.smallrna) {
              gParams.smallrna[s] = !this.parameters.smallrna[s]['value'];
            }
            gParams.zoom = this.parameters.output.zoom
            var scParams = {
              general: gParams,
              tracks: this.trackParameters
            };
            //console.log(scParams);
            // js params
            var jsParams = this.parameters.output;
            // get the url
            var url = this._getPhantomJSUrl(scParams, jsParams);
            if (this.pluginConfig.debug)
              console.log(url);
            else
              window.open(url);
            this.setCallback && this.setCallback();
            //this.hide();
          })
        }).placeAt(actionBar);

        var cancel_button = new Button({
          label: "Cancel",
          onClick: lang.hitch(this, function () {
            //console.log(this.trackParameters);
            this.cancelCallback && this.cancelCallback();
            this.hide();
          })
        }).placeAt(actionBar);
      },

      show: function (callback) {
        var thisB = this;
        dojo.addClass(this.domNode, 'screenshot-dialog');

        // For general config and output config options
        var mainPaneTop = dom.create('div', {
          className: 'screenshot-dialog-pane',
          id: 'screenshot-dialog-pane-top'
        });
        // for general config
        var mainPaneTopLeft = new dijitContentPane({
          className: 'screenshot-dialog-pane-sub',
          id: 'screenshot-dialog-pane-top-left',
          title: 'General configuration options'
        });
        var mainPaneTopL = mainPaneTopLeft.containerNode;
        thisB._paneGen(mainPaneTopL);
        mainPaneTopLeft.placeAt(mainPaneTop);

        // for output config
        var mainPaneTopRight = new dijitContentPane({
          className: 'screenshot-dialog-pane-sub',
          id: 'screenshot-dialog-pane-top-right',
          title: 'Output configuration options'
        });
        var mainPaneTopR = mainPaneTopRight.containerNode;
        thisB._paneOut(mainPaneTopR);
        mainPaneTopRight.placeAt(mainPaneTop);

        // for tracks
        var mainPaneBottom = dom.create('div', {
          className: 'screenshot-dialog-pane',
          id: 'screenshot-dialog-pane-bottom'
        });
        thisB._paneTracks(mainPaneBottom);

        var paneFooter = dom.create('div', {
          className: 'screenshot-dialog-pane-bottom-warning',
          innerHTML: 'Local configuration changes will be ignored. Default configuration will be used unless specified in this dialog.<br>Rendering will open a new window.'
        });

        this.set('content', [
            mainPaneTop,
            mainPaneBottom,
            paneFooter
        ]);

        // hide/show based on output format
        domStyle.set("screenshot-dialog-image-rows", "display", (thisB.parameters.output.format === 'PDF' ? 'none' : ''));
        domStyle.set('screenshot-dialog-pdf-rows', 'display', (thisB.parameters.output.format == 'PDF' ? '' : 'none'));
        domStyle.set('screenshot-dialog-row-maxtime', 'display', (thisB.parameters.output.time.value ? '' : 'none'));
        domStyle.set('screenshot-dialog-row-apikey', 'display', (thisB.parameters.output.key.value ? '' : 'none'));

        this.inherited(arguments);
      },

      _paneGen: function (obj) {
        var thisB = this;
        var viewParam = thisB.parameters.view;
        var param;
        dom.create('h2', {
          'innerHTML': 'General configuration options'
        }, obj);
        var table = dom.create('table', {
          'class': 'screenshot-dialog-opt-table'
        }, obj);
        // check box parameters -> location overview, tracklist, nav, menu bars
        for (param in viewParam) {
          var data = viewParam[param];
          var row = dom.create('tr', {
            id: 'screenshot-dialog-row-' + param
          }, table);
          dom.create('td', {
            'innerHTML': data.title,
            'class': 'screenshot-dialog-pane-label'
          }, row);
          var td = dom.create('td', {
            'class': 'screenshot-dialog-pane-input'
          }, row);
          var input;
          if (param === 'trackSpacing') {
            input = new dijitNumberSpinner({
              id: 'screenshot-dialog-' + param + '-spinner',
              value: data.value,
              '_prop': param,
              constraints: {
                min: 0,
                max: 40
              },
              smallDelta: 5,
              intermediateChanges: true,
              style: "width:50px;"
            });
          } else {
            /*if(param === 'labels'){
                input = null;
            }else{*/
            input = new dijitCheckBox({
              id: 'screenshot-dialog-opt-box-' + param,
              '_prop': param,
              checked: data.value
            });
            //}
          }
          if (input !== null) {
            input.onClick = lang.hitch(thisB, '_setParameter', input);
            input.placeAt(td, 'first');
          }
        } // end for param
        //
        if (thisB.pluginConfig.smrnaPlugin || thisB.pluginConfig.methylPlugin) {
          thisB._methylation_smrna_table(obj);
        }
      },

      _methylation_smrna_table: function (obj) {
        var thisB = this;
        var table = dom.create('table', {
          'class': 'screenshot-dialog-opt-table'
        }, obj);
        var row, row2, tdata, box, cdata;
        // methylation
        if (thisB.pluginConfig.methylPlugin) {
          var cdata = thisB.browser.plugins.MethylationPlugin.config;
          row = dom.create('tr', {
            id: 'screenshot-dialog-row-methyl'
          }, table);
          dom.create('td', {
            innerHTML: 'Methylation',
            className: 'screenshot-dialog-pane-label',
            'colspan': 3
          }, row);
          row2 = dom.create('tr', {
            'id': 'screenshot-dialog-row-methyl-boxes'
          }, table);
          // methylation types - animal vs plants
          /*var mTypes = (cdata.isAnimal ? {
            CG: true,
            CH: true
          } : thisB.parameters.methylation);*/
          var mTypes1 = (cdata.isAnimal ? ['CG', 'CH'] : ['CG', 'CHG', 'CHH']);
          array.forEach(mTypes1, function (m) {
            thisB._createMethylCheckbox(row2, m, cdata, '_setMethylation', thisB);
          }); // end mtypes1
          // extended modifications
          if (cdata.extendedMods) {
            row2 = dom.create('tr', {
              'id': 'screenshot-dialog-row-methyl-boxes-2'
            }, table);
            var mTypes2 = ['4mC', '5hmC', '6mA'];
            array.forEach(mTypes2, function (m) {
              thisB._createMethylCheckbox(row2, m, cdata, '_setMethylation', thisB);
            }); // end mtypes2
          }
        } // end methylation

        // small rna
        if (thisB.pluginConfig.smrnaPlugin) {
          cdata = thisB.browser.plugins.SmallRNAPlugin.config;
          row = dom.create('tr', {
            id: 'screenshot-dialog-row-smrna'
          }, table);
          dom.create('td', {
            innerHTML: 'Small RNAs',
            className: 'screenshot-dialog-pane-label',
            'colspan': 3
          }, row);
          //row2 = dom.create('tr',{'id':'screenshot-dialog-row-smrna-1'},table);
          // small rna types - if not animal, pirna = null
          if (!cdata.isAnimal) {
            thisB.parameters.smallrna.pi.label = null;
          }
          var s, sinfo;
          var types = ['1', '21', '22', '23', '2', '24', 'pi', 'Others'];

          array.forEach(types, function (s) {
            sinfo = thisB.parameters.smallrna[s];
            // create new row
            if (sinfo === undefined) {
              // create new row
              row2 = dom.create('tr', {
                'id': 'screenshot-dialog-row-smrna-' + s
              }, table);
            } else if (sinfo.label !== null) {
              tdata = dom.create('td', {
                className: 'screenshot-dialog-smrna-data',
                align: 'right'
              }, row2);
              box = new dijitCheckBox({
                id: 'screenshot-dialog-smrna-' + s,
                style: 'background-image:url(' + cdata.baseUrl.slice(1) + '/img/checkmark-' + sinfo.color + '.png' + ');',
                '_prop': s,
                checked: sinfo.value
              });
              box.onClick = lang.hitch(thisB, '_setSmallRNA', box);
              dom.create('span', {
                innerHTML: sinfo.label,
                className: 'screenshot-dialog-opt-span'
              }, tdata);
              tdata.appendChild(box.domNode);
            }
          });
        } // end smallrna
      },

      _paneOut: function (obj) {
        var thisB = this;
        dom.create('h2', {
          'innerHTML': 'Output configuration options'
        }, obj);
        var tableB = dom.create('table', {
          'class': 'screenshot-dialog-opt-table'
        }, obj);
        var param, data, row, row2, tdLabel;
        // output options -> format (PNG, JPEG, PDF), height, width
        var outParam = thisB.parameters.output;
        for (param in outParam) {
          data = outParam[param];
          if (param === 'format') {
            row = dom.create('tr', {
              'id': 'screenshot-dialog-row-' + param,
              'colspan': 2
            }, tableB);
            tdLabel = dom.create('td', {}, row);
            dom.create('div', {
              'innerHTML': data.title,
              'class': 'screenshot-dialog-pane-label'
            }, tdLabel)
            row2 = dom.create('tr', {
              'class': 'screenshot-dialog-pane-input'
            }, tableB);
            var outD = dom.create('td', {
              'colspan': 2
            }, row2);
            // 3 check boxes
            var formatTypes = ['PNG', 'JPG', 'PDF'];
            //var formatTypes = ['PNG','JPG'];
            var formatTypeTitles = {
              'PNG': 'transparent background',
              'JPG': 'white background',
              'PDF': 'contains svg-like objects'
            };
            array.forEach(formatTypes, function (f) {
              var btn = new dijitRadioButton({
                id: 'screenshot-dialog-output-' + f,
                checked: f === thisB.parameters.output.format.value,
                value: f,
                '_prop': param
              });
              btn.onClick = lang.hitch(thisB, '_setFormatParameter', btn);
              dom.create('span', {
                innerHTML: f,
                className: 'screenshot-dialog-opt-span',
                title: formatTypeTitles[f]
              }, outD);
              outD.appendChild(btn.domNode);
            });
          } else if (param === "image") {
            // handle png/jpg height and width
            var tbod = dom.create('tbody', {
              'id': 'screenshot-dialog-image-rows'
              /*style:'display:'+(thisB.parameters.output.format === 'PDF' ? 'none' : 'inherit')*/
            }, tableB);

            // loop through settings
            var param2, data2;
            for (param2 in data) {
              data2 = data[param2];
              thisB._createSpinner(tbod, data2, param2, '_setImageParameter', thisB);
            }
          } else if (param === 'pdf') {
            // handle pdf options
            var tbod = dom.create('tbody', {
              'id': 'screenshot-dialog-pdf-rows'
              /*style:'display:'+(thisB.parameters.output.format !== 'PDF' ? 'none' : 'inherit')*/
            }, tableB);
            var param2, data2;
            for (param2 in data) {
              data2 = data[param2];
              if (param2 === 'page') {
                var listOpts = ['letter landscape', 'letter portrait', 'legal landscape', 'legal portrait', 'A3 landscape', 'A3 portrait', 'A4 landscape', 'A4 portrait', 'A5 landscape', 'A5 portrait', 'tabloid landscape', 'tabloid portrait'];
                var widgetOpts = array.map(listOpts, function (opt) {
                  return {
                    label: opt,
                    value: opt,
                    selected: opt === thisB.parameters.output.pdf.page
                  };
                })
                // dropdown selection
                row = dom.create('tr', {
                  'id': 'screenshot-dialog-row-' + param
                }, tbod);
                tdLabel = dom.create('td', {}, row);
                dom.create('div', {
                  'innerHTML': data2.title,
                  'class': 'screenshot-dialog-pane-label'
                }, tdLabel);
                var spinD = dom.create('td', {
                  'class': 'screenshot-dialog-pane-input'
                }, row);
                var widget = new dijitSelect({
                  id: 'screenshot-dialog-pdf-page',
                  '_prop': param2,
                  options: widgetOpts,
                  style: "width:75px;"
                });
                widget.onChange = lang.hitch(thisB, '_setPDFParameter', widget);
                widget.placeAt(spinD, 'first');
              } else {
                thisB._createSpinner(tbod, data2, param2, '_setPDFParameter', thisB);
              }
            }
          } else if (param === 'time') {
            // check box
            var row = dom.create('tr', {
              id: 'screenshot-dialog-row-' + param
            }, tableB);
            dom.create('td', {
              'innerHTML': data.title,
              'class': 'screenshot-dialog-pane-label'
            }, row);
            var td = dom.create('td', {
              'class': 'screenshot-dialog-pane-input'
            }, row);
            var input = new dijitCheckBox({
              id: 'screenshot-dialog-opt-box-' + param,
              '_prop': param,
              checked: data.value
            });
            input.onClick = lang.hitch(thisB, '_setTimeParameter', input);
            input.placeAt(td, 'first');
            // create the extra hidden row
            thisB._createSpinner(tableB, data.extra, 'maxtime', '_setTimeParameter', thisB);
            //domStyle.set('screenshot-dialog-row-maxtime','display','none');
          } else if (param === 'key') {
            var row = dom.create('tr', {
              id: 'screenshot-dialog-row-' + param
            }, tableB);
            dom.create('td', {
              'innerHTML': data.title,
              'class': 'screenshot-dialog-pane-label',
              'title': 'From PhantomJS account'
            }, row);
            var td = dom.create('td', {
              'class': 'screenshot-dialog-pane-input'
            }, row);
            var input = new dijitCheckBox({
              id: 'screenshot-dialog-opt-box-' + param,
              '_prop': param,
              checked: data.value
            });
            input.onClick = lang.hitch(thisB, '_setApiKeyParameter', input);
            input.placeAt(td, 'first');
            // create the extra hidden row
            var row2 = dom.create('tr', {
              'id': 'screenshot-dialog-row-apikey'
            }, tableB);
            var tdLabel = dom.create('td', {}, row2);
            dom.create('div', {
              'innerHTML': data.extra.title,
              'class': 'screenshot-dialog-pane-label'
            }, tdLabel);
            var textD = dom.create('td', {
              'class': 'screenshot-dialog-pane-input'
            }, row2);
            var widget = new dijitTextBox({
              'id': 'screenshot-dialog-apikey-textbox',
              '_prop': 'apikey',
              'value': data.extra.value,
              'placeHolder': thisB.defaultApi,
              'style': 'width:75px;',
              'regExp': '[^ ]+',
              'invalidMessage': 'No spaces allowed'
            });
            widget.onChange = lang.hitch(thisB, '_setApiKeyParameter', widget);
            widget.placeAt(textD, 'first');
          } else {
            // number spinners
            //data = outParam[param];
            thisB._createSpinner(tableB, data, param, '_setParameter', thisB);
          }
        }
      },

      _createMethylCheckbox: function (tableRow, param, data, callbackStr, objScope) {
        var tdata = dom.create('td', {
          align: 'right'
        }, tableRow);
        var box = new dijitCheckBox({
          id: 'screenshot-dialog-methyl-' + param,
          //'class':m+'-checkbox',
          style: 'background-image:url(' + data.baseUrl.slice(1) + '/img/checkmark-' + param.toLowerCase() + '.png' + ');',
          '_prop': param,
          checked: (param === 'CH' ? (objScope.parameters.methylation.CHG && objScope.parameters.methylation.CHH) : objScope.parameters.methylation[param])
        });
        box.onClick = lang.hitch(objScope, callbackStr, box);
        dom.create('span', {
          innerHTML: param,
          className: 'screenshot-dialog-opt-span'
        }, tdata);
        tdata.appendChild(box.domNode);
      },

      _createSpinner: function (inTable, data, param, callbackStr, objScope) {
        var row = dom.create('tr', {
          'id': 'screenshot-dialog-row-' + param
        }, inTable);
        var tdLabel = dom.create('td', {}, row);
        dom.create('div', {
          'innerHTML': data.title,
          'class': 'screenshot-dialog-pane-label'
        }, tdLabel);
        var spinD = dom.create('td', {
          'class': 'screenshot-dialog-pane-input'
        }, row);
        // create slider for quality and spinner for other
        var widget = new dijitNumberSpinner({
          id: 'screenshot-dialog-' + param + '-spinner',
          value: data.value,
          '_prop': param,
          //constraints: (param === 'zoom' ? {min:1,max:10} : {min:100,max:10000,pattern:'###0'}),
          constraints: {
            min: data.min,
            max: data.max
          },
          smallDelta: data.delta,
          intermediateChanges: true,
          style: "width:75px;"
        });
        widget.onChange = lang.hitch(objScope, callbackStr, widget);
        widget.placeAt(spinD, 'first');
      },

      _paneTracks: function (rPane) {
        var thisB = this;
        var locationList = ['left', 'center', 'right', 'none'];
        var modeList = ['normal', 'compact', 'collapsed'];
        var styleList = ['default', 'features', 'histograms'];
        var optDict = {
          'ypos': locationList,
          'mode': modeList,
          'style': styleList
        };
        dom.create('h2', {
          'innerHTML': 'Track-specific configuration options'
        }, rPane);

        var tab = new dijitTabContainer({
          id: 'screenshot-dialog-pane-tab'
        });
        var label, tParams, pane, param, data;
        // need to loop through the tracks and create content panes
        array.forEach(thisB.vTracks, function (track) {
          // get parameters
          label = track.config.label;
          tParams = thisB.trackParameters[label];
          var trackTitle = (tParams.key === undefined ? label : tParams.key)
          pane = new dijitContentPane({
            title: trackTitle,
            id: 'screenshot-dialog-track-' + label
          });
          var obj = pane.containerNode;

          if (tParams.opts === false) {
            pane.set('content', 'No available options');
            tab.addChild(pane);
            return;
          }
          //dom.create('h3',{innerHTML:trackTitle},obj);
          var table = dom.create('table', {
            'class': 'screenshot-dialog-opt-table'
          }, obj);
          // loop through parameters
          for (param in tParams) {
            data = tParams[param];
            // data undefined issue
            if (data === undefined) {
              var unDefDiv = dom.create('div', {
                innerHTML: 'Error with track'
              }, obj);
              tParams[param] = {};
            }
            // radio boxes
            else if (param in {
                'ypos': 1,
                'mode': 1,
                'style': 1
              }) {
              // list of options to use
              var optList = optDict[param];
              // yscale position radio boxes
              if (data !== false) {
                var row = dom.create('tr', {
                  'id': 'screenshot-dialog-row-' + label + '-' + param
                }, table);
                dom.create('td', {
                  'innerHTML': data.title,
                  'class': 'screenshot-dialog-pane-label'
                }, row);
                array.forEach(optList, function (opt) {
                  var button = new dijitRadioButton({
                    name: param + '-' + label.replace(/\./g, '-'),
                    checked: opt === data.value,
                    id: 'screenshot-dialog-radio-' + label + '-' + opt,
                    value: opt,
                    '_label': label,
                    '_prop': param
                  });
                  button.onClick = lang.hitch(thisB, '_setTrackParameter', button);
                  var td = dom.create('td', {
                    className: 'screenshot-dialog-td-button'
                  }, row);
                  button.placeAt(td, 'first');
                  dom.create('label', {
                    "for": 'screenshot-dialog-radio-' + label + '-' + opt,
                    innerHTML: opt
                  }, td);
                });
              } // end y-scale position
            } else if (param === 'html') {
              // checkbox
              var row = dom.create('tr', {
                'id': 'screenshot-dialog-row-' + label + '-' + param
              }, table);
              dom.create('td', {
                'innerHTML': data.title,
                'class': 'screenshot-dialog-pane-label'
              }, row);
              var widget = new dijitCheckBox({
                id: 'screenshot-dialog-checkbox-' + label.replace(/\./g, '-') + '-' + param,
                checked: data.value,
                '_prop': param,
                '_label': label
              });
              widget.onChange = lang.hitch(thisB, '_setTrackParameter', widget);
              var td = dom.create('td', {
                'class': 'screenshot-dialog-pane-input',
                'colspan': 4
              }, row);
              widget.placeAt(td, 'first');
            } else if (data.hasOwnProperty('value')) {
              // otherwise its a number spinner text box thing
              var row = dom.create('tr', {
                'id': 'screenshot-dialog-row-' + label + '-' + param
              }, table);
              dom.create('td', {
                'innerHTML': data.title,
                'class': 'screenshot-dialog-pane-label'
              }, row);
              var widget = new dijitNumberSpinner({
                id: 'screenshot-dialog-spinner-' + label.replace(/\./g, '-') + '-' + param,
                value: data.value,
                '_prop': param,
                '_label': label,
                smallDelta: data.delta,
                intermediateChanges: true,
                style: "width:60px;"
              });
              widget.onChange = lang.hitch(thisB, '_setTrackParameter', widget);
              var td = dom.create('td', {
                'class': 'screenshot-dialog-pane-input',
                'colspan': 4
              }, row);
              widget.placeAt(td, 'first');
            }
          } // end for param

          tab.addChild(pane);
        });

        tab.placeAt(rPane);
        tab.startup();
      },

      hide: function () {
        this.inherited(arguments);
        window.setTimeout(lang.hitch(this, 'destroyRecursive'), 500);
      },

      _setMethylation: function (box) {
        if (box._prop == 'CH') {
          this.parameters.methylation.CHG = box.checked;
          this.parameters.methylation.CHH = box.checked;
        } else if (this.parameters.methylation.hasOwnProperty(box._prop)) {
          this.parameters.methylation[box._prop] = box.checked;
        }
      },

      _setSmallRNA: function (box) {
        if (this.parameters.smallrna.hasOwnProperty(box._prop)) {
          this.parameters.smallrna[box._prop]['value'] = box.checked;
        }
      },

      _setFormatParameter: function (input) {
        // set png, jpg, pdf and hide/show appropriate options
        var prop = input._prop;
        if (input.checked && this.parameters.output.hasOwnProperty(prop))
          this.parameters.output[prop].value = input.value;
        // objects we need 'id':'screenshot-dialog-image-rows' and 'id':'screenshot-dialog-pdf-rows'
        // if pdf
        if (input.value === 'PDF') {
          domStyle.set("screenshot-dialog-image-rows", "display", "none");
          domStyle.set('screenshot-dialog-pdf-rows', 'display', '');
          // if checked, uncheck "show navigation"
          var varlist = 'screenshot-dialog-opt-box-trackList';
          //console.log(domAttr.get(varlist, 'checked'));
          if (domAttr.get(varlist, 'checked') === true) {
            registry.byId(varlist).set('checked', false);
            this.parameters.view.trackList.value = false;
          }
        } else {
          domStyle.set("screenshot-dialog-image-rows", "display", "");
          domStyle.set('screenshot-dialog-pdf-rows', 'display', 'none');
        }
      },

      _setApiKeyParameter: function (input) {
        var prop = input._prop;
        prop = (prop === 'apikey' ? 'key' : prop);
        if (this.parameters.output.hasOwnProperty(prop)) {
          // checkbox
          if (input.hasOwnProperty('checked')) {
            var isCheck = !!input.checked;
            this.parameters.output[prop].value = isCheck;
            // checked - show the max time row
            if (isCheck)
              domStyle.set('screenshot-dialog-row-apikey', 'display', '');
            else
              domStyle.set('screenshot-dialog-row-apikey', 'display', 'none');
          } // number spinner
          else {
            this.parameters.output[prop].extra.value = input.value;
          }
        }
      },

      _setTimeParameter: function (input) {
        var prop = input._prop;
        prop = (prop === 'maxtime' ? 'time' : prop);
        if (this.parameters.output.hasOwnProperty(prop)) {
          // checkbox
          if (input.hasOwnProperty('checked')) {
            var isCheck = !!input.checked;
            this.parameters.output[prop].value = isCheck;
            // checked - show the max time row
            if (isCheck)
              domStyle.set('screenshot-dialog-row-maxtime', 'display', '');
            else
              domStyle.set('screenshot-dialog-row-maxtime', 'display', 'none');
          } // number spinner
          else {
            this.parameters.output[prop].extra.value = input.value;
          }
        }
      },

      _setImageParameter: function (input) {
        var prop = input._prop;
        if (this.parameters.output.image.hasOwnProperty(prop))
          this.parameters.output.image[prop].value = input.value;
      },

      _setPDFParameter: function (input) {
        //console.log(input.value);
        var prop = input._prop;
        if (this.parameters.output.pdf.hasOwnProperty(prop))
          this.parameters.output.pdf[prop].value = input.value;
      },

      _setParameter: function (input) {
        var prop = input._prop;
        // format radio box parameter
        /*if(prop === 'format'){
            if(input.checked && this.parameters.output.hasOwnProperty(prop))
                this.parameters.output[prop].value = input.value;
        }*/
        // check box parameters
        if (input.hasOwnProperty('checked')) {
          // view parameters
          if (this.parameters.view.hasOwnProperty(prop))
            this.parameters.view[prop].value = !!input.checked;
          // output parameters
          else if (this.parameters.output.hasOwnProperty(prop))
            this.parameters.output[prop].value = !!input.checked;
        }
        // else spinner or slider
        else {
          // view parameters
          if (this.parameters.view.hasOwnProperty(prop))
            this.parameters.view[prop].value = input.value;
          // output parameters
          else if (this.parameters.output.hasOwnProperty(prop))
            this.parameters.output[prop].value = input.value;
        }
      },

      _setTrackParameter: function (input) {
        var tLabel = input._label;
        var prop = input._prop;
        // check label
        if (!this.trackParameters.hasOwnProperty(tLabel)) {
          console.warn('Error: no track labeled ' + tLabel);
          return
        } else {
          if (this.trackParameters[tLabel].hasOwnProperty(prop)) {
            if (input.type === 'checkbox')
              this.trackParameters[tLabel][prop].value = input.checked;
            else
              this.trackParameters[tLabel][prop].value = input.value;
          }
        }
      },

      _getInitialParameters: function () {
        return Parameters.getInitialParameters(this.browser.config, {});
      },

      _getTrackParameters: function () {
        return Parameters.getTrackParameters(this.vTracks, this.pluginConfig);
      },

      _getPhantomJSUrl: function (scParams, jsParams) {
        // get current url
        var currentUrl = this.browser.makeCurrentViewURL();
        //var currentUrl = 'http://epigenome.genetics.uga.edu/JBrowse/?data=eutrema&loc=scaffold_1%3A8767030..14194216&tracks=DNA%2Cgenes%2Crepeats%2Ces_h3_1.bw_coverage%2Crna_reads%2Ces_h3k56ac.bw_coverage&highlight=';
        // encode scParams
        var scEncode = Util.encode(scParams);
        currentUrl += '&screenshot=' + scEncode;
        currentUrl = currentUrl.replace(/\u0026/g, '%26');
        // get api key info
        var apiKey = jsParams.key.value ? (jsParams.key.extra.value === '' ? this.defaultApi : jsParams.key.extra.value) : this.defaultApi;
        // encode jsParams
        jsParams['url'] = currentUrl;
        var jsEncode = Util.encodePhantomJSSettings(jsParams);
        // put it all together
        return this.requestUrl + apiKey + '/' + jsEncode;
      }
    });
  });
