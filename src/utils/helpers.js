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