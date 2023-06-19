<template>
    <Toast :errorMessage="errorMessage" />

    <div class="card" v-if="fileName">
        <div class="col-sm-4 col-12">
            <span class="file-info">
                {{ generatedFileName }}
            </span>
            <span class="file-info-sm">
                {{ fileName.slice(0, 35) }}
                <span v-if="fileName.length > 35">...</span>
            </span>

        </div>
        <div class="col-8 gen-btn">
            <button class="btn" @click="viewFile()">Preview</button>
            <button class="btn" @click="generatedFile()">Generate</button>
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
        async generatedFile() {
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
            // const rdoCode = document.getElementById('rdo_code').value;
            // const validatedRdoCode = rdoCode ? ',' + await validateRdoCode(rdoCode) + '\n' : '\n';
            const blobData = `${this.textData}`
            // const blobData = `${this.textData.split('\n')[0]}${validatedRdoCode}${this.textData.split('\n').slice(1).join('\n')}`;
            const blob = new Blob([blobData], { type: 'text/plain' });
            return blob
        }
    }
}

</script>

<style>
.btn {
    padding: 8px 12px;
    border-radius: 8px;
    background-color: var(--primary);
    border: 0;
    margin: .2rem;
    transition: .3s ease all;
    cursor: pointer;
}

.btn:hover {
    background-color: #0a4686;
}

@media screen and (min-width: 500px) {
    .gen-btn {
        text-align: right;
    }
}

.file-info-sm {
    display: block;
    font-size: 11px;
    font-weight: 600;
}
</style>