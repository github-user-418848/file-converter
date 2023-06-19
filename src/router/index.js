import { createRouter, createWebHistory } from 'vue-router'
import { reportTypes, formTypes } from '../utils/globals.js'
import NotFound from '../views/NotFound.vue'
import ValueAddedTax from '../views/ValueAddedTax.vue'
import WithholdingTax from '../views/WithholdingTax.vue'
import BookOfAccounts from '../views/BookOfAccounts.vue'

const routes = [
    {
        name: 'Root',
        path: '/',
        redirect: '/wt/map/1601E'
    },
    {
        name: 'TaxPage',
        path: '/:tax_type/:report_type?/:form_type?/:rdo_code?',
        components: { default: null },
        beforeEnter: (to, from, next) => {
            const { tax_type, report_type, form_type, rdo_code } = to.params
            const tax = reportTypes.find(report => report.index === tax_type)
            const report = tax && reportTypes.find(report => report.index === tax_type && report.id === report_type)
            const form = form_type && formTypes.find(form => form.index === report_type && form.name === form_type)
            const validParams =
            (tax_type === 'wt' && report && form) ||
            (tax_type === 'vat' && report && !form_type && !rdo_code) ||
            (tax_type === 'boa' && !report_type && !form_type && !rdo_code);

            if (!validParams) {
                next({ name: 'NotFound' })
            } else {
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

const router = createRouter({
    history: createWebHistory(),
    routes
})

const taxTypeToComponentMap = {
    wt: WithholdingTax,
    vat: ValueAddedTax,
    boa: BookOfAccounts,
}

router.beforeEach((to, from, next) => {
    const { tax_type } = to.params
    const component = taxTypeToComponentMap[tax_type]
    if (component) {
        to.matched[0].components.default = component
    }
    next()
})

export default router
