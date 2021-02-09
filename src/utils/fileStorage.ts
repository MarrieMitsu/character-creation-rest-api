// Packages
import { Request, Response, NextFunction} from "express";
import multer, { MulterError } from "multer";
import path from "path";

// Config
const storage = multer.memoryStorage();

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new MulterError("LIMIT_UNEXPECTED_FILE"));
    }
}

export function upload(req: Request, res: Response, next: NextFunction) {
    const upload = multer({
        storage,
        fileFilter: function(_req, file, cb) {
            checkFileType(file, cb);
        }
    }).single("profile_image");

    upload(req, res, function (err: any): any {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({"errors": [err]});
        } else if (err) {
            return res.status(500).json({ "errors": err });
        }
        next();
    });
}