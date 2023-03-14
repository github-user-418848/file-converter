import { getMonthIndex, regexMatched } from './helpers.js'

export function formatTIN(tin) {
    const match = regexMatched(/(\d{3})-(\d{3})-(\d{3})-(\d{1,4})$|^(\d{9})(\d*)$/, tin)
    if (match) {
        return match[5] && match[6] ? match[5] + ',' + match[6] : match[1] + match[2] + match[3] + ',' + match[4];
    } else {
        throw new Error('TIN Numbers in the XML file were parsed as undefined. Please be sure to check the type of report and try uploading it again.');
    }
}

export function formatDate(date) {
    const match = regexMatched(/MONTH\s+OF\s+([A-Za-z]*)\s+(\d*)/, date);
    if (match) {
        return ('0' + (new Date(match[2], getMonthIndex(match[1]), 1)).getMonth() + 1).slice(-2) + '/' + match[2]
    }
    else {
        throw new Error('Dates in the XML file were parsed as undefined. Please be sure to check the type of report and try uploading it again.');
    }
}

export function formatCorpName(corpName) {
    return `"${corpName.toUpperCase()}"`
}

export function formatAgentName(agentName) {
    const match = regexMatched(/WITHHOLDING AGENT'S NAME:\s*(.*)/, agentName)
    if (match) {
        return `"${match[1]}"`
    }
    else {
        throw new Error('Withholding Agent Names were parsed as undefined. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatDigit(digit) {
    return digit.replaceAll(",", "")
}