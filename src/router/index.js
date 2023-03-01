import { createRouter, createWebHistory } from 'vue-router'

import GenReport from '../views/GenReport.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {
        //     path: '/gen-dat-file',
        //     component: GenReport,
        // },
        {
            name: 'GenReport',
            path: '/gen-dat-file/:id',
            component: GenReport,
        },
    ]
})

export default router