import { createWebHistory, createRouter } from "vue-router";

import Main from './components/Main.vue'
import Info from './components/Info.vue'

const routes = [

    {
        path: "/",
        component: Main,
    },
    {
        path: "/info",
        component: Info,
    }

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router; 