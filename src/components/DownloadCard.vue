<template>
    <div class="card" v-if="fileName">
        <div class="col-1">
            <span class="file-info">{{ fileName }}</span>
        </div>
        <div class="col-2">
            <input type="text" name="rdo_code" id="rdo_code" placeholder="Enter RDO Code">
            <button class="btn" @click="downloadFile()">Download</button>
        </div>
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
    .btn {
        padding: 8px 12px;
        border-radius: 0px;
        color: white;
        background-color: var(--primary);
        transition: .3s ease all;
        cursor: pointer;
    }
    .btn:hover {
        background-color: white;
        color: var(--primary);
    }
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
    .col-1, .col-2 {
        width: 100%;
    }
    input {
        background-color: white;
        color: black;
        outline: none;
        border: 1px solid lightgray;
        padding: 10px;
    }
    @media screen and (min-width: 920px) {
        .col-1 {
            width: 25%;
            text-align: left;
        }
        .col-2 {
            width: 75%;
            text-align: right;
        }
    }
</style>