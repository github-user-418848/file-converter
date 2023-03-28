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

    <div v-for="(file, index) in fileDataCollection.originalFileName" :key="index">
        <DownloadCard :fileName="file" :textData="fileDataCollection.textContent[index]"
            :generatedFileName="fileDataCollection.generatedFileName[index]" />
    </div>
    
    <a href="https://github.com/github-user-418848/convert-to-dat-file" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" width="38" viewBox="0 0 24 24" xml:space="preserve">
        <path
          fill="var(--primary)"
          d="M12.01.26c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.05.14 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.69.83.58 4.76-1.59 8.2-6.08 8.2-11.38 0-6.64-5.37-12.01-12-12.01z"
          fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </a>
</template>

<script>
import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import RdoInputCard from '../components/FormattingOptions.vue'
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
                this.errorMessage = error.message
                setTimeout(() => { this.errorMessage = "" }, 7000)
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
            const textDataOutput = `${header(records, this.$route.params)}${details(records, this.$route.params)}${controls(records, this.$route.params)}`
            console.log(textDataOutput)
            this.textData = textDataOutput
            this.generatedFileName = filename(records, this.$route.params)
        },

        async pushIntoFileData() {
            this.fileDataCollection.originalFileName.push(this.file.name)
            this.fileDataCollection.textContent.push(this.textData)
            this.fileDataCollection.generatedFileName.push(this.generatedFileName)
        },
    },
}
</script>
