define([
           'dojo/_base/declare',
           'dojo/_base/array',
           'dojo/_base/lang',
           'dojo/Deferred',
		   'dojo/dom-construct',
		   'dojo/dom-class',
           'dojo/dom-style',
		   'dojo/query',
           'dijit/registry',
           'dijit/form/ToggleButton',
           'dijit/Dialog'
       ],
       function(
           declare,
           array,
           lang,
           Deferred,
		   domConstruct,
		   domClass,
           domStyle,
		   query,
           registry,
           ToggleButton,
           Dialog
       ) {
return declare( null,
{
    feature: -1,
    seq: -1,

    constructor: function(feat, seq, opt){
        var self = this;
        //console.log("Calling FeatureSequence"); //TWS DEBUG
        this.feat = feat;
        this.seq = seq;
        this.opt = opt;
        this._hidden = [];
        this._highlighted = [];
        this._lowercase = [];

        this._initialize(self);

    },

    _initialize: function(self) {
        //console.log("Calling initialize"); //TWS DEBUG
        var container = dojo.create('div', {
    		//id: "FeatureSeq_container", 
	    	className: 'FeatureSequenceContainer', 
	    	innerHTML: '' 
	    });

	    var button_container = dojo.create('div', {
	    	//id: 'button_container',
	    	className: 'button_container' 
	    }, container );
	    var metaTable = dojo.create('table', { 
            //id: "button_meta_table",
            className: 'button_meta_table'
        }, button_container );
        dojo.create( 'div', {
            //id: "seq_display",
            className: "seq_display",
            innerHTML: ''
        },container);

        //console.log(self.subf_byType);

        self.feat._types.forEach(function(type){

            var type_arr = array.filter(self.feat._subfeatures, function (obj) {
                return obj.type === type;
            });

            var row = dojo.create('tr', {
                //id: type+'_buttonRow',
                className:'buttonRow',
                innerHTML: '<td class="col1_td"><b class="rowName">'+type+'s'+'</b></td>'
            }, metaTable );

            var highlight_td = dojo.create('td', {
                className: 'button_td'
            }, row );

            var highlightButton = new ToggleButton({
		        //id: type+"_highlightButton",
                style: "width: 85px;",
		        checked: false,
    		    //iconClass: "dijitCheckBoxIcon",
	    	    label: 'Highlight',
		        onChange: function(){
			        if (this.checked) {
                        var colorstr = pastelColors();
				        this.set('label', 'Unhighlight');
				        type_arr.forEach(function(highlight) {
                            highlight.color = colorstr;
                            self._addHighlight(highlight);
                        });
			        }
			        else {
				        this.set('label', 'Highlight');
				        type_arr.forEach(function(highlight) {
                            self._removeHighlight(highlight);
                        });
			        }
		        }
    	    });

            var textCase_td = dojo.create('td', {
                className: 'button_td'
            }, row );

	        var textCaseButton = new ToggleButton({
		        //id: type+"Lowercase",
                style: "width: 78px;",
		        checked: false,
		        //iconClass: "dijitCheckBoxIcon",
		        label: 'Lowercase',
		        onChange: function(){
			        if (this.checked) {
				        type_arr.forEach(function(lower) {
                            self._addLowercase(lower);
                        });
				        this.set('label', 'Uppercase');
			        }
			        else {
				        type_arr.forEach(function(lower) {
                            self._removeLowercase(lower);
                        });
				        this.set('label', 'Lowercase');
			        }
		        }
	        });

            var hideShow_td = dojo.create('td', {
                className: 'button_td'
            }, row );

	        var hideShowButton = new ToggleButton({
		        //id: type+"hide",
                style: "width: 48px;",
		        checked: false,
		        //iconClass: "dijitCheckBoxIcon",
		        label: 'Hide',
                onChange: function(){
			        if (this.checked) {
				        type_arr.forEach(function(hidden) {
                            self._addHidden(hidden);
                        });
				        this.set('label', 'Show');
			        }
			        else {
				        type_arr.forEach(function(hidden) {
                            self._removeHidden(hidden);
                        });
				        this.set('label', 'Hide');
			        }
		        }
	        });

            highlightButton.placeAt(highlight_td);
	        textCaseButton.placeAt(textCase_td);
	        hideShowButton.placeAt(hideShow_td);

        });

        ['upstream','downstream'].forEach(function(type) {

            var row = dojo.create('tr', {
                //id: type+'_buttonRow',
                className:'buttonRow',
                innerHTML: '<td class="col1_td"><b class="rowName">'+type+'</b></td>'
            }, metaTable );

            var highlight_td = dojo.create('td', {
                className: 'button_td'
            }, row );

            var highlightButton = new ToggleButton({
		        //id: type+"_highlightButton",
                style: "width: 85px;",
		        checked: false,
    		    //iconClass: "dijitCheckBoxIcon",
	    	    label: 'Highlight',
		        onChange: function(){
			        if (this.checked) {
                        var colorstr = pastelColors();
				        this.set('label', 'Unhighlight');
                        dojo.query('.'+type+'Sequence').forEach(function(node) {
                            domStyle.set(node, "background-color", colorstr);
                        });
			        }
			        else {
				        this.set('label', 'Highlight');
                        dojo.query('.'+type+'Sequence').forEach(function(node) {
                            domStyle.set(node, "background-color", "#ffffff");
                        });
			        }
		        }
    	    });

            var textCase_td = dojo.create('td', {
                className: 'button_td'
            }, row );

	        var textCaseButton = new ToggleButton({
		        //id: type+"Lowercase",
                style: "width: 78px;",
		        checked: false,
		        //iconClass: "dijitCheckBoxIcon",
		        label: 'Lowercase',
		        onChange: function(){
			        if (this.checked) {
                        dojo.query('.'+type+'Sequence').forEach(function(node) {
                            var text = node.innerHTML.toLowerCase();
            				node.innerHTML = text;
                        });
				        this.set('label', 'Uppercase');
			        }
			        else {
                        dojo.query('.'+type+'Sequence').forEach(function(node) {
                            var text = node.innerHTML.toUpperCase();
            				node.innerHTML = text;
                        });
				        this.set('label', 'Lowercase');
			        }
		        }
	        });

            var viewLen_td = dojo.create('td', {
                className: 'button_td'
            }, row );

            var SeqMenu = new dijit.form.Select({
                style: "width: 92px",
                className: type+'SeqMenu',
            	id: type+'SeqMenu',
                options: [
	                { label: "Select View", value: "-1" , selected:true},
                    { label: "500 bp", value: "0" },
                    { label: "1000 bp", value: "1"},
                    { label: "1500 bp", value: "2"},
                    { label: "2000 bp", value: "3"},
                    { label: "2500 bp", value: "4"},
                    { label: "3000 bp", value: "5"}, 
                    { label: "3500 bp", value: "6"},
                    { label: "4000 bp", value: "7"}
                ]
            });

            highlightButton.placeAt(highlight_td);
	        textCaseButton.placeAt(textCase_td);
	        SeqMenu.placeAt(viewLen_td);
        });

        registry.byId('upstreamSeqMenu').on("change", function() {
            var selected = this.get("value");
            dojo.query('.upstreamSequence').reverse().forEach(function(node,index) {
	            if (index <= selected) {
                    node.style.display = "inline";
                } else {
                    node.style.display = "none";
                }
            });
        });
        
        registry.byId('downstreamSeqMenu').on("change", function() {
            var selected = this.get("value");
            dojo.query('.downstreamSequence').forEach(function(node,index) {
	            if (index <= selected) {
                    node.style.display = "inline";
                } else {
                    node.style.display = "none";
                }
            });
        });

        var seqBox = this._DrawFasta();

        domConstruct.place(seqBox,container);

        var myDialog = new Dialog({
            title: "FeatureSequence Viewer",
            content: container,
            onHide: function() {
                registry.byId('downstreamSeqMenu').destroy();
                registry.byId('upstreamSeqMenu').destroy();
                myDialog.destroy();
            }
        });

        //console.log("Calling myDialog.show()");
        myDialog.show();

    },

	_addHidden: function(hidden) {
        this._hidden.push(hidden); 
        this._applyHidden(hidden);
    },

	_applyHidden: function(h) {

		dojo.query('.sequence').forEach(function(node,index) {
			if (index >= h.start && index < h.end) {
				node.style.display = "none";
			}
		});
	},

	_removeHidden: function(h) {		
		dojo.query('.sequence').forEach(function(node,index) {
			if (index >= h.start && index < h.end) {
				node.style.display = "inline";
			}
		});
	},

    _addHighlight: function(highlight) {
		this._highlighted.push(highlight);
		this._applyHighlight(highlight);
	},

    _applyHighlight: function(h) {
		dojo.query('.sequence').forEach(function(node,index) {
			if (index >= h.start && index < h.end) {
                domStyle.set(node, "background-color", h.color);
			}
		});
	},

	_removeHighlight: function(h) {
		dojo.query('.sequence').forEach(function(node,index,arr) {
			if (index >= h.start && index < h.end) {
                domStyle.set(node, "background-color", "#FFF");
			}
		});
	},

	_addLowercase: function(lower) {
		this._lowercase.push(lower);
		this._applyLowercase(lower);
	},

	_applyLowercase: function(l) {		
		dojo.query('.sequence').forEach(function(node,index) {
			if (index >= l.start && index < l.end) {
				var base = node.innerHTML.toLowerCase();
				node.innerHTML = base;
			}
		});
	},

	_removeLowercase: function(l) {		
		dojo.query('.sequence').forEach(function(node,index) {
			if (index >= l.start && index < l.end) {
				var base = node.innerHTML.toUpperCase();
				node.innerHTML = base;
			}
		});
	},

    _DrawFasta: function() {
		//console.log("Calling DrawFasta"); //TWS debug

        var upstream_arr = this.seq.upstream.toUpperCase().match(/.{1,500}/g);

		var target_arr = this.seq.target.toUpperCase().split('');

        var downstream_arr = this.seq.downstream.toUpperCase().match(/.{1,500}/g);

		var seqBox = dojo.create('div', { 
			className: 'sequence_box',
			innerHTML: '<span class="sequence_title">'+'&gt' + this.feat._id + '</span><br>'
			//innerHTML: '<span class="sequence_title">'+'&gt' + this.feature.get('id') + ' '+arr.length+' '+'bp'+'</span><br>'
		});

        upstream_arr.forEach(function(string,index,arr) {
            //indexed in reverse order for upstream. Zero index closest to target sequence
            var complementary_index = arr.length - 1 - index;
            var spn = dojo.create('span', {
                id: 'upstream_'+complementary_index,
                className: 'upstreamSequence',
                innerHTML: string
            });
            domConstruct.place(spn, seqBox);
        });

		target_arr.forEach(function(base,index) {
            var spn = dojo.create('span', {
                id: 'targetseq_'+index,
                className: 'sequence',
                innerHTML: base});
            domConstruct.place(spn, seqBox);
        });

        downstream_arr.forEach(function(string,index) {
            var spn = dojo.create('span', {
                id: 'downstream_'+index,
                className: 'downstreamSequence',
                innerHTML: string
            });
            domConstruct.place(spn, seqBox);
        });



    return seqBox;

	}
            
});
});

/**
 * Title: pastelColors
 * Description: Creates a randomized pastel color.
 * @param {}
 * @returns { color (string) }
 */
function pastelColors(){
    var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
}


