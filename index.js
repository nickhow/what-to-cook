import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from "./App";


new Vue ({
    el: "#app",
    render: h => h(App)
});