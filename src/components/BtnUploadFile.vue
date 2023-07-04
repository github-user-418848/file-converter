<template>
    <button class="btn col-md-3 col-8 mb-1" @click="uploadFile">Convert File</button>
    <input type="file" name="uploadFile" id="uploadFile" class="uploadFile" accept=".xml" @change="handleUploadFile"/>
</template>

<script>
export default {
    name: "BtnUploadFile",
    emits: ['upload-file'],
    methods: {
        uploadFile() {
            const dropzoneFileInput = document.querySelector('.uploadFile');
            dropzoneFileInput.click();
        },
        handleUploadFile(e) {
            const file = e.target.files[0];
            this.$emit('upload-file', file);
        }
    }
}
</script>