module.exports = {
    title: "COVID-19 analysis on usegalaxy.★",
    description:
        "This repo serves as a companion to our study describing the analysis of early COVID-19 data:  No more business as usual: agile and effective responses to emerging pathogen threats require open data and open analytics. usegalaxy.org, usegalaxy.eu, usegalaxy.org.au, usegalaxy.be and hyphy.org development teams, Anton Nekrutenko, Sergei L Kosakovsky Pond. bioRxiv 2020.02.21.959973; doi: https://doi.org/10.1101/2020.02.21.959973",
    markdown: {
        extractHeaders: ["h1", "h2", "h3"]
    },
    themeConfig: {
        nav: [
            {
                text: "Genomics",
                link: "/genomics/"
                /*
                items: [
                    { text: "Pre-processing", link: "/genomics/1-PreProcessing/" },
                    { text: "Assembly", link: "/genomics/2-Assembly/" },
                    { text: "MRCA", link: "/genomics/3-MRCA/" },
                    { text: "Variation", link: "/genomics/4-Variation/" },
                    { text: "S-Analysis", link: "/genomics/5-S-analysis/" },
                    { text: "Evolutionary Analysis", link: "/genomics/6-RecombinationSelection/" },
                    { text: "Updates", link: "/genomics/updates/" },
                    { text: "Deploy", link: "/genomics/deploy/" }
                ]
                */
            },
            {
                text: "Cheminformatics",
                link: "/cheminformatics/"
                /*
                items: [
                    { text: "Docking Prep", link: "/cheminformatics/1-DockingPrep/" },
                    { text: "Active Site Prep", link: "/cheminformatics/2-ActiveSitePrep/" },
                    { text: "Docking", link: "/cheminformatics/3-Docking/" },
                    { text: "Scoring", link: "/cheminformatics/4-Scoring/" },
                    { text: "Histories", link: "/cheminformatics/Histories/" },
                ]
                */
            }
        ],
        sidebar: {
            "/genomics/": [
                "/genomics/",
                "/genomics/1-PreProcessing/",
                "/genomics/2-Assembly/",
                "/genomics/3-MRCA/",
                "/genomics/4-Variation/",
                "/genomics/5-S-analysis/",
                "/genomics/6-RecombinationSelection/",
                "/genomics/updates/",
                "/genomics/deploy/"
            ],
            "/cheminformatics/": [
                "/cheminformatics/",
                "/cheminformatics/1-DockingPrep/",
                "/cheminformatics/2-ActiveSitePrep/",
                "/cheminformatics/3-Docking/",
                "/cheminformatics/4-Scoring/",
                "/cheminformatics/Histories/"
            ]
        },
        displayAllHeaders: true
    }
};
