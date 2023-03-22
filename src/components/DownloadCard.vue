<template>
    <div class="card" v-if="fileName">
        <div class="col-1">
            <span class="file-info">
                Filename: {{ fileName.slice(0, 35) }}
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

export default {
    name: "Card",
    props: {
        fileName: String,
        textData: String,
        generatedFileName: String,
    },
    methods: {
        viewFile() {
            const blob = new Blob([`${this.textData.split('\n')[0]}${document.getElementById('rdo_code').value ? ',' + document.getElementById('rdo_code').value + '\n' : '\n'}${this.textData.split('\n').slice(1).join('\n')}`], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const win = window.open(url, '_blank');
            win.focus();
        },
        downloadFile() {
            const link = document.createElement('a');
            const file = new Blob([`${this.textData.split('\n')[0]}${document.getElementById('rdo_code').value ? ',' + document.getElementById('rdo_code').value + '\n' : '\n'}${this.textData.split('\n').slice(1).join('\n')}`], { type: 'text/plain' });
            link.href = URL.createObjectURL(file);
            link.download = this.generatedFileName;
            link.click();
            URL.revokeObjectURL(link.href);
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
    border: 1.5px solid lightgray;
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