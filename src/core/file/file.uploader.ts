import multer from 'multer'
import multerS3 from 'multer-s3';
import mime from 'mime-types';
import file from "./file.manager";
import {Request, Response} from 'express';

import {S3, AWS_S3_CONFIG} from "../../config/aws";

class FileUploader {

    /**
     * Create directory recursively
     * @param path
     */
    createDir(path: string) {
        file.mkdirSync(process.cwd() + '/' + path, {recursive: true}, (error: any) => {
            if (error)
                console.log(error)
        })
    }

    /**
     * Save file to S3
     * @param path
     * @returns {Multer|undefined}
     */
    saveToS3(path: string) {
        return multer({
            storage: multerS3({
                ...AWS_S3_CONFIG,
                contentType: multerS3.AUTO_CONTENT_TYPE,
                // Set key/ filename as original uploaded name
                metadata: function (req: Request, file: any, cb: Function) {
                    cb(null, {fieldName: file.fieldname});
                },
                key: function (req: Request, file: any, cb: Function) {
                    cb(null, Date.now().toString())
                }
            })
        });
    }

    /**
     * Save file to app default base path 'public'
     * @param path
     * @returns {Multer|undefined}
     */
    saveToLocal = (path: string) => {
        let filePath = 'public/upload/' + path;
        this.createDir(filePath)
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, filePath);
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + '.' + mime.extension(file.mimetype));
                }
            })
        });
    }
}

module.exports = new FileUploader