<template>
    <div class="app-body">
        <div class="feed">
            <search-results v-for="recipe in recipes"
                :recipe="recipe"
                :key="recipes.indexOf(recipe)">
            </search-results>

        </div>
    </div>
</template>

<script>
import SearchResults from "./Search";
import RecipePost from "./Recipe";

export default {
    name:"AppBody",
    props: {
        recipes: Array
    },
    components: {
        "search-results": SearchResults,
        "recipe-post": RecipePost
    }
};
</script>

<style lang="scss" src="../styles/body.scss">
</style>
