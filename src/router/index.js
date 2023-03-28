import { createRouter, createWebHistory } from 'vue-router'
import { allowedFormTypes, allowedReportTypes } from '../utils/globals.js'

import NotFound from '../views/NotFound.vue'
import GenReport from '../views/GenReport.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Root',
            path: '/',
            redirect: '/gen-dat-file/map/1601E'
        },
        {
            name: 'GenReport',
            path: '/gen-dat-file/:report_type/:form_type',
            component: GenReport,
            beforeEnter: (to, from, next) => {

                const reportType = to.params.report_type
                const formType = to.params.form_type

                if (!allowedReportTypes.includes(reportType) || !allowedFormTypes.includes(formType)) {
                    next({ name: 'NotFound' })
                }
                else if (!reportType || !formType) {
                    next({ name: 'NotFound' })
                }
                else {
                    next()
                }
            }
        },
        {
            name: 'NotFound',
            path: '/not-found',
            component: NotFound
        }
    ]
})

export default router