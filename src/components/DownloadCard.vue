<template>
    <Toast :errorMessage="errorMessage" />

    <div class="card" v-if="fileName">
        <div class="col-1">
            <span class="file-info">
                {{ fileName.slice(0, 35) }}
                <span v-if="fileName.length > 35">...</span>
            </span>

        </div>
        <div class="col-2">
            <button class="btn" @click="viewFile()">Preview</button>
            <button class="btn" @click="downloadFile()">Generate</button>
        </div>
    </div>
</template>

<script>

import { validateRdoCode } from '../utils/validators';
import Toast from '../components/Toast.vue'
import { ref } from 'vue'

export default {
    name: "Card",
    components: {
        Toast,
    },
    props: {
        fileName: String,
        textData: String,
        generatedFileName: String,
    },
    data() {
        return {
            errorMessage: ref(""),
        }
    },
    methods: {
        async viewFile() {
            try {
                const blob = await this.generateBlob()
                const url = URL.createObjectURL(blob)
                const win = window.open(url, '_blank')
                win.focus()
            }
            catch (error) {
                this.errorMessage = error.message
                setTimeout(() => { this.errorMessage = "" }, 7000)
            }
        },
        async downloadFile() {
            try {
                const link = document.createElement('a')
                const blob = await this.generateBlob()
                link.href = URL.createObjectURL(blob)
                link.download = this.generatedFileName
                link.click()
                URL.revokeObjectURL(link.href)
            }
            catch (error) {
                this.errorMessage = error.message
                setTimeout(() => { this.errorMessage = "" }, 7000)
            }
        },
        async generateBlob() {
            const rdoCode = document.getElementById('rdo_code').value;
            const validatedRdoCode = rdoCode ? ',' + await validateRdoCode(rdoCode) + '\n' : '\n';
            const blobData = `${this.textData.split('\n')[0]}${validatedRdoCode}${this.textData.split('\n').slice(1).join('\n')}`;
            const blob = new Blob([blobData], { type: 'text/plain' });
            return blob
        }
    }
}

</script>

<style>
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

.card {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: .8rem;
    max-width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    background-color: #dddddd;
}

.col-1,
.col-2 {
    width: 100%;
}

@media screen and (min-width: 920px) {
    .col-1 {
        width: 50%;
        text-align: left;
    }

    .col-2 {
        width: 50%;
        text-align: right;
    }
}
</style>