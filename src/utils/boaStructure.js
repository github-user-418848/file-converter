import { setTblHeaderFormat, setTblBodyFormat } from './formatter.js'
import { groupedRecords } from './helpers.js'

export function createFormattedOutput(records) {

    let data = [];
    const groupedRec = groupedRecords(records);

    const header =
        `TAXPAYER'S NAME: MACROLOGIC DIVERSIFIED TECHNOLOGIES INC.\n` +
        `ADDRESS: 3RD FLR MACROLOGIC CORPORATE CENTRE 9054 MOLINO ROAD MOLINO III, BACOOR CITY   PHILIPPINES\n` +
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
        `Period Covered:  1/1/2023 - 1/31/2023\n` +
        `Transaction Cut-off Date & Time: May 11, 2023  8:49:14AM\n` +
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
                tblLabel: setTblBodyFormat('Date', 'Customer', 'Reference No', 'Journal Entry No.', 'Details', 'G/L Account', 'Account Name', 'Debit', 'Credit'),
                table: '',
                pageNo: 'Page -1 of 1\n',
            });
        } else if (isLastRow) {
            const lastRowObj = {
                table: setTblBodyFormat(' ', ' ', ' ', ' ', ' ', ' ', groupedRec[row][0][0], groupedRec[row][0][1], groupedRec[row][0][2]),
            };
            data.push(lastRowObj);
        }

        groupedRecords(records)[row].slice(1, -1).forEach((record, index) => {
            const isFirstChild = index === 0;
            const [glAccount, accountName, debit, credit] = record;

            const tableRow = isFirstChild
                ? setTblBodyFormat(
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
                : setTblBodyFormat('', '', '', '', '', glAccount, accountName, debit, credit);

            data[data.length - 1].table += tableRow;
        });
    }

    return data
}