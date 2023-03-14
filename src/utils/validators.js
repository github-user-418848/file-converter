import { allowedExtensions, sizeLimit } from "./globals.js";

export async function validateXmlFile(file) {
    if (!allowedExtensions.includes(file.name.split(".").pop())) {
        throw new Error("Filetype should be XML only")
    }
    else if (file.size > sizeLimit) {
        throw new Error(`Filesize should not exceed to ${sizeLimit/1_000_000}MB`)
    }
}