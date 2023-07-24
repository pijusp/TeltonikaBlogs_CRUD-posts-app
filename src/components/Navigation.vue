<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home' }"
                    >Teltonika Blogs</router-link
                >
            </div>
            <div class="nav-links">
                <ul>
                    <router-links class="link" to="#">Blogs</router-links>
                    <router-links class="link" to="#"
                        >Create a new post</router-links
                    >
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
