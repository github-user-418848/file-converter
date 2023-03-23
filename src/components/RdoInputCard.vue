<template>
    <div class="card">
        <label for="form_type">Form Type</label>
        <select name="report_type" id="report_type">
            <option v-for="report in filteredReports" :key="report.id" :value="report.id" :selected="isFirstMatchingReport(report)">
                {{ report.name }}
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
            reports: [
                { id: 1, index: 1, name: '1601e' },
                { id: 2, index: 1, name: '1601f' },
                { id: 3, index: 1, name: '1600' },

                { id: 1, index: 3, name: '1700' },
                { id: 2, index: 3, name: '1701' },
                { id: 3, index: 3, name: '1702q' },
                { id: 4, index: 3, name: '1702' },
                { id: 5, index: 3, name: '2550m' },
                { id: 6, index: 3, name: '2550q' },
                { id: 7, index: 3, name: '2551m' },
                { id: 8, index: 3, name: '2553' },
            ]
        }
    },

    computed: {
        filteredReports() {
            return this.reports.filter(report => report.index === parseInt(this.$route.params.id));
        },
    },

    methods: {
        isFirstMatchingReport(report) {
            return this.filteredReports.indexOf(report) === 0;
        },
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
    /* border: 1.5px solid lightgray; */
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
    max-width: 288px;
}
</style>