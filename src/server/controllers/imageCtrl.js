import path from "path";
import fs from "fs";

export default function getImg(req, res) {
  try {
    fs.accessSync(path.resolve("uploads", req.params.image), fs.constants.F_OK);
    res.status(200).sendFile(path.resolve("uploads", req.params.image));
  } catch (error) {
    res.status(404).json({ error: "Could not find image" });
  }
}
