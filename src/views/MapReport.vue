<template>

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