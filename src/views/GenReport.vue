<template>

    <!-- {{ errorMessage }} -->

    <!-- <div v-for="ero/"></div> -->
    <Toast :errorMessage="errorMessage"/>

    <!-- Display records array -->
    <div v-for="(record, index) in records" :key="index">
        <p>{{ index }} - {{ record }}</p>
    </div>

    <!-- DropZone component to select XML file -->
    <DropZone @drop.prevent="dropFile" @change="selectedFile" />

    <!-- RdoInputCard component for formatting of the DAT output -->
    <RdoInputCard />

    <!-- DownloadCard component to download transformed file -->

    <div v-for="(file, index) in fileDataCollection.originalFileName" :key="index">
        <DownloadCard :fileName="file" :textData="fileDataCollection.textContent[index]"
            :generatedFileName="fileDataCollection.generatedFileName[index]" />
    </div>
</template>

<script>
import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import RdoInputCard from '../components/RdoInputCard.vue'
import Toast from '../components/Toast.vue'

import { readXMLFile } from '../utils/helpers.js'
import { header, details, controls, filename } from '../utils/datStructure.js'
import { fileData } from '../utils/globals.js'
import { validateXmlFile } from '../utils/validators.js'
import { ref } from 'vue'

export default {
    name: "GenReport",
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
            fileDataCollection: fileData,
            errorMessage: ref(""),
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
                const records = await this.retrieveRecords(xmlDoc)
                await this.createTextData(records)
                await this.pushIntoFileData()
            } catch (error) {
                this.errorMessage = error
            }
        },

        async retrieveRecords(xmlDoc) {
            // Spread operator (...) to convert the HTMLCollection object returned by getElementsByTagName into an array
            const xmlSection = [...xmlDoc.getElementsByTagName('Section')];
            const records = xmlSection.map(item => {
                const values = [];
                for (const child of item.children) {
                    // Get the value of the first child element (assuming it is either a "FormattedValue" or "TextValue") and add it to the object with the field name as the key
                    values.push(child.children[0].textContent)
                }
                return values
            });
            this.records = records
            return records
        },

        async createTextData(records) {
            let textDataOutput = `${header(records, this.$route.params.id)}${details(records, this.$route.params.id)}${controls(records, this.$route.params.id)}`
            console.log(textDataOutput)
            this.textData = textDataOutput
            this.generatedFileName = filename(records, this.$route.params.id)
        },

        async pushIntoFileData() {
            this.fileDataCollection.originalFileName.push(this.file.name)
            this.fileDataCollection.textContent.push(this.textData)
            this.fileDataCollection.generatedFileName.push(this.generatedFileName)
        },
    },
}
</script>
