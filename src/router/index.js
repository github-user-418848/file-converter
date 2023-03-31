import { createRouter, createWebHistory } from 'vue-router'
import { reportTypes, formTypes } from '../utils/globals.js'

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

                if (!reportTypes.find(report => report.id === reportType) || !formTypes.find(form => form.index === reportType && form.name === formType)) {
                    next({ name: 'NotFound' })
                }
                else {
                    next()
                }
            }
        },
        {
            name: 'NotFound',
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ]
})

export default router