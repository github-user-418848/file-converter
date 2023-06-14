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

    <!-- RdoInputCard component for formatting of the DAT output -->
    <RdoInputCard />

    <!-- DownloadCard component to download transformed file -->

    <template v-for="(file, index) in dataFiles.originalFileName" :key="index">
        <DownloadCard :fileName="file" :textData="dataFiles.textContent[index]"
            :generatedFileName="dataFiles.generatedFileName[index]" />
    </template>
</template>

<script>
import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import RdoInputCard from '../components/FormattingOptions.vue'
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
        RdoInputCard,
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
            let rawText = ''
            
            rawText += `${head.alphaListTypeCode}${separator}${head.tinWithBranchCode}${separator}${head.registeredName}${separator}${head.returnPeriod}\n`
            const detailLines = detail.map(d => `${d.alphaListTypeCode}${separator}${d.sequenceNumber}${separator}${d.tinWithBranchCode}${separator}${d.corporation}${separator}${d.returnPeriod}${separator}${d.atcCode}${separator}${d.taxRate}${separator}${d.incomePayment}${separator}${d.taxWithHeld}`)
            rawText += detailLines.join('\n') + '\n'
            rawText += `${control.alphaListTypeCode}${separator}${control.tinWithBranchCode}${separator}${control.returnPeriod}${separator}${control.incomePayment}${separator}${control.taxWithHeld}`

            this.textData = rawText
            // console.log(this.textData)

            this.generatedFileName = `${file.tinWithBranchCode}${file.returnPeriod}${file.routeFormType}${file.extension}`
        },

        async pushIntoFileData() {
            this.dataFiles.originalFileName.push(this.file.name)
            this.dataFiles.textContent.push(this.textData)
            this.dataFiles.generatedFileName.push(this.generatedFileName)
        },
    },
}
</script>
