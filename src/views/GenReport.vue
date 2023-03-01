<template>
    <!-- {{ $route.params.id }} -->
    <DropZone @drop.prevent="drop" @change="selectedFile"/>
    <Card fileName="true" :downloadFile="download"/>
</template>

<script>

    import Card from '../components/Card.vue';
    import DropZone from '../components/DropZone.vue';

    export default {
        name: "GenReport",
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