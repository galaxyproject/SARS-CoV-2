# Selection of compounds for synthesis

Following docking, scoring, and ranking, the aim was to select 500 compounds which could be synthesised.

For this, all scores for the 17 fragments were combined (i.e. so that each compound was assigned the lowest score from all the fragments). The resulting table was then compared with a list of compounds available from [https://enamine.net](Enamine) and [https://chem-space.com](Chemspace-BB) and the 500 highest scoring matching compounds were selected for purchase.

## Live Resources

| usegalaxy.eu | 
|:--------:|
| <FlatShield label="history" message="view" href="https://usegalaxy.eu/u/timdudgeon/h/top-500-enamine--chemspace-bb" alt="Galaxy history" /> | 
| <FlatShield label="workflow" message="run" href="https://usegalaxy.eu/u/timdudgeon/w/filter-results" alt="Galaxy workflow" /> | 

## Outline

- SDF files from all fragments were combined into a single dataset and filtered to include only the lowest (best) scoring pose for each compound.
- This file of optimal poses for all ligands was compared to a database of Enamine and Chemspace compounds and the best scoring 500 matches purchased for further study.
