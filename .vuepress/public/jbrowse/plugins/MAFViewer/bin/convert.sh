#!/usr/bin/env bash

maf2bed.pl $2 < $1 > `basename $1 .maf`.bed
sort -k1,1 -k2,2n `basename $1 .maf`.bed > `basename $1 .maf`.sorted.bed
bgzip `basename $1 .maf`.sorted.bed
tabix -p bed `basename $1 .maf`.sorted.bed.gz
