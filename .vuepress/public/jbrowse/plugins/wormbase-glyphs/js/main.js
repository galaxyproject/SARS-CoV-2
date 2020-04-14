define([
    'dojo/dom-construct',
    'dojo/_base/declare',
    'JBrowse/Plugin'
],
function (
    domConstruct,
    declare,
    JBrowsePlugin
) {
    return declare(JBrowsePlugin, {
        constructor: function (/* args*/) {
            console.log('wormbase-glyphs plugin starting');
         var browser = this.browser;
         if( browser.config.show_menu && browser.config.show_nav ) {
            JBrowse.afterMilestone('completely initialized', function() {
     /* This shouldn't be doing anything for AGR
            JBrowse.afterMilestone('completely initialized', function() {
                var url    = location.href;
  console.log(url);
                var mod_str ='';
                var wb_ver = '';
                var br     = '';
                if (url.match('jbrowse-simple')) {
                    br = '</br>';
                }
                wb_ver    += '<a target="_blank" href="http://blog.wormbase.org/2019/03/18/getting-dna-sequence-from-jbrowse/"> Want to download FASTA?</a></br>';
                if (url.match('PRJNA13758')) {
                    mod_str =  '<a style="margin: 2px" href="/tools/genome/jbrowse-simple/full.html?data=data%2Fold-modencode">Looking for older modENCODE data?</a></br>';
                }
                var parent = document.getElementById('dijit_layout_ContentPane_2'); //track selector pane
                dojo.place(domConstruct.toDom(wb_ver + mod_str + br), parent, "first"); //add version and modencode message

                //add logo to menubar
                var bluebar = browser.menuBar;
                bluebar.appendChild(domConstruct.toDom('<a href="/"><img src="https://wormbase.org/img/logo/logo_wormbase_gradient.svg" width="100px" style="padding-top: 5px"></a>'));
     */


// reset top of trackSelectGrid to 64 or 63
// DOES NOT WORK because of the way dojo lays this out
//                if (!url.match('jbrowse-simple')) {
//                    var height = parent.style.height;
//                    console.log(height);
//                    var facets = document.getElementById('trackSelectGrid');
//                    facets.style.top = 64;
//                }
            });
        }
      }
    });
});
