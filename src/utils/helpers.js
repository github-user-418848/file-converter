export async function readXMLFile(file) {
    const decoder = new TextDecoder();
    const content = await file.arrayBuffer();
    const decodedContent = decoder.decode(content);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(decodedContent, 'text/xml');
    return xmlDoc;
}

export function getMonthIndex(monthName) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase());
}

export function regexMatched(regexPattern, string) {
    return string.match(regexPattern)
}