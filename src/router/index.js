import Vue from "vue";
import VueRouter from "vue-router";
import Blogs from "../views/Blogs.vue";
import NewPost from "../views/NewPost.vue";
import PostPreview from "../views/PostPreview.vue";
import ViewPost from "../views/ViewPost.vue";
import EditPost from "../views/EditPost.vue";

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
        path: "/view-post/:id",
        name: "ViewPost",
        component: ViewPost,
        meta: {
            title: "View Post",
        },
    },
    {
        path: "/edit-post/:id",
        name: "EditPost",
        component: EditPost,
        meta: {
            title: "Edit Post",
        },
    },
    {
        path: "*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
        meta: {
            title: "404",
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
