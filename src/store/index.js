import Vue from "vue";
import Vuex from "vuex";
import posts from "./modules/posts";
import editModal from "./modules/editModal";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        posts,
        editModal,
    },
});
