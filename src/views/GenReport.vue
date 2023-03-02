<template>
    <!-- {{ $route.params.id }} -->
    <DropZone @drop.prevent="drop" @change="selectedFile"/>
    <DownloadCard fileName="true" :downloadFile="download"/>
</template>

<script>

    import DownloadCard from '../components/DownloadCard.vue';
    import DropZone from '../components/DropZone.vue';

    export default {
        name: "GenReport",
        components: {
            DownloadCard,
            DropZone,
        },
        methods: {
            download() {
                alert("Downloaded");
            }
        }
    }

</script>