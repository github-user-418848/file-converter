import { formatTIN, formatDate, formatAgentName } from './helpers.js';

export function formatTextDataHeader(record, route) {
    let textDataHeader = ''
    switch (route) {
        case '1':
            textDataHeader += 'HMAP,H1600VT,' // Alpha List and Type Code
            textDataHeader += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            textDataHeader += `${formatAgentName(record[0][2])},` // WA's Registered Name
            textDataHeader += `${formatDate(record[0][1])}\n` // Return Period
            break;
    }
    return textDataHeader;
}

export function formatTextDataDetails(records, route) {
    let textDataDetails = ''
    for (let row = 1; row < records.length - 1; row++) {
        switch (route) {
            case '1':
                textDataDetails += 'DMAP,D1600VT,' // Alpha List and Type Code
                textDataDetails += `${records[row][0]},` // Sequence Number together w/ the Branch Code
                textDataDetails += `${formatTIN(records[row][1])},` // TIN Number
                textDataDetails += `${records[row][5]},` // Corporation (Registered Name)
                textDataDetails += `${formatDate(records[0][1])},` // Return Period
                textDataDetails += `${records[row][2]},` // ATC Code
                textDataDetails += `${records[row][3]},` // Nature of Income
                textDataDetails += `${records[row][4]},` // Tax Rate
                textDataDetails += `${records[row][7]},` // Amount of Income Payment
                textDataDetails += `${records[row][6]}` // Amount of Tax WithHeld
                break;
        }

        textDataDetails += `\n`
    }
    return textDataDetails
}

export function formatTextDataControls(record, route) {
    let textDataControls = ''
    switch (route) {
        case '1':
            textDataControls += 'CMAP,C1600VT,' // 1600VT or C1600PT
            textDataControls += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            textDataControls += `${formatDate(record[0][1])},` // Return Period
            textDataControls += `${record[record.length - 1][4]},` // Total Amount of Income Payment 
            textDataControls += `${record[record.length - 1][5]}` // Total Amount of Tax Withheld
            break;
    }
    return textDataControls
}

export function fileName(record, route) {
    // <TIN><BC><RETURN PERIOD><FORM TYPE>.DAT
    let filename = ''
    switch (route) {
        case '1':
            filename += `${formatTIN(record[0][0])}` // WA Tin together w/ the Branch Code
            filename += `${formatDate(record[0][1]).replace("/", "")}` // Return Period
    }
    filename += '.dat'
    return filename
}