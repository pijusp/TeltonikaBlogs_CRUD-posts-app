<template>
    <body>
        <main>
            <div class="container">
                <div class="text">
                    <h2>404</h2>
                    <p>PAGE NOT FOUND</p>
                    <router-link to="/">Go to home</router-link>
                </div>
                <div class="img">
                    <img src="../../public/img/lekste.png" alt="Plate photo" />
                </div>
            </div>
        </main>
    </body>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style scoped>
body,
main {
    margin: 0;
    padding: 0;
    background-color: #4e78e5;
}
.container {
    background-color: #4e78e5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
    margin-bottom: 10vh;
    padding: 33px;
}

h1 {
    font-weight: normal;
    font-size: 80px;
    color: beige;
}

p {
    font-size: 36px;
    color: beige;
    padding-bottom: 20px;
}

img {
    display: flex;
    max-width: 100%; /* Ensure the image doesn't overflow its container */
}

a {
    text-decoration: none;
    background: none;
    padding: 10px 30px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: lighter;
    color: beige;
    border-color: beige;
    border: 1px solid beige;
    border-radius: 20px;
}

a:hover {
    color: #4e78e5;
    background-color: beige;
}

/* Mobile styles */
@media screen and (max-width: 767px) {
    h1 {
        font-size: 40px;
    }

    p {
        font-size: 24px;
    }

    a {
        font-size: 16px;
    }

    .container {
        margin-top: 5vh;
        margin-bottom: 5vh;
        flex-direction: column;
    }
}
</style>
