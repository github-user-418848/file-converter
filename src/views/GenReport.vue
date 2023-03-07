<template>
    <!-- Display records array -->
    <!-- {{ records }} -->

    <!-- DropZone component to select XML file -->
    <DropZone @drop.prevent="drop" @change="selectedFile" />

    <!-- DownloadCard component to download transformed file -->
    <DownloadCard :fileName="file?.name" :downloadFile="download" />
</template>

<script>
import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import { readXMLFile, reportTypeFieldName } from '../utils/helpers.js'
import { ref } from 'vue'

let file = ref(""), records = ref(""), textData = ref("")

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
            console.log(file.value.name)
        },

        // Method called when a file is selected using the file input
        selectedFile() {
            file.value = document.querySelector('.dropzoneFile').files[0]
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
                                    // child.children[0].textContent = <FormattedValue> or <TextValue> (Recommended)
                                    // child.children[1].textContent = <Value> (Could possibly throw an error if the tag is a <Text>)
                                    _item[fieldName] = child.children[0].textContent;
                                }
                                // Append All Through records Array Object
                                records.push(_item);
                            }
                            counter++;
                        }

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
            let fieldNames = reportTypeFieldName(this.$route.params.id);
            let recordCollection = '';
            records.forEach((record) => {
                let recordRow = '';
                fieldNames.forEach((fieldName, index) => {
                    if (fieldName.trim() && record.hasOwnProperty(fieldName)) {
                        if (record[fieldName]) {
                            recordRow += `${record[fieldName]}`;
                        }
                    }
                    // Add a comma after each value except for the last one
                    if (index !== fieldNames.length - 1) {
                        recordRow += ',';
                    }
                });
                recordCollection += `${recordRow}\n`;
            });
            textData.value = recordCollection;
            console.log(textData.value);
        },

        // Method to be called when the download button is clicked
        download() {
            alert("Downloaded");
        },
    },
    data() {
        return {
            // Initialize file & records array
            file: {},
            records: [],
            datContentOutput: [],
        }
    },
}
</script>
