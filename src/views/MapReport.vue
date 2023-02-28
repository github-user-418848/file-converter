<template>
    <h1>Map Report</h1>
    <DropZone @drop.prevent="drop" @change="selectedFile"/>
    <Card fileName="true" :downloadFile="download"/>
</template>

<script>

    import Card from '../components/Card.vue';
    import DropZone from '../components/DropZone.vue';

    export default {
        name: "MapReport",
        components: {
            Card,
            DropZone,
        },
        methods: {
            download() {
                alert("Downloaded");
            }
        }
    }

</script>