import { formatTIN, formatDate, formatOwnersName, formatOwnersAddress, formatAgentName, formatDigit, formatCorpName } from './formatter.js'
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
        case 'pt':
            // 0 - [ "PURCHASE TRANSACTION\nRECONCILIATION OF LISTING FOR ENFORCEMENT\n\nTIN: 008-290-765-0000\nOWNER'S NAME: MACROLOGIC DIVERSIFIED TECHNOLOGIES INC.\nOWNER'S TRADE NAME: \nOWNER'S ADDRESS: 3RD FLR MACROLOGIC CORPORATE CENTRE 9054 MOLINO ROAD MOLINO III, BACOOR CITY\n\n\nPHILIPPINES\n" ]
            // 9 - [ "40,118.53", "316,239.15", "0.00", "4,544.61", "295,105.42", "138,242.68", "0.00", "156,862.74", "Grand Total:", "END OF REPORT", "356,357.68" ]



            // H,S,008290765,0000,"MACROLOGIC DIVERSIFIED TECHNOLOGIES INC.",40118.53,316239.15,0.00,4544.61,295105.42,138242.68,0.00,Grand Total:
            // H,P"204332439","MUSTARD SEED SYSTEMS CORPORATION","","","","MUSTARD SEED SYSTEMS CORPORATION","1001 SUMMIT ONE OFFICE TOWER 530 ","SHAW BOULEVARD MANDALUYONG 1552",0.00,0.00,1336649.04,0.00,4007290.97,641272.48,641272.48,0.00,041,04/30/2017,12
            headerData = {
                alphaListTypeCode: `H,P`,
                tinWithBranchCode: `${formatTIN(record[0][0])}`,
                ownersName: `${formatOwnersName(record[0][0])}`,
                ownersAddress: `${formatOwnersAddress(record[0][0])}`,
                amtOfGrossPurchase: `${formatDigit(record[record.length - 1][1])}`,
                amtOfExemptPurchase: `${formatDigit(record[record.length - 1][2])}`,
                amtOfZeroRatedPurchase: `${formatDigit(record[record.length - 1][3])}`,
                amtOfTaxablePurchase: `${formatDigit(record[record.length - 1][4])}`,
                amtOfPurchaseOfServices: `${formatDigit(record[record.length - 1][5])}`,
                amtOfPurchaseOfGoods: `${formatDigit(record[record.length - 1][6])}`,
                amtOfPurchaseOfGoodsOtherThanCapitalGoods: `${formatDigit(record[record.length - 1][7])}`,
                amtOfInputTax: `${formatDigit(record[record.length - 1][0])}`,
                amtOfGrossTaxablePurchase: `${formatDigit(record[record.length - 1][10])}`
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
                registeredName: `${formatCorpName(record[6])}`,
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
        // 1 - [ "", "12212312121", "23,529.41", "01/22/2023", "156,862.74", "0.00", "0.00", "156,862.74", "0.00", "0.00", "156,862.74", "MICHAEL BELLIDO", "180,392.15" ]
        // D,P,"149831066",,"LAQUI","MARKO","MEDARDO","KALAYAAN AVE. DILIMAN","QUEZON CITY",0,0,0,0,5983.87,718.07,204332439,04/30/2017
        case 'pt':
            details = records.slice(1, -2).map(record => ({
                alphaListTypeCode: `D,P`,
                tinWithBranchCode: `${formatTIN(record[1])}`,
                registeredName: `${formatCorpName(record[11])}`,
                suppliersAddress: `${record[0]}`,
                amtOfGrossPurchase: `${formatDigit(record[4])}`,
                amtOfExemptPurchase: `${formatDigit(record[5])}`,
                amtOfZeroRatedPurchase: `${formatDigit(record[6])}`,
                amtOfTaxablePurchase: `${formatDigit(record[7])}`,
                amtOfPurchaseOfServices: `${formatDigit(record[8])}`,
                amtOfPurchaseOfGoods: `${formatDigit(record[9])}`,
                amtOfPurchaseOfGoodsOtherThanCapitalGoods: `${formatDigit(record[10])}`,
                amtOfInputTax: `${formatDigit(record[2])}`,
                amtOfGrossTaxablePurchase: `${formatDigit(record[12])}`,
                taxableMonth: `${record[3]}`
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
                amtOfTaxableSales: `${formatDigit(record[record.length - 1][8])}`,
            }
            break
        case 'pt':
            controlsData = {
                alphaListTypeCode: `D,P`,
                tinWithBranchCode: `${formatTIN(record[record.length - 2][1])}`,
                registeredName: `${formatCorpName(record[record.length - 2][11])}`,
                suppliersAddress: `${record[record.length - 2][0]}`,
                amtOfGrossPurchase: `${formatDigit(record[record.length - 2][4])}`,
                amtOfExemptPurchase: `${formatDigit(record[record.length - 2][5])}`,
                amtOfZeroRatedPurchase: `${formatDigit(record[record.length - 2][6])}`,
                amtOfTaxablePurchase: `${formatDigit(record[record.length - 2][7])}`,
                amtOfPurchaseOfServices: `${formatDigit(record[record.length - 2][8])}`,
                amtOfPurchaseOfGoods: `${formatDigit(record[record.length - 2][9])}`,
                amtOfPurchaseOfGoodsOtherThanCapitalGoods: `${formatDigit(record[record.length - 2][10])}`,
                amtOfInputTax: `${formatDigit(record[record.length - 2][2])}`,
                amtOfGrossTaxablePurchase: `${formatDigit(record[record.length - 2][12])}`,
                taxableMonth: `${record[record.length - 2][3]}`
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
            const [month, day, year] = record[1][10].split('/')
            fileNameData = {
                tinWithBranchCode: `${formatTIN(record[0][0]).replace(",", "")}S0`,
                returnPeriod: `${month}${year}`,
                extension: '.dat'
            }
            break
        case 'pt':
            const [month2, day2, year2] = record[1][3].split('/')
            fileNameData = {
                tinWithBranchCode: `${formatTIN(record[0][0]).replace(",", "")}P0`,
                returnPeriod: `${month2}${year2}`,
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