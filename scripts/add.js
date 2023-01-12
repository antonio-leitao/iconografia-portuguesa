const { optimizeSVG, sha256Hash } = require("./clean_svg");
const { countPoints } = require("./complexity");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

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
  const type = args.type || null;
  if (!path) {
    console.error("Error: Please provide a filepath");
    process.exit(1);
  }
  const acceptableTypes = ["motiff", "frize", "pattern", "composition", null];
  if (!acceptableTypes.includes(type)) {
    console.error(
      `Error: Unrecognized type. Acceptable options are ${acceptableTypes
        .filter((x) => x != null)
        .toString()} or no option at all`
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
        fs.renameSync(path, "icons/" + hash + ".svg");
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
