# Docking

This section describes the docking procedure. This was repeated 17 times, for each of the 17 fragment screening crystal structures that were available at the time (more are expected).

## Live Resources

| usegalaxy.eu | 
|:--------:|
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/timdudgeon/h/mpro-x0161) |
| [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=view&color=blue)](https://usegalaxy.eu/u/sbray/w/mpro-docking-1) | 

## Outline

Docking is performed with rDock [1] using as inputs:
 
- PDB file of the protein of the fragment screening crystal structure with the ligand and waters removed, and protonated 
(using OpenBabel) at pH 7.4
- The active site definition for that protein prepared as described in [step 2](../2-ActiveSitePrep)
- Candidate molecules prepared as described in [step 1](../1-DockingPrep)

25 poses were generated for each molecule.
