const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

module.exports = {
  webpack: override(
    addWebpackAlias({
      "@": path.resolve(__dirname, "src/client"),
    })
  ),
  paths: function (paths, env) {
    paths.appIndexJs = path.resolve(__dirname, "src/client/index.js");
    paths.appSrc = path.resolve(__dirname, "src/client");
    paths.appHtml = path.resolve(__dirname, "src/client/public/index.html");
    paths.appPublic = path.resolve(__dirname, "src/client/public");
    paths.appBuild = path.resolve(__dirname, "dist/client");
    return paths;
  },
};
