<template>
  <div class="recipe-post">
    <div class="header level">
    </div>
    <div class="image-container"
      :style="{ backgroundImage: 'url(' + recipe.image + ')' }"
      @dblclick="like">
    </div>
    <div class="content">
      <div class="heart">
        <i class="far fa-heart fa-lg"
        :class="{'fas': this.recipe.hasBeenLiked}"
        @click="like"></i>
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
    },
    methods:{
      like(){
        this.recipe.hasBeenLiked ? this.recipe.likes-- : this.recipe.likes++;
        this.recipe.hasBeenLiked = ! this.recipe.hasBeenLiked;
      }
    }
};
</script>

<style lang="scss" src="../styles/recipe.scss">
</style>
