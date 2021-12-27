const path = require("path");
const fs = require("fs");
const originUrl = path.join(__dirname, "./docs/快速导航.md");
const targetUrl = path.join(__dirname, "./README.md");
const content = fs.readFileSync(originUrl, "utf-8");
fs.writeFileSync(targetUrl, content);
