import { formatTIN, formatDate, formatAgentName } from './helpers.js';

export function formatTextDataHeader(record, route) {
    let textDataHeader = ''
    switch (route) {
        case '1':
            textDataHeader += 'HMAP,H1600VT,' // Alpha List and Type Code
            textDataHeader += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            textDataHeader += `${formatDate(record[0][1])},` // WA Registered Name
            textDataHeader += `${formatAgentName(record[0][2])}\n` // Return Period
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
            textDataControls += `${formatAgentName(record[0][2])}\n` // Return Period
            break;
    }
    return textDataControls
}