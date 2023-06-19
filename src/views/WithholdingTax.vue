<template>
    <Toast :errorMessage="errorMessage" />
    
    <h1>Generate DAT File</h1>
    <p>Convert various financial reports to DAT file</p>
    
    <!-- Display records array -->
    <!-- <div v-for="(record, index) in records" :key="index">
        <p>{{ index }} - {{ record }}</p>
    </div> -->

    <!-- DropZone component to select XML file -->
    <DropZone @drop.prevent="dropFile" @change="selectedFile" />

    <!-- FormattingOptions component for formatting of the DAT output -->
    <FormattingOptions />

    <!-- DownloadCard component to download transformed file -->

    <template v-for="(file, index) in dataFiles.originalFileName" :key="index">
        <DownloadCard :fileName="file" :textData="dataFiles.textContent[index]"
            :generatedFileName="dataFiles.generatedFileName[index]" />
    </template>
</template>

<script>
import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import FormattingOptions from '../components/FormattingOptions.vue'
import Toast from '../components/Toast.vue'

import { readXMLFile, retrieveRecords } from '../utils/helpers.js'
import { header, details, controls, filename } from '../utils/datStructure.js'
import { files } from '../utils/globals.js'
import { validateXmlFile } from '../utils/validators.js'
import { ref } from 'vue'

export default {
    name: "WithholdingTax",
    components: {
        DropZone,
        DownloadCard,
        FormattingOptions,
        Toast,
    },
    data() {
        return {
            file: ref(""),
            records: ref(""),
            textData: ref(""),
            generatedFileName: ref(""),
            errorMessage: ref(""),
            dataFiles: files,
        }
    },
    methods: {
        async dropFile(e) {
            this.file = e.dataTransfer.files[0]
            await this.parseXmlFile(this.file)
            console.log(this.file.name)
        },

        async selectedFile() {
            this.file = document.querySelector('.dropzoneFile').files[0]
            await this.parseXmlFile(this.file)
            console.log(this.file.name)
        },

        async parseXmlFile(file) {
            try {
                await validateXmlFile(file)
                const xmlDoc = await readXMLFile(file)
                const records = await retrieveRecords(xmlDoc)
                let count = 0
                if (this.$route.params.report_type === 'qap') { count = 2 }
                for (let index = 0; index <= count; index++) {
                    await this.createTextData(records, index)
                    await this.pushIntoFileData()
                }
            } catch (error) {
                this.errorMessage = error.message
                setTimeout(() => { this.errorMessage = "" }, 7000)
            }
        },

        async createTextData(records, count) {
            
            const {params} = this.$route
            const head = header(records, params, count)
            const detail = details(records, params, count)
            const control = controls(records, params, count)
            const file = filename(records, params, count)

            const separator = ','
            const headValues = Object.values(head)
            const headString = headValues.join(separator)

            let rawText = ''
            rawText += `${headString}${this.$route.params.rdo_code ? ',' + this.$route.params.rdo_code : ''}\n`

            const detailLines = detail.map(d => {
                const detailValues = Object.values(d)
                const detailString = detailValues.join(separator)
                return detailString
            })
            rawText += detailLines.join('\n') + '\n'

            const controlValues = Object.values(control)
            const controlString = controlValues.join(separator)
            
            rawText += `${controlString}\n`

            this.textData = rawText

            const fileValues = Object.values(file).join('')

            this.generatedFileName = fileValues
        },

        async pushIntoFileData() {
            this.dataFiles.originalFileName.push(this.file.name)
            this.dataFiles.textContent.push(this.textData)
            this.dataFiles.generatedFileName.push(this.generatedFileName)
        },
    },
}
</script>
