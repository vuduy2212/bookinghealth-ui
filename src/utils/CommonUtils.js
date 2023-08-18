import { Buffer } from 'buffer';
class CommonUtils {
    static toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
    static toFileFromBase64(base64) {
        if (base64) {
            return new Buffer(base64, 'base64').toString('binary');
        }
        return '';
    }
    static base64toBlob(data) {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], { type: 'application/pdf' });
    }
}

export default CommonUtils;
