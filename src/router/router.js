import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import Posts from "@/pages/Posts";
import About from "@/pages/About";
import Post from "@/pages/Post";

const routes = [
    {path: '/', component: Main},
    {path: '/posts', component: Posts},
    {path: '/about', component: About},
    {path: '/post/:id', component: Post},
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router