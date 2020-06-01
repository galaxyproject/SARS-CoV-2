---
title: 'Variant Annotation'
---

# Variants Annotation



## Content

This folder contains annotation data about variants identified in the other parts of this project. The table with variants annotation is in the main directory, and subdirectories contain table to convert coordinates between coronavirus species.



## Variant table

The table containing the variant annotation is organised as follow:

-   **Gene** : The feature description as included in the original variant identification output.
-   **POS** : The position of the nucleotide change if available in the original table, otherwise the position of the firsnt nucleotide of the codon.
-   **NbSample** : Number of samples with the variants
-   **MeanAF** : Allele frequency averaged across samples
-   **Genomic_coord_start** : Start position of the impacted codon
-   **Genomic_coord_end** : End position of the impacted codon
-   **MainFeat / MainResidue** : Main feature and position of the residue affected
-   **Main_ref_codon / Main_alt_codon** : Reference and alternative codons in the main feature
-   **Main_ref_residue / Main_alt_residue** : Reference and alternative residues in the main feature
-   **SARS-Cov Residue** : Equivalent residues in SARS Covid
-   **SecondResidue / SecondResidue** : Secondary feature and position of the residue affected. Optional, if there is a sub-feature affected (eg. Main=ORF1a, Second=nsp12)
-   **Second_ref_codon / Second_alt_codon** : Reference and alternative codons in the secondary feature
-   **Second_ref_residue / Second_alt_residue** : Reference and alternative residues in the secondary feature
-   **ThirdResidue / ThirdResidue** : Teritary feature and position of the residue affected. Optional, if there is a sub-feature affected (eg. Main=ORF1ab, Second=ORF1b, Third=RdRp)
-   **Third_ref_codon / Third_alt_codon** : Reference and alternative codons in the tertiary feature
-   **Third_ref_residue / Third_alt_residue** : Reference and alternative codons in the tertiary feature
-   **ORF1ab pos** : Position of the impacted residue in ORF1ab coordinates
-   **Annotation** : Annotation of the impacted site in the litterature
-   **Impact** : Impact of the mutation
-   **Reference** : Doi of publication mentioning the residue or the mutation
