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

function ensureFile(filePath) {
  const ext = path.extname(filePath);
  const isDir = ext === "";
  const basePath = isDir ? filePath : filePath.replace(ext, "");

  const tsxPath = `${basePath}.tsx`;
  const tsPath = `${basePath}.ts`;
  const indexTsx = path.join(basePath, "index.tsx");

  if (
    fs.existsSync(tsxPath) ||
    fs.existsSync(tsPath) ||
    fs.existsSync(indexTsx)
  ) {
    return true;
  }

  // Create directories if needed
  const dir = path.dirname(tsxPath);
  fs.mkdirSync(dir, { recursive: true });

  // Generate placeholder
  const name = path.basename(basePath);
  const content = `// Auto-generated placeholder\nexport function ${name.charAt(0).toUpperCase() + name.slice(1)}() {\n  return <div>${name} component placeholder</div>;\n}\n`;
  fs.writeFileSync(tsxPath, content, "utf8");

  console.log(`🆕 Created: ${tsxPath}`);
  return true;
}

function fixImports(filePath) {
  const dir = path.dirname(filePath);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");

  const updated = lines.map((line) => {
    const match = line.match(/import .* from ['"](.*)['"];/);
    if (!match) return line;

    const importPath = match[1];
    if (!importPath.startsWith(".")) return line;

    const fullImportPath = path.resolve(dir, importPath);
    if (!ensureFile(fullImportPath)) {
      console.warn(`⚠️ Could not resolve: ${importPath} in ${filePath}`);
    }

    return line;
  });

  fs.writeFileSync(filePath, updated.join("\n"), "utf8");
}

walkDir("./", fixImports);
console.log("✅ Fixed and generated missing relative imports.");
