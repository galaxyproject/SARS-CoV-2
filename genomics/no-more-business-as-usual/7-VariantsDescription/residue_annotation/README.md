# How to contribute to annotation tables

Annotation and transfer of annotations from related species are an important tool in understanding the genome of a virus, and in identifying important variations when they happen. However the work of parsing literature for detailled annotation is a demanding task. The best way to maintain an up-to-date, valuable, annotation reference, it through crowd-sourcing. Thank you for all the contributors to these tables. Please consider participating to the effort by adding annotations.

## Structure of the annotation tables

Each gene of SARS-Cov 2 is described in a separate annotation table. Annotation tables contain 8 type of columns :
-   **NC_045512** : the position of the residue in the protein of SARS-Cov 2;
-   **AA** : the residue ;
-   **Alignment** : the position of the residue in the reference alignment;
-   **\[Genome identifier\]** : several columns containing the position of the corresponding residue in other coronaviruses species;
-   **Variant** : Has a variation been observed at this position
-   **Genome** : The genomic position of the start of the codon coding for thiis residue;
-   **Annotation** : Contain the annotation linked to that residue;
-   **Impact** : Contain the annotation linked to a variation in that residue;
-   **Reference** : Doi of paper that are the source of the Annotation or Impact columns.

## Contribution

To contribute to the annotation effort, please fork this GitHub repository, modify the tables in this directory, and make a pull request.

### Adding an annotation

The annotation tables contain annotation linked to specific residues or domain. Each annotations are separated by semicolons `;` either in the *Annotation* or the *Impact* columns.
Each annotation is linked to its source by adding the number of the reference (contained in the *Reference* column) between brackets `[]`.

E.g.:

```
B-cell epitope, HLA-A*02:01, HLA-B*07:02, HLA-B*08:01, HLA-B*35:01 , HLA-B*51:01 [1] ; NTD RNA-Binding domain [2] ;
```


### Adding a Reference

In the *Reference* column, reference are separated by semi semicolons `;`. They are reported with the number of the reference between brackets `[]`, followed by the publication doi (without the `https://doi.org/` part ) between parenthesis `()`.

E.g.:

```
[1](10.3390/v12030254); [2](10.1021/bi036155b);
```
