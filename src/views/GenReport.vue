<template>
    <!-- Display records array -->
    <!-- {{ records }} -->

    <!-- DropZone component to select XML file -->
    <DropZone @drop.prevent="dropFile" @change="selectedFile" />

    <!-- RdoInputCard component for formatting of the DAT output -->
    <RdoInputCard />

    <!-- DownloadCard component to download transformed file -->
    <DownloadCard :fileName="file.name" :textData="textData" :generatedFileName="generatedFileName" />
</template>

<script>
import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import RdoInputCard from '../components/RdoInputCard.vue'
import { readXMLFile } from '../utils/helpers.js'
import { header, details, controls, filename } from '../utils/datStructure.js'
import { ref } from 'vue'

export default {
    name: "GenReport",
    components: {
        DropZone,
        DownloadCard,
        RdoInputCard,
    },
    data() {
        return {
            file: ref(""),
            records: ref(""),
            textData: ref(""),
            generatedFileName: ref(""),
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
            if (file) {
                try {
                    const xmlDoc = await readXMLFile(file)
                    const records = this.retrieveRecords(xmlDoc)
                    this.createTextData(records)
                } catch (error) {
                    console.log(error)
                }
            }
        },

        retrieveRecords(xmlDoc) {
            // Spread operator (...) to convert the HTMLCollection object returned by getElementsByTagName into an array
            const _arryOfXML = [...xmlDoc.getElementsByTagName('Section')];
            const records = _arryOfXML.map(item => {
                const values = [];
                for (const child of item.children) {
                    // Get the value of the first child element (assuming it is either a "FormattedValue" or "TextValue") and add it to the object with the field name as the key
                    values.push(child.children[0].textContent)
                }
                return values
            });
            return records
        },

        createTextData(records) {
            let textDataOutput = ''
            textDataOutput += header(records, this.$route.params.id)
            textDataOutput += details(records, this.$route.params.id)
            textDataOutput += controls(records, this.$route.params.id)
            console.log(textDataOutput)
            this.textData = textDataOutput
            this.generatedFileName = filename(records, this.$route.params.id)
        },
    },
}
</script>
