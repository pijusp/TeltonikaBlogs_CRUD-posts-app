<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Blogs' }"
                    >Teltonika Blogs</router-link
                >
            </div>
            <div class="nav-links">
                <div class="search-bar">
                    <input
                        v-model="searchQuery"
                        @input="handleSearch"
                        type="text"
                        placeholder="Search posts..."
                        class="search-input"
                    />
                </div>
                <ul class="desktop-menu">
                    <router-link class="link" :to="{ name: 'Blogs' }"
                        >Blogs</router-link
                    >
                    <router-link class="link" :to="{ name: 'NewPost' }"
                        >Create a new post</router-link
                    >
                </ul>
            </div>
        </nav>
        <img :src="MenuIcon" class="menu-icon" @click="toggleMobileNav" />
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" :to="{ name: 'Blogs' }"
                    >Blogs</router-link
                >
                <router-link class="link" :to="{ name: 'NewPost' }"
                    >Create a new post</router-link
                >
            </ul>
        </transition>
    </header>
</template>

<script>
import MenuIcon from "../assets/Icons/bars-regular.svg";
export default {
    name: "navigation",
    components: {},
    data() {
        return {
            mobileNav: false,
            MenuIcon,
            searchQuery: "",
        };
    },
    created() {},
    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        handleSearch() {
            // Emit a custom event 'search' with the searchQuery as payload
            this.$emit("search", this.searchQuery);
        },
    },
};
</script>

<style lang="scss" scoped>
header {
    background-color: #243add;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3),
        0 2px 4px -1px rgba(0, 0, 0, 0.18);
    z-index: 10;

    .link {
        color: white;
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;

        &:hover {
            color: #03045e;
        }
    }
}
nav {
    display: flex;
    padding: 25px 0;

    .branding {
        display: flex;
        align-items: center;

        .header {
            font-weight: 600;
            font-size: 24px;
            color: beige;
            text-decoration: none;
            @media only screen and (max-width: 768px) {
                font-size: 16px;
            }
        }
    }

    .nav-links {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: flex-end;

        ul {
            margin-right: 32px;

            .link {
                margin-right: 32px;
            }

            .link:last-child {
                margin-right: 0;
            }
        }
    }
    .search-bar {
        position: relative;
        margin-right: 32px;

        .search-input {
            width: 200px;
            padding: 8px 12px;
            border-radius: 20px;
            border: none;
            background-color: #fff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: width 0.3s ease;

            &:focus {
                outline: none;
                width: 250px; /* Expand the input field when focused */
            }

            &::placeholder {
                color: #aaa;
            }
            @media only screen and (max-width: 992px) {
                width: 140px;
                &:focus {
                    outline: none;
                    width: 170px; /* Expand the input field when focused */
                }
            }
            @media only screen and (max-width: 768px) {
                width: 200px;
                &:focus {
                    outline: none;
                    width: 250px; /* Expand the input field when focused */
                }
            }
            @media only screen and (max-width: 576px) {
                width: 125px;
                &:focus {
                    outline: none;
                    width: 160px; /* Expand the input field when focused */
                }
            }
        }
    }
    .mobile-user-menu {
        margin-right: 40px;
    }
}

.menu-icon {
    cursor: pointer;
    position: absolute;
    top: 27px;
    right: 25px;
    height: 25px;
    width: auto;
    display: none; /* Hide the menu icon by default */
}

/* Show the menu icon only on screens with max-width 768px */
@media only screen and (max-width: 768px) {
    .menu-icon {
        display: block;
    }
    .desktop-menu {
        display: none;
    }
}

.mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
        padding: 15px 0;
        color: #fff;
    }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: all 1s ease;
}

.mobile-nav-enter {
    transform: translateX(-250px);
}

.mobile-nav-enter-to {
    transform: translateX(0);
}

.mobile-nav-leave-to {
    transform: translateX(-250px);
}
</style>
