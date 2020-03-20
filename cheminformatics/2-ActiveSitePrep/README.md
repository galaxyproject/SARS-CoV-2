# Active site preparation

This section describes the preparation of the active site for docking. The screening of the active site was repeated 17 times, for each of the 17 fragment screening crystal structures that were available at the time (more are expected).


## Live Resources

| usegalaxy.eu | 
|:--------:|
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/timdudgeon/h/mpro-docking-inputs) | 

## Outline

- A file describing the active site of the protein for each of the fragment screening crystal structures was generated using rDock's `rbcavity` (with `rbcavity -was -d -r`).
- Creating s single hybrid molecule that contains all the ligands - [the 'frankenstein' ligand]( https://www.informaticsmatters.com/blog/2018/11/23/cavities-and-frankenstein-molecules.html).
 
