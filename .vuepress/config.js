module.exports = {
    title: "COVID-19 analysis on usegalaxy.★",
    description:
        "This repo serves as a companion to our study describing the analysis of early COVID-19 data:  No more business as usual: agile and effective responses to emerging pathogen threats require open data and open analytics. usegalaxy.org, usegalaxy.eu, usegalaxy.org.au, usegalaxy.be and hyphy.org development teams, Anton Nekrutenko, Sergei L Kosakovsky Pond. bioRxiv 2020.02.21.959973; doi: https://doi.org/10.1101/2020.02.21.959973",
    markdown: {
        extractHeaders: ["h1", "h2", "h3"]
    },
    themeConfig: {
        repo: "galaxyproject/SARS-CoV-2",
        repoLabel: "Edit on GitHub",
        nav: [
            {
                text: "Genomics",
                link: "/genomics/"
            },
            {
                text: "Cheminformatics",
                link: "/cheminformatics/"
            },
            /*{
                text: "Evolution",
                link: "/evolution/"
            },
            {
                text: "Direct RNAseq",
                link: "/direct-rnaseq/"
            },*/
            {
                text: "Proteomics",
                link: "/proteomics/"
            },
            /*{
                text: "Artic",
                link: "/artic/"
            },*/
            {
                text: "Data",
                link: "/data/"
            },
            {
                text: "Webinars",
                link: "/webinars/"
            }
        ],
        sidebar: {
            "/genomics/": [
                //"/genomics/",
                "/genomics/global_platform/",
                "/genomics/no-more-business-as-usual/",
            ],
            "/cheminformatics/": [
                "/cheminformatics/",
                "/cheminformatics/1-DockingPrep/",
                "/cheminformatics/2-ActiveSitePrep/",
                "/cheminformatics/3-Docking/",
                "/cheminformatics/4-Scoring/",
                "/cheminformatics/5-Selection/",
                "/cheminformatics/Histories/",
                "/cheminformatics/deploy/"
            ],
            "/evolution/": [
                "/evolution/",
                "/evolution/1-DiversityDivergence",
            ],
            "/direct-rnaseq/": [
                "/direct-rnaseq/",
                "/direct-rnaseq/1-preprocessing/",
                "/direct-rnaseq/2-epigenetics/",
            ],
            "/proteomics/": [
                "/proteomics/",
                "/proteomics/PXD018117/",
                "/proteomics/PXD018241/",
                "/proteomics/PXD018594/",
                "/proteomics/PXD018804/",
                "/proteomics/PXD019423/",
                "/proteomics/PXD020394/",
                "/proteomics/PXD021328/",
                "/proteomics/mPXD019423/",
                "/proteomics/mPXD020394/",
                "/proteomics/mPXD021328/",
            ],
            "/artic/": [
                "/artic/",
            ],
            "/data/": [
                "/data/",
                "/data/gisaid/",
            ],
            "/webinars/": [
                "/webinars/",
            ],
        },
        sidebarDepth: 3,
        displayAllHeaders: true,
        search: false
    }
};
