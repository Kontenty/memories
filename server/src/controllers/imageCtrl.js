import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export default function getImg(req, res) {
  try {
    fs.accessSync(
      path.join(__dirname, "/images/", req.params.image),
      fs.constants.F_OK
    );
    res
      .status(200)
      .sendFile(path.join(__dirname, "/images/", req.params.image));
  } catch (error) {
    res.status(404).json({ error: "Could not find image" });
  }
}
