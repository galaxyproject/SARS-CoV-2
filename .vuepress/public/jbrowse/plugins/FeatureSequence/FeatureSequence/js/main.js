define([
           'dijit/Dialog',
           'dijit/form/Select',
           'dijit/form/Button',
           'dijit/registry',
           'dojo/_base/declare',
           'dojo/_base/array',
           'dojo/_base/lang',
           'dojo/Deferred',
           'dojo/DeferredList',
           'dojo/dom',
           'dojo/dom-construct',
           'dojo/dom-class',
           'dojo/json',
           'dojo/query',
           'JBrowse/Util',
           'JBrowse/Plugin',
           'JBrowse/View/Dialog/WithActionBar',
           './View/FeatureSequenceOld',
           './View/FeatureSequence'
       ],
       function(
           Dialog,
           SelectionMenu,
           Button,
           registry,
           declare,
           array,
           lang,
           Deferred,
           DeferredList,
           dom,
           domConstruct,
           domClass,
           JSON,
           query,
           Util,
           JBrowsePlugin,
           ActionBarDialog,
           FeatureSequenceOld,
           FeatureSequence
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {

        // do anything you need to initialize your plugin here
        console.log( "FeatureSequence plugin initialized." );
    },

    /**
     * Title: callFxn
     * Description: Access point from the JBrowse instance. Call this function
     * with the track and feature as arguments. Makes sure the feature is a 
     * single transcript, then passes it off to prepare and launch
     * @param {track (jbrowse object), feature (jbrowse object)}
     * @returns {  }
     */
    callFxn: function(track, feature) {
        var self = this; //fix scoping problem with prepareAndLaunch within async call
        //console.log("Calling callFxn."); //TWS DEBUG

        deferredFeature = this._isSingle(feature); //Need a single, two-levelled feature

        deferredFeature.then(function(f){
            self._prepareAndLaunch(track, f);
        });

    },

    /**
     * Title: _prepareAndLaunch
     * Description: Creates deferred feature and sequence objects 
     * pulling information from JBrowse objects. Then launches a FeatureSequence 
     * instance from the resolved objects.
     *
     * TWS FIXME: Possible to give FeatureSequence content directly 
     * to contentDialog launched from the right-click menu?
     *
     * @param {track (jbrowse object), feature (jbrowse object)}
     * @returns {  }
     */
    _prepareAndLaunch: function(track, feature){

        var self = this; //fix scoping problem with checkForOverlap within async call

        var seq_deferred = this._getSequence(track,feature);
        var feat_deferred = this._getFeatureAttr(feature);      

        var dfList = new DeferredList([feat_deferred,seq_deferred]);  
        
        //After dfList is resolved, create a new FeatureSequence
        dfList.then(function(results){

            var feat = results[0][1];
            var seq = results[1][1];
			var opt = {};
            //var opt = {seqDivName: 'seq_display'};

            //To export the FeatureSequence object in JSON, uncomment the following:
/*
            var foo = new Dialog({
                title: 'FeatureSequence JSON Export',
                content: JSON.stringify([feat,seq,opt]),
                onHide: function () {
                    foo.destroy();
                }
            });
            foo.show();
*/

        /**
         * Overlapping subfeatures will interfere with the use of FeatureSequence.
         * An older method will more accurately display overlapping features, 
         * but this will suffer a major performance penalty.
         */
            var persistingOverlaps = self._checkForOverlap(feat._subfeatures);
            if ( persistingOverlaps === -1 ) {
                var FeatSeq = new FeatureSequence(feat, seq, opt);
            } else {
                var warnings = "";
                persistingOverlaps.forEach(function(pair) {
                    warnings += "Warning: overlap between subfeatures "
                        +pair[0].id
                        +" and "
                        +pair[1].id
                        +"\n"
                    ;
                });
                warnings += "Overlapping subfeatures will cause problems in viewing their boundaries.\nThis may also cause the Feature Sequence Viewer to respond slowly."
                alert(warnings);
                var FeatSeq = new FeatureSequenceOld(feat, seq, opt);
            }

        });
    },


    /**
     * Title: _getSequence
     * Description: Gets sequence from track store, and creates a deferred
     * seq object for input into a new FeatureSequence. 
     * Also includes 4k bp upstream and downstream
     *
     * @param {track (jbrowse object), feature (jbrowse object)}
     * @returns { seqDeferred.promise (sequence object promise)}
     */
    _getSequence: function(track, feature) {
        //console.log("Calling getSequence"); //TWS DEBUG

        var seqDeferred = new Deferred();

        var buffer = 4000;
        var feature_coords = [feature.get('start'), feature.get('end')].sort(function(a,b){return a-b;}); //swap if out of order;
        var getStart = feature_coords[0] - buffer;
        var getEnd = feature_coords[1] + buffer;
        var targetSeqLen = feature_coords[1]-feature_coords[0];

        /**
         * Title: getStoreName
         * Description: Find which store contains indexed fasta or refseqs
         * Note: A patch to handle indexed_fasta reference sequences
         * by checking cached stores' properties.
         * @param {cache (Object - e.g. track.browser._storeCache)}
         * @returns {myName (String)}
         */

        var getStoreName = function (cache){
            var myName = '';
            for (var cachedStore in cache) {
                var attr = cache[cachedStore].store;
                //console.log(attr.name);
                if (attr.hasOwnProperty('fasta') && attr.hasOwnProperty('name')){
                    myName = attr.name;
                    //console.log(attr.name+" is your indexed_fasta store!");
                }else if (attr.hasOwnProperty('name') && attr.name === 'refseqs') {
                    myName = attr.name;
                }
            }

            return myName.length > 0 ? myName : 'no_store_found';
        };

        var sequenceStore = getStoreName(track.browser._storeCache);
        var my_browser = '';
        if (typeof track.store.args == 'undefined') {
            my_browser = track.store.browser;
        }
        else {
            my_browser = track.store.args.browser;
        }
        my_browser.getStore('refseqs', dojo.hitch(this,function( refSeqStore ) {

        	if( refSeqStore ) {
        	    refSeqStore.getReferenceSequence(
              	    { ref: my_browser.refSeq.name, start: getStart, end: getEnd}, 
                        dojo.hitch( this, function (fullSeq){
                            if (feature.get('strand') == -1) {
                                fullSeq = Util.revcom(fullSeq);
                            }

                            var seq_obj = {
                                upstream: fullSeq.substr(0,buffer), 
                                target: fullSeq.substr(buffer,targetSeqLen),
                                downstream: fullSeq.substr(targetSeqLen+buffer)
                            };

                            seqDeferred.resolve(seq_obj);                        

                        })
                    );
                }
            })
            );

        return seqDeferred.promise;
    },

    /**
     * Title: _getFeatAttr
     * Description: Gets feature main attributes and subfeatures from jbrowse object
     * and creates a deferred feature object for input into a new FeatureSequence
     * @param {feature (jbrowse object)}
     * @returns { featDeferred.promise (feature object promise)}
     */
    _getFeatureAttr: function (feature) {
        //console.log("Calling _getFeatureAttr"); //TWS DEBUG
        var featDeferred = new Deferred();

        var subfeats = this._getSubFeats(feature);
        var types = this._getTypes(subfeats);
        //console.log(types); //TWS DEBUG

        var featAttr = { 
            _id: feature.get('name') || feature.get('alias') || feature.get('id') || '>No_name' ,
            _absCoords: {start: feature.get('start'), end: feature.get('end')},
            _relCoords: {start: 0, end: Math.abs(feature.get('end') - feature.get('start'))},
            _strand: feature.get('strand'),
            _subfeatures: subfeats,
            _types: types
        };
        
        featDeferred.resolve(featAttr);
        return featDeferred.promise;
    },
        

    /**
     * Title: _getSubFeats
     * Description: Creates a sorted array of subfeatures,
     *  with all of the information needed for FeatureSequence
     * @param {feature (jbrowse object)}
     * @returns {subfeatures (Array)}
     */
    _getSubFeats: function (feature) {
        //console.log("Calling getSubFeats"); //TWS DEBUG

	    var feature_coords = [feature.get('start'), feature.get('end')]
            .sort(function(a,b){return a-b;}); //swap if out of order

	    var feature_strand = feature.get('strand');

        var types = [];
        //var subfeatures = [{'start':subf_start, 'end':subf_end, 'strand':subf_strand, 'type':subf_type, 'id': subf_type+'_'+(ind+1)}];
        var subfeatures = [];

	    feature.get('subfeatures').forEach(function(f, ind) {

		    var subfeat_coords = [f.get('start'), f.get('end')]
                .sort(function(a,b){return a-b;}); //swap if out of order

            //All coordinates are made relative to feature start
		    if (feature_strand == 1) {
			    var subf_start = subfeat_coords[0] - feature_coords[0]; 
			    var subf_end = subfeat_coords[1] - feature_coords[0]; 
		    } else if (feature_strand == -1) {
			    var subf_start = feature_coords[1] - subfeat_coords[1];
			    var subf_end = feature_coords[1] - subfeat_coords[0];
		    }

		    var subf_strand = f.get('strand');
		    var subf_type = f.get('type');

		    var subf_obj = {'start':subf_start, 'end':subf_end, 'strand':subf_strand, 'type':subf_type, 'id': subf_type+'_'+(ind+1)};

            //Push subf_type to types array if not seen yet
            if (array.indexOf(types, subf_type) === -1 ) {
                types.push(subf_type)
            }

            subfeatures.push(subf_obj)

	    });

		var overlaps = this._checkForOverlap(subfeatures.sort(function(a,b){return a.start - b.start}));
        if (overlaps === -1) {
            // If no overlap, fill in the blanks
            //fillscan(rel_coords, subfeatures)
            subfeatures = this._fillScan({
                start: 0,
                end: Math.abs(feature.get('end') - feature.get('start'))
            }, subfeatures.sort(function(a,b){return a.start - b.start}));
            //console.log(subfeatures); //TWS DEBUG

        } else {
            var cleanedSubfeats = this._cleanOverlaps(overlaps, subfeatures);
            subfeatures = this._fillScan({
                start: 0,
                end: Math.abs(feature.get('end') - feature.get('start'))
            }, cleanedSubfeats.sort(function(a,b){return a.start - b.start}));
			//console.log(overlaps);
		}
   
        //console.log(subfeatures); //TWS DEBUG
	    return subfeatures;
    },

    /**
     * Title: intronsFromExons
     * Description: Create array of introns in between the exons
     * @param {exons(Array)}
     * @returns {introns(Array)}
     */
    intronsFromExons: function (exons) {

	    //console.log("Calling intronsFromExons"); //TWS DEBUG
	    var intronArray = [];

	    for (var i = 0; i < exons.length-1; i++) {

		    var intron_start = exons[i].end;
		    var intron_end = exons[i+1].start;

		    intronArray[i] = {'start':intron_start,'end':intron_end, 'strand':exons[i].strand, 'type':'intron', 'id': 'intron_'+(i+1)};
        }
	
	    return intronArray;
    },

    /**
     * Title: sortByKey
     * Description: Generalized sorting for associative arrays.
     * @param {Array, Key(String)}
     * @returns {Sorted_Array}
     */
    sortByKey: function (array, key) {

	    //console.log("Calling sortByKey"); //TWS DEBUG
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];

            if (typeof x == "string")
            {
                x = x.toLowerCase(); 
                y = y.toLowerCase();
            }

            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },

    /**
     * Title: _getTypes
     * Description: Takes type information from subfeatures array, and
     * returns an array of unique values for 'type'
     * @param {subfeatures (Array)}
     * @returns {types (Array)}
     */
    _getTypes: function (subfeatures) {
        //console.log("Calling getTypes"); //TWS DEBUG
        var types = array.map(subfeatures, function(obj) {
            return obj.type;
        }).sort().filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });

        return types;
    },

    /**
     * Title: fillScan
     * Description: Scan through array of subfeatures and fill in spaces
     * between them. If space is between two subfeatures of 'exon' or 'CDS' type,
     * this region will be typed as 'intron'
     * @param {subfeatures(Array)} //Must be sorted by start
     * @returns {introns(Array)}
     */

    _fillScan: function (coords, subfeatures) {
        //console.log("Calling fillScan"); //TWS DEBUG

	    var gaps = [];
        //Give the non-annotated regions a default type name
        var defaultType = 'other';

	    if (subfeatures[0].start != coords.start) {
      	    //console.log("Filling in the start");
            var feat = {start: coords.start, end: subfeatures[0].start, type: defaultType, id: defaultType+'_a'}
            gaps.push(feat);
        }
      
        //console.log("Filling in the middle bits");
        for (i = 0; i < subfeatures.length - 1; i++) {

            //If current and next subfeature are the same and are 'exon' or 'CDS', type is intron
            if (subfeatures[i].type.toLowerCase() === "cds" && subfeatures[i+1].type.toLowerCase() === "cds") {
                var newType = 'intron';
            } else if (subfeatures[i].type.toLowerCase() === "exon" && subfeatures[i+1].type.toLowerCase() === "exon") {
                var newType = 'intron';
            } else {
                var newType = defaultType;
            }

            //Do the actual filling in: create feature and push to array
      	    if ( subfeatures[i].end != subfeatures[i+1].start) {
            	var feat = {start: subfeatures[i].end, end: subfeatures[i+1].start, type: newType , id: newType+i };
                gaps.push(feat);
            }
        }

        if (subfeatures[subfeatures.length - 1].end != coords.end) {
      	    //console.log("Filling in the end");
            var feat = {start: subfeatures[subfeatures.length - 1].end, end: coords.end, type: defaultType, id: defaultType+'_z' };
            gaps.push(feat);
        }

        //return gaps;

        //Add gaps to subfeatures and re-sort by start, then return result
        return subfeatures.concat(gaps).sort(function(a,b){return a.start - b.start});


        //return subfeatures;

    },

    _checkForOverlap: function(subfeatures) {
        //console.log("Calling checkForOverlap"); //TWS DEBUG
        var overlaps = [];
        for (i = 0; i < subfeatures.length - 1; i++) {
            if (subfeatures[i].start < subfeatures[i+1].end && subfeatures[i].end > subfeatures[i+1].start) {
                overlaps.push([subfeatures[i], subfeatures[i+1]]);
            }
        }
        return overlaps.length > 0 ? overlaps : -1 ;
    },

    /**
     * Title: _cleanOverlaps
     * Description: Cleans up commonly found overlapping features by following
     * GFF3 specifications as of July 2016:
     * https://github.com/The-Sequence-Ontology/Specifications/blob/master/gff3.md 
     * This removes exon features redundant with CDS features, or in cases where exon
     * and CDS coordinates differ, creates implied non-overlapping UTR's
     * @param {overlaps(Array), allFeatures(Array)}
     * @returns {allFeatures(Array)}
     */
	_cleanOverlaps: function(overlaps, allFeatures) {
        overlaps.forEach(function(pair, ind) {
            //Make sure both objects in pair are of type 'CDS' and 'exon'
            var goodTypes = pair.filter(function(obj) {
                return obj.type.toLowerCase() === 'exon' || obj.type.toLowerCase() === 'cds';
            }).length === 2;

            if (goodTypes) {    
                var pairTypes = pair.map(function(o) {return o.type.toLowerCase();});
                var CDSObjIndx = pairTypes.indexOf('cds');
                var exonObjIndx = pairTypes.indexOf('exon');
                if (CDSObjIndx == -1 || exonObjIndx== -1) { return; }
          
                if (pair[0].start == pair[1].start && pair[0].end == pair[1].end) {
                    var discard_name = pair[exonObjIndx].id;
                    //If they have identical coordinates, then remove the corresponding
                    // 'exon' entry from feature list
                    var featList_indx = allFeatures.map(function(o) {return o.id; })
                        .indexOf(discard_name); //find
                    allFeatures.splice(featList_indx, 1); //remove
                } else if (pair[0].start == pair[1].start) { 
                    //Starts match but ends dont. Modify exon start to not overlap, change to UTR
                    var new_exonStart = pair[CDSObjIndx].end;
                    var mod_name = pair[exonObjIndx].id;
                    var modStart_indx = allFeatures.map(function(o) {return o.id; })
                        .indexOf(mod_name); //find
                    allFeatures[modStart_indx].start = new_exonStart; //modify
                    allFeatures[modStart_indx].type = "UTR"; //modify
                } else if (pair[0].end == pair[1].end) {
                    //Ends match but starts dont. Modify exon end to not overlap, change to UTR
                    var new_exonEnd = pair[CDSObjIndx].start;
                    var mod_name = pair[exonObjIndx].id;
                    var modEnd_indx = allFeatures.map(function(o) {return o.id;})
                        .indexOf(mod_name); // find
                    allFeatures[modEnd_indx].end = new_exonEnd; //modify
                    allFeatures[modEnd_indx].type = "UTR"; //modify
                } else { 
                    // One completely within another. Replace exon with 5'UTR and
                    // also add in a 3'UTR
                    var fivePrimeUTR = {
                        start: pair[exonObjIndx].start,
                        end: pair[CDSObjIndx].start,
                        type: "UTR"
                    };
                    var threePrimeUTR = {
                        start: pair[CDSObjIndx].end,
                        end: pair[exonObjIndx].end,
                        type: "UTR"
                    };
                    var exonName = pair[exonObjIndx].id;
                    var featList_indx = allFeatures.map(function(o) {return o.id;})
                        .indexOf(exonName); // find
                    allFeatures.splice(featList_indx, 1, fivePrimeUTR, threePrimeUTR);
                    //replace exon with 5'UTR and add 3'UTR at same time.
                }
            }
        });
        return allFeatures;
	},

    /**
     * Title: _isSingle
     * Description: Takes a feature from JBrowse, and makes sure that it has only
     * a single layer of child features. If not, prompts user to choose 
     * such a feature and then returns it.
     * @param {feature(Object)}
     * @returns {feature(Object)}
     */
	_isSingle: function(top_feat) {
        //console.log("Calling isSingle"); //TWS DEBUG

        var initial_subf = top_feat.get('subfeatures');
        var threeLevels = initial_subf.some(function(sf) {
			return sf.get('subfeatures'); //If any subfeatures have subfeatures
		});

		var transcript_opts = initial_subf.map(function(sf, indx) {
             //For populating selection menu
			var sfName = sf.get('id') || sf.get('name') || sf.get('alias');
			return {label: sfName, value: indx};
		});

        var deferredSelection = new Deferred();
        //If threeLevels, resolve after dialog. Otherwise, resolve immediately

        if( threeLevels ) {

            var layout = dojo.create('div',{
                innerHTML: '<p>Please select a transcript to view:</p>'
            });

            var select_one = new SelectionMenu({
                id: "select_one",
                options: transcript_opts
            }).placeAt(layout);

            var selectionDialog = new ActionBarDialog({
                id: "selectDialog",
                title: "Select a transcript",
                onHide: function(){
                    selectionDialog.destroyRecursive();
                }, 
                content: layout
            });

            var actionPane = dojo.create('div', {
                "class": "dijitDialogPaneActionBar"
                //style: "margin: 0px auto 0px auto; text-align: center;"
            }, selectionDialog.containerNode);

            var okButton = new Button({
                label: "Ok",
                onClick: function(){
                    var sel_indx = registry.byId('select_one').get('value');
                    deferredSelection.resolve(initial_subf[sel_indx]);
                    registry.byId('selectDialog').hide();
                }
            }).placeAt(actionPane);

            selectionDialog.startup();
            selectionDialog.resize();

            selectionDialog.show();
        } else {
            deferredSelection.resolve(top_feat);
        }
        return deferredSelection;
    }
            
});
});
