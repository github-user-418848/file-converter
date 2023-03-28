<template>
    <div class="card">
        <label for="report_type">Report Type</label>
        <select name="report_type" id="report_type" @change="onReportTypeChange">
            <option v-for="reportType in reportTypes" :key="reportType.id" :value="reportType.id"
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

export default {
    name: "RdoInputCard",
    data() {
        return {
            reportTypes: [
                { id: 'map', title: 'MAP', name: 'Monthly Alphalist of Payees' },
                { id: 'sawt', title: 'SAWT', name: 'Summary Alphalist of Withholding Taxes' },
            ],
            formTypes: [
                { id: 1, index: 'map', name: '1601E' },
                { id: 2, index: 'map', name: '1601F' },
                { id: 3, index: 'map', name: '1600VT' },
                { id: 4, index: 'map', name: '1600PT' },
                { id: 1, index: 'sawt', name: '1700' },
                { id: 2, index: 'sawt', name: '1701' },
                { id: 3, index: 'sawt', name: '1702Q' },
                { id: 4, index: 'sawt', name: '1702' },
                { id: 5, index: 'sawt', name: '2550M' },
                { id: 6, index: 'sawt', name: '2550Q' },
                { id: 7, index: 'sawt', name: '2551M' },
                { id: 8, index: 'sawt', name: '2553' },
            ],
        }
    },

    computed: {
        filteredFormTypes() {
            const formTypes = this.formTypes.filter(formType => formType.index === this.$route.params.report_type);
            if (!this.$route.params.form_type) {
                return [formTypes[0]];
            }
            return formTypes;
        },
    },

    methods: {
        isFirstMatchingReportType(reportType) {
            if (this.$route.params.report_type && reportType.id === this.$route.params.report_type) {
                const index = this.reportTypes.findIndex(report => report.name === reportType.name);
                return this.reportTypes.indexOf(reportType) === index;
            } else {
                return this.reportTypes.indexOf(reportType) === 0;
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
            const reportTypeId = event.target.value

            let formTypeId = ''
            if (reportTypeId === 'map') {
                const mapFormType = this.formTypes.find(formType => formType.index === 'map')
                formTypeId = mapFormType.name
            } else if (reportTypeId === 'sawt') {
                const sawtFormType = this.formTypes.find(formType => formType.index === 'sawt')
                formTypeId = sawtFormType.name
            }

            if (reportTypeId) {
                this.$router.push({ name: 'GenReport', params: { report_type: reportTypeId, form_type: formTypeId } })
            }
        },
        onFormTypeChange(event) {
            const formTypeId = event.target.value
            if (formTypeId) {
                this.$router.push({ name: 'GenReport', params: { report_type: this.$route.params.report_type, form_type: formTypeId } })
            }
        }
    }
}

</script>

<style>
.card {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: .8rem;
    max-width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    border-bottom: .5px solid lightgray;
    background-color: #e4e4e4;
    color: rgb(90, 94, 99);
}

input,
select {
    background-color: white;
    color: black;
    outline: none;
    border: 1px solid rgb(124, 124, 124);
    border-radius: 8px;
    padding: clamp(0.3125rem, 0.3125rem + 0.2604vw, 0.625rem);
    width: 100%;
    max-width: 270px;
}

select {
    max-width: 287px;
}
</style>