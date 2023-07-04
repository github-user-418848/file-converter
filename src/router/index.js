import { createRouter, createWebHistory } from 'vue-router'
import { getReportTypeByIndex, getReportTypeById, getFormType, isRdoCodeValid, isParamsValid } from '../utils/validators.js'

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
            const { tax_type, report_type, form_type, rdo_code } = to.params;

            const tax = getReportTypeByIndex(tax_type);
            const report = getReportTypeById(tax_type, report_type);
            const form = getFormType(form_type, report_type);
          
            const validRdoCode = isRdoCodeValid(rdo_code);
          
            const validParams = isParamsValid(tax_type, report, form, validRdoCode);
          
            if (!validParams) {
              next({ name: 'NotFound' });
            } else {
              next();
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
