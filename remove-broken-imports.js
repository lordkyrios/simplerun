const fs = require("fs");
const path = require("path");

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
  // Skip modules like 'react' or 'next/link'
  if (!importPath.startsWith(".")) return true;

  const fullImportPath = path.resolve(fileDir, importPath);
  try {
    return (
      fs.existsSync(fullImportPath) ||
      fs.existsSync(`${fullImportPath}.ts`) ||
      fs.existsSync(`${fullImportPath}.tsx`) ||
      fs.existsSync(path.join(fullImportPath, "index.ts")) ||
      fs.existsSync(path.join(fullImportPath, "index.tsx"))
    );
  } catch {
    return false;
  }
}

function cleanImports(filePath) {
  const dir = path.dirname(filePath);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");

  const cleanedLines = lines.filter((line) => {
    const importMatch = line.match(/import .* from ['"](.*)['"];/);
    if (!importMatch) return true;

    const importPath = importMatch[1];
    if (!isImportPathValid(importPath, dir)) {
      console.log(`🧼 Removed invalid import in ${filePath}: ${line}`);
      return false;
    }

    return true;
  });

  fs.writeFileSync(filePath, cleanedLines.join("\n"), "utf8");
}

walkDir("./", cleanImports);

console.log("✅ Done: All broken relative imports removed.");
