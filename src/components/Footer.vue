<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{ name: 'Blogs' }"
                        >Teltonika blogs</router-link
                    >
                    <ul>
                        <li>
                            <a href="https://www.youtube.com">
                                <img
                                    src="../assets/Icons/youtube-brands.svg"
                                    class="svg-icon"
                                    alt="YouTube"
                                /><img />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com"
                                ><img
                                    :src="twitter"
                                    class="svg-icon"
                                    alt="Twitter"
                            /></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com"
                                ><img
                                    :src="instagram"
                                    class="svg-icon"
                                    alt="Instagram"
                            /></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com"
                                ><img
                                    :src="linkedin"
                                    class="svg-icon"
                                    alt="LinkedIn"
                            /></a>
                        </li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul>
                        <router-link class="link" :to="{ name: 'Blogs' }"
                            >Blogs</router-link
                        >
                    </ul>
                    <ul>
                        <router-link class="link" :to="{ name: 'NewPost' }"
                            >Create a new post</router-link
                        >
                    </ul>
                </div>
            </div>
            <div class="right">
                <p>Copyright &copy 2023 All Rights Reserved</p>
            </div>
        </div>
    </footer>
</template>

<script>
import youTube from "../assets/Icons/youtube-brands.svg?inline";
import twitter from "../assets/Icons/twitter-brands.svg";
import instagram from "../assets/Icons/instagram-brands.svg";
import linkedin from "../assets/Icons/linkedin-brands.svg";
export default {
    name: "footer-vue",
    data() {
        return {
            youTube,
            twitter,
            instagram,
            linkedin,
        };
    },
    components: {
        youTube,
        twitter,
        instagram,
        linkedin,
    },
    computed: {},
};
</script>

<style lang="scss" scoped>
footer {
    margin-top: auto;
    padding: 20px 20px;
    background-color: #93867f;

    .container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        @media (min-width: 800px) {
            flex-direction: row;
            gap: 0px;
        }

        > div {
            display: flex;
            flex: 1;
        }

        .left {
            gap: 8px;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            @media (min-width: 800px) {
                flex-direction: row;
                align-items: initial;
                gap: 0;
            }

            .header {
                text-align: center;
                font-size: 24px;
                color: #fff;
                margin-bottom: 16px;
                text-decoration: none;
                font-weight: 600;
                @media (min-width: 800px) {
                    text-align: initial;
                }
            }
            ul {
                gap: 16px;
                list-style: none;
                display: flex;
            }

            .col-1,
            .col-2 {
                gap: 8px;
                display: flex;
                flex: 1;
                @media (min-width: 800px) {
                    gap: 0;
                }
            }

            .col-1 {
                flex-direction: column;

                h2 {
                    text-align: center;
                    @media (min-width: 800px) {
                        text-align: initial;
                    }
                }
                ul {
                    margin-top: auto;

                    li {
                        display: flex;
                        align-items: center;
                        .svg-icon {
                            width: 28px;
                            height: auto;
                            color: #fff;
                        }
                    }
                }
            }

            .col-2 {
                ul {
                    height: 100%;
                    justify-content: center;
                    flex-direction: row;
                    flex-wrap: wrap;
                    @media (min-width: 800px) {
                        flex-direction: column;
                    }
                    .link {
                        font-size: 16px;
                        font-weight: 500;
                        color: #fff;
                        text-decoration: none;
                        margin: 8px;
                    }
                }
            }
        }

        .right {
            gap: 32px;
            color: #fff;
            align-items: center;
            flex-direction: column;
            @media (min-width: 800px) {
                align-items: flex-end;
                gap: 0;
            }
        }

        p {
            margin-top: auto;
        }
    }
}
</style>
