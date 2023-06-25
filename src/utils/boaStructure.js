export function createFormattedOutput(records) {

    let row = 0

    const mappedRecord = records.map((record, index) => {

        row++
        
        if (record.length !== 0) {

            const getFieldRow = (label, from, to, length, value) => {
                const separator = ' '.repeat(4);
                return `${label.padEnd(15)}${from.toString().padEnd(5)}${to.toString().padEnd(6)}${length.toString().padEnd(7)}${value}\n`;
            };

            const getTblRow = (date, customer, referenceNo, journal, details, gLAccount, accountName, debit, credit) => {
                const separator = ' '.repeat(4);
                return `${date.padEnd(15)}${customer.padEnd(55)}${referenceNo.toString().padEnd(13)}${journal.toString().padEnd(8)}${details.padEnd(25)}${gLAccount.padEnd(12)}${accountName.padEnd(25)}${debit.toString().padEnd(14)}${credit.toString()}\n`;
            };

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
                `Number of Records: 38\n` +
                `Amount Field Control Total: 3,151,713.43\n` +
                `Period Covered:  1/1/2023 - 1/31/2023\n` +
                `Transaction Cut-off Date & Time: May 11, 2023  8:49:14AM\n` +
                `\n` +
                `Extracted by: 1\n` +
                `\n` +
                `File Layout :\n` +
                getFieldRow('Fieldname', 'From', 'To', 'Length', 'Example');

            let data;

            if (row === 1) {
                data = {
                    header,
                    date: getFieldRow('Date', 1, 10, 10, record[3]),
                    customerName: getFieldRow('Customer Name', 11, 111, 100, record[2]),
                    acknowledgementCertNo: getFieldRow('Reference No.', 112, 122, 10, record[1]),
                    accountingBooks: getFieldRow('Journal Entry', 123, 133, 10, record[4]),
                    details_: getFieldRow('Details', 134, 388, 254, record[0]),
                };
            }

            if (row === 2) {
                data = {
                    gLAccount: getFieldRow('G/L Account', 389, 404, 15, record[0]),
                    accountName: getFieldRow('Account Name', 405, 505, 100, record[1]),
                    debit: getFieldRow('Debit', 506, 525, 19, record[2]),
                    credit: getFieldRow('Credit', 526, 545, 19, record[3]),
                };
            }

            if (row === 3) {
                const tblHeaderLabel = getTblRow('Date', 'Customer Name', 'Reference No', 'Journal', 'Details', 'G/L Account', 'Account Name', 'Debit', 'Credit');
                data = {
                    tblHeader: tblHeaderLabel,
                    table: '',
                };
                data.table += getTblRow('01/01/2023', 'Security Agency & Intelligent Network Technology', 3126, 21533, 'MBTC/PDC-01.01.2023', '1-11001', 'MBTC-CA#392-7-39253433', '62,500.00', '0.00');
                data.table += getTblRow('01/01/2023', 'Security Agency & Intelligent Network Technology', 3126, 21533, 'MBTC/PDC-01.01.2023', '1-11001', 'MBTC-CA#392-7-39253433', '62,500.00', '0.00');
            }

            return data;
        }
        else {
            row = 0
            console.log("blank")
        }
    });

    return mappedRecord;
}