const fs = require("fs");
const path = require("path");

const targetImport = "../components/ui/card";

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      callback(fullPath);
    }
  });
}

function cleanImport(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const cleaned = content
    .split("\n")
    .filter((line) => !line.includes(targetImport))
    .join("\n");

  if (cleaned !== content) {
    console.log(`🧹 Cleaned: ${filePath}`);
    fs.writeFileSync(filePath, cleaned, "utf8");
  }
}

walkDir("./", cleanImport);

console.log("✅ Finished cleaning all '../components/ui/card' imports.");
