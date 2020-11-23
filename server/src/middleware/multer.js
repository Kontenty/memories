import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = `_${Math.random().toString(36).substr(2, 9)}`;
    const extDotPos = file.originalname.lastIndexOf(".");
    const ext = file.originalname.substring(
      extDotPos,
      file.originalname.length
    );
    callback(null, file.originalname.slice(0, extDotPos) + uniqueSuffix + ext);
  },
});

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

const upload = multer({ storage, fileFilter });

export default upload;
