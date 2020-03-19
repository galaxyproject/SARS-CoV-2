# Preparation for docking

This section describes the process of charge enumeration (i.e. generation of all charge forms) from the initial set of ~42,000 candidate compounds, and 3D conformer generation, prior to performing docking.


## Live Resources

| usegalaxy.eu | 
|:--------:|
| [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.eu/u/sbray/w/charge-enumeration) | 
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/sbray/w/charge-enumeration) | 

## Outline

- The initial candidate compounds in SMILES format are enumerated using Dimorphite-DL [1] and RDKit [2] to a total of around ~150000 compounds.  
- For each of these, a three-dimensional structure is generated using OpenBabel [3] and saved in SDF format.
- The SD-file is split into chunks of 1000 molecules each ready for docking.

## References

[1] Dimorphite-DL: an open-source program for enumerating the ionization states of drug-like small molecules,
Robb *et al.* [doi:10.1186/s13321-019-0336-9](https://doi.org/doi:10.1186/s13321-019-0336-9).

[2] [RDKit](http://www.rdkit.org)

[3] Open Babel: An open chemical toolbox. O'Boyle *et. al* [doi:10.1186/1758-2946-3-33](https://doi.org/10.1186/1758-2946-3-33).
