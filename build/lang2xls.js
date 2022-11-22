const fs = require("fs");
const path = require("path");
const xlsx = require("node-xlsx");
const md5 = require('js-md5');

const zh1 = require("./../src/lang/zh.ts");
const en1 = require("./../src/lang/en.ts");
const vi1 = require("./../src/lang/vi.ts");

const title = ["key", "zh-CN", "en-US", "vi-VN", "ja-JP"];
const data = [];
data.push(title);

// 生成excel文件
const catekeys = Object.keys(zh1);
for (const ckey of catekeys) {
    const kkeys = Object.keys(zh1[ckey]);
    for(const kk of kkeys){
        try{
            data.push([zh1[ckey][kk], zh1[ckey][kk], en1[ckey][kk], vi1[ckey][kk]]);
        }catch(e){
            console.log("error:" + ckey);
        }
    }
}

let buffer =xlsx.build([
    {
        name:'sheet1',
        data:data
    }
]);
fs.writeFileSync('./lang/lang.xlsx',buffer,{'flag':'w'});

//遍历src文件夹,并替换
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function(err, files) {
        if (err) {
            console.warn(err);
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function(eror, stats) {
                    if (eror) {
                        console.warn("获取文件stats失败");
                    } else {
                        var isFile = stats.isFile(); //是文件
                        var isDir = stats.isDirectory(); //是文件夹
                        if (isFile) {
                            // console.log(filedir);
                            // if (filename == "DateRangePicker.vue") {
                                replaceFile(filedir);
                            // }
                        }
                        if (isDir) {
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                });
            });
        }
    });
}
function replaceFile(filename) {
    // const extName1 = path.extname(filename);
    // if(extName1 == ".vue"){
    //     let data = fs.readFileSync(filename, "utf-8");
    //     data = data.replace(/private/g, "");
    //     fs.writeFile(filename, data, function(err) {
    //         if (err) {
    //             return console.error(err);
    //         }
    //     });
    // }
    // return;



    let data = fs.readFileSync(filename, "utf-8");
    let arr1 = data.match(/\$t\(([^)]*)\)/g) || [];
    let arr2 = data.match(/this.\$t\(([^)]*)\)/g) || [];
    let arr3 = data.match(/i18n.t\(([^)]*)\)/g) || [];
    const arr = arr1.concat(arr2).concat(arr3);
    if(arr.length == 0) return;

    const extName = path.extname(filename);
    // console.log(extName);
    if(extName == '.vue'){
        data = data.replace(/private/g, "");
        data = data.replace(`<script lang="ts">`, `<script lang="ts">
import LangUtil from "@/core/global/LangUtil";`);
        data = data.replace(`AbstractView {`, ` AbstractView {
    LangUtil = LangUtil;`);
        data = data.replace(`Vue {`, ` Vue {
    LangUtil = LangUtil;`);
        data = data.replace(`AbstractView{`, ` AbstractView {
    LangUtil = LangUtil;`);
        data = data.replace(`Vue{`, ` Vue {
    LangUtil = LangUtil;`);
    }else{
        data = `import LangUtil from "@/core/global/LangUtil";
` + data;
    }

    for (const item of arr) {
        let s = item.match(/\"([^)]*)\"/g);
        if (!s) {
            s = item.match(/'([^)]*)'/g);
        }
        if(!s) {
            continue;
        }
        const key = s[0].replace(/[\"']/g, "");
        const arr = key.split(".");
        try{
            data = data.replace(item, `LangUtil('${zh1[arr[0]][arr[1]]}')`)
        }catch(err){
            console.log("error:")
            console.log(filename);
            console.log(item);
        }

    }

    fs.writeFile(filename, data, function(err) {
        if (err) {
            return console.error(err);
        }
        // console.log(filename + " 生成成功！");
    });
}

fileDisplay(path.resolve(__dirname, "./../src"));
