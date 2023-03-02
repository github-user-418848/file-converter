<template>
    <!-- {{ $route.params.id }} -->
    <DropZone @drop.prevent="drop" @change="selectedFile"/>
    <DownloadCard fileName="true" :downloadFile="download"/>
</template>

<script>

    import DropZone from '../components/DropZone.vue';

    export default {
        name: "GenReport",
        components: {
            DropZone,
        },
        methods: {
            download() {
                alert("Downloaded");
            }
        }
    }

</script>