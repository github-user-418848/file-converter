export function readXMLFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(reader.result, 'text/xml');
            resolve(xmlDoc);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsText(file);
    });
}

export function reportTypeFieldName(route) {

    let fieldNames = []

    switch (route) {
        case '1':
            fieldNames = [
                "RecordNumber2", "tin2", "wtCode", "WTName2",
                "Rate2", "vendname3", "Sumoftaxamt2", "Sumoftaxableamt2"
            ];
            break;
        case '2':
            fieldNames = [
                "Sumoftaxableamt2", "SumofRate1", "Sumoftaxamt2",
                "vendname3", "wtcode2", "WTName2", "tin2", "GroupNumber1"
            ];
            break;
        case '3':
            fieldNames = [
                "tin2", "wtcode2", "WTName2",
                "Rate2", "vendname3", "Sumoftaxamt2", "Sumoftaxableamt2", "GroupNumber1"
            ];
            break;
        case '4':
            fieldNames = [
                "AmountOfPurchaseOfCapitalGoods1", "AmountOfPurchaseOfServices1", "AmountOfTaxablePurchase1",
                "AmountOfZeroRatedPurchase1", "AmountOfExemptPurchase1", "AmountOfGrossPurchase1", "cardname2", "TIN2",
                "VAT1", "docdate1", "Total2"
            ];
            break;
        case '5':
            fieldNames = [
                "Text1", "TIN2", "VAT1", "docdate1", "Text15", "Text16", "Text17", "Text18", "Text19",
                "Text20", "Text3", "Text9", "Total3"
            ]
    }

    return fieldNames
}