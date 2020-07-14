<template>
    <div class="app-body">
        <div class="feed">
            <recipe-post v-for="post in recipes"
                :post="post"
                :key="recipes.indexOf(post)">
            </recipe-post>
        </div>
    </div>
</template>

<script>
import RecipePost from "./Recipe";

export default {
    name:"AppBody",
    props: {
        recipes: Array
    },
    components: {
        "recipe-post": RecipePost
    }
};
</script>

<style lang="scss" src="../styles/body.scss">
</style>
