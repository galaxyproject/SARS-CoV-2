<template>
    Nothing!
</template>
<script>
import Toasted from "vue-toasted";
import Vue from "vue";
Vue.use(Toasted, { keepOnHover: true });

export default {
    mounted() {
        this.$toasted.show("Join our COVID-19 webinars and learn about data analysis in Galaxy.", {
            theme: "toasted-primary",
            duration: 5000,
            action: {
                text: "open link",
                onClick: (e, toastObject) => {
                    window.open("https://elixir-europe.org/events/webinar-galaxy-elixir-covid19");
                    toastObject.goAway(0);
                }
            }
        });
    }
};
</script>
