import CryptoJS from "crypto-js";

const myKey = "ThMR";

export function encryptData(data) {
    return (
        CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(myKey)) +
        CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(data)))
    );
}

export function decryptData(hash) {
    if (hash === undefined || hash === null) {
        return null;
    }
    let h = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(myKey));
    let str = CryptoJS.enc.Base64.parse(hash.substr(h.length)).toString(
        CryptoJS.enc.Utf8
    );
    return JSON.parse(str);
}
