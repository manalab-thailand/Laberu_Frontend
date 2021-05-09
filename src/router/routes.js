const routes = [
    {
        path: '/', component: () => import('layouts/MainLayout.vue'),
        children: [
            // { path: '/', name: "login", component: () => import('pages/Login.vue'), meta: { authRequired: false } },
            // { path: '/index', name: "index", component: () => import('pages/Index.vue'), meta: { authRequired: true } },
            // { path: '/admin', name: "admin", component: () => import('pages/Admin.vue'), meta: { authRequired: true } },
            // { path: '/profile', name: "profile", component: () => import('pages/Profile.vue'), meta: { authRequired: true } },
            // { path: '/register', name: "register", component: () => import('pages/Register.vue'), meta: { authRequired: true } },
            { path: '/', name: "login", component: () => import('pages/Login.vue'), meta: { authRequired: false } },
            { path: '/index', name: "index", component: () => import('pages/Index.vue'), meta: { authRequired: false } },
            { path: '/admin', name: "admin", component: () => import('pages/Admin.vue'), meta: { authRequired: false } },
            { path: '/profile', name: "profile", component: () => import('pages/Profile.vue'), meta: { authRequired: false } },
            { path: '/register', name: "register", component: () => import('pages/Register.vue'), meta: { authRequired: false } },
        ],
    },
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
