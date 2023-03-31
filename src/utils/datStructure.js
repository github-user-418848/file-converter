import { formatTIN, formatDate, formatAgentName, formatDigit, formatCorpName, formatQuarterlyDate } from './formatter.js'
import { reportTypes } from './globals.js'


export function header(record, route, count) {

    const alphaList = reportTypes.find(reportType => reportType.id === route.report_type)
    let headerData = {}

    switch (route.report_type) {
        case 'qap':
            headerData = {
                alphaListTypeCode: `H${alphaList.acronym},H${route.form_type}`,
                tinWithBranchCode: `${formatTIN(record[0][0])}`,
                registeredName: `${formatAgentName(record[0][2])}`,
                returnPeriod: `${formatQuarterlyDate(record[0][1], count)}`
            }
        break
        default:
            headerData = {
                alphaListTypeCode: `H${alphaList.acronym},H${route.form_type}`,
                tinWithBranchCode: `${formatTIN(record[0][0])}`,
                registeredName: `${formatAgentName(record[0][2])}`,
                returnPeriod: `${formatDate(record[0][1])}`
            }
        break
    }
    return headerData
}

export function details(records, route, count) {
    
    const alphaList = reportTypes.find(reportType => reportType.id === route.report_type)
    let detailsData = [], detail
    
    for (let row = 1; row < records.length - 1; row++) {
        switch (route.report_type) {
            case 'map':
                detail = {
                    alphaListTypeCode: `D${alphaList.acronym},D${route.form_type}`,
                    sequenceNumber: `${records[row][0]}`,
                    tinWithBranchCode: `${formatTIN(records[row][1])}`,
                    corporation: `${formatCorpName(records[row][5])}`,
                    returnPeriod: `${formatDate(records[0][1])}`,
                    atcCode: `${records[row][2]}`,
                    taxRate: `${formatDigit(records[row][4])}`,
                    incomePayment: `${formatDigit(records[row][7])}`,
                    taxWithHeld: `${formatDigit(records[row][6])}`,
                }
            break
            case 'qap':
                detail = {
                    alphaListTypeCode: `D1,D${route.form_type}`,
                    sequenceNumber: `${records[row][7]}`,
                    tinWithBranchCode: `${formatTIN(records[row][6])}`,
                    corporation: `${formatCorpName(records[row][3])}`,
                    returnPeriod: `${formatQuarterlyDate(records[0][1], count)}`,
                    atcCode: `${records[row][4]}`,
                    taxRate: `${formatDigit(records[row][1])}`,
                    incomePayment: `${formatDigit(records[row][0])}`,
                    taxWithHeld: `${formatDigit(records[row][2])}`,
                }
            break
            case 'sawt':
                detail = {
                    alphaListTypeCode: `D${alphaList.acronym},D${route.form_type}`,
                    sequenceNumber: `${records[row][7]}`,
                    tinWithBranchCode: `${formatTIN(records[row][0])}`,
                    corporation: `${formatCorpName(records[row][4])}`,
                    returnPeriod: `${formatDate(records[0][1])}`,
                    atcCode: `${records[row][1]}`,
                    taxRate: `${formatDigit(records[row][3])}`,
                    incomePayment: `${formatDigit(records[row][6])}`,
                    taxWithHeld: `${formatDigit(records[row][5])}`,
                }
            break
        }
        detailsData.push(detail);
    }
    return detailsData
}

export function controls(record, route, count) {

    const alphaList = reportTypes.find(reportType => reportType.id === route.report_type)
    let controlsData = {}

    switch (route.report_type) {
        case 'qap':
            controlsData = {
                alphaListTypeCode: `C1,C${route.form_type}`,
                tinWithBranchCode: `${formatTIN(record[0][0])}`,
                returnPeriod: `${formatQuarterlyDate(record[0][1], count)}`,
                incomePayment: `${formatDigit(record[record.length - 1][4])}`,
                taxWithHeld: `${formatDigit(record[record.length - 1][5])}`,
            }
        break
        default:
            controlsData = {
                alphaListTypeCode: `C${alphaList.acronym},C${route.form_type}`,
                tinWithBranchCode: `${formatTIN(record[0][0])}`,
                returnPeriod: `${formatDate(record[0][1])}`,
                incomePayment: `${formatDigit(record[record.length - 1][4])}`,
                taxWithHeld: `${formatDigit(record[record.length - 1][5])}`,
            }
        break
    }
    return controlsData
}

export function filename(record, route, count) {
    const alphaList = reportTypes.find(reportType => reportType.id === route.report_type)
    let fileNameData = {}

    switch (route.report_type) {
        case 'qap':
            fileNameData = {
                tinWithBranchCode: `${formatTIN(record[0][0]).replace(",", "")}`,
                returnPeriod: `${formatQuarterlyDate(record[0][1], count).replace("/", "")}`,
                routeFormType: `${route.form_type}`,
                extension: '.dat'
            }
        break
        default:
            fileNameData = {
                tinWithBranchCode: `${formatTIN(record[0][0]).replace(",", "")}`,
                returnPeriod: `${formatDate(record[0][1]).replace("/", "")}`,
                routeFormType: `${route.form_type}`,
                extension: '.dat'
            }
        break
    }
    return fileNameData
}