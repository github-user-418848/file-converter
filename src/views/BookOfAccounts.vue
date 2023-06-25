<template>
    <div class="dropzone" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent
        @drop.prevent="dropFile" :class="{ 'active-dropzone': active }">
        <Toast :errorMessage="errorMessage" />

        <h1>File Converter</h1>
        <p>Convert financial reports to various file formats. Drag and Drop files are supported.</p>

        <!-- Display records array -->
        <!-- <div v-for="(record, index) in records" :key="index">
            <p>{{ index }} - {{ record }}</p>
        </div> -->

        <BtnUploadFile @upload-file="uploadFile" />

        <FormattingOptions />

        <template v-for="(file, index) in dataFiles.originalFileName" :key="index">
            <DownloadCard :fileName="file" :textData="dataFiles.textContent[index]"
                :generatedFileName="dataFiles.generatedFileName[index]" />
        </template>
    </div>
</template>

<script>
import BtnUploadFile from '../components/BtnUploadFile.vue'
import DownloadCard from '../components/DownloadCard.vue'
import FormattingOptions from '../components/FormattingOptions.vue'
import Toast from '../components/Toast.vue'


import { createFormattedOutput } from '../utils/boaStructure.js'
import { readXMLFile, retrieveRecords, createTextData } from '../utils/helpers.js'
import { files } from '../utils/globals.js'
import { validateXmlFile } from '../utils/validators.js'
import { ref } from 'vue'

export default {
    name: "ValueAddedTax",
    components: {
        BtnUploadFile,
        DownloadCard,
        FormattingOptions,
        Toast,
    },
    data() {
        return {
            active: ref(false),
            file: ref(""),
            records: ref(""),
            textData: ref(""),
            generatedFileName: ref(""),
            errorMessage: ref(""),
            dataFiles: files,
        }
    },
    methods: {
        async toggleActive() {
            this.active = !this.active
        },

        async dropFile(e) {
            this.active = false
            this.file = e.dataTransfer.files[0]
            await this.parseXmlFile(this.file)
            console.log(this.file.name)
        },

        async uploadFile() {

            const record = [
                ["MBTC/PDC-01.01.2023", "3126", "Security Agency & Intelligent Network Technology", "01/01/2023", "21533"],
                ["1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "62,500.00"],
                ["1-12100", "Trade Debtors/ Trade Receivables", "62,500.00", "0.00"],
                ["62,500.00", "62,500.00", "TOTAL"],
                [],
                ["LBP; PDC-01.05.2023/ FULL PAYMENT/ PART OF PHP 198,370.99", "4258", "RDF Feed, Livestock & Foods, Inc", "01/05/2023", "28171"],
                ["1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "112,924.56"],
                ["1-12100", "Trade Debtors/ Trade Receivables", "112,924.56", "0.00"],
                ["112,924.56", "112,924.56", "TOTAL"],
                [],
                ["LBP; BI-P0059/PART OF PHP 198,370.99/ PDC 01.05.2023", "4259", "RDF Feed, Livestock & Foods, Inc", "01/05/2023", "28173"],
                ["1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "85,446.43"],
                ["1-17800", "Deferred Output VAT", "0.00", "9,154.98"],
                ["1-12100", "Trade Debtors/ Trade Receivables", "85,446.43", "0.00"],
                ["2-13300", "Output VAT Payable", "9,154.98", "0.00"],
                ["94,601.41", "94,601.41", "TOTAL"],
                []
            ];

            const formattedOutput = createFormattedOutput(record);

            formattedOutput.forEach((data, index) => {
                // console.log(`Record ${index + 1}:`);
                if (data !== undefined) {

                    Object.entries(data).forEach(([key, value]) => {
                        console.log(`${value}`);
                    });
                }
                // console.log('---');
            });

            this.file = document.querySelector('.uploadFile').files[0]
            await this.parseXmlFile(this.file)
            console.log(this.file.name)
        },

        async parseXmlFile(file) {
            try {
                await validateXmlFile(file)
                const xmlDoc = await readXMLFile(file)
                const records = await retrieveRecords(xmlDoc)
                // await this.createTextData(records)
                this.records = records
                // await this.pushIntoFileData()
            } catch (error) {
                this.errorMessage = error.message
                setTimeout(() => { this.errorMessage = "" }, 7000)
            }
        },

        async createTextData(records) {
            const { params } = this.$route;
            const separator = ',';
            const { textData, generatedFileName } = createTextData(records, params, separator);
            this.textData = textData;
            this.generatedFileName = generatedFileName;
        },

        async pushIntoFileData() {
            this.dataFiles.originalFileName.push(this.file.name)
            this.dataFiles.textContent.push(this.textData)
            this.dataFiles.generatedFileName.push(this.generatedFileName)
        },
    },
}
</script>
