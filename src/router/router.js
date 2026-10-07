import {createRouter, createWebHistory} from "vue-router"

const router = createRouter({
    history:  createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            component: () => import('@/pages/dashboard/index.vue'),
            name: 'dashboard.index'
        },
        {
            path: '/searching',
            component: () => import('@/pages/dashboard/searching.vue'),
            name: 'dashboard.searching'
        },
        {
            path: '/movies',
            component: () => import('@/pages/movies/index.vue'),
            name: 'movies.index'
        },
        {
            path: '/movie/:id',
            component: () => import('@/pages/movies/show.vue'),
            name: 'movies.show'
        },
        {
            path: '/watched',
            component: () => import('@/pages/movies/watched.vue'),
            name: 'movies.watched'
        },
    ]
})

export default router
