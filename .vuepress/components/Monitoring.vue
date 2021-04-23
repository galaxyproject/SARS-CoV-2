<template>
    <div id="monitor-container">
        <h2 id="monitoring">
            SARS-CoV-2 Monitoring
        </h2>
        <div id="mon-tabs">
            <!-- These can be `a` or `RouterLink`, just apply the 'action-button' class -->
            <RouterLink class="action-button" :to="'/genomics/global_platform/'">
                Approach
            </RouterLink>
            <a href="https://covid19beacon.crg.eu/" class="action-button">Data</a>
            <a href="https://observablehq.com/@spond/intrahost-variant-exploration-landing" class="action-button"
                >Dashboard</a
            >
            <a class="action-button">How To?</a>
        </div>
    </div>
</template>
<script>
export default {
    name: "monitoring"
};
</script>
<style lang="stylus">
#monitor-container{
    //text-align: center;
}
#monitoring{
    margin: 2rem 0;
    // border: none; // If we want the faint underline gone for this header only
}
#mon-tabs {
    display:flex;
    .action-button {
        flex: 1 1 0px
        text-align: center;
        margin: 0 2rem;
        font-size: 1.2rem;
        color: #fff;
        border: 1px solid lighten($accentColor, 10%);
        background-color: lighten($accentColor, 10%);
        padding: 0.8rem 1.6rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        font-weight: 500;
        &:hover {
            border: 1px solid $accentColor;
            background-color: lighten($accentColor, 25%);
        }
        /*
        // background-image: linear-gradient(to right, lighten($accentColor, 15%) 0%, $accentColor 51%, lighten($accentColor, 15%) 100%);
        &:hover {
            background-image: linear-gradient(to right, lighten($accentColor, 35%) 0%, $accentColor 51%, lighten($accentColor, 35%) 100%);
        */
    }
}
</style>
