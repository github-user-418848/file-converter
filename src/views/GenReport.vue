<template>
    <!-- {{ $route.params.id }} -->
    <DropZone @drop.prevent="drop" @change="selectedFile"/>
    <DownloadCard fileName="true" :downloadFile="download"/>
</template>

<script>

    import DropZone from '../components/DropZone.vue'
    import DownloadCard from '../components/DownloadCard.vue'

    export default {
        name: "GenReport",
        components: {
            DropZone,
            DownloadCard,
        },
        methods: {
            download() {
                alert("Downloaded");
            }
        }
    }

</script>