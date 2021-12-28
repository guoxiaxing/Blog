const path = require("path");
const fs = require("fs");
const originUrl = path.join(__dirname, "./docs/快速导航.md");
const targetUrl = path.join(__dirname, "./README.md");
try {
  const content = fs.readFileSync(originUrl, "utf-8");
  fs.writeFileSync(targetUrl, content);
  console.log("README.md 写入完成✅");
  process.exit(0);
} catch (e) {
  console.log(e, "README.md写入失败❌");
  process.exit(1);
}
