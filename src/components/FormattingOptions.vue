<template>
    <Toast :errorMessage="errorMessage" />
    <div v-if="showReportTypeCard" class="card">
        <div class="col-4">
            <label for="report_type">Report Type</label>
        </div>
        <div class="col-8">
            <select name="report_type" id="report_type" @change="onReportTypeChange">
                <option v-for="reportType in filteredReportTypes" :key="reportType.id" :value="reportType.id"
                    :selected="isFirstMatchingReportType(reportType)">
                    {{ reportType.name }}
                </option>
            </select>
        </div>
    </div>
    <div v-if="showFormTypeCard" class="card">
        <div class="col-4">
            <label for="form_type">Form Type</label>
        </div>
        <div class="col-8">
            <select name="form_type" id="form_type" @change="onFormTypeChange">
                <option v-for="formType in filteredFormTypes" :key="formType.id" :value="formType.name"
                    :selected="isFirstMatchingFormType(formType)">
                    {{ formType.name }}
                </option>
            </select>
        </div>
    </div>
    <div v-if="showRdoCode" class="card">
        <div class="col-4">
            <label for="rdo_code">RDO Code </label>
        </div>
        <div class="row col-8">
            <div class="col-sm-9 col-12">
                <input ref="rdoCodeInput" type="text" name="rdo_code" id="rdo_code" v-model="rdoCode" :disabled="!isRdoCodeEmpty" @keyup.enter="onRdoCodeChange">
            </div>
            <div class="col-sm-3 col-12">
                <button id="rdoCodeSubmitBtn" :class="['btn', { 'btn-danger': !isRdoCodeEmpty }]" @click="onRdoCodeChange">{{ rdoCodeButtonLabel }}</button>
            </div>
        </div>
    </div>
</template>

<script>

import { reportTypes, formTypes } from '../utils/globals.js'
import { isRdoCodeValid } from '../utils/validators.js'
import Toast from '../components/Toast.vue'
import { ref } from 'vue'

export default {
    name: "FormattingOptions",
    components: {
        Toast,
    },

    data() {
        return {
            dataReportTypes: reportTypes,
            dataFormTypes: formTypes,
            rdoCode: this.$route.params.rdo_code,
            errorMessage: ref(""),
        }
    },

    computed: {
        filteredReportTypes() {
            return this.dataReportTypes.filter(reportType => reportType.index === this.$route.params.tax_type);
        },
        filteredFormTypes() {
            const output = this.dataFormTypes.filter(formType => formType.index === this.$route.params.report_type);
            if (!this.$route.params.form_type) {
                return [output[0]];
            }
            return output;
        },
        showFormTypeCard() {
            return this.$route.params.tax_type === 'wt'
        },
        showReportTypeCard() {
            return this.$route.params.tax_type !== 'boa'
        },
        showRdoCode() {
            return this.$route.params.tax_type === 'wt'
        },
        isRdoCodeEmpty() {
            return this.$route.params.rdo_code === '' || this.$route.params.rdo_code === undefined;
        },
        rdoCodeButtonLabel() {
            return this.$route.params.rdo_code ? 'Remove' : 'Enter';
        },
    },

    methods: {
        isFirstMatchingReportType(reportType) {
            if (this.$route.params.report_type && reportType.id === this.$route.params.report_type) {
                const index = this.dataReportTypes.findIndex(report => report.name === reportType.name);
                return this.dataReportTypes.indexOf(reportType) === index;
            } else {
                return this.dataReportTypes.indexOf(reportType) === 0;
            }
        },

        isFirstMatchingFormType(formType) {
            if (this.$route.params.form_type && formType.name === this.$route.params.form_type) {
                const index = this.filteredFormTypes.findIndex(form => form.name === formType.name);
                return this.filteredFormTypes.indexOf(formType) === index;
            } else {
                return this.filteredFormTypes.indexOf(formType) === 0;
            }
        },

        onReportTypeChange(event) {
            const reportType = event.target.value

            if (reportType) {
                let params = { report_type: reportType }
                if (this.$route.params.tax_type === 'wt') {
                    const formType = this.dataFormTypes.find(formType => formType.index === reportType).name
                    params.form_type = formType
                }

                this.$router.push({ params })
            }
        },
        onFormTypeChange(event) {
            const formTypeId = event.target.value
            if (formTypeId) {
                this.$router.push({ params: { report_type: this.$route.params.report_type, form_type: formTypeId } })
            }
        },
        onRdoCodeChange() {
            const params = {
                report_type: this.$route.params.report_type,
                form_type: this.$route.params.form_type,
            }

            if (this.isRdoCodeEmpty && isRdoCodeValid(this.rdoCode)) {
                params.rdo_code = this.rdoCode
            }
            else {
                params.rdo_code = ''
                this.errorMessage = 'Only alphabetic and numeric characters are accepted with a maximum of 10 characters.'
                setTimeout(() => { this.errorMessage = "" }, 7000)
            }

            this.$router.push({ params });
        }
    }
}

</script>

<style>
input, select {
    background-color: white;
    color: black;
    outline: none;
    border: 1px solid rgb(124, 124, 124);
    border-radius: 8px;
    padding: clamp(0.3125rem, 0.3125rem + 0.2604vw, 0.625rem);
    width: 100%;
}

#rdoCodeSubmitBtn {
    width: 100%;
    max-width: 100%;
}

.btn-danger {
  background-color: var(--warning);
  color: white;
}

.btn-danger:hover {
    background-color: var(--warning-secondary);
}

@media screen and (max-width: 499px) {
    .card, .card > .row {
        row-gap: .4rem;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    label {
        margin-bottom: .3rem;
    }
}
</style>