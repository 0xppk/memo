import { createWebHistory, createRouter } from "vue-router";

import MemoAll from './components/MemoAll.vue'

const routes = [

    {
        path: "/note",
        component: MemoAll,
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router; 