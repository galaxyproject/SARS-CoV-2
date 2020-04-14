#!/bin/bash

function readJSON {
  VALUE=`grep -m 1 "\"${2}\"" ${1} | sed 's/^ *//;s/.*: *//;s/,?//' | sed 's/,//'`
  if [ ! "$VALUE" ]; then
    echo false;
  else
    echo $VALUE;
  fi;
}

function rmFile {
if [ -f "$1" ]; then
  rm -f $1;
fi
}

function testFile {
if [ -f "$1" ]; then
  echo "    Success! Results written to '$1'";
else
  echo "    ERROR!";
fi
}

# Get test data for local installation

# URL for JBrowse instance - do not include ending /
baseURL="http://epigenome.genetics.uga.edu/SchmitzLab-JBrowse"
pluginLoc="plugins/ScreenShotPlugin"
apiKey="a-demo-key-with-low-quota-per-ip-address"

dataURL="${baseURL}/?data=${pluginLoc}/test/data"

## Plugins installed
#methyl=false    # MethylationPlugin
#smrna=false     # SmallRNAPlugin
#wigglesvg=false # WiggleSVGPlotPlugin
#stranded=false  # StrandedPlotPlugin
#motifdens=false # MotifDensityPlugin
echo ""
echo "Checking plugin support..."
echo ""
methyl=`readJSON plugins.json MethylationPlugin`
echo "    MethylationPlugin installed?    $methyl"
motifdens=`readJSON plugins.json MotifDensityPlugin`
echo "    MotifDensityPlugin installed?   $motifdens"
smrna=`readJSON plugins.json SmallRNAPlugin`
echo "    SmallRNAPlugin installed?       $smrna"
seqview=`readJSON plugins.json SeqViewsPlugin`
echo "    SeqViewsPlugin installed?       $seqview"
stranded=`readJSON plugins.json StrandedPlotPlugin`
echo "    StrandedPlotPlugin installed?   $stranded"
wigglesvg=`readJSON plugins.json WiggleSVGPlotPlugin`
echo "    WiggleSVGPlotPlugin installed?  $wigglesvg"

## traditional installation test - HTML features

dataA='%26loc=Chr5%3A40426..45285%26tracks=t2_tes%2Ct7_rnaseq-html%2Ct4_cvi-snps%26highlight=%26screenshot=p20o1r1n1u1b1m111111s000000z1~0h1000~1h600~2h300'
testURL_A=${dataURL}${dataA}

echo ""
echo "Taking screenshot to test for JBrowse HTML features..."
echo ""

wget -nv -O 'fileA.json' "https://phantomjscloud.com/api/browser/v2/${apiKey}/?request={url:\"${testURL_A}\",renderType:\"json\",outputAsJson:true}"
#testFile fileA.json

## traditional installation test - CanvasFeatures and View
echo ""
echo "Taking screenshot to test for JBrowse Canvas features and view options..."
echo ""

dataB='%26loc=Chr5%3A39136..43995%26tracks=t1_genes%2Ct5_rnaseq-un%2Ct3_mt-snps%2Ct6_rnaseq-snp%26highlight=%26screenshot=p20o0r0n0u0b1m111111s000000z1~0h600y1v0i0q0d0f0~1h600y1v0i0q0d1f0~2h20y1i0q0~3h100y2i0q1'
testURL_B=${dataURL}${dataB}

wget -nv -O 'fileB.json' "https://phantomjscloud.com/api/browser/v2/${apiKey}/?request={url:\"${testURL_B}\",renderType:\"json\",outputAsJson:true,requestSettings:{maxWait:100000}}"
#testFile fileB.json

if [ $methyl == true ];
then
  echo ""
  echo "Taking screenshot to test for MethylationPlugin..."
  echo ""
  dataC='%26loc=Chr5%3A35966..40880%26tracks=t11_methyl%2Ct15_methyl-ext%26highlight=%26screenshot=p20o0r0n0u0b1m111010s000000z1~0y3i-1x1q1v0~1h75y1i-1x1q1v1'
  testURL_C=${dataURL}${dataC}

  wget -nv -O 'fileC.json' "https://phantomjscloud.com/api/browser/v2/${apiKey}/?request={url:\"${testURL_C}\",renderType:\"json\",outputAsJson:true,requestSettings:{maxWait:100000}}"
fi

if [ $motifdens == true ];
then
  echo ""
  echo "Taking screenshot to test for MotifDensityPlugin..."
  echo ""
  dataD='%26loc=Chr5%3A27455..28437%26tracks=t13_motif-dens%2Ct16_motif-dens2%26highlight=%26screenshot=p20o0r0n0u0b1m111111s000000z1~0h80i0x1q1v0~1h100i0x0.3q1v1'
  testURL_D=${dataURL}${dataD}

  wget -nv -O 'fileD.json' "https://phantomjscloud.com/api/browser/v2/${apiKey}/?request={url:\"${testURL_D}\",renderType:\"json\",outputAsJson:true,requestSettings:{maxWait:100000}}"
fi

if [ $smrna == true ];
then
  echo ""
  echo "Taking screenshot to test for SmallRNAPlugin..."
  echo ""
  dataE='%26loc=Chr5%3A18383..23188%26tracks=t10_smrna%2Ct19_smrna2%26highlight=%26screenshot=p20o0r0n0u0b1m111111s010000z1~0h400y1v1i0q0d0f0~1h400y1v0i0q0d1f0'
  testURL_E=${dataURL}${dataE}

  wget -nv -O 'fileE.json' "https://phantomjscloud.com/api/browser/v2/${apiKey}/?request={url:\"${testURL_E}\",renderType:\"json\",outputAsJson:true,requestSettings:{maxWait:100000}}"
fi

if [ $seqview == true ];
then
  echo ""
  echo "Taking screenshot to test for SeqViewsPlugin..."
  echo ""
  dataF='%26loc=Chr5%3A28861..48520%26tracks=t1_genes%2Ct2_tes%2Ct5_rnaseq-un%2Ct20_ac_pos%26highlight=%26screenshot=p20o0r0n1u0b1m111111s000000z1~0h100y1v0i0q0d0f2~1h100f2~2h400y1v0i0q0d0f1~3h400y1v0i0q0d0f1'
  testURL_F=${dataURL}${dataF}

  wget -nv -O 'fileF.json' "https://phantomjscloud.com/api/browser/v2/${apiKey}/?request={url:\"${testURL_F}\",renderType:\"json\",outputAsJson:true,requestSettings:{maxWait:100000}}"
fi

if [ $stranded == true ];
then
  echo ""
  echo "Taking screenshot to test for StrandedPlotPlugin..."
  echo ""
  dataG='%26loc=Chr5%3A1..19660%26tracks=t21_stranded-methyl%2Ct12_stranded%26highlight=%26screenshot=p20o0r0n0u0b1m111111s000000z1~0y3i-200x200q1v0~1y2q1v1'
  testURL_G=${dataURL}${dataG}

  wget -nv -O 'fileG.json' "https://phantomjscloud.com/api/browser/v2/${apiKey}/?request={url:\"${testURL_G}\",renderType:\"json\",outputAsJson:true,requestSettings:{maxWait:100000}}"
fi

if [ $wigglesvg == true ];
then
  echo ""
  echo "Taking screenshot to test for WiggleSVGPlugin..."
  echo ""
  dataH='%26loc=Chr5%3A30341..50001%26tracks=t8_xy%2Ct9_dens%2Ct18_xy2%26highlight=%26screenshot=p20o0r0n0u0b1m111111s000000z1~0y1i0x80q1v1~1h31q1v1~2y1q1v1i-1x2'
  testURL_H=${dataURL}${dataH}

  wget -nv -O 'fileH.json' "https://phantomjscloud.com/api/browser/v2/${apiKey}/?request={url:\"${testURL_H}\",renderType:\"json\",outputAsJson:true,requestSettings:{maxWait:100000}}"
fi
