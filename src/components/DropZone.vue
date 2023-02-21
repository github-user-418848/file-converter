<script>
    import { ref } from 'vue';

    export default {
        name: "DropZone",
        setup() {
            const active = ref(false);

            const toggleActive = () => {
                active.value = !active.value;
            };

            return { active, toggleActive };
        }
    };
</script>

<template>
    <div 
        @dragenter.prevent="toggleActive" 
        @dragleave.prevent="toggleActive" 
        @dragover.prevent
        @drop.prevent="toggleActive"
        :class="{ 'active-dropzone': active }"
        class="dropzone"
    >
        <span>Drag or Drop</span>
        <span>OR</span>
        <label class="btn" for="dropzoneFile">Select File</label>
        <input type="file" name="dropzoneFile" id="dropzoneFile" class="dropzoneFile">
    </div>
</template>

<style scoped>
    .dropzone {
        width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);;
        height: clamp(12.5rem, 12.5rem + 10.4167vw, 25rem);;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem auto;
        row-gap: 1rem;
        border: 2px dashed var(--primary);
        transition: .3s ease all;
    }
    .active-dropzone {
        background: var(--primary);
        border: 2px dashed white;
        color: white;
    }
    .active-dropzone .btn {
        color: var(--primary);
        background: white;
    }
    .btn {
        padding: 8px 12px;
        color: white;
        background-color: var(--primary);
        transition: .3s ease all;
        cursor: pointer;
    }
    .btn:hover {
        background-color: white;
        color: var(--primary);
    }
    input {
        display: none;
    }
</style>