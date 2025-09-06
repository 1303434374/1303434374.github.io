const fs = require('fs');

const manualEansContent = fs.readFileSync('eans.txt', 'utf8');
const fengyunEansContent = fs.readFileSync('update.txt', 'utf8');

const manualEans = manualEansContent.trim().split('\n');
const fengyunEans = fengyunEansContent.trim().split('\n');

if (manualEans.length !== fengyunEans.length) {
  console.log('manual EAN 码和 fengyun EAN 码数量不匹配');
  process.exit(1);
}

for (let i = 0; i < manualEans.length; i++) {
  const manualEan = manualEans[i].trim();
  const fengyunEan = fengyunEans[i].trim();
  
  const fengyunFilePath = `../fengyun/${fengyunEan}.html`;
  const manualFilePath = `${manualEan}.html`;

  if (!fs.existsSync(fengyunFilePath)) {
    console.log(`fengyun 文件未找到: ${fengyunFilePath}`);
    continue;
  }
  if (!fs.existsSync(manualFilePath)) {
    console.log(`manual 文件未找到: ${manualFilePath}`);
    continue;
  }

  let fengyunContent = fs.readFileSync(fengyunFilePath, 'utf8');
  const contentRegex = /<div class="content" id="content1">([\s\S]*?)<\/div>/;
  const match = fengyunContent.match(contentRegex);
  
  if (!match) {
    console.log(`在 ${fengyunFilePath} 中未找到 content1 div`);
    continue;
  }
  
  let newContent = match[1].replace(/Fengyun/g, 'Pengda');
  
  let manualContent = fs.readFileSync(manualFilePath, 'utf8');
  manualContent = manualContent.replace(contentRegex, `<div class="content" id="content1">${newContent}</div>`);

  fs.writeFileSync(manualFilePath, manualContent, 'utf8');
  console.log(`已更新 ${manualEan}.html 的 content1 内容，使用来自 ${fengyunEan}.html 并替换 Fengyun 为 Pengda`);
}