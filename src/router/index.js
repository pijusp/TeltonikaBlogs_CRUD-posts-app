import Vue from "vue";
import VueRouter from "vue-router";
import Blogs from "../views/Blogs.vue";
import NewPost from "../views/NewPost.vue";
import PostPreview from "../views/PostPreview.vue";

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
    {
        path: "/new-post",
        name: "NewPost",
        component: NewPost,
        meta: {
            title: "New Post",
        },
    },
    {
        path: "/post-preview",
        name: "PostPreview",
        component: PostPreview,
        meta: {
            title: "Post Preview",
        },
    },
    {
        path: "*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
        meta: {
            title: "404 - Page Not Found",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes,
});

router.beforeEach((to, from, next) => {
    const title = to.meta.title || "Teltonika Blogs";
    document.title = title;
    next();
});

export default router;
