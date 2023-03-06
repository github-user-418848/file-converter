<template>
    <!-- Display records array -->
    {{ records }}

    <!-- DropZone component to select XML file -->
    <DropZone @drop.prevent="drop" @change="selectedFile" />

    <!-- DownloadCard component to download transformed file -->
    <DownloadCard fileName="true" :downloadFile="download" />
</template>

<script>
import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import { readXMLFile } from '../utils/helpers.js'
import { ref } from 'vue'

let file = ref(""), records = ref("")

export default {
    name: "GenReport",
    components: {
        DropZone,
        DownloadCard,
    },
    methods: {
        // Method called when a file is dropped onto the DropZone component
        drop(e) {
            // Set the file reference to the first dropped file
            file.value = e.dataTransfer.files[0]

            // Call the mapXmlData method to parse the XML data
            this.mapXmlData(file.value)
        },

        // Method called when a file is selected using the file input
        selectedFile() {
            // Set the file reference to the selected file
            file.value = document.querySelector('.dropzoneFile').files[0]

            // Call the mapXmlData method to parse the XML data
            this.mapXmlData(file.value)
        },

        // Method to parse XML data and return an array of objects
        mapXmlData(file) {
            if (file) {
                // Call readXMLFile helper method to read the XML data
                readXMLFile(file)
                    .then((xmlDoc) => {
                        let records = [], counter = 0

                        // Get All Section Tag
                        const _arryOfXML = xmlDoc.getElementsByTagName('Section');

                        // Loop Through The Section Tag
                        for (const item of _arryOfXML) {
                            // Exclude The First & Last Occurence of Section Tag
                            if (counter != 0 && counter != _arryOfXML.length - 1) {
                                const _item = {};
                                for (const child of item.children) {
                                    const fieldName = child.getAttribute('Name');
                                    if (fieldName) {
                                        const formattedValueElem = child.querySelector('FormattedValue');
                                        if (formattedValueElem) {
                                            _item[fieldName] = formattedValueElem.textContent;
                                        }
                                    }
                                }
                                // Append All Through records Array Object
                                records.push(_item);
                            }
                            counter++;
                        }

                        // Set records as data property
                        return this.records = records;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

        // Method to be called when the download button is clicked
        download() {
            alert("Downloaded");
        },
    },
    data() {
        return {
            // Initialize records array
            records: [],
        }
    },
}
</script>
