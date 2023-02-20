import { createRouter, createWebHistory } from 'vue-router'
import MAP from '../components/MAP.vue'
import QAP from '../components/QAP.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MAP
        },
        {
            path: '/QAP',
            component: QAP
        },
    ]
})

export default router