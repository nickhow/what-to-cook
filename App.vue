<template>
    <div id="app">
        <div class="app">
            <div class="app-header">
                <img class="image is-32x32" src="./assets/images/what-to-eat.png"/>
            </div>
            <app-body
            :recipes="recipes"
            />
            <div class="app-footer">
            </div>
            
        </div>
    </div>
</template>
<script>
import AppBody from './components/AppBody.vue';

import recipes from "./data/data";

export default {
    name: "App",
    data() {
        return {
            recipes
        };
    },
    components:{
        "app-body": AppBody
    }
};
</script>
<style lang="scss" src="./styles/app.scss">
</style>
