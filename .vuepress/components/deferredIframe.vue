<template>
    <div v-if="loadNotebook">
        <iframe width="100%" height="796" frameborder="0" :src="src"></iframe>
    </div>
    <div v-else="loadNotebook">
        <!-- Shouldn't ever see this button unless the intersection API isn't available, this is a fallback -->
        <a class="action-button" href="#" @click.prevent='loadMe'>Click here to load Observable frame</a>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loadNotebook: false
        };
    },
    mounted() {
        const observer = new IntersectionObserver(this.loadMe, {
            threshold: 1.0
        });
        observer.observe(this.$el);
    },
    methods: {
        loadMe() {
            this.loadNotebook = true;
        },
    }
};
</script>
<style lang="stylus">
    // TODO: a spinner or something other than a button, and refactor these styles to be generally applicable.
    .action-button {
        flex: 1 1 0px
        text-align: center;
        margin: 0 2rem;
        font-size: 1.2rem;
        color: #fff;
        border: 1px solid lighten($buttonColor, 10%);
        background-color: lighten($buttonColor, 10%);
        padding: 0.8rem 1.6rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        font-weight: 500;
        &:hover {
            border: 1px solid $buttonColor;
            background-color: lighten($buttonColor, 35%);
        }
    }
</style>