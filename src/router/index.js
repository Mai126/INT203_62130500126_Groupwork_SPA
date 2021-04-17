import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CartList from '../views/CartList.vue'
import MyProfile from '../views/MyProfile.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cart',
        name: 'CartList',
        component: CartList
    },
    {
        path: '/profile',
        name: 'MyProfile',
        component: MyProfile
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
