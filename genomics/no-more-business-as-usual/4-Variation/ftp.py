#!/usr/bin/python

import os, sys

wget_str = open('wget.sh', 'w+')
md5sum_file = open('md5sum.sh', 'w+')

for line in open("illumina_2020-06-08.txt"):
    line = line.strip()
    for l in open("current_metadata_ena.tsv"):
        if line in l:
            cols = l.split('\t')
            a = cols[16].strip()
            if not a:
                print('no file for %s', cols[38])
                #sys.exit()
            if ';' in a:
                md5sum = cols[17].split(';')
                for i, w in enumerate(a.split(';')):
                    md = md5sum[i]
                    if '_1' in w or '_2' in w:
                        wget_str.write('wget -N --quiet %s \n' % w)
                        md5sum_file.write('%s\t%s\n' % (md, w.split('/')[-1]))
                    else:
                        pass
            else:
                if '_1' in a:
                    wget_str.write('wget -N --quiet %s -O %s.fastq.gz \n' % (a, cols[38]))
                    md5sum_file.write('%s\t%s.fastq.gz\n' % (cols[17], cols[38]))
                else:
                    print(cols, a)
                    #sys.exit()
