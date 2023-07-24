<template>
    <div class="app-wrapper">
        <div class="app">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    components: {},
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@30,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Quicksand", sans-serif;
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
