<script>
    import DropZone from '../components/DropZone.vue';
    import { ref, computed } from 'vue';

    const MAPHeader = 'Mustard Seed System Corp. MAP Report';
    const MAPFooter = 'End of report - created by Valeed';
    const MAPDetails = ref('');
    let dropzoneFile = ref("");

    export default {
        name: "Map",
        components: {
            DropZone,
        },
        setup() {

            const drop = (e) => {

                dropzoneFile.value = e.dataTransfer.files[0];

                // Read File
                var reader = new FileReader();
                waitForTextReadComplete(reader);
                reader.readAsText(dropzoneFile.value);
            }


            const selectedFile = () => {

                dropzoneFile.value = document.querySelector('.dropzoneFile').files[0];

                // Read File
                var reader = new FileReader();
                waitForTextReadComplete(reader);
                reader.readAsText(dropzoneFile.value);

            }
            
            return { dropzoneFile, drop, selectedFile, MAPDetails };

            

            function convertMAPXMLtoJSON(xml) {
                let arr = [];

                // console.log(xml.getElementsByTagName('Section'));
                let counter = 0;
                const _arryOfHtml = xml.getElementsByTagName('Section');
                for (const item of _arryOfHtml) {
                    // console.log(_arryOfHtml.length);
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
                    htmlDetails  += `${item.record_num}\n${item.tin}\n${item.wt_code}`;
                });
                console.log(htmlDetails);
            }

            function parseTextAsXml(text) {
                var parser = new DOMParser(),
                    xmlDom = parser.parseFromString(text, 'text/xml');


                // data = convertMAPXMLtoJSON(xmlDom);

                // console.log(convertMAPXMLtoJSON(xmlDom));

                const arrObjects = convertMAPXMLtoJSON(xmlDom);
                // data = arrObjects;
                createMAPDetails(arrObjects);


                //now, extract items from xmlDom and assign to appropriate text input fields
            }

            function waitForTextReadComplete(reader) {
                reader.onloadend = function (event) {
                    var text = event.target.result;
                    parseTextAsXml(text);
                };
            }


        },
    };

</script>

<template>
    <div class="page">
        <DropZone  @drop.prevent="drop" @change="selectedFile"/>
        <span class="file-info" v-if="dropzoneFile.name">File: {{ dropzoneFile.name }}</span>
    </div>
</template>