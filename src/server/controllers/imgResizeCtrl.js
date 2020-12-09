import sharp from "sharp";
import path from "path";
import fs from "fs";
import log from "loglevel";

const uniqueSuffix = `_${Math.random().toString(36).substr(2, 9)}`;

const imageResize = async (req, res, next) => {
  const { file } = req;
  if (!file) return next();

  const newFilename = file.originalname.replace(/\.[^/.]+$/, "") + uniqueSuffix;
  const uploadPath = path.join(process.cwd(), "/uploads/");

  await sharp(path.resolve(file.path))
    .resize({ width: 500 })
    .jpeg({ quality: 80 })
    .toFile(`${uploadPath}/${newFilename}.jpg`)
    .then((sharpRes) => {
      log.info("Done!", sharpRes);
      try {
        fs.unlinkSync(path.resolve(file.path));
      } catch (error) {
        log.error("Error when removing unoptimized image");
        log.error(error);
      }
    })
    .catch((err) => {
      log.error("Error processing files, let's clean it up", err);
      try {
        fs.unlinkSync(path.resolve(file.path));
        fs.unlinkSync(`${uploadPath}/${newFilename}.jpg`);
      } catch (e) {
        log.error("Error when removing image", e);
      }
    });

  req.image = `${newFilename}.jpg`;
  return next();
};

export default imageResize;
