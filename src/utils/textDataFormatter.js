import { formatTIN, formatDate, formatAgentName } from './helpers.js';

export function formatTextDataHeader(record, route) {
    let textDataHeader = ''
    switch (route) {
        case '1':
            textDataHeader += 'HMAP,H1600VT'
            break;
        case '2':
            textDataHeader += 'HMAP,H1600VT'
            break;
        case '3':
            textDataHeader += 'HMAP,H1600VT'
            break;
    }
    return `${textDataHeader},${formatTIN(record[0][0])},${formatDate(record[0][1])},${formatAgentName(record[0][2])}\n`;
}

export function formatTextDataDetails(records, route) {
    let textDataDetails = ''
    for (let row = 1; row < records.length - 1; row++) {
        switch (route) {
            case '1':
                textDataDetails += 'DMAP,D1600VT,'
                textDataDetails += `${records[row][0]},` // Sequence Number
                textDataDetails += `${formatTIN(records[row][1])},` // TIN Number
                textDataDetails += `${formatDate(records[0][1])},` // Return Period
                textDataDetails += `${records[row][2]},` // ATC Code
                textDataDetails += `${records[row][3]},` // Nature of Income
                textDataDetails += `${records[row][4]},` // Tax Rate
                textDataDetails += `${records[row][5]},` // Corporation (Registered Name)
                textDataDetails += `${records[row][6]},` // Amount of Tax WithHeld
                textDataDetails += `${records[row][7]},` // Amount of Income Payment
                break;
        }

        textDataDetails += `\n`
    }
    return textDataDetails
}