const fs = require("fs");
const md5 = require("js-md5");

var path = require("path");
const xlsx = require("node-xlsx");
// 读取Excel
let exceldata = xlsx.parse("./build/lang/lang.xlsx");
let exportData = exceldata[0]["data"];
const topArr = exportData.shift();
const langArr = topArr.slice(1);

var exportJson = {};
for (const langKey of langArr) {
    exportJson[langKey] = {};
}

const langLen = langArr.length;
for (const item of exportData) {
    for (var i = 0; i < langLen; i++) {
        exportJson[langArr[i]][md5(item[0])] = item[i + 1];
    }
}

for (const filename of langArr) {
    var file = path.join(__dirname, "../src/assets/json/lang/" + filename + ".json");
    fs.writeFileSync(file, JSON.stringify(exportJson[filename]));
}
