export async function readXMLFile(file) {
    const decoder = new TextDecoder();
    const content = await file.arrayBuffer();
    const decodedContent = decoder.decode(content);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(decodedContent, 'text/xml');
    return xmlDoc;
}

export async function retrieveRecords(xmlDoc) {
    // Spread operator (...) to convert the HTMLCollection object returned by getElementsByTagName into an array
    const xmlSection = [...xmlDoc.getElementsByTagName('Section')];
    const records = xmlSection.map(item => {
        const values = [];
        for (const child of item.children) {
            // Get the value of the first child element (assuming it is either a "FormattedValue" or "TextValue") and add it to the object with the field name as the key
            values.push(child.children[0].textContent)
        }
        return values
    });
    // this.records = records
    return records
}

export function getMonthIndex(monthName) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase());
}

export function regexMatched(regexPattern, string) {
    return string.match(regexPattern)
}

export function regexTest(regexPattern, string) {
    return regexPattern.test(string)
}