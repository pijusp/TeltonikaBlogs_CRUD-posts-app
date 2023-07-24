<template>
    <div class="app-wrapper">
        <div class="app">
            <Navigation />
            <router-view />
        </div>
    </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
    name: "app",
    components: { Navigation },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {},
    watch: {},
};
</script>

<style lang="scss">
body {
    font-family: "Poppins", sans-serif;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container {
    max-width: 1440px;
    margin: 0 auto;
}

.link {
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
}

.link-light {
    color: #fff;
}
</style>
