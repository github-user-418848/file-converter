import { formatTIN, formatDate, formatAgentName, formatDigit, formatCorpName } from './formatter.js'
import { reportTypes } from './globals.js'

export function header(record, route, count) {

    const alphaList = reportTypes.find(reportType => reportType.id === route.report_type)
    let headerData = {}

    switch (route.report_type) {
        case 'qap':
            let returnPeriodYear = ''

            const months = record.slice(1, -1)
            .map(record => {
                const [month, day, year] = record[8].split('/');
                returnPeriodYear = `${year}`
                return parseInt(month);
            });
            const smallestMonth = Math.min(...months) + count

            headerData = {
                alphaListTypeCode: `H${alphaList.acronym},H${route.form_type}`,
                tinWithBranchCode: `${formatTIN(record[0][0])}`,
                registeredName: `${formatAgentName(record[0][2])}`,
                returnPeriod: `${smallestMonth < 10 ? `0${smallestMonth}` : smallestMonth}/${returnPeriodYear}`,
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
    let details

    switch (route.report_type) {
        case 'map':
            details = records.slice(1, -1).map(record => ({
                alphaListTypeCode: `D${alphaList.acronym},D${route.form_type}`,
                sequenceNumber: `${record[0]}`,
                tinWithBranchCode: `${formatTIN(record[1])}`,
                corporation: `${formatCorpName(record[5])}`,
                returnPeriod: `${formatDate(records[0][1])}`,
                atcCode: `${record[2]}`,
                taxRate: `${formatDigit(record[4])}`,
                incomePayment: `${formatDigit(record[7])}`,
                taxWithHeld: `${formatDigit(record[6])}`,
            }))
            break
        case 'qap':
            const months = records.slice(1, -1)
            .map(record => {
                const [month, day, year] = record[8].split('/');
                return parseInt(month);
            });
            const smallestMonth = Math.min(...months)

            details = records.slice(1, -1)
            .filter(record => {
                const [month, day, year] = record[8].split('/')
                return month == (count + smallestMonth)
            })
            .map(record => ({
                alphaListTypeCode: `D1,D${route.form_type}`,
                incomePayment: `${formatDigit(record[0])}`,
                taxRate: `${formatDigit(record[1])}`,
                taxWithHeld: `${formatDigit(record[2])}`,
                corporation: `${formatCorpName(record[3])}`,
                atcCode: `${record[4]}`,
                tinWithBranchCode: `${formatTIN(record[6])}`,
                sequenceNumber: `${record[7]}`,
                returnPeriod: `${record[8]}`,
            }))
            break
        case 'sawt':
            details = records.slice(1, -1)
            .map(record => ({
                alphaListTypeCode: `D${alphaList.acronym},D${route.form_type}`,
                sequenceNumber: `${record[7]}`,
                tinWithBranchCode: `${formatTIN(record[0])}`,
                corporation: `${formatCorpName(record[4])}`,
                returnPeriod: `${formatDate(records[0][1])}`,
                atcCode: `${record[1]}`,
                taxRate: `${formatDigit(record[3])}`,
                incomePayment: `${formatDigit(record[6])}`,
                taxWithHeld: `${formatDigit(record[5])}`,
            }))
            break
    }

    return details
}

export function controls(record, route, count) {

    const alphaList = reportTypes.find(reportType => reportType.id === route.report_type)
    let controlsData = {}

    switch (route.report_type) {
        case 'qap':
            
            let returnPeriodYear = ''

            const months = record.slice(1, -1)
            .map(record => {
                const [month, day, year] = record[8].split('/');
                returnPeriodYear = `${year}`
                return parseInt(month);
            });
            const smallestMonth = Math.min(...months) + count

            controlsData = {
                alphaListTypeCode: `C1,C${route.form_type}`,
                tinWithBranchCode: `${formatTIN(record[0][0])}`,
                returnPeriod: `${smallestMonth < 10 ? `0${smallestMonth}` : smallestMonth}/${returnPeriodYear}`,
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
    let fileNameData = {}

    switch (route.report_type) {
        case 'qap':
            
            let returnPeriodYear = ''

            const months = record.slice(1, -1)
            .map(record => {
                const [month, day, year] = record[8].split('/');
                returnPeriodYear = `${year}`
                return parseInt(month);
            });
            const smallestMonth = Math.min(...months) + count

            fileNameData = {
                tinWithBranchCode: `${formatTIN(record[0][0]).replace(",", "")}`,
                returnPeriod: `${smallestMonth < 10 ? `0${smallestMonth}` : smallestMonth}${returnPeriodYear}`,
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