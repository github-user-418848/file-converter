import { formatTIN, formatDate, formatAgentName } from './helpers.js';

export function createTextDataHeader(record, route) {
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
    return `${textDataHeader},${formatTIN(record[0][0])},${formatDate(record[0][1])},${formatAgentName(record[0][2])}`;
}

export function createTextDataDetails(records, route) {
    let textDataDetails = ''
    for (let row = 1; row < records.length - 1; row++) {
        textDataDetails += `\n${records[row][0]},${formatTIN(records[row][1])}`
        // for (let col = 0; col < records[row].length; col++) {

        //     textDataDetails += `${records[row][col]}`
        //     if (col < records[row].length - 1) {
        //         textDataDetails += '>>'
        //     }
        // }
    }
    return textDataDetails
}