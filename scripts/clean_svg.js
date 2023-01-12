const crypto = require("crypto");
const fs = require("fs");
const { optimize } = require("svgo");

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
        const result = optimize(data.toString(), {
          multipass: true,
          eol: "lf",
          plugins: [
            "cleanupAttrs",
            "inlineStyles",
            "removeDoctype",
            "removeXMLProcInst",
            "removeComments",
            "removeMetadata",
            "removeDesc",
            "removeUselessDefs",
            "removeEditorsNSData",
            "removeEmptyAttrs",
            "removeHiddenElems",
            "removeEmptyText",
            "removeEmptyContainers",
            "cleanupEnableBackground",
            {
              name: "convertPathData",
              params: {
                // 3 decimals of precision in floating point numbers
                floatPrecision: 3,
                // Some editors (e.g. Adobe Illustrator and Sketch) cannot parse flags
                // without space wrapping
                noSpaceAfterFlags: false,
              },
            },
            "convertTransform",
            {
              name: "removeUnknownsAndDefaults",
              params: {
                // Keep the 'role' attribute, if it's already defined
                keepRoleAttr: true,
              },
            },
            "removeNonInheritableGroupAttrs",
            {
              // Remove paths with fill="none"
              name: "removeUselessStrokeAndFill",
              params: {
                removeNone: true,
              },
            },
            "removeUselessStrokeAndFill",
            "removeUnusedNS",
            "cleanupIds",
            "cleanupNumericValues",
            "cleanupListOfValues",
            "moveGroupAttrsToElems",
            "collapseGroups",
            "removeRasterImages",
            {
              // Compound all <path>s into one
              name: "mergePaths",
              params: {
                force: true,
                noSpaceAfterFlags: false,
              },
            },
            {
              // Convert basic shapes (such as <circle>) to <path>
              name: "convertShapeToPath",
              params: {
                // including <arc>
                convertArcs: true,
              },
            },
            "convertEllipseToCircle",
            {
              // Sort the attributes on the <svg> tag
              name: "sortAttrs",
              params: {
                order: ["role", "viewBox"],
                xmlnsOrder: "end",
              },
            },
            "sortDefsChildren",
            "removeDimensions",
            {
              name: "removeAttrs",
              params: {
                attrs: [
                  "svg:(?!(role|viewBox|xmlns))",
                  "path:(?!d)",
                  "title:*",
                ],
              },
            },
            "removeElementsByAttr",
            {
              // Keep the role="img" attribute and automatically add it
              // to the <svg> tag if it's not there already
              name: "addAttributesToSVGElement",
              params: {
                attributes: [
                  { role: "img", xmlns: "http://www.w3.org/2000/svg" },
                ],
              },
            },
            "removeOffCanvasPaths",
            "removeStyleElement",
            "removeScriptElement",
            "reusePaths",
          ],
        });
        resolve(result.data);
      }
    });
  });
}

function sha256Hash(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

module.exports = {
  optimizeSVG: optimizeSVG,
  sha256Hash: sha256Hash,
};
