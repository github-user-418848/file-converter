<template>
    <!-- {{ $route.params.id }} -->
    <DropZone @drop.prevent="drop" @change="selectedFile" />
    <DownloadCard fileName="true" :downloadFile="download" />
</template>

<script>

import DropZone from '../components/DropZone.vue'
import DownloadCard from '../components/DownloadCard.vue'
import { mapXmlData } from '../utils/helpers.js'
import { ref } from 'vue'

let file = ref("")

export default {
    name: "GenReport",
    components: {
        DropZone,
        DownloadCard,
    },
    methods: {
        drop(e) {
            file.value = e.dataTransfer.files[0]
            mapXmlData(file.value)
        },
        selectedFile() {
            file.value = document.querySelector('.dropzoneFile').files[0]
            mapXmlData(file.value)
        },
        download() {
            alert("Downloaded");
        },
    },
}
</script>