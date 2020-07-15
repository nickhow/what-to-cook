<template>
  <div class="recipe-post">
    <div class="header level">
    </div>
    <div class="image-container"
      :style="{ backgroundImage: 'url(' + post.image + ')' }">
    </div>
    <div class="content">
      <div class="heart">
        <i class="far fa-heart fa-lg"></i>
      </div>
      <p class="likes">{{post.likes}} likes</p>
    </div>
  </div>
</template>

<script>
export default {
    name: "RecipePost",
    props: {
        post: Object
    }
};
</script>

<style lang="scss" src="./styles/recipe.scss">
</style>
