const fs = require("fs");
const jsonPath = "data/iconography.json";
const iconsDir = "icons/";

let jsonData;

try {
  jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
} catch (err) {
  console.error(`Error reading JSON file: ${err}`);
  process.exit(1);
}

const jsonHashes = jsonData.icons.map((icon) => icon.hash);
const iconFiles = fs.readdirSync(iconsDir);

let missingFiles = [];
let missingHashes = [];

jsonHashes.forEach((hash) => {
  if (!iconFiles.includes(`${hash}.svg`)) {
    missingFiles.push(`${hash}.svg`);
  }
});

iconFiles.forEach((file) => {
  const hash = file.split(".")[0];
  if (!jsonHashes.includes(hash)) {
    missingHashes.push(hash);
  }
});

console.log(`Missing files: ${missingFiles.length}`);
console.log(`Missing Hashes: ${missingHashes.length}`);
if (missingFiles.length) {
  console.log(`Missing files are: ${missingFiles}`);
}
if (missingHashes.length) {
  console.log(`Missing Hashes are: ${missingHashes}`);
}

if (missingHashes.length || missingFiles.length) {
  process.exit(1);
}
