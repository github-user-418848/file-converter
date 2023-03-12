import { getMonthIndex, regexMatched } from './helpers.js'

export function formatTIN(tin) {
    const match = regexMatched(/(\d{3})-(\d{3})-(\d{3})-(\d{1,4})$|^(\d{9})(\d*)$/, tin)
    return match ? match[5] && match[6] ? match[5] + ',' + match[6] : match[1] + match[2] + match[3] + ',' + match[4] : 'undefined'
}

export function formatDate(date) {
    const match = regexMatched(/MONTH\s+OF\s+([A-Za-z]*)\s+(\d*)/, date);
    return match ? ('0' + (new Date(match[2], getMonthIndex(match[1]), 1)).getMonth() + 1).slice(-2) + '/' + match[2] : 'undefined';
}

export function formatCorpName(corpName) {
    return `"${corpName.toUpperCase()}"`
}

export function formatAgentName(agentName) {
    const match = regexMatched(/WITHHOLDING AGENT'S NAME:\s*(.*)/, agentName)
    return match ? `"${match[1]}"` : 'undefined'
}

export function formatDigit(digit) {
    return digit.replaceAll(",", "")
}