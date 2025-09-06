const fs = require('fs');

const fengyunEansContent = fs.readFileSync('eans.txt', 'utf8');
const manualEansContent = fs.readFileSync('update.txt', 'utf8');

const fengyunEans = fengyunEansContent.trim().split('\n');
const manualEans = manualEansContent.trim().split('\n');

if (fengyunEans.length !== manualEans.length) {
  console.log('fengyun EAN 码和 manual EAN 码数量不匹配');
  process.exit(1);
}

for (let i = 0; i < fengyunEans.length; i++) {
  const fengyunEan = fengyunEans[i].trim();
  const manualEan = manualEans[i].trim();
  
  const manualFilePath = `../manual/${manualEan}.html`;
  const fengyunFilePath = `${fengyunEan}.html`;

  if (!fs.existsSync(manualFilePath)) {
    console.log(`manual 文件未找到: ${manualFilePath}`);
    continue;
  }
  if (!fs.existsSync(fengyunFilePath)) {
    console.log(`fengyun 文件未找到: ${fengyunFilePath}`);
    continue;
  }

  let manualContent = fs.readFileSync(manualFilePath, 'utf8');
  const contentRegex = /<div class="content" id="content1">([\s\S]*?)<\/div>/;
  const match = manualContent.match(contentRegex);
  
  if (!match) {
    console.log(`在 ${manualFilePath} 中未找到 content1 div`);
    continue;
  }
  
  let newContent = match[1].replace(/Pengda/g, 'Fengyun');
  
  let fengyunContent = fs.readFileSync(fengyunFilePath, 'utf8');
  fengyunContent = fengyunContent.replace(contentRegex, `<div class="content" id="content1">${newContent}</div>`);

  fs.writeFileSync(fengyunFilePath, fengyunContent, 'utf8');
  console.log(`已更新 ${fengyunEan}.html 的 content1 内容，使用来自 ${manualEan}.html 并替换 Pengda 为 Fengyun`);
}