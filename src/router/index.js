import { createRouter, createWebHistory } from 'vue-router'
import DataMapping from '../components/DataMapping.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: DataMapping
        },
    ]
})

export default router