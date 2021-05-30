import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.join(`${process.cwd()}/src/public/covers`));
	},
	filename: (req, file, callback) => {
		callback(null, `${Date.now()} - ${file.originalname}`);
	},
});

const upload = multer({
	storage: storage,
}).single("upfile");

export default upload;
