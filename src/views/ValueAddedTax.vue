<template>
    <div class="dropzone" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent
        @drop.prevent="dropFile" :class="{ 'active-dropzone': active }">
        <!-- <template v-if="!active"> -->
        <Toast :errorMessage="errorMessage" />

        <h1>File Converter</h1>
        <p>Convert financial reports to various file formats. <span class="hide-md">Drag and Drop files are
                supported.</span></p>

        <!-- Display records array
            <div v-for="(record, index) in records" :key="index">
                <p>{{ index }} - {{ record }}</p>
            </div> -->

        <BtnUploadFile @upload-file="uploadFile" />

        <FormattingOptions />

        <template v-if="isReadingFile">
            <p>Converting...</p>
        </template>
        <template v-if="textData">
            <DownloadCard v-if="!isReadingFile" :fileName="file.name" :textData="textData" :generatedFileName="generatedFileName" />
        </template>


        <!-- <template v-for="(file, index) in dataFiles.originalFileName" :key="index">
            <DownloadCard :fileName="file" :textData="dataFiles.textContent[index]"
                :generatedFileName="dataFiles.generatedFileName[index]" />
        </template> -->
    </div>
</template>

<script>
import BtnUploadFile from '../components/BtnUploadFile.vue'
import DownloadCard from '../components/DownloadCard.vue'
import FormattingOptions from '../components/FormattingOptions.vue'
import Toast from '../components/Toast.vue'

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
            isReadingFile: ref(false),
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
            this.file = document.querySelector('.uploadFile').files[0]
            await this.parseXmlFile(this.file)
            console.log(this.file.name)
        },

        async parseXmlFile(file) {
            try {
                this.isReadingFile = true
                await validateXmlFile(file)
                const xmlDoc = await readXMLFile(file)
                const records = await retrieveRecords(xmlDoc)
                await this.createTextData(records)
                this.records = records
                // await this.pushIntoFileData()
                this.isReadingFile = false
            } catch (error) {
                this.errorMessage = error.message
                setTimeout(() => { this.errorMessage = "" }, 7000)
                this.isReadingFile = false
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
