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
        return new Buffer(base64, 'base64').toString('binary');
    }
}

export default CommonUtils;
