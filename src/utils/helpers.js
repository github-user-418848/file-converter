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

export function createTextDataHeader(record, route) {
    let textDataHeader = ''
    switch (route) {
        case '1':
            textDataHeader += 'HMAP,H1600VT'
            break;
        case '2':
            textDataHeader += 'HMAP,H1600VT'
            break;
        case '3':
            textDataHeader += 'HMAP,H1600VT'
            break;
    }
    return `${textDataHeader},${formatTIN(record[0][0])},${record[0][1]},${formatAgentName(record[0][2])}`;
}

export function createTextDataDetails(records, route) {
    let textDataDetails = ''
    for (let row = 1; row < records.length - 1; row++) {
        textDataDetails += `\n${records[row][0]},${formatTIN(records[row][1])}`
        // for (let col = 0; col < records[row].length; col++) {

        //     textDataDetails += `${records[row][col]}`
        //     if (col < records[row].length - 1) {
        //         textDataDetails += '>>'
        //     }
        // }
    }
    return textDataDetails
}

function formatTIN(tin) {
    const match = regexMatched(/(\d{3})-(\d{3})-(\d{3})-(\d{1,4})$|^(\d*)$/, tin)
    return match ? match[5] ? match[5] : match[1] + match[2] + match[3] + ',' + match[4] : 'undefined'
}

function formatDate(date) {
    const match = regexMatched(/MONTH\s+OF\s+([A-Za-z]*)\s+(\d*)/, date);
    return match ? ('0' + (new Date(match[2], getMonthIndex(match[1]), 1)).getMonth() + 1).slice(-2) + '/' + match[2] : 'undefined';
}

function formatAgentName(agentName) {
    const match = regexMatched(/WITHHOLDING AGENT'S NAME:\s*(.*)/, agentName)
    return match ? match[1] : 'undefined'
}

function regexMatched(regexPattern, string) {
    return string.match(regexPattern)
}