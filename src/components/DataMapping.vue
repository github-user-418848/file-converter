<script>
    import DropZone from './DropZone.vue';
    import Toast from './Toast.vue';
    import { ref, computed } from 'vue';
    import moment from 'moment';

    let MAPDetails = ref(""), MAPContent = ref(""), dropzoneFile = ref("");

    export default {
        name: "Map",
        components: {
            DropZone,
            Toast,
        },
        setup() {

            function validateFile(file) {
                const fileSize = file.size;
                const fileName = file.name;
                const fileExtension = fileName.split('.').pop();

                if (fileSize > 1000000 || fileName.length > 50 || fileExtension !== 'xml') {
                    showToast = true;
                    return;
                }
            }

            function drop(e) {
                dropzoneFile.value = e.dataTransfer.files[0];
                var reader = new FileReader();
                validateFile(dropzoneFile.value);
                waitForTextReadComplete(reader);
                reader.readAsText(dropzoneFile.value);
            }
            
            function selectedFile() {
                dropzoneFile.value = document.querySelector('.dropzoneFile').files[0];
                var reader = new FileReader();
                waitForTextReadComplete(reader);
                reader.readAsText(dropzoneFile.value);
            }
            
            function waitForTextReadComplete(reader) {
                reader.onloadend = function (event) {
                    var text = event.target.result;
                    parseTextAsXml(text);
                };
            }

            function parseTextAsXml(text) {
                var parser = new DOMParser(),
                    xmlDom = parser.parseFromString(text, 'text/xml');
                const arrObjects = convertMAPXMLtoJSON(xmlDom);
                MAPDetails.value = arrObjects;
                createMAPDetails(arrObjects);
            }

            function convertMAPXMLtoJSON(xml) {
                let arr = [], counter = 0;
                const _arryOfHtml = xml.getElementsByTagName('Section');
                for (const item of _arryOfHtml) {
                    if (counter != 0 && counter != _arryOfHtml.length - 1) {
                        const _item = {
                            record_num: item.children[0].children[1].innerHTML,
                            tin: item.children[1].children[1].innerHTML,
                            wt_code: item.children[2].children[1].innerHTML,
                            wt_name: item.children[3].children[1].innerHTML,
                            rate: item.children[4].children[1].innerHTML,
                            vendor_name: item.children[5].children[1].innerHTML,
                            sum_of_tax_amount: item.children[6].children[1].innerHTML,
                            sum_of_taxable_amount: item.children[7].children[1].innerHTML,
                        };
                        arr.push(_item);
                    }
                    counter++;
                }
                return arr;
            }

            function createMAPDetails(arrObjects) {
                let htmlDetails = '';
                arrObjects.forEach((item) => {
                    htmlDetails  += `${item.record_num},${extractDigits(item.tin)},${item.wt_code},${normalizeStrAsRegex(/([a-zA-Z0-9]{0,8} - )(.*)/g, item.wt_name)[2]},${item.rate},${item.vendor_name},${item.sum_of_tax_amount},${item.sum_of_taxable_amount}\n`;
                });
                MAPContent.value = htmlDetails;
            }

            function extractDigits(str) {
                return str.match(/\d+/g).join("");
            }

            function normalizeStrAsRegex(regex, string) {
                return regex.exec(string);
            }

            function convertToReadableDateFormat(date) {
                return moment(date).format('DDMMYYYY');
            }

            function downloadFile() {
                const link = document.createElement('a');
                const file = new Blob([MAPContent.value], { type: 'text/plain' });
                link.href = URL.createObjectURL(file);
                const dateNow = convertToReadableDateFormat(new Date());
                link.download = 'maprpt' + dateNow + '.dat';
                link.click();
                URL.revokeObjectURL(link.href);
            };

            return { dropzoneFile, MAPDetails, MAPContent, drop, selectedFile, downloadFile};

        },
    };

</script>

<template>
    <div class="page">
        <Toast v-if="showToast" />
        <DropZone @drop.prevent="drop" @change="selectedFile"/>
        <div class="card" v-if="dropzoneFile.name">
            <span class="file-info">{{ dropzoneFile.name }}</span>
            <button class="btn" @click="downloadFile">Download</button>
        </div>
    </div>
</template>

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
    .table-container {
        max-height: 562px;
        overflow-x: auto;
        border: 1.5px solid rgb(163, 163, 163);
        border-radius: 10px;
        box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.7);
        -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.7);
        -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.7);
        max-width: 80%;
        width: 100%;
        margin: 0 auto;
    }

    .table {
        position: sticky;
        width: 100%;
        white-space: nowrap;
    }
    .table .table-head {
        position: sticky;
        background: var(--primary);
        top: 0;
    }
    .table th {
        border-bottom: 1.5px solid rgb(233, 233, 233);
    }

    .table td, .table th {
        text-align: center;
        padding: clamp(0.5rem, 0.2rem + 1.5vw, 2rem);
    }
    .btn {
        /* margin: 1rem auto; */
        padding: 8px 12px;
        color: white;
        background-color: var(--primary);
        transition: .3s ease all;
        cursor: pointer;
    }
</style>