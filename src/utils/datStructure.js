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


// 0 - [ "MBTC/PDC-01.01.2023", "3126", "Security Agency & Intelligent Network Technology", "01/01/2023", "21533" ]

// 1 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "62,500.00" ]

// 2 - [ "1-12100", "Trade Debtors/ Trade Receivables", "62,500.00", "0.00" ]

// 3 - [ "62,500.00", "62,500.00", "TOTAL" ]

// 4 - []

// 5 - [ "LBP; PDC-01.05.2023/ FULL PAYMENT/ PART OF PHP 198,370.99", "4258", "RDF Feed, Livestock & Foods, Inc", "01/05/2023", "28171" ]

// 6 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "112,924.56" ]

// 7 - [ "1-12100", "Trade Debtors/ Trade Receivables", "112,924.56", "0.00" ]

// 8 - [ "112,924.56", "112,924.56", "TOTAL" ]

// 9 - []

// 10 - [ "LBP; BI-P0059/PART OF PHP 198,370.99/ PDC 01.05.2023", "4259", "RDF Feed, Livestock & Foods, Inc", "01/05/2023", "28173" ]

// 11 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "85,446.43" ]

// 12 - [ "1-17800", "Deferred Output VAT", "0.00", "9,154.98" ]

// 13 - [ "1-12100", "Trade Debtors/ Trade Receivables", "85,446.43", "0.00" ]

// 14 - [ "2-13300", "Output VAT Payable", "9,154.98", "0.00" ]

// 15 - [ "94,601.41", "94,601.41", "TOTAL" ]

// 16 - []

// 17 - [ "BPI / PDC - 01.06.2023 / 3 of 12", "4363", "TOA Global Remote Inc", "01/06/2023", "28805" ]

// 18 - [ "1-11002", "MBTC-CA#007-195-50984-7", "0.00", "333,399.36" ]

// 19 - [ "1-12100", "Trade Debtors/ Trade Receivables", "333,399.36", "0.00" ]

// 20 - [ "333,399.36", "333,399.36", "TOTAL" ]

// 21 - []

// 22 - [ "UB / 3 of 36 / PDC - 01.12.2023", "4162", "Conti's Specialty Foods Inc.", "01/12/2023", "27489" ]

// 23 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "182,959.71" ]

// 24 - [ "1-12100", "Trade Debtors/ Trade Receivables", "182,959.71", "0.00" ]

// 25 - [ "182,959.71", "182,959.71", "TOTAL" ]

// 26 - []

// 27 - [ "BPI/PDC-01.15.2023", "3132", "2GL Communication Phils.", "01/15/2023", "21546" ]

// 28 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "25,000.00" ]

// 29 - [ "2-11100", "Trade Payables", "25,000.00", "0.00" ]

// 30 - [ "25,000.00", "25,000.00", "TOTAL" ]

// 31 - []

// 32 - [ "UB/PDC-01.15.2023/BI-1850", "3139", "Yatai International Corporation", "01/15/2023", "21560" ]

// 33 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "63,932.28" ]

// 34 - [ "1-12100", "Trade Debtors/ Trade Receivables", "63,932.28", "0.00" ]

// 35 - [ "63,932.28", "63,932.28", "TOTAL" ]

// 36 - []

// 37 - [ "CANCEL / BPI / 6 of 12", "3387", "TOA Global Remote Inc", "01/15/2023", "22961" ]

// 38 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "186,296.29" ]

// 39 - [ "1-12100", "Trade Debtors/ Trade Receivables", "186,296.29", "0.00" ]

// 40 - [ "186,296.29", "186,296.29", "TOTAL" ]

// 41 - []

// 42 - [ "BPI / PDC - 01.15.2023 / 6 of 12", "3398", "TOA Global Remote Inc", "01/15/2023", "22984" ]

// 43 - [ "1-11002", "MBTC-CA#007-195-50984-7", "0.00", "186,296.29" ]

// 44 - [ "1-12100", "Trade Debtors/ Trade Receivables", "186,296.29", "0.00" ]

// 45 - [ "186,296.29", "186,296.29", "TOTAL" ]

// 46 - []

// 47 - [ "BPI / PDC - 01.15.2023 / 6 of 12", "3424", "TOA Global Remote Inc", "01/15/2023", "23046" ]

// 48 - [ "1-11002", "MBTC-CA#007-195-50984-7", "0.00", "603,856.94" ]

// 49 - [ "1-12100", "Trade Debtors/ Trade Receivables", "603,856.94", "0.00" ]

// 50 - [ "603,856.94", "603,856.94", "TOTAL" ]

// 51 - []

// 52 - [ "BPI/ PDC 01.15.23/ 6 of 12", "3602", "TOA Global Remote Inc", "01/15/2023", "24020" ]

// 53 - [ "1-11002", "MBTC-CA#007-195-50984-7", "0.00", "610,280.95" ]

// 54 - [ "1-12100", "Trade Debtors/ Trade Receivables", "610,280.95", "0.00" ]

// 55 - [ "610,280.95", "610,280.95", "TOTAL" ]

// 56 - []

// 57 - [ "BPI/ PDC 01.22.23/ 6 of 12", "3573", "TOA Global Remote Inc", "01/22/2023", "23966" ]

// 58 - [ "1-11002", "MBTC-CA#007-195-50984-7", "0.00", "70,664.11" ]

// 59 - [ "1-12100", "Trade Debtors/ Trade Receivables", "70,664.11", "0.00" ]

// 60 - [ "70,664.11", "70,664.11", "TOTAL" ]

// 61 - []

// 62 - [ "BPI/ PDC 01.22.23/ 6 of 12", "3580", "TOA Global Remote Inc", "01/22/2023", "23980" ]

// 63 - [ "1-11002", "MBTC-CA#007-195-50984-7", "0.00", "167,024.26" ]

// 64 - [ "1-12100", "Trade Debtors/ Trade Receivables", "167,024.26", "0.00" ]

// 65 - [ "167,024.26", "167,024.26", "TOTAL" ]

// 66 - []

// 67 - [ "UB / PDC - 01.30.2023", "3049", "Yatai International Corporation", "01/30/2023", "21112" ]

// 68 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "75,934.50" ]

// 69 - [ "1-12100", "Trade Debtors/ Trade Receivables", "75,934.50", "0.00" ]

// 70 - [ "75,934.50", "75,934.50", "TOTAL" ]

// 71 - []

// 72 - [ "WC158 (JAN)", "3157", "Yatai International Corporation", "01/31/2023", "21588" ]

// 73 - [ "1-17400", "Creditable W/holding Tax 2307", "0.00", "690.31" ]

// 74 - [ "1-12100", "Trade Debtors/ Trade Receivables", "690.31", "0.00" ]

// 75 - [ "690.31", "690.31", "TOTAL" ]

// 76 - []

// 77 - [ "BPI/ PDC 01.29.23/ 6 of 12", "3587", "TOA Global Remote Inc", "01/29/2023", "23991" ]

// 78 - [ "1-11002", "MBTC-CA#007-195-50984-7", "0.00", "96,360.15" ]

// 79 - [ "1-12100", "Trade Debtors/ Trade Receivables", "96,360.15", "0.00" ]

// 80 - [ "96,360.15", "96,360.15", "TOTAL" ]

// 81 - []

// 82 - [ "BPI / PDC -01.30.2023 / 5 of 12", "4034", "TOA Global Remote Inc", "01/30/2023", "26794" ]

// 83 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "200,039.61" ]

// 84 - [ "1-12100", "Trade Debtors/ Trade Receivables", "200,039.61", "0.00" ]

// 85 - [ "200,039.61", "200,039.61", "TOTAL" ]

// 86 - []

// 87 - [ "PBCOM / PDC - 01.31.2023 / 5 of 36", "4605", "Wenphil Corporation", "01/31/2023", "30344" ]

// 88 - [ "1-11001", "MBTC-CA#392-7-39253433-0", "0.00", "78,952.70" ]

// 89 - [ "1-12100", "Trade Debtors/ Trade Receivables", "78,952.70", "0.00" ]

// 90 - [ "78,952.70", "78,952.70", "TOTAL" ]

// 91 - []

// 92 - [ "GRAND TOTAL", "3,151,713.43", "3,151,713.43" ]