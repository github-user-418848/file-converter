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
        padding: .8rem;
        max-width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
        width: 100%;
        margin: 0 auto;
        justify-content: space-between;
        border: 1.5px solid lightgray;
    }
    
    .btn {
        padding: 8px 12px;
        border-radius: 8px;
        color: white;
        background-color: var(--primary);
        transition: .3s ease all;
        cursor: pointer;
    }
    .btn:hover {
        background-color: white;
        color: var(--primary);
    }
</style>