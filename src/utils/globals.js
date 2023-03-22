import { ref } from 'vue'

export const

    fileData = {originalFileName: ref([]), textContent: ref([]), generatedFileName: ref([]),},
    allowedExtensions = ['xml',],
    sizeLimit = 35_000_000,
    minRdoCodeLength = 0,
    maxRdoCodeLength = 5