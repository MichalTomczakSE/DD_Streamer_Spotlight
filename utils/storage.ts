import * as path from "path";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import * as mime from "mime";

export function storageDir() {
    return path.join(__dirname,'..',"../../images");
}

export function multerStorage(dest: string) {
    return diskStorage({
        destination: (req, res, cb) => cb(null, dest),
        filename: (req, file, cb) => {
            const extension = mime.getExtension(file.mimetype);
            const uniqueFilename = `${uuid()}.${extension}`;
            cb(null, uniqueFilename);
        }
    });
}