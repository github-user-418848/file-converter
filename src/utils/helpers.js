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
            textDataHeader += `HMAP,H1600VT,${formatTIN(record[0][0])},${record[0][1]},${record[0][2]}`
            break;
    }
    return textDataHeader;
}

function formatTIN(string) {
    const tinRegex = /TIN:\s*(\d{3})-(\d{3})-(\d{3})-(\d{4})/;
    const tinMatch = string.match(tinRegex);
    let outputString = ''
    
    if (tinMatch) {
        outputString = tinMatch[1] + tinMatch[2] + tinMatch[3] + ',' + tinMatch[4];
    }
    return outputString
}