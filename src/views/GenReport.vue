<template>
    <!-- {{ $route.params.id }} -->
    <DropZone @drop.prevent="drop" @change="selectedFile" />
    <DownloadCard fileName="true" :downloadFile="download" />
</template>

<script>

import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import { readXMLFile } from '../utils/helpers.js'
import { ref } from 'vue'

export default {
    name: "GenReport",
    components: {
        DropZone,
        DownloadCard,
    },
    methods: {
        drop() {
            const file = document.querySelector('.dropzoneFile').files[0];
        },
        selectedFile() {
            const file = document.querySelector('.dropzoneFile').files[0];
            if (file) {
                readXMLFile(file)
                    .then((xmlDoc) => {
                        let mapData = [], counter = 0
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
                                // Append All Through mapData Array Object
                                mapData.push(_item);
                            }
                            counter++;
                        }
                        console.log(mapData); // Return mapData
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
}
</script>