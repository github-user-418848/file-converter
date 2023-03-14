import { allowedExtensions, sizeLimit } from "./globals.js";

export async function validateXmlFile(file) {
    if (!allowedExtensions.includes(file.name.split(".").pop())) {
        throw "Filetype should be only .xml"
    }
    else if (file.size > sizeLimit) {
        throw `File should not exceed to ${sizeLimit/1_000_000}MB`
    }
}