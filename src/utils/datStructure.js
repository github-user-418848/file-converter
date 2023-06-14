import { formatTIN, formatDate, formatOwnersName, formatAgentName, formatDigit, formatCorpName } from './formatter.js'
import { reportTypes } from './globals.js'

export function header(record, route, count = 0) {

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
        case 'st':
            headerData = {
                alphaListTypeCode: `H,S`,
                tinWithBranchCode: `${formatTIN(record[0][0])}`,
                registeredName: `${formatOwnersName(record[0][0])}`,
                amtOfGrossSales: `${formatDigit(record[record.length - 1][0])}`,
                amtOfExemptSales: `${formatDigit(record[record.length - 1][1])}`,
                amtOfZeroRatedSales: `${formatDigit(record[record.length - 1][2])}`,
                amtOfTaxableSales: `${formatDigit(record[record.length - 1][3])}`,
                amtOfSalesOfServices: `${formatDigit(record[record.length - 1][4])}`,
                amtOfSalesOfGoods: `${formatDigit(record[record.length - 1][5])}`,
                amtOfOutputTax: `${formatDigit(record[record.length - 1][6])}`,
                amtOfGrossTaxableSales: `${formatDigit(record[record.length - 1][8])}`
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

export function details(records, route, count = 0) {

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
        case 'st':
            details = records.slice(1, -1).map(record => ({
                alphaListTypeCode: `D,S`,
                taxableMonth: `${record[10]}`,
                tinWithBranchCode: `${formatTIN(record[7])}`,
                registeredName: `${record[6]}`,
                customerAddress: `${record[8]}`,
                amtOfGrossSales: `${formatDigit(record[5])}`,
                amtOfExemptSales: `${formatDigit(record[4])}`,
                amtOfZeroRatedSales: `${formatDigit(record[3])}`,
                amtOfTaxableSales: `${formatDigit(record[2])}`,
                amtOfSalesOfServices: `${formatDigit(record[1])}`,
                amtOfSalesOfGoods: `${formatDigit(record[0])}`,
                amtOfOutputTax: `${formatDigit(record[8])}`,
                amtOfGrossTaxableSales: `${formatDigit(record[11])}`
            }))
            break
    }

    return details
}

export function controls(record, route, count = 0) {

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
        case 'st':
            controlsData = {
                alphaListTypeCode: `D,S`,
                amtOfGrossSales: `${formatDigit(record[record.length - 1][0])}`,
                amtOfExemptSales: `${formatDigit(record[record.length - 1][1])}`,
                amtOfZeroRatedSales: `${formatDigit(record[record.length - 1][2])}`,
                amtOfTaxableSales: `${formatDigit(record[record.length - 1][3])}`,
                amtOfSalesServices: `${formatDigit(record[record.length - 1][4])}`,
                amtOfSalesOfGoods: `${formatDigit(record[record.length - 1][5])}`,
                amtOfOutputTax: `${formatDigit(record[record.length - 1][6])}`,
                amtOfTaxableSalesq: `${formatDigit(record[record.length - 1][8])}`,
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

export function filename(record, route, count = 0) {
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
        case 'st':
            console.log(record)
            const [month, day, year] = record[1][10].split('/')
            fileNameData = {
                tinWithBranchCode: `${formatTIN(record[0][0]).replace(",", "")}S0`,
                returnPeriod: `${month}${year}`,
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