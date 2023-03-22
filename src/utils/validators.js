import { allowedExtensions, sizeLimit, minRdoCodeLength, maxRdoCodeLength } from "./globals.js";
import { regexTest } from "./helpers.js";

export async function validateXmlFile(file) {
    if (!allowedExtensions.includes(file.name.split(".").pop())) {
        throw new Error("Filetype should be XML only")
    }
    else if (file.size > sizeLimit) {
        throw new Error(`Filesize should not exceed to ${sizeLimit/1_000_000}MB`)
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