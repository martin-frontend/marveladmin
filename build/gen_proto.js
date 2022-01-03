// 首字大写
String.prototype.firstUpperCase = function() {
    return this.replace(/^\S/, function(s) {
        return s.toUpperCase();
    })
}

var path = require("path");
var fs = require("fs");

const fileArr = [];
const moduleName = process.argv[2];
if(moduleName){
    if(moduleName.substr(0,1) != "_") {
        fileArr.push(moduleName);
        readProto(moduleName);
    }
}else{
    fs.readdirSync(path.join(__dirname, "proto")).forEach(file => {
        const fName = file.replace(".json", "");
        if(fName.substr(0,1) != "_"){
            fileArr.push(fName);
            readProto(fName);
        }
    });
}
// 更新router
if(!moduleName || moduleName.substr(0,1) != "_") {
    const allFile = [];
    fs.readdirSync(path.join(__dirname, "proto")).forEach(file => {
        const fName = file.replace(".json", "");
        if(fName.substr(0,1) != "_")
            allFile.push(fName);
    });
    writeRouter(allFile);
}

// 读取配置
function readProto(moduleName) {
    var confStr =  fs.readFileSync(path.join(__dirname, `proto/${moduleName}.json`), "utf-8");
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/command`));
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/mediator`));
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/view`));

    var conf = JSON.parse(confStr);
    writeSetting(conf, moduleName);
    for (const pName of conf.list) {
        writeCommand(pName, moduleName);
    }

    var cname = getVueClassName(moduleName);
    writeVUE(cname, moduleName);
    writeMediator(cname, conf.list, moduleName);
}

// 生成router
function writeRouter(fileArr) {
    var outputFile = path.join(__dirname, "../src/router/layoutRouter/index.ts");
    try{
        var data = fs.readFileSync(path.join(__dirname, "proto_template", "router.template"), "utf-8");
        var routs = "";
        for(let f of fileArr){
            var file = path.join(__dirname, `proto/${f}.json`);
            var fData = fs.readFileSync(file, "utf-8");
            var json = JSON.parse(fData);

            const cName = getVueClassName(f);
            routs += `        {
            path: "${f}",
            name: "${json.name}",
            component: () => import("@/views/${f}/view/${cName}.vue")
        },`;
        }
        var str = data.replace("${routs}", routs);
        fs.writeFile(outputFile, str, function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("router 生成成功！");
        });
    }catch (e) {
        console.log("读取模板失败");
    }
}
// 生成vue
function writeVUE(cname, moduleName) {
    // var outputFile = path.join(view_output_dir, cname + ".vue");
    var outputFile = path.join(__dirname, `../src/views/${moduleName}/view/${cname}.vue`);
    fs.exists(outputFile,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "vue.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{vueClassName\}/g, cname);

                    try{
                        fs.writeFileSync(outputFile, str, 'utf8');
                        console.log(cname + ".vue 写入成功！");
                    }catch (e) {
                        console.error(cname + ".vue 写入失败！");
                    }

                    fs.writeFile(outputFile, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(cname + ".vue 写入成功！");
                    });
                }
            });
        }
    })

}
// 生成meditor
function writeMediator(cname, list, moduleName) {
    // var outputFile = path.join(mediator_output_dir, cname + "Mediator.ts");
    var outputFile = path.join(__dirname, `../src/views/${moduleName}/mediator/${cname}Mediator.ts`);
    fs.exists(outputFile,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "mediator.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{vueClassName\}/g, cname);

                    var listNotificationInterests = "";
                    var handleNotification = "";
                    for(let p of list){
                        const pName = getPName(p);
                        listNotificationInterests += `            EventType.${pName},
`;
                        handleNotification += `            case EventType.${pName}:
                break;
`;
                    }

                    str = str.replace("${listNotificationInterests}", listNotificationInterests);
                    str = str.replace("${handleNotification}", handleNotification);

                    fs.writeFile(outputFile, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(cname + "Mediator.ts 写入成功！");
                    });
                }
            });
        }
    });

}
// 生成cmd
function writeCommand(p, moduleName) {
    var pName = getPName(p);
    var outputFile = path.join(__dirname, `../src/views/${moduleName}/command/cmd_${pName}.ts`);
    fs.readFile(path.join(__dirname, "proto_template", "cmd.template"), "utf-8", function(err, data) {
        if (err) {
            console.log("读取模板失败");
        } else {
            var str = data.replace("${moduleName}", moduleName);
            str = str.replace(/\$\{pName\}/g, pName);

            fs.writeFile(outputFile, str, function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log(pName + ".ts 写入成功！");
            });
        }
    });
}
// 生成setting.ts
function writeSetting(conf, moduleName) {
    var outputFile = path.join(__dirname, `../src/views/${moduleName}/setting.ts`);

    var plist = conf.list;

    var infoStr = `/**
 * description: ${conf.description}
 * document: ${conf.document}
 */
`;

    var importStr = "";
    var httpTypeStr = `/**协议*/
export var HttpType = {
`;
    var eventTypeStr = `/**事件*/
export var EventType = {
`;
    var regStr = `/**注册协议*/
const facade = puremvc.Facade.getInstance();
`;
    for (let p of plist) {
        var pName = getPName(p);
        importStr += `import cmd_${pName} from "@/views/${moduleName}/command/cmd_${pName}";
`;
        httpTypeStr += `    ${pName}: "${p}",
`;
        eventTypeStr += `    ${pName}: "${pName}",
`;
        regStr += `facade.registerCommand(HttpType.${pName}, cmd_${pName});
`;
    }

    httpTypeStr += "};\n";
    eventTypeStr += "};\n";

    var str = infoStr + importStr + httpTypeStr + eventTypeStr + regStr + "\n";
    fs.writeFile(outputFile, str, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log(pName + ".ts 写入成功！");
    });
}
// 协议名
function getPName(p) {
    p = p.replace(/\//g, "_");
    p = p.replace(/_\{(.*?)\}/g, "");
    if (p.indexOf("_") == 0) p = p.substr(1);
    return p;
}
// view类名
function getVueClassName(pName) {
    return pName.split("_").map(value => value.firstUpperCase()).join("");
}
// 创建文件夹
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

