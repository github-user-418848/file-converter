import { allowedExtensions, sizeLimit, minRdoCodeLength, maxRdoCodeLength, reportTypes, formTypes } from "./globals.js";
import { regexTest } from "./helpers.js";

export async function validateXmlFile(file) {
    if (!allowedExtensions.includes(file.name.split(".").pop())) {
        throw new Error("Filetype should be XML only")
    }
    else if (file.size > sizeLimit) {
        throw new Error(`Filesize should not exceed to ${sizeLimit / 1_000_000}MB`)
    }
}

export async function validateRdoCode(rdoCode) {
    if (!regexTest(/^[a-zA-Z0-9]{1,5}$/, rdoCode)) {
        throw new Error(`The RDO Code should consist of characters or digits only, with a maximum length of ${maxRdoCodeLength} characters.`)
    }
    else {
        return rdoCode
    }
}

export function getReportTypeById(tax_type, report_type) {
    return reportTypes.find((report) => report.index === tax_type && report.id === report_type);
}

export function getFormType(form_type, report_type) {
    return form_type && formTypes.find((form) => form.index === report_type && form.name === form_type);
}

export function isRdoCodeValid(rdo_code) {
    return !rdo_code || /^[a-zA-Z0-9]{0,10}$/.test(rdo_code);
}

export function isParamsValid(tax_type, report, form, validRdoCode, rdo_code, template) {
    return (
        (tax_type === 'wt' && report && form && validRdoCode) ||
        (tax_type === 'vat' && report && !form && !rdo_code) ||
        (tax_type === 'boa' && report && !form && !rdo_code)
    );
}