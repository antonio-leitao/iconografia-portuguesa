const crypto = require("crypto");
const fs = require("fs");
const { optimize } = require("svgo");
const svgoConfig = require("./svgo.config.js");

// Function 1: Optimizes the SVG file and returns the optimized content
function optimizeSVG(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else {
        // check if file is an SVG before optimizing
        const fileExt = file.substr(file.lastIndexOf(".") + 1);
        if (fileExt !== "svg") {
          reject("File is not an SVG");
        }
        const result = optimize(data.toString(), svgoConfig);
        resolve(result.data);
      }
    });
  });
}

//Creates a 256 hash of a string (in this case an optimized svg)
function sha256Hash(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

module.exports = {
  optimizeSVG: optimizeSVG,
  sha256Hash: sha256Hash,
};
