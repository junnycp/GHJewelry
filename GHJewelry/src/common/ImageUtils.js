import Constants from "../configs/Constants";

export function convertImageBase64(data) {
    var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
    var match = data.match(reg);
    var baseType = {
        jpeg: "jpg"
    };

    baseType["svg+xml"] = "svg";

    if (!match) {
        throw new Error("image base64 data error");
    }

    var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

    return {
        extname: "." + extname,
        base64: match[2]
    };
}

export async function resizeImageBase64(base64, _callback) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
        if (image.width > image.height) {
            canvas.height = (image.height * Constants.MAX_SIZE_IMAGE) / image.width;
            canvas.width = Constants.MAX_SIZE_IMAGE;
        } else {
            canvas.width = (image.width * Constants.MAX_SIZE_IMAGE) / image.height;
            canvas.height = Constants.MAX_SIZE_IMAGE;
        }
        ctx.drawImage(image, 0, 0);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        _callback(canvas.toDataURL());
    };
    image.src = base64;
    return canvas.toDataURL();
}
