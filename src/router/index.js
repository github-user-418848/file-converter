import { createRouter, createWebHistory } from 'vue-router'
import { reportTypes, formTypes } from '../utils/globals.js'

import NotFound from '../views/NotFound.vue'
import WithholdingTax from '../views/WithholdingTax.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Root',
            path: '/',
            redirect: '/wt/map/1601E'
        },
        {
            name: 'WithholdingTax',
            path: '/wt/:report_type/:form_type',
            component: WithholdingTax,
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