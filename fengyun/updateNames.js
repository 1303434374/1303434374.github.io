const fs = require('fs');

const eansContent = fs.readFileSync('eans.txt', 'utf8');
const namesContent = fs.readFileSync('update.txt', 'utf8');

const eans = eansContent.trim().split('\n');
const names = namesContent.trim().split('\n');

if (eans.length !== names.length) {
  console.log('EAN 码和产品名称数量不匹配');
  process.exit(1);
}

for (let i = 0; i < eans.length; i++) {
  const ean = eans[i].trim();
  const name = names[i].trim();
  const filePath = `${ean}.html`;

  if (!fs.existsSync(filePath)) {
    console.log(`文件未找到: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const regex = /<p class="section-content">Product Name:.*?<\/p>/g;
  content = content.replace(regex, `<p class="section-content">Product Name: ${name}</p>`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`已更新 ${ean}.html 的产品名称: ${name}`);
}