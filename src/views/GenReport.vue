<template>
    <!-- {{ $route.params.id }} -->
    {{ records }}
    <DropZone @drop.prevent="drop" @change="selectedFile" />
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
        drop(e) {
            file.value = e.dataTransfer.files[0]
            this.mapXmlData(file.value)
            console.log(records.value);
        },
        selectedFile() {
            file.value = document.querySelector('.dropzoneFile').files[0]
            this.mapXmlData(file.value)
            console.log(records.value);
        },
        mapXmlData(file) {
            if (file) {
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
                        return this.records = records; // Set records as data property
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        download() {
            alert("Downloaded");
        },
    },
    data() {
        return {
            records: [],
        }
    },
}
</script>