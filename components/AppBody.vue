<template>
    <div class="app-body">
        <div class="feed">
            <recipe v-for="post in posts"
                :post="post"
                :key="posts.indexOf(post)">
            </recipe>
        </div>
    </div>
</template>

<script>
import Recipe from "./Recipe";

export default {
    name:"AppBody",
    props: {
        posts: Array
    },
    components: {
        "recipe": Recipe
    }
};
</script>

<style lang="scss" src="../styles/body.scss">
</style>
