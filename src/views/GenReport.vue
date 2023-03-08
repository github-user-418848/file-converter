<template>
    <!-- Display records array -->
    <!-- {{ records }} -->

    <!-- DropZone component to select XML file -->
    <DropZone @drop.prevent="dropFile" @change="selectedFile" />

    <!-- RdoInputCard component for formatting of the DAT output -->
    <RdoInputCard />

    <!-- DownloadCard component to download transformed file -->
    <DownloadCard :fileName="file.name" :textData="textData" />
</template>

<script>
import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import RdoInputCard from '../components/RdoInputCard.vue';
import { readXMLFile, createTextDataHeader } from '../utils/helpers.js'
import { ref } from 'vue'

let file = ref(""), records = ref(""), textData = ref("")

export default {
    name: "GenReport",
    components: {
        DropZone,
        DownloadCard,
        RdoInputCard,
    },
    methods: {
        // Method called when a file is dropped onto the DropZone component
        dropFile(e) {
            // Set the file reference to the first dropped file
            file.value = e.dataTransfer.files[0]

            // Call the mapXmlData method to parse the XML data
            this.mapXmlData(file.value)
            console.log(file.value.name)
        },

        // Method called when a file is selected using the file input
        selectedFile() {
            file.value = document.querySelector('.dropzoneFile').files[0]
            this.mapXmlData(file.value)
            console.log(file.value.name)
        },

        // Method to parse XML data and return an array of objects
        mapXmlData(file) {
            if (file) {
                // Call readXMLFile helper method to read the XML data
                readXMLFile(file)
                    .then((xmlDoc) => {

                        // Get all the XML nodes with tag name "Section"
                        // Spread operator (...) to convert the HTMLCollection object returned by getElementsByTagName into an array
                        const _arryOfXML = [...xmlDoc.getElementsByTagName('Section')];

                        // Exclude the first and last occurrence of the "Section" tag
                        // _arryOfXML.slice(1, -1).map(....)
                        const records = _arryOfXML.map(item => {
                            const values = [];
                            for (const child of item.children) {
                                // Get the value of the first child element (assuming it is either a "FormattedValue" or "TextValue") and add it to the object with the field name as the key
                                values.push(child.children[0].textContent);
                            }
                            return values;
                        });

                        this.createTextData(records)

                        // Set records as data property
                        return this.records = records;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

        // Method to create text data from the records array
        createTextData(records) {

            let a = ''
            a += createTextDataHeader(records, '1')


            for (let row = 0; row < records.length; row++) {
                for (let col = 0; col < records[row].length; col++) {

                }
            }

            console.log(a)

            // textData.value = a
        },
    },
    data() {
        return {
            // Data to be rendered for template
            file,
            records,
            textData,
        }
    },
}
</script>
