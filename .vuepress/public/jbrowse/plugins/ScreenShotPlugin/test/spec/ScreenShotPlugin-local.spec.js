/* globals console, expect, describe, it, beforeEach, beforeAll */
require([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/request',
  'dojo/dom',
  'dojo/query',
  'dojo/dom-construct',
], function (
  declare,
  array,
  lang,
  request,
  dom,
  query,
  domConstruct
) {

  console.log('TESTING LOCAL JBROWSE')

var parseFileData = function (incoming) {
    var output = {};
    var data = incoming;
    if (data) {
      output['data'] = data;
      // check error codes
      var status = statusError(data.statusCode);
      if (status === null) {
        var html = data.content.data;
        var content = domConstruct.toDom(html);
        output['content'] = content;
        var trackList = query('.track.dojoDndItem', content);
        if (trackList.length > 0) {
          output['tracks'] = {};
          array.forEach(trackList, function (t) {
            if (t.id) {
              output.tracks[t.id] = t;
            }
          });
        }
        var event = data.pageResponses[0].events;
        output['events'] = event;
      } else {
        // has error
        output['error'] = status;
      }
    } else {
      output['error'] = 'File exists but has no data';
    }
    return output;
  }; // end parseFileData

  var statusError = function (statusCode) {
    if (statusCode === 200) {
      return null;
    } else if (statusCode === 400) {
      return 'BAD REQUEST: request had (syntax) error; fix error before resubmitting'
    } else if (statusCode === 401) {
      return 'UNAUTHORIZED: invad ApiKey'
    } else if (statusCode === 402) {
      return 'PAYMENT REQUIRED: out of credits; use custom ApiKey, purchase more credits, or try again tomorrow'
    } else if (statusCode === 403) {
      return 'FORBIDDEN: request flagged due to abuse'
    } else if (statusCode === 424) {
      return 'FAILED DEPENDENCY: target page was not reachable or request timed out'
    } else if (statusCode === 500) {
      return 'INTERNAL SERVER ERROR: retry request; if issue persists, see phantomjscloud.com'
    } else if (statusCode === 502) {
      return 'BAD GATEWAY: request did not reach PhantomJS cloud; check network connection; if issue persists, see phantomjscloud.com'
    } else if (statusCode === 503) {
      return 'SERVER TOO BUSY: try again later'
    }
  };

  var checkErrorEvents = function (events) {
    // from pageResponses.events which is array or objects
    // events have key, time, value
    //console.log('events', events.length);
    // filter the events to find error
    var errors = array.filter(events, function (event) {
      return (event.key && /error/i.test(event.key));
    });
    return (errors.length > 0 ? errors : false);
  };

  describe('Local installation tests: ', function(){
  describe('Inital test', function () {
    var test = true;
    it('jasimine is working', function () {
      expect(test).toBe(true);
    });
  });

  describe('Test local - HTML tracks', function () {
    var data, content, tracks, events;
    beforeAll(function (done) {
      request('fileA.json', {
        handleAs: 'json'
      }).then(function (incoming) {
        var parse = parseFileData(incoming);
        if (parse.error) {
          console.error(parse.error);
          done.fail();
        } else {
          data = parse.data;
          content = parse.content;
          tracks = parse.tracks;
          events = parse.events;
          done();
        }
      }, function (err) {
        console.log(err);
        done.fail();
      });
    }); // end beforeAll

    it('should have no errors', function () {
      var errors = checkErrorEvents(events);
      if (errors !== false) {
        array.forEach(errors, function (e) {
          console.error(e);
        });
      }
      expect(errors).toBe(false);
    }); // end should have no errors

    it('should have all view elements', function () {
      var nodeT = query('#hierarchicalTrackPane', content);
      expect(nodeT.length).toBe(1, 'Expected to have track list');
      var nodeM = query('.menuBar', content);
      expect(nodeM.length).toBe(1, 'Expected to have menu bar');
      var nodeN = query('#navbox', content);
      expect(nodeN.length).toBe(1, 'Expected to have navigation bar');
      var nodeO = query('#overviewtrack_overview_loc_track', content);
      expect(nodeO.length).toBe(1, 'Expected to have overview bar');
    }); // end should have all view elements

    it('should have TE track, HTML', function () {
      var track = tracks['track_t2_tes'];
      expect(track).toBeDefined('TE track does not exist');
      var trackType = track.classList[1];
      expect(trackType).toBe('track_jbrowse_view_track_htmlfeatures');

      // should have at least 1 positive and negative feature
      var posFeat = query('.plus-feature', track);
      var negFeat = query('.minus-feature', track);
      expect(posFeat.length).toBeGreaterThan(1, 'Not enough positive strand features');
      expect(negFeat.length).toBeGreaterThan(1, 'Not enough negative strand features');
    }); // end should have TE track, HTML

    it('should have RNA-seq track, Alignment', function () {
      var track = tracks['track_t7_rnaseq-html'];
      expect(track).toBeDefined('TE track does not exist');
      var trackType = track.classList[1];
      expect(trackType).toBe('track_jbrowse_view_track_alignments');
      // should have positive and negative features
      var posFeat = query('.plus-alignment', track);
      var negFeat = query('.minus-alignment', track);
      expect(posFeat.length).toBeGreaterThan(400, 'Not enough positive strand features');
      expect(negFeat.length).toBeGreaterThan(40, 'Not enough negative strand features');
    }); // end should have RNA-seq track, Alignment

    it('should have SNP track', function () {
      var track = tracks['track_t4_cvi-snps'];
      expect(track).toBeDefined('SNP track does not exist');
      var trackType = track.classList[1];
      expect(trackType).toBe('track_jbrowse_view_track_htmlvariants');
      var feats = query('.feature', track);
      expect(feats.length).toBeGreaterThan(100);
    }); // end should have SNP track
  });
  // end Test local - HTML tracks

  describe('Test local - Canvas tracks and view options', function () {
    var data, content, tracks, events;
    beforeAll(function (done) {
      request('fileB.json', {
        handleAs: 'json'
      }).then(function (incoming) {
        var parse = parseFileData(incoming);
        if (parse.error) {
          console.error(parse.error);
          done.fail();
        } else {
          data = parse.data;
          content = parse.content;
          tracks = parse.tracks;
          events = parse.events;
          done();
        }
      }, function (err) {
        console.log(err);
        done.fail();
      });
    }); // end beforeAll

    it('should have no errors', function () {
      var errors = checkErrorEvents(events);
      if (errors !== false) {
        array.forEach(errors, function (e) {
          console.error(e);
        });
      }
      expect(errors).toBe(false);
    }); // end should have no errors

    it('should not have view elements', function () {
      var nodeT = query('#hierarchicalTrackPane', content);
      expect(nodeT.length).toBe(0, 'Not expected to have track list');
      var nodeM = query('.menuBar', content);
      expect(nodeM.length).toBe(0, 'Not expected to have menu bar');
      var nodeN = query('#navbox', content);
      expect(nodeN.length).toBe(0, 'Not expected to have navigation bar');
      var nodeO = query('#overviewtrack_overview_loc_track', content);
      var height = parseInt(nodeO[0].style.height.replace('px', ''));
      expect(height).toBe(0,'Not expected to see overview bar');
    }); // end should have all view elements

    it('should have gene track - CanvasFeatures', function () {
      var track = tracks['track_t1_genes'];
      expect(track).toBeDefined('Gene track does not exist');
      var trackType = track.classList[1];
      expect(trackType).toBe('track_jbrowse_view_track_canvasfeatures');
    }); // end should have gene track - CanvasFeatures

    it('should have RNA-seq track - Alignments2, compact', function () {
      var track = tracks['track_t5_rnaseq-un'];
      expect(track).toBeDefined('RNA-seq track does not exist');
      var trackType = track.classList[1];
      expect(trackType).toBe('track_jbrowse_view_track_alignments2');
      // should have 1 overflow as compact
      var overflow = query('.height_overflow_message', track);
      expect(overflow.length).toBe(1, 'Expected 1 overflow message');
      // check height
      var height = parseInt(track.style.height.replace('px', ''));
      expect(height).toBeLessThan(621);
    }); // end should have RNA-seq track - Alignments2, compact

    it('should have SNPs - CanvasVariants, height', function(){
       var track = tracks['track_t3_mt-snps'];
      expect(track).toBeDefined('SNP track does not exist');
      var trackType = track.classList[1];
      expect(trackType).toBe('track_jbrowse_view_track_canvasvariants');
      // check height - should have 1 overflow
      var overflow = query('.height_overflow_message', track);
      expect(overflow.length).toBe(1);
      var height = parseInt(track.style.height.replace('px', ''));
      expect(height).toBeLessThan(60);
    }); // end 'should have SNPs - CanvasVariants, height

    it('should have SNP Cov - SNPCoverage, y-scale, height', function(){
      var track = tracks['track_t6_rnaseq-snp'];
      expect(track).toBeDefined('SNP coverage track does not exist');
      var trackType = track.classList[1];
      expect(trackType).toBe('track_jbrowse_view_track_snpcoverage');
      // check y-scale pos
      var yscale = query('.vertical_ruler', track)[0];
      var left = parseInt(yscale.style.left.replace('px', ''));
      var labelLeft = parseInt(query('.track-label', track)[0].style.left.replace('px',''));
      expect(Math.abs(left-labelLeft)).toBeLessThan(20);
      // check height
      var height = parseInt(track.style.height.replace('px', ''));
      expect(height).toBe(120);
    }); // end should have SNP Cov - SNPCoverage, y-scale, height
  }); // end Test local - Canvas tracks and view options

  describe('Test local for plugins', function () {
    var plugins;

    beforeAll(function (done) {
      request('plugins.json', {
        handleAs: 'json'
      }).then(function (incoming) {
        plugins = incoming;
        done();
      }, function (err) {
        console.log(err);
        done.fail();
      });
    }); // end beforeAll

    describe('Test MethylationPlugin', function () {
      var data, content, events, tracks;

      beforeAll(function (done) {
        if (plugins.MethylationPlugin) {
          request('fileC.json', {
            handleAs: 'json'
          }).then(function (incoming) {
            var parse = parseFileData(incoming);
            if (parse.error) {
              console.error(parse.error);
              done.fail();
            } else {
              data = parse.data;
              content = parse.content;
              tracks = parse.tracks;
              events = parse.events;
              done();
            }
          }, function (err) {
            if (err.response.status === 404) {
              console.log("Methylation screenshot 'fileC.json' does not exist. Run 'prep_test_local.sh' again.")
            } else {
              console.log(err);
            }
            done.fail();
          });
        } else {
          data = false;
          done();
        }
      }); // end beforeAll

      it('should have error', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var errors = checkErrorEvents(events);
          if (errors !== false) {
            array.forEach(errors, function (err) {
              console.log(err.key + ' -- ' + err.value.message);
            });
          }
          expect(errors).not.toBe(false);
        }
      }); // end should have error

      it('should have methylation track - Canvas, ypos', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t11_methyl'];
          expect(track).toBeDefined('Canvas methylation track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_methylationplugin_view_track_wiggle_methylplot');
          var yscale = query('.vertical_ruler', track)[0];
          var left = parseInt(yscale.style.left.replace('px', ''));
          var labelLeft = parseInt(query('.track-label', track)[0].style.left.replace('px', ''));
          expect(Math.abs(left - labelLeft)).toBeGreaterThan(1000);
        }
      }); // end should have methylation track - Canvas, ypos

      it('should have methylation track - HTML, hide 4mC 6mA', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t15_methyl-ext'];
          expect(track).toBeDefined('HTML methylation track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_methylationplugin_view_track_wiggle_methylhtmlplot');

          var mPos = query('.feature-methyl', track);
          array.forEach(mPos, function (p) {
            expect(p.style.backgroundColor).not.toBe('rgb(90, 191, 169)'); // 4mC
            expect(p.style.backgroundColor).not.toBe('rgb(147, 110, 231)'); // 6mA
          }); // end array.forEach
        }
      }); // end should have methylation track - HTML, hide contexts
    }); // end Test MethylationPlugin

    describe('Test MotifDensityPlugin', function () {
      var data, content, events, tracks;

      beforeAll(function (done) {
        if (plugins.MotifDensityPlugin) {
          request('fileD.json', {
            handleAs: 'json'
          }).then(function (incoming) {
            var parse = parseFileData(incoming);
            if (parse.error) {
              console.error(parse.error);
              done.fail();
            } else {
              data = parse.data;
              content = parse.content;
              tracks = parse.tracks;
              events = parse.events;
              done();
            }
          }, function (err) {
            if (err.response.status === 404) {
              console.error("MotifDensityPlugin screenshot 'fileD.json' does not exist. Run 'prep_test_local.sh' again.")
            } else {
              console.log(err);
            }
            done.fail();
          });
        } else {
          // plugin wasn't tested
          data = false;
          done();
        }
      }); // end beforeAll

      it('should not have errors', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var errors = checkErrorEvents(events);
          if (errors !== false) {
            array.forEach(errors, function (err) {
              console.log(err.key + ' -- ' + err.value.message);
            });
          }
          expect(errors).toBe(false);
        }
      }); // end should not have errors

      it('should have motif density track - Canvas, height', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t13_motif-dens'];
          expect(track).toBeDefined('Canvas motif density track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_motifdensityplugin_view_track_motifdensity');
          // check for sublabels
          var subLabels = query('.motif-dens-sublabel', track);
          expect(subLabels.length).toBe(4, 'Missing motif density track sublabels--track may not have rendered');
          // check height
          var height = parseInt(track.style.height.replace('px', ''));
          expect(height).toBe(100, 'Height of track is incorrect');
        }
      }); // end should have motif density track - Canvas, height

      it('should have motif density track - SVG, max_score', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t16_motif-dens2'];
          expect(track).toBeDefined('Canvas small RNA track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_motifdensityplugin_view_track_motifsvgdensity');
          // if max score set correctly, max fill opacity should be 1
          var paths = query('path', track);
          var opac = array.map(paths, function (p) {
            return parseInt(p.getAttribute('fill-opacity'));
          });
          var max = opac.reduce(function (a, b) {
            return Math.max(a, b);
          });
          expect(max).toBe(1, 'Max score not changed');
        }
      }); // end should have small rna track - Canvas, compact
    }); // end Test MotifDensityPlugin

    describe('Test SmallRNAPlugin', function () {
      var data, content, events, tracks;

      beforeAll(function (done) {
        if (plugins.SmallRNAPlugin) {
          request('fileE.json', {
            handleAs: 'json'
          }).then(function (incoming) {
            var parse = parseFileData(incoming);
            if (parse.error) {
              console.error(parse.error);
              done.fail();
            } else {
              data = parse.data;
              content = parse.content;
              tracks = parse.tracks;
              events = parse.events;
              done();
            }
          }, function (err) {
            if (err.response.status === 404) {
              console.error("SmallRNAPlugin screenshot 'fileE.json' does not exist. Run 'prep_test_local.sh' again.")
            } else {
              console.log(err);
            }
            done.fail();
          });
        } else {
          // plugin wasn't tested
          data = false;
          done();
        }
      }); // end beforeAll

      it('should not have errors', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var errors = checkErrorEvents(events);
          if (errors !== false) {
            array.forEach(errors, function (err) {
              console.log(err.key + ' -- ' + err.value.message);
            });
          }
          expect(errors).toBe(false);
        }
      }); // end should not have errors

      it('should have small rna track - HTML, hide 22', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t10_smrna'];
          expect(track).toBeDefined('HTML small RNA track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_smallrnaplugin_view_track_smhtmlalignments');
          // check 22-mers hidden and have other sizes
          var featsAll = query('.smrna-alignment', track);
          expect(featsAll.length).toBeGreaterThan(200);
          var feats22 = query('.smrna-22', track);
          expect(feats22.length).toBe(0, '22-mers not hidden in small rna track');
          array.forEach(['21', '23', '24', 'other'], function (s) {
            var f = query('.smrna-' + s, track);
            expect(f.length).toBeGreaterThan(0, s + '-mers are missing from small rna track');
          }); // end array
        }
      }); // end should have small rna track - HTML, hide 22

      it('should have small rna track - Canvas, compact', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t19_smrna2'];
          expect(track).toBeDefined('Canvas small RNA track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_smallrnaplugin_view_track_smalignments');
          // check for compact - if compact, only 1 overflow
          var overflow = query('.height_overflow', track);
          expect(overflow.length).toBe(1, 'Small RNA reads are not compact');
        }
      }); // end should have small rna track - Canvas, compact
    }); // end Test for SmallRNAPlugin

    describe('Test SeqViewsPlugin', function () {
      var data, content, events, tracks;

      beforeAll(function (done) {
        if (plugins.SeqViewsPlugin) {
          request('fileF.json', {
            handleAs: 'json'
          }).then(function (incoming) {
            var parse = parseFileData(incoming);
            if (parse.error) {
              console.error(parse.error);
              done.fail();
            } else {
              data = parse.data;
              content = parse.content;
              tracks = parse.tracks;
              events = parse.events;
              done();
            }
          }, function (err) {
            if (err.response.status === 404) {
              console.error("SeqViewsPlugin screenshot 'fileF.json' does not exist. Run 'prep_test_local.sh' again.")
            } else {
              console.log(err);
            }
            done.fail();
          });
        } else {
          // plugin wasn't tested
          data = false;
          done();
        }
      }); // end beforeAll

      it('should not have errors', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var errors = checkErrorEvents(events);
          if (errors !== false) {
            array.forEach(errors, function (err) {
              console.log(err.key + ' -- ' + err.value.message);
            });
          }
          expect(errors).toBe(false);
        }
      }); // end should not have errors

      it('should have gene track - Canvas, histograms', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t1_genes'];
          expect(track).toBeDefined('Canvas gene track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_jbrowse_view_track_canvasfeatures');
          // check for y-scale
          var yscale = query('.ruler.vertical_ruler', track);
          expect(yscale.length).toBe(1, 'Gene track has no y-scale, may not have histograms')
          // check track label for feature density
          var label = query('.feature-density', track);
          expect(label.length).toBe(1, 'Gene track does not have feature density in label');
          expect(label[0].innerHTML).toBe('(feature density)');
        }
      }); // should have gene track - Canvas, histograms

      it('should have TE track - HTML, histograms', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t2_tes'];
          expect(track).toBeDefined('HTML TE track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_jbrowse_view_track_htmlfeatures');
          // check for y-scale
          var yscale = query('.ruler.vertical_ruler', track);
          expect(yscale.length).toBe(1, 'TE track has no y-scale, may not have histograms');
          // check track label
          var label = query('.feature-density', track);
          expect(label.length).toBe(1, 'TE track does not have feature density in label');
          expect(label[0].innerHTML).toBe('per 200 bp');
        }
      }); // end should have TE track - HTML, histograms

      it('should have RNA-seq track - Alignments2, features', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t5_rnaseq-un'];
          expect(track).toBeDefined('RNA-seq track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_jbrowse_view_track_alignments2');
          // check for y-scale
          var yscale = query('.ruler.vertical_ruler', track);
          expect(yscale.length).toBe(0, 'RNA-seq track has y-scale, may not be features');
          // check track label
          var label = query('.feature-density', track);
          expect(label.length).toBe(0, 'RNA-seq track has feature density in label');
          // check height
          var height = parseInt(track.style.height.replace('px', ''));
          expect(height).toBe(420, 'Height of track is incorrect');
        }
      }) // end should have RNA-seq track - Alignments2, features

      it('should havae AC positions track - CanvasFeatures, features', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t20_ac_pos'];
          expect(track).toBeDefined('AC position track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_jbrowse_view_track_canvasfeatures');
          // check for y-scale
          var yscale = query('.ruler.vertical_ruler', track);
          expect(yscale.length).toBe(0, 'AC position track has y-scale, may not be features');
          // check track label
          var label = query('.feature-density', track);
          expect(label.length).toBe(0, 'AC position track has feature density in label');
          // check height
          var height = parseInt(track.style.height.replace('px', ''));
          expect(height).toBe(420, 'Height of track is incorrect');
        }
      }); // end should havae AC positions track - CanvasFeatures, features
    }); // end Test for SeqViewsPlugin

    describe('Test StrandedPlotPlugin', function () {
      var data, content, events, tracks;

      beforeAll(function (done) {
        if (plugins.StrandedPlotPlugin) {
          request('fileG.json', {
            handleAs: 'json'
          }).then(function (incoming) {
            var parse = parseFileData(incoming);
            if (parse.error) {
              console.error(parse.error);
              done.fail();
            } else {
              data = parse.data;
              content = parse.content;
              tracks = parse.tracks;
              events = parse.events;
              done();
            }
          }, function (err) {
            if (err.response.status === 404) {
              console.error("StrandedPlotPlugin screenshot 'fileD.json' does not exist. Run 'prep_test_local.sh' again.")
            } else {
              console.log(err);
            }
            done.fail();
          });
        } else {
          // plugin wasn't tested
          data = false;
          done();
        }
      }); // end beforeAll

      it('should have errors', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var errors = checkErrorEvents(events);
          if (errors !== false) {
            array.forEach(errors, function (err) {
              console.log(err.key + ' -- ' + err.value.message);
            });
          }
          expect(errors).not.toBe(false);
        }
      }); // end should have errors

      it('should have stranded methyl track - Canvas, ypos, min/max', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t21_stranded-methyl'];
          expect(track).toBeDefined('Canvas stranded track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_strandedplotplugin_view_track_wiggle_strandedxyplot');
          // yscale position
          var yscale = query('.vertical_ruler', track)[0];
          var left = parseInt(yscale.style.left.replace('px', ''));
          var labelLeft = parseInt(query('.track-label', track)[0].style.left.replace('px', ''));
          expect(Math.abs(left - labelLeft)).toBeGreaterThan(1000, 'Y-scale not positioned at the right');
          // check min/max
          var yscaleLabelTop = yscale.children[0].children[0].children[0];
          expect(yscaleLabelTop.innerHTML).toBe('200');
          var yscaleLabelBottom = yscale.children[0].children[4].children[0];
          expect(yscaleLabelBottom.innerHTML).toBe('-200');
        }
      }); // end should have stranded methyl track - Canvas, ypos, min/max

      it('should have stranded track - SVG, ypos', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t12_stranded'];
          expect(track).toBeDefined('SVG stranded track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_strandedplotplugin_view_track_wiggle_strandedsvgplot');
          // check lines exist and fill
          var block = query('.block', track)[1];
          var svg = block.children[0];
          var polylines = query('polyline', svg);
          expect(polylines.length).toBe(2);
          // pos line is blue, neg line is red
          expect(polylines[0].getAttribute('fill')).toMatch('0, 0, 255');
          expect(polylines[1].getAttribute('fill')).toMatch('255, 0, 0');
          // check yscale
          var yscale = query('.vertical_ruler', track)[0];
          var left = parseInt(yscale.style.left.replace('px', ''));
          var labelLeft = parseInt(query('.track-label', track)[0].style.left.replace('px', ''));
          expect(Math.abs(left - labelLeft)).toBeLessThan(20, 'Y-scale not positioned at the left');
        }
      }); // end should have stranded track - SVG, ypos
    }); // end Test StrandedPlotPlugin

    describe('Test WiggleSVGPlugin', function () {
      var data, content, events, tracks;

      beforeAll(function (done) {
        if (plugins.WiggleSVGPlotPlugin) {
          request('fileH.json', {
            handleAs: 'json'
          }).then(function (incoming) {
            var parse = parseFileData(incoming);
            if (parse.error) {
              console.error(parse.error);
              done.fail();
            } else {
              data = parse.data;
              content = parse.content;
              tracks = parse.tracks;
              events = parse.events;
              done();
            }
          }, function (err) {
            if (err.response.status === 404) {
              console.error("WiggleSVGPlugin screenshot 'fileD.json' does not exist. Run 'prep_test_local.sh' again.")
            } else {
              console.log(err);
            }
            done.fail();
          });
        } else {
          // plugin wasn't tested
          data = false;
          done();
        }
      }); // end beforeAll

      it('should not have errors', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var errors = checkErrorEvents(events);
          if (errors !== false) {
            array.forEach(errors, function (err) {
              console.log(err.key + ' -- ' + err.value.message);
            });
          }
          expect(errors).toBe(false);
        }
      }); // end should not have errors

      it('should have H3K4me3 XY track - SVG, max', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t8_xy'];
          expect(track).toBeDefined('H3K4me3 XY track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_wigglesvgplotplugin_view_track_wiggle_svgxyplot');
          // check line exist and fill
          var block = query('.block', track);
          var svg = block[1].children[0];
          var polylines = query('polyline', svg);
          expect(polylines.length).toBe(1);
          expect(polylines[0].getAttribute('fill')).toMatch('134, 43, 179', 'Line has incorrect color');
          // check yscale
          var yscale = query('.vertical_ruler', track)[0];
          var yscaleLabelTop = yscale.children[0].children[0].children[0];
          expect(yscaleLabelTop.innerHTML).toBe('80', 'Max score not correctly set');
          // should have clip marker
          var svg2 = block[2].children[0];
          var paths = query('path', svg2);
          expect(paths.length).toBe(3, 'Incorrect number of clip markers');
          expect(paths[0].getAttribute('fill')).toMatch('255, 0, 0', 'Clip marker incorrect color');
        }
      }); // end should have H3K4me3 XY track - SVG, max

      it('should have H3K4me3 density track - SVG', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t9_dens'];
          expect(track).toBeDefined('H3K4me3 dens track does not exist');
          var trackType = track.classList[1];
          expect(trackType).toBe('track_wigglesvgplotplugin_view_track_wiggle_svgdensity');
          // check blocks and paths exist
          var block = query('.block', track)[1];
          var svg = block.children[0];
          var paths = query('path', svg);
          expect(paths.length).toBeGreaterThan(200);
          // check yscale
          var yscale = query('.vertical_ruler', track);
          expect(yscale.length).toBe(0, 'Unexpected y-scale')
        }
      }); // end should have H3K4me3 density track - SVG

      it('should have H3K9me2 XY track - SVG', function () {
        if (data === false) {
          // plugin not tested
          expect(content).not.toBeDefined();
        } else {
          var track = tracks['track_t18_xy2'];
          expect(track).toBeDefined('H3K9me2 XY track does not exist');

          var trackType = track.classList[1];
          expect(trackType).toBe('track_wigglesvgplotplugin_view_track_wiggle_svgxyplot');
          // check for 2 lines
          var block = query('.block', track)[1];
          var svg = block.children[0];
          var polylines = query('polyline', svg);
          expect(polylines.length).toBe(2);
          // pos line is blue, neg line is red
          expect(polylines[0].getAttribute('fill')).toMatch('0, 0, 255');
          expect(polylines[1].getAttribute('fill')).toMatch('255, 0, 0');
          // get clip markers 17 pos, 3 neg
          var clips = query('path', svg);
          expect(clips.length).toBeGreaterThan(15, 'Incorrect number of clip markers');
          var posClips = array.filter(clips, function (cl) {
            return cl.getAttribute('fill') === 'rgb(255, 0, 0)'
          });
          var negClips = array.filter(clips, function (cl) {
            return cl.getAttribute('fill') === 'rgb(0, 0, 255)'
          });
          expect(posClips.length).toBeGreaterThan(10, 'Incorrect number of positive clip markers');
          expect(negClips.length).toBeGreaterThan(1, 'Incorrect number of negative clip markers');
        }
      }); // end should habe H3K9me2 XY track - SVG

    }); // end Test WiggleSVGPlugin

  }); // end Test local for plugins
    }); // end Local installation tests
});
