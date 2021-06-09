const routes = [
    // {
    //     path: '/', component: () => import('layouts/MainLayout.vue'),
    //     children: [
    //         { path: '/', name: "login", component: () => import('pages/Login.vue'), meta: { authRequired: false } },
    //         { path: '/index', name: "index", component: () => import('pages/Index.vue'), meta: { authRequired: true } },
    //         { path: '/admin', name: "admin", component: () => import('pages/Admin.vue'), meta: { authRequired: true } },
    //         { path: '/profile', name: "profile", component: () => import('pages/Profile.vue'), meta: { authRequired: true } },
    //         { path: '/createaccount', name: "createaccount", component: () => import('pages/createaccount.vue'), meta: { authRequired: false } },
    //         { path: '/register', name: "register", component: () => import('pages/Register.vue'), meta: { authRequired: true } },
    //     ],
    // },
    {
        path: '/', component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '/', name: "login", component: () => import('pages/annotation.vue'), meta: { authRequired: false } },
            { path: '/home', name: "home", component: () => import('pages/Home.vue'), meta: { authRequired: false } },
            { path: '/annotation', name: "annotation", component: () => import('pages/annotation.vue'), meta: { authRequired: false } },
            { path: '/label', name: "label", component: () => import('pages/Labelling.vue'), meta: { authRequired: false } },
            { path: '/class', name: "class", component: () => import('pages/class.vue'), meta: { authRequired: false } },
        ],
    },
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
