import { header, details, controls, filename } from '../utils/datStructure.js'

export async function readXMLFile(file) {
  const decoder = new TextDecoder();
  const content = await file.arrayBuffer();
  const decodedContent = decoder.decode(content);
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(decodedContent, 'text/xml');
  return xmlDoc;
}

export async function retrieveRecords(xmlDoc) {
  const xmlSection = [...xmlDoc.getElementsByTagName('Section')];
  const records = xmlSection.map(item => {
    const values = [];
    for (const child of item.children) {
      // Get the value of the first child element (assuming it is either a "FormattedValue" or "TextValue") and add it to the object with the field name as the key
      values.push(child.children[0].textContent)
    }
    return values
  });
  return records
}

export function groupedRecords(records) {
  const groupedRecords = [];
  let currentGroup = [];

  for (let i = 0; i < records.length; i++) {
      if (records[i].length === 0) {
          if (currentGroup.length > 0) {
              groupedRecords.push(currentGroup);
              currentGroup = [];
          }
      } else {
          currentGroup.push(records[i]);
      }
  }

  if (currentGroup.length > 0) {
      groupedRecords.push(currentGroup);
  }

  return groupedRecords;
}

export function createTextData(records, params, separator = ',', count) {
  const head = header(records, params, count);
  const detail = details(records, params, count);
  const control = controls(records, params, count);
  const file = filename(records, params, count);

  const headValues = Object.values(head);
  const headString = headValues.join(separator);

  let rawText = `${headString}\n`;

  const detailLines = detail.map(d => {
    const detailValues = Object.values(d);
    const detailString = detailValues.join(separator);
    return detailString;
  });
  rawText += detailLines.join('\n') + '\n';

  const controlValues = Object.values(control);
  const controlString = controlValues.join(separator);

  rawText += `${controlString}\n`;

  const fileValues = Object.values(file).join('');

  return {
    textData: rawText,
    generatedFileName: fileValues
  };
}

export function getMonthIndex(monthName) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months.indexOf(monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase());
}

export function regexMatched(regexPattern, string) {
  const regex = new RegExp(regexPattern);
  return string.match(regex);
}

export function regexTest(regexPattern, string) {
  return regexPattern.test(string)
}