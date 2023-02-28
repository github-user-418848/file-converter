<template>
    <div class="card" v-if="fileName">
        <span class="file-info">{{ fileName }}</span>
        <button class="btn" @click="downloadFile()">Download</button>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
            fileName: String,
            downloadFile: Function,
        },
    }
</script>

<style>
    .card {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 1rem;
        width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
        margin: 0 auto;
        justify-content: space-between;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.123);
    }
</style>