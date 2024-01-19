"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
// Check file type
function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png/;
    // Check extension
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    // else {
    //     cb('Error: Images only!');
    //   }
}
// Initialize upload variable
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
exports.default = upload;
