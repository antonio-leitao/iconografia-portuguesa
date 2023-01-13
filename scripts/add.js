const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
const crypto = require("crypto");
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

function countPoints(svgString) {
  let pointsCount = 0;
  let elementCount = 0;
  const pathRegex = /<path[^>]* d="([^"]*)"[^>]*>/g;
  let match;
  while ((match = pathRegex.exec(svgString))) {
    const pathData = match[1];
    const points = pathData.split(/[\s,]+/);
    pointsCount += points.length;
    elementCount++;
  }

  const shapeRegex = /<(rect|circle|ellipse)[^>]*\/>/g;
  while ((match = shapeRegex.exec(svgString))) {
    pointsCount += 4;
    elementCount++;
  }

  const polygonRegex = /<(polygon|polyline)[^>]* points="([^"]*)"[^>]*>/g;
  while ((match = polygonRegex.exec(svgString))) {
    const polyPoints = match[2];
    const points = polyPoints.split(/[\s,]+/);
    pointsCount += points.length;
    elementCount++;
  }
  return { pointsCount: pointsCount, elementCount: elementCount };
}

function readJsonFile(filepath) {
  try {
    const filepath_resolved = path.join(process.cwd(), filepath);
    const fileExist = fs.existsSync(filepath_resolved);
    if (!fileExist) throw new Error(`File not found in ${filepath_resolved}`);
    const data = fs.readFileSync(filepath_resolved, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error(error);
  }
}

function checkArgs(args) {
  const path = args._[0];
  const type = args.type;
  if (!path) {
    console.error("Error: Please provide a filepath");
    process.exit(1);
  }
  const acceptableTypes = ["motiff", "frize", "tile", "composition"];
  if (!acceptableTypes.includes(type)) {
    console.error(
      `Error: Unrecognized type. Acceptable options are ${acceptableTypes.toString()} got ${type} instead.`
    );
    process.exit(1);
  }
  return { path: path, type: type };
}

async function main() {
  //Check arguments
  const args = minimist(process.argv.slice(2));
  const { path, type } = checkArgs(args);

  //load the metadata json
  let iconography = readJsonFile("data/iconography.json");

  optimizeSVG(path)
    .then((svgString) => {
      // hash it
      const hash = sha256Hash(svgString);
      //get complexity metrics
      const { pointsCount, elementCount } = countPoints(svgString);
      const icon = {
        hash: hash,
        points: pointsCount,
        elements: elementCount,
        type: type,
      };
      //check if it already exists
      const existingIcon = iconography.icons.find(
        (obj) => obj.hash === icon.hash
      );
      //add it and rename it if it doesn't
      if (!existingIcon) {
        iconography.icons.push(icon);
        fs.writeFileSync("icons/" + hash + ".svg", svgString);
        console.log(`Added ${path} to iconography.`);
      } else {
        console.log(`Icon already exists!.`);
      }
    })
    .then(() => {
      //sort array of icons (not efficient but is very robust to errors)
      iconography.icons.sort((a, b) => b.points - a.points);
      //overwrite the iconography
      fs.writeFileSync("data/iconography.json", JSON.stringify(iconography));
    })
    .catch((err) => {
      if (err === "File is not an SVG") {
        console.error("Error: The file is not an SVG, Optimization failed");
      } else {
        console.error("Error: ", err);
      }
    });
}

main();
