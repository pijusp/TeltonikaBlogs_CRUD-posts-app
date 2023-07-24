import Vue from "vue";
import VueRouter from "vue-router";
import Blogs from "../views/Blogs.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Blogs",
        component: Blogs,
    },
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes,
});

export default router;
