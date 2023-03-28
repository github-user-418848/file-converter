import { ref } from 'vue'

export const

    files = {originalFileName: ref([]), textContent: ref([]), generatedFileName: ref([]),},
    allowedExtensions = ['xml',],
    sizeLimit = 35_000_000,
    minRdoCodeLength = 0,
    maxRdoCodeLength = 5,
    reportTypes = [
        { id: 'map', title: 'MAP', name: 'Monthly Alphalist of Payees' },
        { id: 'sawt', title: 'SAWT', name: 'Summary Alphalist of Withholding Taxes' },
    ],
    formTypes = [
        { id: 1, index: 'map', name: '1601E' },
        { id: 2, index: 'map', name: '1601F' },
        { id: 3, index: 'map', name: '1600VT' },
        { id: 4, index: 'map', name: '1600PT' },
        { id: 1, index: 'sawt', name: '1700' },
        { id: 2, index: 'sawt', name: '1701' },
        { id: 3, index: 'sawt', name: '1702Q' },
        { id: 4, index: 'sawt', name: '1702' },
        { id: 5, index: 'sawt', name: '2550M' },
        { id: 6, index: 'sawt', name: '2550Q' },
        { id: 7, index: 'sawt', name: '2551M' },
        { id: 8, index: 'sawt', name: '2553' },
    ]