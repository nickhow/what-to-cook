<template>
    <div class="app-body">
        <div class="feed">
            <recipe-post v-for="post in posts"
                :post="post"
                :key="posts.indexOf(post)">
            </recipe-post>
        </div>
    </div>
</template>

<script>
import RecipePost from "./Recipe";

export default {
    name:"AppBody",
    props: {
        posts: Array
    },
    components: {
        "recipe-post": RecipePost
    }
};
</script>

<style lang="scss" src="../styles/body.scss">
</style>
