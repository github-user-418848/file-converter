import { setTblHeaderFormat, setAuditTrailTblBodyFormat, setCashReceiptBookTblBodyFormat, setCreditMemoTblBodyFormat, setGeneralJournalBookFormat } from './formatter.js'
import { groupedRecords } from './helpers.js'

export function createFormattedOutput(records, route) {

    let header, groupedRec, data = []

    switch (route.report_type) {
        case 'crb':
            groupedRec = groupedRecords(records);
            header =
                `TAXPAYER'S NAME: MACROLOGIC DIVERSIFIED TECHNOLOGIES INC.\n` +
                `ADDRESS: 3RD FLR MACROLOGIC CORPORATE CENTRE 9054 MOLINO ROAD MOLINO III, BACOOR CITY PHILIPPINES\n` +
                `VAT REG TIN : 008-290-765-0000\n` +
                `Accounting System: SAP Business One Version 10\n` +
                `Acknowledgement Certificate No.:\n` +
                `\n` +
                `Accouting Books File Attributes/Layout Definition\n` +
                `Filename: Cash Receipt Book 1/1/2023\n` +
                `\n` +
                `File Type: Text File\n` +
                `Number of Records: ${groupedRec.length}\n` +
                `Amount Field Control Total: ${records[records.length - 1][1]}\n` +
                `Period Covered:  ${groupedRec[0][0][3]} - ${groupedRec[groupedRec.length - 2][0][3]}\n` +
                `Transaction Cut-off Date & Time:\n` +
                `\n` +
                `Extracted by: 1\n` +
                `\n` +
                `File Layout :\n` +
                setTblHeaderFormat('Fieldname', 'From', 'To', 'Length', 'Example');

            for (let row = 0; row < groupedRec.length; row++) {
                const isMultipleOfThree = row % 3 === 0;
                const isLastRow = row === groupedRec.length - 1;

                if (isMultipleOfThree && row === 0) {
                    data.push({
                        header,
                        date: setTblHeaderFormat('Date', 1, 10, 10, groupedRec[row][0][3]),
                        customerName: setTblHeaderFormat('Customer Name', 11, 111, 100, groupedRec[row][0][2]),
                        acknowledgementCertNo: setTblHeaderFormat('Reference No.', 112, 122, 10, groupedRec[row][0][1]),
                        accountingBooks: setTblHeaderFormat('Journal Entry', 123, 133, 10, groupedRec[row][0][4]),
                        details_: setTblHeaderFormat('Details', 134, 388, 254, groupedRec[row][0][0]),
                        gLAccount: setTblHeaderFormat('G/L Account', 389, 404, 15, groupedRec[row][1][0]),
                        accountName: setTblHeaderFormat('Account Name', 405, 505, 100, groupedRec[row][1][1]),
                        debit: setTblHeaderFormat('Debit', 506, 525, 19, groupedRec[row][1][2]),
                        credit: setTblHeaderFormat('Credit', 526, 545, 19, groupedRec[row][1][3]),
                        tblLabel: setCashReceiptBookTblBodyFormat('Date', 'Customer', 'Reference No', 'Journal Entry No.', 'Details', 'G/L Account', 'Account Name', 'Debit', 'Credit'),
                        table: '',
                        // pageNo: 'Page -1 of 1\n',
                    });
                } else if (isLastRow) {
                    const lastRowObj = {
                        table: setCashReceiptBookTblBodyFormat(' ', ' ', ' ', ' ', ' ', ' ', groupedRec[row][0][0], groupedRec[row][0][1], groupedRec[row][0][2]),
                    };
                    data.push(lastRowObj);
                }

                groupedRecords(records)[row].slice(1, -1).forEach((record, index) => {
                    const isFirstChild = index === 0;
                    const [glAccount, accountName, debit, credit] = record;

                    const tableRow = isFirstChild
                        ? setCashReceiptBookTblBodyFormat(
                            groupedRecords(records)[row][0][3], // Date
                            groupedRecords(records)[row][0][2], // Customer
                            groupedRecords(records)[row][0][1], // Reference
                            groupedRecords(records)[row][0][4], // Journal
                            groupedRecords(records)[row][0][0], // Details
                            glAccount,
                            accountName,
                            debit,
                            credit
                        )
                        : setCashReceiptBookTblBodyFormat('', '', '', '', '', glAccount, accountName, debit, credit);

                    data[data.length - 1].table += tableRow;
                });
            }
            break;

        case 'at':
            header =
                `TAXPAYER'S NAME: MACROLOGIC DIVERSIFIED TECHNOLOGIES INC.\n` +
                `ADDRESS: 3RD FLR MACROLOGIC CORPORATE CENTRE 9054 MOLINO ROAD MOLINO III, BACOOR CITY PHILIPPINES\n` +
                `VAT REG TIN : 008-290-765-0000\n` +
                `Accounting System: SAP Business One Version 10\n` +
                `Acknowledgement Certificate No.:\n` +
                `\n` +
                `Accouting Books File Attributes/Layout Definition\n` +
                `Extracted by: sample\n` +
                `Filename: Audit Trail\n` +
                `File Type: Text File\n` +
                `Number of Records: ${records.length}\n` +
                `Amount Field Control Total: \n` +
                `Period Covered: ${records[0][0]} - ${records[records.length - 1][0]}\n` +
                `Transaction Cut-off Date & Time:\n` +
                `\n` +
                `Extracted by: sample\n` +
                `\n` +
                `File Layout :\n` +
                setTblHeaderFormat('Fieldname', 'From', 'To', 'Length', 'Example');

            data.push({
                header,
                generatedDateTime: setTblHeaderFormat('Generated Date & Time', '1', '10', '10', records[0][0]),
                userCode: setTblHeaderFormat('User Code', '1', '21', '10', records[0][1]),
                userLoginName: setTblHeaderFormat('User Login Name', '22', '27', '5', records[0][8]),
                moduleName: setTblHeaderFormat('Module Name', '28', '128', '155', records[0][2]),
                activityPerform: setTblHeaderFormat('Activity Perform', '129', '146', '17', records[0][6]),
                refNumber: setTblHeaderFormat('Ref Number', '147', '155', '8', records[0][7]),
                postingDate: setTblHeaderFormat('Posting Date', '156', '166', '10', records[0][3]),
                details: setTblHeaderFormat('Details', '167', '421', '254', records[0][4]),
                amount: setTblHeaderFormat('Amount', '422', '441', '19', records[0][5]),
                tblLabel: setAuditTrailTblBodyFormat('Generated Date & Time', 'User Code', 'User Login Name', 'Module Name', 'Activity Perform', 'Ref Number', 'Posting Date', 'Details', 'Amount'),
                table: '',
            });

            for (let row = 0; row < records.length; row++) {
                data.push({
                    table: setAuditTrailTblBodyFormat(records[row][0], records[row][1], records[row][8], records[row][2], records[row][6], records[row][7], records[row][3], records[row][4], records[row][5])
                });
            }
            break;

        case 'cmj':
            header =
                `TAXPAYER'S NAME: MACROLOGIC DIVERSIFIED TECHNOLOGIES INC.\n` +
                `ADDRESS: 3RD FLR MACROLOGIC CORPORATE CENTRE 9054 MOLINO ROAD MOLINO III, BACOOR CITY PHILIPPINES\n` +
                `VAT REG TIN : 008-290-765-0000\n` +
                `Accounting System: SAP Business One Version 10\n` +
                `Acknowledgement Certificate No.:\n` +
                `\n` +
                `Accouting Books File Attributes/Layout Definition\n` +
                `Extracted by: sample\n` +
                `Filename: Credit Memo Journal\n` +
                `File Type: Text File\n` +
                `Number of Records: ${records.length}\n` +
                `Amount Field Control Total: ${records[records.length - 1][0]}\n` +
                `Period Covered: ${records[0][1]} - ${records[records.length - 2][1]}\n` +
                `Transaction Cut-off Date & Time:\n` +
                `\n` +
                `Extracted by: sample\n` +
                `\n` +
                `File Layout :\n` +
                setTblHeaderFormat('Fieldname', 'From', 'To', 'Length', 'Example');

            data.push({
                header,
                date: setTblHeaderFormat('Generated Date & Time', '1', '10', '10', records[0][1]),
                customerTin: setTblHeaderFormat("Customer's TIN", '11', '43', '32', records[0][10]),
                customerName: setTblHeaderFormat("Customer's Name", '44', '144', '100', records[0][2]),
                customerAddress: setTblHeaderFormat("Customer's Address", '145', '245', '100', records[0][3].replaceAll("\n", " ")),
                description: setTblHeaderFormat('Description', '246', '491', '254', records[0][4]),
                refNumber: setTblHeaderFormat('Reference No.', '492', '507', '15', records[0][5]),
                amount: setTblHeaderFormat('Amount', '508', '523', '15', records[0][9]),
                discount: setTblHeaderFormat('Discount', '524', '539', '15', records[0][8]),
                vatAmount: setTblHeaderFormat('VAT Amount', '540', '555', '15', records[0][7]),
                wtAmount: setTblHeaderFormat('WT Amount', '556', '571', '15', records[0][11]),
                netSales: setTblHeaderFormat('Net Sales', '572', '587', '15', records[0][6]),
                tblLabel: setCreditMemoTblBodyFormat('Date', "Customer's TIN", "Customer's Name", "Customer's Address", 'Description', 'Reference No.', 'Amount', 'Discount', 'VAT Amount', 'WT Amount', 'Net Sales'),
                table: '',
            });

            for (let row = 0; row < records.length - 1; row++) {
                data.push({
                    table: setCreditMemoTblBodyFormat(records[row][1], records[row][10], records[row][2], records[row][3], records[row][4], records[row][5], records[row][9], records[row][8], records[row][7], records[row][11], records[row][6])
                });
            }
            break;

        case 'gjb':
            console.log(records);
            header =
                `TAXPAYER'S NAME: MACROLOGIC DIVERSIFIED TECHNOLOGIES INC.\n` +
                `ADDRESS: 3RD FLR MACROLOGIC CORPORATE CENTRE 9054 MOLINO ROAD MOLINO III, BACOOR CITY PHILIPPINES\n` +
                `VAT REG TIN : 008-290-765-0000\n` +
                `Accounting System: SAP Business One Version 10\n` +
                `Acknowledgement Certificate No.:\n` +
                `\n` +
                `Accouting Books File Attributes/Layout Definition\n` +
                `Extracted by: sample\n` +
                `Filename: General Journal 2022\n` +
                `File Type: Text File\n` +
                `Number of Records: ${records.length}\n` +
                `Amount Field Control Total: ${records[records.length - 1][0]}\n` +
                `Period Covered: ${records[0][5]} - ${records[records.length - 3][5]}\n` +
                `Transaction Cut-off Date & Time:\n` +
                `\n` +
                `Extracted by: sample\n` +
                `\n` +
                `File Layout :\n` +
                setTblHeaderFormat('Fieldname', 'From', 'To', 'Length', 'Example');

            data.push({
                header,
                date: setTblHeaderFormat('Date', '1', '10', '10', records[0][5]),
                refNumber: setTblHeaderFormat('Reference No.', '11', '22', '11', records[0][3]),
                description: setTblHeaderFormat('Description', '23', '277', '254', records[0][4]),
                accCode: setTblHeaderFormat('Account Code', '278', '293', '15', records[0][2]),//Code
                accTitle: setTblHeaderFormat('Account Title', '294', '394', '100', records[0][2]),//NAME
                debit: setTblHeaderFormat('Debit', '395', '414', '19', records[0][0]),
                credit: setTblHeaderFormat('Credit', '415', '434', '19', records[0][1]),
                tblLabel: setGeneralJournalBookFormat('Date', 'Reference No.', 'Description', 'Account Code', 'Account Title', 'Debit', 'Credit',),
                table: '',
            });

            let prevValue = null;

            for (let row = 0; row < records.length - 1; row++) {

                if (records[row][5] !== prevValue) {
                    if (records[row][5] !== undefined) {
                        data.push({
                            table: setGeneralJournalBookFormat(records[row][5], records[row][3], records[row][4], records[row][2], records[row][0], records[row][1])
                        });
                    } else {
                        data.push({
                            table: setGeneralJournalBookFormat('', '', '', records[row][2], records[row][0], records[row][1])
                        });
                    }
                }
                else {
                    data.push({
                        table: setGeneralJournalBookFormat('', '', '', records[row][2], records[row][0], records[row][1])
                    });
                }

                prevValue = records[row][5];
            }
            break;

    }

    return data
}

export function fileName(route) {
    let fileNameData = ''
    switch (route.report_type) {
        case 'at':
            fileNameData = 'Audit Trail.txt';
            break;
        case 'crb':
            fileNameData = 'Cash Receipt Book.txt';
            break;
        case 'cmj':
            fileNameData = 'Credit Memo Journal.txt';
            break;
        case 'gjb':
            fileNameData = 'General Journal Book.txt';
            break;
    }
    return fileNameData
}