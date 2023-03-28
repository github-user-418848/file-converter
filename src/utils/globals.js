import { ref } from 'vue'

export const

    fileData = {originalFileName: ref([]), textContent: ref([]), generatedFileName: ref([]),},
    allowedExtensions = ['xml',],
    sizeLimit = 35_000_000,
    minRdoCodeLength = 0,
    maxRdoCodeLength = 5,
    allowedReportTypes = ['map', 'qap', 'sawt'],
    allowedFormTypes = ['1601E', '1601F', '1600VT', '1600PT', '1700', '1701', '1702Q', '1702', '2550M', '2550Q', '2551M', '2553']