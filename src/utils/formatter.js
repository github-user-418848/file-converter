import { findMaxStringLength, getMonthIndex, regexMatched } from './helpers.js'

export function formatTIN(tin) {
    // console.log('tin:', tin);
    // console.log('typeof tin:', typeof tin);
    const match = regexMatched(/(\d{3})-(\d{3})-(\d{3})-(\d{1,4})|(\d{9})(\d*)/, tin)
    if (match) {
        return match[5] && match[6] ? match[5] + ',' + match[6] : match[1] + match[2] + match[3] + ',' + match[4]
    }
    // else {
    //     throw new Error('There was an error upon parsing the TIN Numbers. Please be sure to check the type of report and try uploading it again.')
    // }
}

export function formatDate(date) {
    const match = regexMatched(/MONTH\s+OF\s+([A-Za-z]*)\s+(\d*)/, date)
    if (match) {
        return ('0' + (new Date(match[2], getMonthIndex(match[1]), 1)).getMonth() + 1).slice(-2) + '/' + match[2]
    }
    else {
        throw new Error('There was an error upon parsing the Dates. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatOwnersAddress(ownersAddress) {
    const match = regexMatched(/OWNER'S ADDRESS: (.*)/, ownersAddress)
    if (match) {
        return `"${match[1]}"`.replace(",", "")
    }
    else {
        throw new Error('There was an error upon parsing the Withholding Agent. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatOwnersName(ownersName) {
    const match = regexMatched(/OWNER'S NAME: (.*)/, ownersName)
    if (match) {
        return `"${match[1]}"`
    }
    else {
        throw new Error('There was an error upon parsing the Withholding Agent. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatCorpName(corpName) {
    return `"${corpName ? corpName.toUpperCase().replaceAll(",", "") : ''}"`
}

export function formatAgentName(agentName) {
    const match = regexMatched(/WITHHOLDING AGENT'S NAME:\s*(.*)/, agentName)
    if (match) {
        return `"${match[1]}"`
    }
    else {
        throw new Error('There was an error upon parsing the Withholding Agent. Please be sure to check the type of report and try uploading it again.')
    }
}

export function formatDigit(digit) {
    return digit ? digit.replaceAll(",", "") : ""
}

function wrapText(textBlock, maxLineLength) {
    const textLines = [];
    while (textBlock.length > maxLineLength) {
        textLines.push(textBlock.substring(0, maxLineLength));
        textBlock = textBlock.substring(maxLineLength);
    }
    textLines.push(textBlock);
    return textLines;
}


export const setTblHeaderFormat = (label, from, to, length, value) => {
    const columnWidth = 22;
    return `${label.padEnd(columnWidth)}${from.toString().padEnd(columnWidth)}${to.toString().padEnd(columnWidth)}${length.toString().padEnd(columnWidth)}${value}\n`;
};

export const setAuditTrailTblBodyFormat = (date, code, login, module, activity, refNum, postDate, details, amount) => {
    const dateFormatted = wrapText(date.toString(), 22);
    const codeFormatted = wrapText(code.toString(), 15);
    const loginFormatted = wrapText(login.toString(), 20);
    const moduleFormatted = wrapText(module.toString(), 20);
    const activityFormatted = wrapText(activity.toString(), 25);
    const refNumFormatted = wrapText(refNum.toString(), 16);
    const postDateFormatted = wrapText(postDate.toString(), 20);
    const detailsFormatted = wrapText(details.toString(), 35);
    const amountFormatted = wrapText(amount.toString(), 10);

    const formattedStrings = [
        dateFormatted,
        codeFormatted,
        loginFormatted,
        moduleFormatted,
        activityFormatted,
        refNumFormatted,
        postDateFormatted,
        detailsFormatted,
        amountFormatted
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        date: (dateFormatted[i] || '').padEnd(22),
        code: (codeFormatted[i] || '').padEnd(15),
        login: (loginFormatted[i] || '').padEnd(20),
        module: (moduleFormatted[i] || '').padEnd(20),
        activity: (activityFormatted[i] || '').padEnd(25),
        refNum: (refNumFormatted[i] || '').padEnd(16),
        postDate: (postDateFormatted[i] || '').padEnd(20),
        details: (detailsFormatted[i] || '').padEnd(35),
        amount: (amountFormatted[i] || '').padEnd(10),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;
};

export const setCashReceiptBookTblBodyFormat = (date, customer, refNum, journal, details, gLAccount, accountName, debit, credit) => {
    const dateFormatted = wrapText(date.toString(), 15);
    const customerFormatted = wrapText(customer.toString(), 50);
    const refNumFormatted = wrapText(refNum.toString(), 15);
    const journalFormatted = wrapText(journal.toString(), 19);
    const detailsFormatted = wrapText(details.toString(), 50);
    const gLAccountFormatted = wrapText(gLAccount.toString(), 20);
    const accountNameFormatted = wrapText(accountName.toString(), 35);
    const debitFormatted = wrapText(debit.toString(), 14);
    const creditFormatted = wrapText(credit.toString(), 14);

    const formattedStrings = [
        dateFormatted,
        customerFormatted,
        refNumFormatted,
        journalFormatted,
        detailsFormatted,
        gLAccountFormatted,
        accountNameFormatted,
        debitFormatted,
        creditFormatted
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        date: (dateFormatted[i] || '').padEnd(15),
        customer: (customerFormatted[i] || '').padEnd(50),
        refNum: (refNumFormatted[i] || '').padEnd(15),
        journal: (journalFormatted[i] || '').padEnd(19),
        details: (detailsFormatted[i] || '').padEnd(50),
        gLAccount: (gLAccountFormatted[i] || '').padEnd(20),
        accountName: (accountNameFormatted[i] || '').padEnd(35),
        debit: (debitFormatted[i] || '').padEnd(14),
        credit: (creditFormatted[i] || '').padEnd(14),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;
};

export const setCreditMemoTblBodyFormat = (date, tin, name, address, description, refNum, amount, discount, vat, wt, net) => {
    const dateFormatted = wrapText(date.toString(),13);
    const tinFormatted = wrapText(tin.toString(), 20);
    const nameFormatted = wrapText(name.toString(), 20);
    const addressFormatted = wrapText(address.replaceAll("\n", "").toString(), 30);
    const descriptionFormatted = wrapText(description.toString(), 35);
    const refNumFormatted = wrapText(refNum.toString(), 16);
    const amountFormatted = wrapText(amount.toString(), 16);
    const discountFormatted = wrapText(discount.toString(), 16);
    const vatFormatted = wrapText(vat.toString(), 16);
    const wtFormatted = wrapText(wt.toString(), 16);
    const netFormatted = wrapText(net.toString(), 16);

    const formattedStrings = [
        dateFormatted,
        tinFormatted,
        nameFormatted,
        addressFormatted,
        descriptionFormatted,
        refNumFormatted,
        amountFormatted,
        discountFormatted,
        vatFormatted,
        wtFormatted,
        netFormatted
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        date: (dateFormatted[i] || '').padEnd(13),
        tin: (tinFormatted[i] || '').padEnd(20),
        name: (nameFormatted[i] || '').padEnd(20),
        address: (addressFormatted[i] || '').padEnd(30),
        description: (descriptionFormatted[i] || '').padEnd(35),
        refNum: (refNumFormatted[i] || '').padEnd(16),
        amount: (amountFormatted[i] || '').padEnd(16),
        discount: (discountFormatted[i] || '').padEnd(16),
        vat: (vatFormatted[i] || '').padEnd(16),
        wt: (wtFormatted[i] || '').padEnd(16),
        net: (netFormatted[i] || '').padEnd(16),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;
}

export const setGeneralJournalBookFormat = (date, refNum, description, account, debit, credit) => {
    const dateFormatted = wrapText(date.toString(),12);
    const refNumFormatted = wrapText(refNum.toString(), 12);
    const descriptionFormatted = wrapText(description.toString(), 35);
    const accountFormatted = wrapText(account.toString(), 50);
    const debitFormatted = wrapText(debit.toString(), 25);
    const creditFormatted = wrapText(credit.toString(), 25);

    const formattedStrings = [
        dateFormatted,
        refNumFormatted,
        descriptionFormatted,
        accountFormatted,
        debitFormatted,
        creditFormatted,
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        date: (dateFormatted[i] || '').padEnd(12),
        refNum: (refNumFormatted[i] || '').padEnd(12),
        description: (descriptionFormatted[i] || '').padEnd(35),
        account: (accountFormatted[i] || '').padEnd(50),
        debit: (debitFormatted[i] || '').padEnd(25),
        credit: (creditFormatted[i] || '').padEnd(25),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;
}

export const setGeneralLedgerBookFormat = (date, documentNo, transaction, description, debit, credit, balance) => {
    const dateFormatted = wrapText(date.toString(),42);
    const documentNoFormatted = wrapText(documentNo.toString(), 20);
    const transactionFormatted = wrapText(transaction.toString(), 20);
    const descriptionFormatted = wrapText(description.toString(), 50);
    const debitFormatted = wrapText(debit.toString(), 20);
    const creditFormatted = wrapText(credit.toString(), 20);
    const balanceFormatted = wrapText(balance.toString(), 20);

    const formattedStrings = [
        dateFormatted,
        documentNoFormatted,
        transactionFormatted,
        descriptionFormatted,
        debitFormatted,
        creditFormatted,
        balanceFormatted,
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        date: (dateFormatted[i] || '').padEnd(42),
        documentNo: (documentNoFormatted[i] || '').padEnd(20),
        transaction: (transactionFormatted[i] || '').padEnd(20),
        description: (descriptionFormatted[i] || '').padEnd(50),
        debit: (debitFormatted[i] || '').padEnd(20),
        credit: (creditFormatted[i] || '').padEnd(20),
        balance: (balanceFormatted[i] || '').padEnd(20),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;
}

export const setInventoryJournalFormat = (description, date, refNum, warehouse, qty, uom, unitPrice, total) => {
    const descriptionFormatted = wrapText(description.toString(), 30);
    const dateFormatted = wrapText(date.toString(), 20);
    const refNumFormatted = wrapText(refNum.toString(), 20);
    const warehouseFormatted = wrapText(warehouse.toString(), 35);
    const qtyFormatted = wrapText(qty.toString(), 12);
    const uomFormatted = wrapText(uom.toString(), 12);
    const unitPriceFormatted = wrapText(unitPrice.toString(), 20);
    const totalFormatted = wrapText(total.toString(), 20);

    const formattedStrings = [
        descriptionFormatted,
        dateFormatted,
        refNumFormatted,
        warehouseFormatted,
        qtyFormatted,
        uomFormatted,
        unitPriceFormatted,
        totalFormatted,
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        description: (descriptionFormatted[i] || '').padEnd(30),
        date: (dateFormatted[i] || '').padEnd(20),
        refNum: (refNumFormatted[i] || '').padEnd(20),
        warehouse: (warehouseFormatted[i] || '').padEnd(35),
        qty: (qtyFormatted[i] || '').padEnd(12),
        uom: (uomFormatted[i] || '').padEnd(12),
        unitPrice: (unitPriceFormatted[i] || '').padEnd(20),
        total: (totalFormatted[i] || '').padEnd(20),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;
}

export const setPurchaseJournalFormat = (date, tin, name, address, description, refNum, grossAmt, vatableSales, vatExemptSales, zeroRatedSales, discountAmt, vatAmt, netAmt) => {
    const dateFormatted = wrapText(date.toString(),12);
    const tinFormatted = wrapText(tin.toString(), 17);
    const nameFormatted = wrapText(name.toString(), 15);
    const addressFormatted = wrapText(address.toString(), 20);
    const descriptionFormatted = wrapText(description.replaceAll("\n", "").toString(), 20);
    const refNumFormatted = wrapText(refNum.toString(), 8);
    const grossAmtFormatted = wrapText(grossAmt.toString(), 18);
    const vatableSalesFormatted = wrapText(vatableSales.toString(), 18);
    const vatExemptSalesFormatted = wrapText(vatExemptSales.toString(), 18);
    const zeroRatedSalesFormatted = wrapText(zeroRatedSales.toString(), 18);
    const discountAmtFormatted = wrapText(discountAmt.toString(), 10);
    const vatAmtFormatted = wrapText(vatAmt.toString(), 18);
    const netAmtFormatted = wrapText(netAmt.toString(), 18);

    const formattedStrings = [
        dateFormatted,
        tinFormatted,
        nameFormatted,
        addressFormatted,
        descriptionFormatted,
        refNumFormatted,
        grossAmtFormatted,
        vatableSalesFormatted,
        vatExemptSalesFormatted,
        zeroRatedSalesFormatted,
        discountAmtFormatted,
        vatAmtFormatted,
        netAmtFormatted
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        date: (dateFormatted[i] || '').padEnd(12),
        tin: (tinFormatted[i] || '').padEnd(17),
        name: (nameFormatted[i] || '').padEnd(15),
        address: (addressFormatted[i] || '').padEnd(20),
        description: (descriptionFormatted[i] || '').padEnd(20),
        refNum: (refNumFormatted[i] || '').padEnd(8),
        grossAmt: (grossAmtFormatted[i] || '').padEnd(18),
        vatableSales: (vatableSalesFormatted[i] || '').padEnd(18),
        vatExemptSales: (vatExemptSalesFormatted[i] || '').padEnd(18),
        zeroRatedSales: (zeroRatedSalesFormatted[i] || '').padEnd(18),
        discountAmt: (discountAmtFormatted[i] || '').padEnd(10),
        vatAmt: (vatAmtFormatted[i] || '').padEnd(18),
        netAmt: (netAmtFormatted[i] || '').padEnd(18),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;

}

export const setDebitMemoJournal = (date, tin, name, address, description, refNum, amt, discountAmt, vatAmt, wtAmt, netSales) => {
    const dateFormatted = wrapText(date.toString(), 12);
    const tinFormatted = wrapText(tin.toString(), 20);
    const nameFormatted = wrapText(name.toString(), 25);
    const addressFormatted = wrapText(address.replaceAll("\n", " ").toString(), 30);
    const descriptionFormatted = wrapText(description.replaceAll("\n", " ").toString(), 30);
    const refNumFormatted = wrapText(refNum.toString(), 15);
    const amtFormatted = wrapText(amt.toString(), 20);
    const discountAmtFormatted = wrapText(discountAmt.toString(), 20);
    const vatAmtFormatted = wrapText(vatAmt.toString(), 20);
    const wtAmtFormatted = wrapText(wtAmt.toString(), 20);
    const netSalesFormatted = wrapText(netSales.toString(), 20);

    const formattedStrings = [
        dateFormatted,
        tinFormatted,
        nameFormatted,
        addressFormatted,
        descriptionFormatted,
        refNumFormatted,
        amtFormatted,
        discountAmtFormatted,
        vatAmtFormatted,
        wtAmtFormatted,
        netSalesFormatted,
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        date: (dateFormatted[i] || '').padEnd(12),
        tin: (tinFormatted[i] || '').padEnd(20),
        name: (nameFormatted[i] || '').padEnd(25),
        address: (addressFormatted[i] || '').padEnd(30),
        description: (descriptionFormatted[i] || '').padEnd(30),
        refNum: (refNumFormatted[i] || '').padEnd(15),
        amt: (amtFormatted[i] || '').padEnd(20),
        discountAmt: (discountAmtFormatted[i] || '').padEnd(20),
        vatAmt: (vatAmtFormatted[i] || '').padEnd(20),
        vatAmt: (vatAmtFormatted[i] || '').padEnd(20),
        wtAmt: (wtAmtFormatted[i] || '').padEnd(20),
        netSales: (netSalesFormatted[i] || '').padEnd(20),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;
}


export const setDisbursementJournal = (date, customer, refNum, journal, check, details, gLAccount, accountName, debit, credit) => {
    // return `${date.padEnd(15)}${customer.padEnd(50)}${referenceNo.toString().padEnd(15)}${journal.toString().padEnd(19)}${check.toString().padEnd(19)}${details.padEnd(60)}${gLAccount.padEnd(20)}${accountName.padEnd(50)}${debit.toString().padEnd(14)}${credit.toString()}\n\n`;
    
    const dateFormatted = wrapText(date.toString(), 15);
    const customerFormatted = wrapText(customer.toString(), 20);
    const refNumFormatted = wrapText(refNum.toString(), 15);
    const journalFormatted = wrapText(journal.toString(), 19);
    const checkFormatted = wrapText(check.toString(), 12);
    const detailsFormatted = wrapText(details.toString(), 20);
    const gLAccountFormatted = wrapText(gLAccount.toString(), 20);
    const accountNameFormatted = wrapText(accountName.toString(), 35);
    const debitFormatted = wrapText(debit.toString(), 14);
    const creditFormatted = wrapText(credit.toString(), 14);

    const formattedStrings = [
        dateFormatted,
        customerFormatted,
        refNumFormatted,
        journalFormatted,
        checkFormatted,
        detailsFormatted,
        gLAccountFormatted,
        accountNameFormatted,
        debitFormatted,
        creditFormatted
    ];

    const highestLength = findMaxStringLength(formattedStrings);
    const data = Array.from({ length: highestLength }, (_, i) => ({
        date: (dateFormatted[i] || '').padEnd(15),
        customer: (customerFormatted[i] || '').padEnd(20),
        refNum: (refNumFormatted[i] || '').padEnd(15),
        journal: (journalFormatted[i] || '').padEnd(19),
        check: (checkFormatted[i] || '').padEnd(12),
        details: (detailsFormatted[i] || '').padEnd(20),
        gLAccount: (gLAccountFormatted[i] || '').padEnd(20),
        accountName: (accountNameFormatted[i] || '').padEnd(35),
        debit: (debitFormatted[i] || '').padEnd(14),
        credit: (creditFormatted[i] || '').padEnd(14),
    }));

    const formattedRow = data.map(row => Object.values(row).join('\t')).join('\n');
    return `${formattedRow}\n`;
};