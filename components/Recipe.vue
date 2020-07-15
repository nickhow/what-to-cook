<template>
  <div class="recipe-post">
    <div class="header level"></div>
    <div
      class="image-container"
      :style="{ backgroundImage: 'url(' + recipe.image + ')' }"
      @dblclick="like"
    >
      <div class="columns">
        <div class="column has-text-centered">
          <h1>{{recipe.title}}</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <i class="fas fa-users" />
          <span>serves {{recipe.servings}}</span>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column has-text-centered">
          <div class="heart">
            <i class="far fa-heart fa-lg" :class="{'fas': this.recipe.hasBeenLiked}" @click="like"></i>
          </div>
          <p class="likes">{{recipe.aggregateLikes}} likes</p>
        </div>
        <div class="column has-text-centered">
          <div class="heart center">
            <i class="far fa-clock fa-lg"></i>
          </div>
          <p class="likes">{{recipe.readyInMinutes}} likes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePost",
  props: {
    recipe: Object
  },
  methods: {
    like() {
      this.recipe.hasBeenLiked ? this.recipe.likes-- : this.recipe.likes++;
      this.recipe.hasBeenLiked = !this.recipe.hasBeenLiked;
    }
  }
};
</script>

<style lang="scss" src="../styles/recipe.scss">
</style>
