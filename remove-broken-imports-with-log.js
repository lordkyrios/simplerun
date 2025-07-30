const fs = require("fs");
const path = require("path");

const brokenImports = [];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      callback(fullPath);
    }
  });
}

function isImportPathValid(importPath, fileDir) {
  if (!importPath.startsWith(".")) return true;

  const resolvedPath = path.resolve(fileDir, importPath);
  return (
    fs.existsSync(resolvedPath) ||
    fs.existsSync(`${resolvedPath}.ts`) ||
    fs.existsSync(`${resolvedPath}.tsx`) ||
    fs.existsSync(path.join(resolvedPath, "index.ts")) ||
    fs.existsSync(path.join(resolvedPath, "index.tsx"))
  );
}

function cleanImports(filePath) {
  const dir = path.dirname(filePath);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");

  const cleaned = lines.filter((line) => {
    const match = line.match(/import .* from ['"](.*)['"];/);
    if (!match) return true;

    const importPath = match[1];
    if (!isImportPathValid(importPath, dir)) {
      brokenImports.push({ file: filePath, path: importPath });
      console.log(`🧼 Removed: ${importPath} in ${filePath}`);
      return false;
    }
    return true;
  });

  fs.writeFileSync(filePath, cleaned.join("\n"), "utf8");
}

walkDir("./", cleanImports);

// Save report
const logPath = "./broken-imports-log.json";
fs.writeFileSync(logPath, JSON.stringify(brokenImports, null, 2));
console.log(`📄 Report saved: ${logPath}`);
console.log("✅ Broken imports cleaned.");
