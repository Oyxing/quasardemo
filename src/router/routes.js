const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MyLayout.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('pages/Index.vue')
            },
            {
                path: 'evenmore',
                component: () =>
                    import ('components/evenmore.vue')
            },
            {
                path: 'componentlist/:path',
                component: () =>
                    import ('components/componentlist.vue')
            },
        ]
    },
    {
        path: '/user',
        component: () =>
            import ('layouts/User.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('components/user/Login.vue')
            },
            {
                path: 'reg',
                component: () =>
                    import ('components/user/Register.vue')
            }
        ]
    }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    })
}

export default routes