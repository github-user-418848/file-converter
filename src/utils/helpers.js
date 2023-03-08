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

export function formatTIN(tin) {
    const match = regexMatched(/(\d{3})-(\d{3})-(\d{3})-(\d{1,4})$|^(\d*)$/, tin)
    return match ? match[5] ? match[5] : match[1] + match[2] + match[3] + ',' + match[4] : 'undefined'
}

export function formatDate(date) {
    const match = regexMatched(/MONTH\s+OF\s+([A-Za-z]*)\s+(\d*)/, date);
    return match ? ('0' + (new Date(match[2], getMonthIndex(match[1]), 1)).getMonth() + 1).slice(-2) + '/' + match[2] : 'undefined';
}

export function formatAgentName(agentName) {
    const match = regexMatched(/WITHHOLDING AGENT'S NAME:\s*(.*)/, agentName)
    return match ? match[1] : 'undefined'
}

export function getMonthIndex(monthName) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase());
}

export function regexMatched(regexPattern, string) {
    return string.match(regexPattern)
}