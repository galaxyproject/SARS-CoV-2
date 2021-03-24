#!/bin/bash

#2020-02-13
#2020-02-25
#2020-03-05
#2020-03-06
#2020-03-16
#2020-03-24
#2020-03-26
#2020-03-20
#2020-03-30
#2020-03-31
#2020-04-03
#2020-04-12
#2020-04-10  # wired
#2020-04-14
#2020-04-16
#2020-04-23
#2020-04-28
#2020-04-30
#2020-05-02  # wired
#2020-05-09
#2020-05-17
#2020-05-18
#2020-05-20
#2020-05-25
#2020-05-29
#2020-05-30  # ideall rerun MQC PE missing -- SRR11608260
#2020-06-02
#2020-06-07  # ideally rerun MQC PE missing -- ERR4074322
#2020-06-08

#2020-06-21
#2020-07-04
#2020-07-06
#2020-07-19
#2020-07-23
#2020-07-25
#2020-06-14

dates='
2020-03-26
'


a='

'

## e.g. when no SNPs at all could be found
skip_list='
SRR11350376
SRR11476450
SRR11476454
SRR11608258
ERR3991485
ERR4080501
ERR4074322
SRR11476451
SRR11608259
SRR11476455
SRR11608260
SRR11313433
ERR4080563
ERR4240680
ERR4207222
ERR4207053
'


## split --verbose -d current_illumina.tsv -n l/5 covid_ 
## cut -f1 current_illumina.tsv > accession.tsv

splits='
covid_00
'

foo='
covid_01
covid_02
covid_03
covid_04
covid_05
'


#all_together='
for d in $splits
do
    for s in $skip_list
    do
        sed -i "/$s/d" ${d}
    done
    python3 covid_genome.py --accessions_file ${d} --nc_45512_2_fasta_file NC_045512.2.fasta -n "${d} Update (August rerun)" --publish -g https://usegalaxy.eu -a 'PVp2ilANPUDSaEYwKvgfjcqpVKsRS76'
done
#'

bar='
for d in $dates
do
    #echo $d
    grep ${d} accession_and_date.tsv|cut -f1 > illumina_${d}.txt || true
    for s in $skip_list
    do
        sed -i "/$s/d" illumina_${d}.txt
    done
    #cat illumina_${d}.txt
    python3 covid_genome.py --accessions_file illumina_${d}.txt --nc_45512_2_fasta_file NC_045512.2.fasta -n "${d} Update" --publish -g https://usegalaxy.eu -a 'PVp2ilANPUDSaEYwKvgfjcqpVKsRS76'
done
'



