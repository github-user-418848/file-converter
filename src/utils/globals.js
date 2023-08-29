import { ref } from 'vue'

export const

    files = { 
        originalFileName: ref([]), textContent: ref([]), generatedFileName: ref([])
    },
    
    allowedExtensions = ['xml',],
    sizeLimit = 1_000_000_000,
    
    minRdoCodeLength = 0,
    maxRdoCodeLength = 5,

    reportTypes = [
        { id: 'map', index: 'wt', acronym: 'MAP', name: 'Monthly Alphalist of Payees' },
        { id: 'qap', index: 'wt', acronym: 'QAP', name: 'Quarterly Alphalist of Payees' },
        { id: 'sawt', index: 'wt', acronym: 'SAWT', name: 'Summary Alphalist of Withholding Taxes' },
        { id: 'st', index: 'vat', acronym: 'ST', name: 'Sales Transaction' },
        { id: 'pt', index: 'vat', acronym: 'PT', name: 'Purchase Transaction' },
        { id: 'at', index: 'boa', name: 'Audit Trail' },
        { id: 'crb', index: 'boa', name: 'Cash Receipt Book' },
        { id: 'cmj', index: 'boa', name: 'Credit Memo Journal' },
        { id: 'dmj', index: 'boa', name: 'Debit Memo Journal' },
        { id: 'dj', index: 'boa', name: 'Disbursement Journal' },
        { id: 'gjb', index: 'boa', name: 'General Journal Book' },
        { id: 'glb', index: 'boa', name: 'General Ledger Book' },
        { id: 'ij', index: 'boa', name: 'Inventory Journal' },
        { id: 'pj', index: 'boa', name: 'Purchase Journal' },
        { id: 'sj', index: 'boa', name: 'Sales Journal' },
    ],
    formTypes = [
        { id: 1, index: 'map', name: '1601E' },
        { id: 2, index: 'map', name: '1601F' },
        { id: 3, index: 'map', name: '1600VT' },
        { id: 4, index: 'map', name: '1600PT' },

        { id: 1, index: 'qap', name: '1601EQ' },
        { id: 2, index: 'qap', name: '1601FQ' },
        { id: 3, index: 'qap', name: '1621' },

        { id: 1, index: 'sawt', name: '1700' },
        { id: 2, index: 'sawt', name: '1701' },
        { id: 3, index: 'sawt', name: '1702Q' },
        { id: 4, index: 'sawt', name: '1702' },
        { id: 5, index: 'sawt', name: '2550M' },
        { id: 6, index: 'sawt', name: '2550Q' },
        { id: 7, index: 'sawt', name: '2551M' },
        { id: 8, index: 'sawt', name: '2553' },
    ]