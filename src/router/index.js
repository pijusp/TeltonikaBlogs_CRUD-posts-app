import Vue from "vue";
import VueRouter from "vue-router";
import Blogs from "../views/Blogs.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Blogs",
        component: Blogs,
        meta: {
            title: "Blogs",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Teltonika Blogs`;
    next();
});

export default router;
