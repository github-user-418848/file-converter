<template>
    <h2>Format Options</h2>
    <div class="card">
        <label for="report_type">Report Type</label>
        <select name="report_type" id="report_type" @change="onReportTypeChange">
            <option v-for="reportType in filteredReportTypes" :key="reportType.id" :value="reportType.id"
                :selected="isFirstMatchingReportType(reportType)">
                {{ reportType.name }}
            </option>
        </select>
    </div>
    <div class="card">
        <label for="form_type">Form Type</label>
        <select name="form_type" id="form_type" @change="onFormTypeChange">
            <option v-for="formType in filteredFormTypes" :key="formType.id" :value="formType.name"
                :selected="isFirstMatchingFormType(formType)">
                {{ formType.name }}
            </option>
        </select>
    </div>
    <div class="card">
        <label for="rdo_code">RDO Code </label>
        <input type="text" name="rdo_code" id="rdo_code">
    </div>
</template>

<script>

import { reportTypes, formTypes } from '../utils/globals.js'

export default {
    name: "FormattingOptions",

    data() {
        return {
            dataReportTypes: reportTypes,
            dataFormTypes: formTypes,
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
                const formType = this.dataFormTypes.find(formType => formType.index === reportType).name
                this.$router.push({ name: 'TaxPage', params: { report_type: reportType, form_type: formType } })
            }
        },
        onFormTypeChange(event) {
            const formTypeId = event.target.value
            if (formTypeId) {
                this.$router.push({ name: 'TaxPage', params: { report_type: this.$route.params.report_type, form_type: formTypeId } })
            }
        }
    }
}

</script>

<style>

input,
select {
    background-color: white;
    color: black;
    outline: none;
    border: 1px solid rgb(124, 124, 124);
    border-radius: 8px;
    padding: clamp(0.3125rem, 0.3125rem + 0.2604vw, 0.625rem);
    width: 100%;
    max-width: 287px;
}

@media screen and (max-width: 450px) {
    .card {
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    label {
        margin-bottom: .3rem;
    }
}

</style>