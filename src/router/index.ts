import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/view/Layout.vue";
Vue.use(VueRouter);

export const routes = [
    {
        path: "/",
        name: "layout",
        component: Layout,
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "@/views/login/view/Login.vue"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import(/* webpackChunkName: "404" */ "@/views/error-page/view/Page404.vue"),
    },
    {
        path: "/401",
        name: "404",
        component: () => import(/* webpackChunkName: "401" */ "@/views/error-page/view/Page401.vue"),
    },
    // {
    //     path: "/error",
    //     name: "error",
    //     component: Layout,
    //     children: [
    //         {
    //             path: "404",
    //             name: "404",
    //             component: () => import("@/views/error-page/view/Page404.vue")
    //         },
    //         {
    //             path: "401",
    //             name: "401",
    //             component: () => import("@/views/error-page/view/Page401.vue")
    //         },
    //     ],
    // },
];

const router = new VueRouter({
    base: "./",
    routes,
});

export default router;
