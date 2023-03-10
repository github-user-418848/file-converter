import { formatTIN, formatDate, formatAgentName, formatDigit } from './helpers.js';

export function header(record, route) {
    let textDataHeader = ''
    switch (route) {
        case '1':
            textDataHeader += 'HMAP,H1600,' // Alpha List and Type Code
            textDataHeader += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            textDataHeader += `${formatAgentName(record[0][2])},` // WA's Registered Name
            textDataHeader += `${formatDate(record[0][1])}${document.getElementById('rdo_code').value ? ',' + document.getElementById('rdo_code').value : ''}\n` // Return Period
            break;
        case '2':
            textDataHeader += 'HQAP,1601EQ,'
            textDataHeader += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            textDataHeader += `${formatAgentName(record[0][2])}\n` // WA's Registered Name
            // RETURN PERIOD HERE
            // RDO CODE
            break;
    }
    return textDataHeader;
}

export function details(records, route) {
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
            case '2':
                textDataDetails += 'D1,1601EQ,' // Alpha List and Type Code
                textDataDetails += `${records[row][7]},` // Sequence Number together w/ the Branch Code
                textDataDetails += `${formatTIN(records[row][6])},` // TIN Number
                textDataDetails += `${records[row][4]},` // Corporation (Registered Name)
                // RETURN PERIOD HERE
                textDataDetails += `${records[row][5]},` // ATC Code
                // textDataDetails += `${formatDigit(records[row][6])},` // Nature of Income
                textDataDetails += `${formatDigit(records[row][1])},` // Tax Rate
                textDataDetails += `${formatDigit(records[row][0])},` // Amount of Income Payment
                textDataDetails += `${formatDigit(records[row][2])}` // Amount of Tax WithHeld
                break;
        }

        textDataDetails += `\n`
    }
    return textDataDetails
}

export function controls(record, route) {
    let textDataControls = ''
    switch (route) {
        case '1':
            textDataControls += 'CMAP,C1600,' // 1600VT or C1600PT
            textDataControls += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            textDataControls += `${formatDate(record[0][1])},` // Return Period
            textDataControls += `${formatDigit(record[record.length - 1][4])},` // Total Amount of Income Payment 
            textDataControls += `${formatDigit(record[record.length - 1][5])}` // Total Amount of Tax Withheld
            break;
        case '2':
            textDataControls += 'C1,1601EQ,'
            textDataControls += `${formatTIN(record[0][0])},` // WA Tin together w/ the Branch Code
            // RETURN PERIOD HERE
            textDataControls += `${formatDigit(record[record.length - 1][4])},` // Total Amount of Income Payment 
            textDataControls += `${formatDigit(record[record.length - 1][5])}` // Total Amount of Tax Withheld
            break;
    }
    return textDataControls
}

export function filename(record, route) {
    // <TIN><BC><RETURN PERIOD><FORM TYPE>.DAT
    let filename = ''
    switch (route) {
        case '1':
            filename += `${formatTIN(record[0][0]).replace(",", "")}` // WA Tin together w/ the Branch Code
            filename += `${formatDate(record[0][1]).replace("/", "")}` // Return Period
            filename += '1600' // Form Type
            break
        case '2':
            filename += `${formatTIN(record[0][0]).replace(",", "")}` // WA Tin together w/ the Branch Code
            filename += '1601EQ'
            break
    }
    filename += '.dat'
    return filename
}