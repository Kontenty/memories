import multer from "multer";

const fileFilter = (req, file, callback) => {
  if (!file) {
    callback(null, false);
  } else if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    req.err = "It has to be image file";
    callback(null, false);
  }
};

const upload = multer({ dest: "uploads/", fileFilter });

export default upload;
