import { getMonthIndex, regexMatched } from './helpers.js'

export function formatTIN(tin) {
    // console.log('tin:', tin);
    // console.log('typeof tin:', typeof tin);
    const match = regexMatched(/(\d{3})-(\d{3})-(\d{3})-(\d{1,4})|(\d{9})(\d*)/, tin)
    if (match) {
        return match[5] && match[6] ? match[5] + ',' + match[6] : match[1] + match[2] + match[3] + ',' + match[4]
    }
    // else {
    //     throw new Error('There was an error upon parsing the TIN Numbers. Please be sure to check the type of report and try uploading it again.')
    // }
}

export function formatDate(date) {
    // console.log('date:', date);
    // console.log('typeof date:', typeof date);
    const match = regexMatched(/MONTH\s+OF\s+([A-Za-z]*)\s+(\d*)/, date)
    if (match) {
        return ('0' + (new Date(match[2], getMonthIndex(match[1]), 1)).getMonth() + 1).slice(-2) + '/' + match[2]
    }
    else {
        throw new Error('There was an error upon parsing the Dates. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatOwnersAddress(ownersAddress) {
    // console.log('ownersAddress:', ownersAddress);
    // console.log('typeof ownersAddress:', typeof ownersAddress);
    const match = regexMatched(/OWNER'S ADDRESS: (.*)/, ownersAddress)
    if (match) {
        return `"${match[1]}"`.replace(",", "")
    }
    else {
        throw new Error('There was an error upon parsing the Withholding Agent. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatOwnersName(ownersName) {
    // console.log('ownersName:', ownersName);
    // console.log('typeof ownersName:', typeof ownersName);
    const match = regexMatched(/OWNER'S NAME: (.*)/, ownersName)
    if (match) {
        return `"${match[1]}"`
    }
    else {
        throw new Error('There was an error upon parsing the Withholding Agent. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatCorpName(corpName) {
    return `"${corpName ? corpName.toUpperCase().replaceAll(",", "") : ''}"`
}

export function formatAgentName(agentName) {
    // console.log('agentName:', agentName);
    // console.log('typeof agentName:', typeof agentName);
    const match = regexMatched(/WITHHOLDING AGENT'S NAME:\s*(.*)/, agentName)
    if (match) {
        return `"${match[1]}"`
    }
    else {
        throw new Error('There was an error upon parsing the Withholding Agent. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatDigit(digit) {
    return digit ? digit.replaceAll(",", "") : ""
}

export const setTblHeaderFormat = (label, from, to, length, value) => {
    return `${label.padEnd(15)}${from.toString().padEnd(5)}${to.toString().padEnd(6)}${length.toString().padEnd(7)}${value}\n`;
};

export const setTblBodyFormat = (date, customer, referenceNo, journal, details, gLAccount, accountName, debit, credit) => {
    return `${date.padEnd(15)}${customer.padEnd(50)}${referenceNo.toString().padEnd(15)}${journal.toString().padEnd(19)}${details.padEnd(60)}${gLAccount.padEnd(20)}${accountName.padEnd(50)}${debit.toString().padEnd(14)}${credit.toString()}\n\n`;
};