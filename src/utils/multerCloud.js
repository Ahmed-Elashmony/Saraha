import multer from "multer";

export const fileValidation = {
  image: ["image/jpg", "image/png"],
  file: ["application/pdf", "application/msword"],
};

export function upload(customValidation = []) {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid Format"), false);
    }
  }
  const upload = multer({ fileFilter, storage });
  return upload;
}
