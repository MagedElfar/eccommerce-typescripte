import multer from "multer";
import path from "path";
import {v4 as uuid4} from "uuid"

export default class Multer {
    static singleUpload (field:string , savePath:string) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname , ".." , ".." , "public" , "media" , savePath));
            },
            filename: function (req, file, cb) {
                console.log(file)
                const uniqueSuffix = uuid4();
                cb(null, `${uniqueSuffix}-${file.originalname}`);
            },
        });
        return multer({ storage: storage }).single(field)
    };

    static multipleUpload (field:string , savePath:string) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname , ".." , ".." , "public" , "media" , savePath));
            },
            filename: function (req, file, cb) {
                console.log(file)
                const uniqueSuffix = uuid4();
                cb(null, `${uniqueSuffix}-${file.originalname}`);
            },
        });
        return multer({ storage: storage }).array(field , 10)
    };
}

