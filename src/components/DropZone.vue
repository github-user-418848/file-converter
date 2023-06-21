<template>
    <template v-if="isMobile">
        <button class="m-btn col-8" @click="selectFile">Select File</button>
        <input type="file" name="dropzoneFile" id="dropzoneFile" class="dropzoneFile" accept=".xml">
    </template>
    <div v-else @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent
        @drop.prevent="toggleActive" :class="{ 'active-dropzone': active }" class="dropzone">
        <span>Drag and Drop</span>
        <span>OR</span>
        <label class="btn" for="dropzoneFile">Select File</label>
        <input type="file" name="dropzoneFile" id="dropzoneFile" class="dropzoneFile" accept=".xml">
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
    name: "DropZone",

    setup() {
        const active = ref(false)
        const isMobile = ref(false)

        const toggleActive = () => {
            active.value = !active.value
        }

        const selectFile = () => {
            const dropzoneFileInput = document.querySelector('.dropzoneFile');
            if (dropzoneFileInput) {
                dropzoneFileInput.click();
            }
        };

        const screenWidth = computed(() => window.innerWidth);

        onMounted(() => {
            isMobile.value = screenWidth.value <= 960;
        });

        return { active, toggleActive, isMobile, selectFile }
    }
};
</script>

<style scoped>
.dropzone {
    max-width: var(--default-width);
    width: 100%;
    height: clamp(12.5rem, 12.5rem + 10.4167vw, 25rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    row-gap: 1rem;
    border: 2px dashed var(--primary);
    color: #242424;
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

.m-btn {
    padding: 8px 12px;
    border-radius: 8px;
    background-color: var(--primary);
    border: 0;
    margin: 12px auto 24px;
    transition: .3s ease all;
    cursor: pointer;
    display: block;
    color: white;
}

.m-btn:hover {
    background-color: #0a4686;
}

.btn {
    padding: 8px 12px;
    border-radius: 0px;
    background-color: white;
    border: 1.5px solid var(--primary);
    color: var(--primary);
    transition: .3s ease all;
    cursor: pointer;
}

.btn:hover {
    color: white;
    background-color: var(--primary);
}

input {
    display: none;
}

.hide {
    display: none !important;
}

.show {
    display: block !important;
}
</style>