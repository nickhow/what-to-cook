<template>
  <div class="recipe-post">
    <div class="header level">
    </div>
    <div class="image-container"
      :style="{ backgroundImage: 'url(' + recipe.image + ')' }">
    </div>
    <div class="content">
      <div class="heart">
        <i class="far fa-heart fa-lg"></i>
      </div>
      <p class="likes">{{recipe.likes}} likes</p>
    </div>
  </div>
</template>

<script>
export default {
    name: "RecipePost",
    props: {
        recipe: Object
    }
};
</script>

<style lang="scss" src="../styles/recipe.scss">
</style>
