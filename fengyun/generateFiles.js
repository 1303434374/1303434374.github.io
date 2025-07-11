const fs = require('fs');
const path = require('path');

// 读取名称列表
const eans = fs.readFileSync(path.join(__dirname, 'eans.txt'), 'utf-8').split('\n').map(line => line.trim()).filter(Boolean);

// HTML 模板
const htmlTemplate = (ean) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ean}</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: Arial, sans-serif;
        }

        /* Tab styling */
        .tabs {
            display: flex;
            justify-content: center;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
            margin-top: 0;
        }

        .tab {
            padding: 10px 20px;
            cursor: pointer;
            text-align: center;
            flex: 1;
            font-weight: bold;
            color: #333;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
        }

        .tab:hover {
            background-color: #e9e9e9;
        }

        .tab.active {
            background-color: #fff;
            border-bottom: 3px solid #007BFF;
        }

        /* Content container styling */
        .content-container {
            padding: 0 20px 20px;
            background-color: #fff;
            margin-top: 10px;
            min-height: calc(100vh - 60px); /* Adjusts based on tab height */
            overflow-y: auto;
        }

        .content {
            max-width: 900px;
            margin: 0 auto;
            line-height: 1.6;
            text-align: justify;
        }
    </style>
</head>
<body>

    <div class="tabs">
        <div class="tab active" id="tab1" onclick="switchTab(1)">User Instruction Manual</div>
        <div class="tab" id="tab2" onclick="switchTab(2)">EU Declaration of Conformity</div>
    </div>

    <div class="content-container" id="content-container">
        <div class="content" id="content1">

        </div>

        <div class="content" id="content2" style="display: none;">
            <h1 class="heading">EU DECLARATION OF CONFORMITY</h1>
            
            <p class="section-title">1. No … (unique identification of the product)</p>
            <p class="section-content">${ean}</p>

            <p class="section-title">2. Name and Address of the Manufacturer:</p>
            <p class="section-content">
                Zhuhai Fengyun Technology Co., Ltd.<br>
                Office 1#, 2nd Floor, Building 1-4, No. 128, Xiangzhou Renmin West Road, Xiangzhou District, Zhuhai City
            </p>

            <p class="section-title">3. This declaration of conformity is issued under the sole responsibility of the manufacturer:</p>
            <p class="section-content">Zhuhai Fengyun Technology Co., Ltd.</p>

            <p class="section-title">4. Object of the Declaration:</p>
            <p class="section-content">Product Name: </p>

            <p class="section-title">5. The object of the declaration described in point 4 is in conformity with the relevant Union harmonisation legislation:</p>
            <p class="section-content">• Directive 2001/95/EC (General Product Safety Directive - GPSD)</p>

            <p class="section-title">6. References to Harmonised Standards:</p>
            <p class="section-content">• ISO 9001:2015 (Quality Management System, optional for reference)</p>

            <p class="section-title">7. Notified Body (if applicable):</p>
            <p class="section-content">Not applicable</p>

            <p class="section-title">8. Additional Information:</p>
            <p class="section-content">
                Place and Date of Issue: Germany, 01/01/2025<br>
                Name: Peter<br>
                Function: Compliance Officer<br>
                Signature: ___Peter___
            </p>

            <p class="signature">Signed for and on behalf of: Peter</p>
        </div>
    </div>

    <script>
        function switchTab(tabNumber) {
            // Hide both content sections
            document.getElementById('content1').style.display = 'none';
            document.getElementById('content2').style.display = 'none';

            // Remove active class from both tabs
            document.getElementById('tab1').classList.remove('active');
            document.getElementById('tab2').classList.remove('active');

            // Show the selected tab content
            if (tabNumber === 1) {
                document.getElementById('content1').style.display = 'block';
                document.getElementById('tab1').classList.add('active');
            } else {
                document.getElementById('content2').style.display = 'block';
                document.getElementById('tab2').classList.add('active');
            }
        }
    </script>

</body>
</html>
`;

// 批量生成 HTML 文件（直接生成在当前目录）
eans.forEach((ean) => {
    // 删除文件名头尾的所有空格
    const trimmedName = ean.trim();
    const filePath = path.join(__dirname, `${trimmedName}.html`);

    // 如果文件已存在则跳过
    if (fs.existsSync(filePath)) return;

    fs.writeFileSync(filePath, htmlTemplate(trimmedName), 'utf-8');
    console.log(ean);
});