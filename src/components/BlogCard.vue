<template>
    <div class="blog-card">
        <div v-show="editPost" class="icons">
            <div @click="editBlog" class="icon">
                <img :src="Edit" class="edit" />
            </div>
            <div @click="deletePost" class="icon">
                <img :src="Delete" class="delete" />
            </div>
        </div>
        <div class="info">
            <h4>{{ post.title }}</h4>
            <h6>
                Posted on:
                {{
                    new Date(post.created_at).toLocaleString("en-us", {
                        dateStyle: "long",
                    })
                }}
            </h6>
            <router-link
                class="link"
                :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }"
            >
                View The Post ➡️
            </router-link>
        </div>
    </div>
</template>

<script>
import Edit from "../assets/Icons/edit-regular.svg";
import Delete from "../assets/Icons/trash-regular.svg";
export default {
    name: "blogCard",
    props: ["post"],
    components: { Edit, Delete },
    data() {
        return {
            Edit,
            Delete,
        };
    },
    methods: {
        deletePost() {
            this.$store.dispatch("deletePost", this.post.blogID);
        },
        editBlog() {
            this.$router.push({
                name: "EditBlog",
                params: { blogid: this.post.blogID },
            });
        },
    },
    computed: {
        editPost() {
            return this.$store.state.editPost;
        },
    },
};
</script>

<style lang="scss" scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #90e0ef;
    min-height: 250px;
    transition: 0.5s ease all;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;
        img {
            transform: scale(0.09);
        }

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: 0.5s ease all;

            /* transform: scale(0.2); */

            &:hover {
                background-color: #93867f;
            }

            &:nth-child(1) {
                margin-right: 8px;
            }

            .edit,
            .delete {
                pointer-events: none;
                height: 15px;
                width: auto;
            }
        }
    }

    img {
        display: block;
        border-radius: 8px 8px 0 0;
        z-index: 1;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        z-index: 3;
        padding: 32px 16px;
        color: #000;

        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: 300;
        }

        h6 {
            font-weight: 400;
            font-size: 12px;
            padding-bottom: 16px;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            font-weight: 500;
            padding-top: 20px;
            font-size: 12px;
            padding-bottom: 4px;
            transition: 0.5s ease-in all;

            &:hover {
                color: rgba(48, 48, 48, 0.8);
            }

            .arrow {
                width: 10px;
            }
        }
    }
}
</style>