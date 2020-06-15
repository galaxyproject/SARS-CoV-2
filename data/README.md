---
title: COVID-19 data mirrored in Galaxy
---

## Live Resources

COVID-19 data is mirrored in the following Galaxy instances. No download needed.<br>

| usegalaxy.eu | usegalaxy.org |
|:--------:|:------------:|
| <FlatShield label="usegalaxy" message="eu" href="https://bit.ly/usegalaxy-eu-covid19-data"/> | <FlatShield label="usegalaxy" message="org" href="https://usegalaxy.org/library/list#folders/Fe878daae442969ff"/> |
| | |


## COVID-19 resources available as data library

The covid-19 folder of the shared data library contains a huge amount of SARS-CoV-2 data from public sources that we mirror here to streamline analyses on our server. We are also using this folder to deposit precomputed analysis results for further processing by you.

Datasets that you are importing from the data library into your histories
will be available almost instantaneously (no waiting time for downloads, no unexpected download interrupts)
do not count towards your user quota
help us avoid data duplication on our server

The Export to History functionality of the shared data library offers powerful options for importing large data collections in structured ways.

Currently, we host imaging, proteomics and next-generation sequencing (NGS) data on SARS-CoV-2.

## NGS datasets in the data library

For the NGS data, in particular, we are trying to offer streamlined access to our users to all SARS-CoV-2 public short reads data deposited in the NCBI SRA or at ENA.

To keep this huge data collection manageable for us and you, we decided to organize the NGS data  further by sequencing technology used so inside a sequences folder you will find subfolders for Illumina-, Ion Torrent- and Nanopore-sequenced data. In addition, the sequences folder also contains:

* a `current_metadata` dataset, with descriptions for all available NGS datasets,
* the genbank dataset of the SARS-CoV-2 reference sequence NC_045512, which we suggest to use as the reference sequence in any of your analyses.

The Illumina-sequenced data subfolder contains single-end and paired-end datasets, which can be distinguished by their names:
the names of single-end datasets consist only of an SRR or ERR identifier followed by a file type suffix,
while paired-end data comes in pairs with the SRR/ERR identifier followed by a _1 or _2 to indicate forward and reverse sets of reads.

This naming scheme can be exploited to retrieve only paired-end or only single-end reads datasets from a mixed selection using a so-called rule-based history export. Inside the Illumina subfolder:

1. Select some reads of your choice
2. Choose Export to History -> as a Collection
3. In the following pop-up dialogue, choose Collection Type: From Rules under and select a history to import the data into.
4. In the ensuing Build Rules for Creating Collection(s) window click the little wrench icon next to Rules
5. Delete the default rule in JSON format from the ensuing text box and copy/paste one of the following two JSON-formatted rules instead.

To export only single-end data as a List Collection into your history ...


<details>
  <summary>Please use the following rule for <b>Single-end</b> data</summary>

```
{
  "rules": [
    {
      "type": "add_column_metadata",
      "value": "name"
    },
    {
      "type": "add_filter_regex",
      "target_column": 0,
      "expression": "\\wRR\\d+_\\d.fastq.gz",
      "invert": true
    },
    {
      "type": "add_column_regex",
      "target_column": 0,
      "expression": "(\\wRR\\d+).fastq.gz",
      "group_count": "1"
    }
  ],
  "mapping": [
    {
      "type": "list_identifiers",
      "columns": [
        1
      ],
      "editing": false
    }
  ]
}

```

</details>


To export only paired-end data as a List of Pairs Collection into your history ...

<details>
  <summary>Please use the following rule for <b>Paired-end</b> data</summary>

```

{
  "rules": [
    {
      "type": "add_column_metadata",
      "value": "name"
    },
    {
      "type": "add_filter_regex",
      "target_column": 0,
      "expression": "\\wRR\\d+_\\d.fastq.gz",
      "invert": false
    },
    {
      "type": "add_column_regex",
      "target_column": 0,
      "expression": "(\\wRR\\d+)_(\\d).fastq.gz",
      "group_count": "2"
    }
  ],
  "mapping": [
    {
      "type": "list_identifiers",
      "columns": [
        1
      ],
      "editing": false
    },
    {
      "type": "paired_identifier",
      "columns": [
        2
      ]
    }
  ]
}

```
</details>


6. Click Apply, which will take you back to the previous window
7. Give the collection to be created a name, then click Create


## COVID-19 shared histories

We are trying to document our own analyses of SARS-CoV-2 data, in particular those following the documented workflows of the usegalaxy.* COVID-19 analysis project, by sharing the resulting histories.

Like our shared workflows, all our "official" shared histories carry the covid-19 tag. To discover them:

* Go to Shared Data -> Histories
* Type covid-19 in the search box and press enter
* Look for workflows with the tag in the resulting list

