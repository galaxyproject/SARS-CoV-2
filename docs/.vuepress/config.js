module.exports = {
    title: "COVID-19 analysis on usegalaxy.★",
    description:
        "This repo serves as a companion to our study describing the analysis of early COVID-19 data:  No more business as usual: agile and effective responses to emerging pathogen threats require open data and open analytics. usegalaxy.org, usegalaxy.eu, usegalaxy.org.au, usegalaxy.be and hyphy.org development teams, Anton Nekrutenko, Sergei L Kosakovsky Pond. bioRxiv 2020.02.21.959973; doi: https://doi.org/10.1101/2020.02.21.959973",
    markdown: {
        extractHeaders: ["h1", "h2", "h3"],
    },
    themeConfig: {
        nav: [
            { text: "Pre-processing", link: "/1-PreProcessing/" },
            { text: "Assembly", link: "/2-Assembly/" },
            { text: "MRCA", link: "/3-MRCA/" },
            { text: "Variation", link: "/4-Variation/" },
            { text: "S-Analysis", link: "/5-S-analysis/" },
            { text: "Evolutionary Analysis", link: "/6-RecombinationSelection/" },
            { text: "Updates", link: "/updates/" },
            { text: "Install", link: "/install/" }
        ],
        search: false,
        sidebar: 'auto',
        displayAllHeaders: true
    }
};
