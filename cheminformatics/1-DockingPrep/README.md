# Charge enumeration

This section describes the process of charge enumeration (i.e. generation of all charge forms) from the initial set of ~42,000 candidate compounds.


## Live Resources

| usegalaxy.eu | 
|:--------:|
| [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.eu/u/sbray/w/charge-enumeration) | 
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/sbray/w/charge-enumeration) | 

## Outline

- The initial compounds in SMILES format are enumerated using RDKit to a total of around ~150000 compounds. 
- For each of these, a three-dimensional structure is generated using OpenBabel and saved in SDF format.
- The SD-file is split into chunks of 1000 molecules each
