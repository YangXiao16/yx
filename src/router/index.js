import Vue from 'vue';

import VueRouter from 'vue-router';
import myRegister from '../views/myRegister';
import myLogin from '../views/myLogin'
import myHome from '../views/myHome'
import myHomeGoods from '../views/myHomeGoods'
import myFrontPage from '../views/myFrontPage'
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect: '/home'
    },
    {
        path:'/home',
        component:myHome,
        children: [
            {
                path:'goods',
                component:myHomeGoods
            },
            {
                path:"front",
                component:myFrontPage
            }
        ]
    },
    {
        path:"/register",
        component:myRegister
    },
    {
        path:"/login",
        component:myLogin
    }
]

const router = new VueRouter({
    routes,
    mode:'hash',
})

export default router