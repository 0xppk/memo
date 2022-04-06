import { createWebHistory, createRouter } from "vue-router";

import Home from './components/Home.vue'
import MemoAll from './components/MemoAll.vue'

const routes = [

    {
        path: "/memo",
        component: MemoAll,
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router; 