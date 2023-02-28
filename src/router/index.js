import { createRouter, createWebHistory } from 'vue-router'

import MapReport from '../views/MapReport.vue'
import QapReport from '../views/QapReport.vue'
import SawtReport from '../views/SawtReport.vue'
import SalesReport from '../views/SalesReport.vue'
import PurchaseReport from '../views/PurchaseReport.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MapReport,
        },
        {
            path: '/qap-report',
            component: QapReport,
        },
        {
            path: '/sawt-report',
            component: SawtReport,
        },
        {
            path: '/sales-report',
            component: SalesReport,
        },
        {
            path: '/purchase-report',
            component: PurchaseReport,
        },
    ]
})

export default router