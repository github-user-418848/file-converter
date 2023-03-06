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

export function mapXmlData(file) {
    if (file) {
        readXMLFile(file)
            .then((xmlDoc) => {
                let mapData = [], counter = 0
                // Get All Section Tag
                const _arryOfXML = xmlDoc.getElementsByTagName('Section');
                // Loop Through The Section Tag
                for (const item of _arryOfXML) {
                    // Exclude The First & Last Occurence of Section Tag
                    if (counter != 0 && counter != _arryOfXML.length - 1) {
                        const _item = {};
                        for (const child of item.children) {
                            const fieldName = child.getAttribute('Name');
                            if (fieldName) {
                                const formattedValueElem = child.querySelector('FormattedValue');
                                if (formattedValueElem) {
                                    _item[fieldName] = formattedValueElem.textContent;
                                }
                            }
                        }
                        // Append All Through mapData Array Object
                        mapData.push(_item);
                    }
                    counter++;
                }
                return mapData; // Return mapData
            })
            .catch((error) => {
                console.log(error);
            });
    }
}