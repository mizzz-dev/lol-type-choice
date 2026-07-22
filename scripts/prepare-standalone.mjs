import { access, cp, mkdir, rm } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");
const serverFile = path.join(standaloneDir, "server.js");

const exists = async (targetPath) => {
  try {
    await access(targetPath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
};

const copyDirectory = async (sourcePath, destinationPath) => {
  if (!(await exists(sourcePath))) {
    return;
  }

  await rm(destinationPath, { recursive: true, force: true });
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await cp(sourcePath, destinationPath, { recursive: true, force: true });
};

if (!(await exists(serverFile))) {
  throw new Error(".next/standalone/server.js が生成されていません。next.config.ts の output 設定を確認してください。");
}

await copyDirectory(path.join(rootDir, "public"), path.join(standaloneDir, "public"));
await copyDirectory(path.join(rootDir, ".next", "static"), path.join(standaloneDir, ".next", "static"));

console.log("standalone成果物へpublicと.next/staticを配置しました。");
