import { createRouter, createWebHistory } from 'vue-router'
import { reportTypes, formTypes } from '../utils/globals.js'

import NotFound from '../views/NotFound.vue'
import ValueAddedTax from '../views/ValueAddedTax.vue'
import WithholdingTax from '../views/WithholdingTax.vue'

const routes = [
    {
        name: 'Root',
        path: '/',
        redirect: '/wt/map/1601E'
    },
    {
        name: 'TaxPage',
        path: '/:tax_type/:report_type/:form_type',
        components: {
            default: null, // To be dynamically assigned
        },
        beforeEnter: (to, from, next) => {
            const { tax_type, report_type, form_type } = to.params;
            const report = reportTypes.find(report => report.id === report_type);
            const form = formTypes.find(form => form.index === report_type && form.name === form_type);

            if (!report || !form) {
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
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Assign components dynamically based on tax_type
router.beforeEach((to, from, next) => {
    const { tax_type } = to.params;
    let component = null;

    if (tax_type === 'wt') {
        component = WithholdingTax;
    }
    else if (tax_type === 'vat') {
        component = ValueAddedTax;
    }
    else if (tax_type === 'boa') {
        component = ValueAddedTax;
    }

    if (component) {
        to.matched[0].components.default = component;
    }

    next();
});

export default router;
