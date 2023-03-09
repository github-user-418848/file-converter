import { formatTIN, formatDate, formatAgentName, formatDigit } from './helpers.js';

export function textDataHeader(record, route) {
    let textDataHeader = ''
    switch (route) {
        case '1':
            textDataHeader += 'HMAP,H1600,' // Alpha List and Type Code
            textDataHeader += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            textDataHeader += `${formatAgentName(record[0][2])},` // WA's Registered Name
            textDataHeader += `${formatDate(record[0][1])}\n` // Return Period
            break;
    }
    return textDataHeader;
}

export function textDataDetails(records, route) {
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
                textDataDetails += `${formatDigit(records[row][3])},` // Nature of Income
                textDataDetails += `${formatDigit(records[row][4])},` // Tax Rate
                textDataDetails += `${formatDigit(records[row][7])},` // Amount of Income Payment
                textDataDetails += `${formatDigit(records[row][6])}` // Amount of Tax WithHeld
                break;
        }

        textDataDetails += `\n`
    }
    return textDataDetails
}

export function textDataControls(record, route) {
    let textDataControls = ''
    switch (route) {
        case '1':
            textDataControls += 'CMAP,C1600,' // 1600VT or C1600PT
            textDataControls += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            textDataControls += `${formatDate(record[0][1])},` // Return Period
            textDataControls += `${formatDigit(record[record.length - 1][4])},` // Total Amount of Income Payment 
            textDataControls += `${formatDigit(record[record.length - 1][5])}` // Total Amount of Tax Withheld
            break;
    }
    return textDataControls
}

export function fileName(record, route) {
    // <TIN><BC><RETURN PERIOD><FORM TYPE>.DAT
    let filename = ''
    switch (route) {
        case '1':
            filename += `${formatTIN(record[0][0]).replace(",", "")}` // WA Tin together w/ the Branch Code
            filename += `${formatDate(record[0][1]).replace("/", "")}` // Return Period
            filename += '1600' // Form Type
    }
    filename += '.dat'
    return filename
}