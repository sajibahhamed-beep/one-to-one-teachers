const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");

// Always force current working directory to project root where package.json lives
const rootDir = path.resolve(__dirname, "..");

// Force working directory and override npm environment variables
process.chdir(rootDir);
process.env.INIT_CWD = rootDir;
process.env.PWD = rootDir;

const action = process.argv[2] || "dev";

if (action === "dev:clean" || action === "clean" || action === "build:safe") {
  const nextDir = path.join(rootDir, ".next");
  const appNextDir = path.join(rootDir, "app", ".next");
  if (fs.existsSync(nextDir)) {
    try {
      fs.rmSync(nextDir, { recursive: true, force: true });
    } catch (e) {}
  }
  if (fs.existsSync(appNextDir)) {
    try {
      fs.rmSync(appNextDir, { recursive: true, force: true });
    } catch (e) {}
  }
  console.log("✓ Cleared .next build cache successfully");
}

if (action === "clean") {
  process.exit(0);
}

// Do NOT pass rootDir as positional CLI arg because Next 14 App Router misresolves routes if absolute dir is passed on Windows.
// process.chdir(rootDir) above already guarantees cwd is project root.
const command = action.includes("build")
  ? "npx next build"
  : action === "start"
  ? "npx next start"
  : "npx next dev";

console.log(`Starting Next.js from root directory: ${rootDir}`);

try {
  execSync(command, { stdio: "inherit", cwd: rootDir, env: process.env });
} catch (err) {
  process.exit(err.status || 1);
}
