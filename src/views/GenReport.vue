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
import { textDataHeader, textDataDetails, textDataControls, fileName } from '../utils/textDataFormatter.js'
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
                readXMLFile(file)
                .then((xmlDoc) => {
                    this.createTextData(this.retrieveRecords(xmlDoc))
                })
                .catch((error) => {
                    console.log(error);
                });
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
            textDataOutput += textDataHeader(records, this.$route.params.id)
            textDataOutput += textDataDetails(records, this.$route.params.id)
            textDataOutput += textDataControls(records, this.$route.params.id)
            console.log(textDataOutput)
            this.textData = textDataOutput
            this.generatedFileName = fileName(records, this.$route.params.id)
        },
    },
}
</script>
