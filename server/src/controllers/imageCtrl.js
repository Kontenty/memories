import path from "path";
const __dirname = path.resolve();

export const getImg = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/images/", req.params.image));
};
