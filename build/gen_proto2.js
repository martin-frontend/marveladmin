// 首字大写
String.prototype.firstUpperCase = function() {
    return this.replace(/^\S/, function(s) {
        return s.toUpperCase();
    })
}

var path = require("path");
var fs = require("fs");

const moduleName = process.argv[2];
const className = getVueClassName(moduleName);
var http_type_table_columns;
var http_type_index;
var http_type_show;
var http_type_store;
var http_type_update;

if(!moduleName || moduleName.substr(0,1) != "_") {
    const allFile = [];
    fs.readdirSync(path.join(__dirname, "proto")).forEach(file => {
        const fName = file.replace(".json", "");
        if(fName.substr(0,1) != "_")
            allFile.push(fName);
    });
    // 写入路由
    writeRouter(allFile);
    // 读取协议文件
    readProto(moduleName);
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
            component: () => import(/* webpackChunkName: "${f}" */"@/views/${f}/view/${cName}.vue")
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

// 读取配置
function readProto(moduleName) {
    var confStr =  fs.readFileSync(path.join(__dirname, `proto/${moduleName}.json`), "utf-8");
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/command`));
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/mediator`));
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/proxy`));
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/view`));

    var conf = JSON.parse(confStr);
    writeSetting(conf, moduleName);
    for (const item of conf.list) {
        const pName = getPName(item);
        if(pName.indexOf("table_columns") != -1 && !http_type_table_columns) http_type_table_columns = pName;
        if(pName.indexOf("index") != -1 && !http_type_index) http_type_index = pName;
        if(pName.indexOf("show") != -1 && !http_type_show) http_type_show = pName;
        if(pName.indexOf("store") != -1 && !http_type_store) http_type_store = pName;
        if(pName.indexOf("update") != -1 && !http_type_update) http_type_update = pName;
        writeCommand(pName, moduleName);
    }

    writeProxy();
    writeMediator(conf.list);
    writeVue();
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

// 生成cmd
function writeCommand(pName, moduleName) {
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

// 生成meditor
function writeMediator(list) {
    // var outputFile = path.join(mediator_output_dir, cname + "Mediator.ts");
    var outputFile = path.join(__dirname, `../src/views/${moduleName}/mediator/${className}Mediator.ts`);
    fs.exists(outputFile,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "mediator", "mediator.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace(/\$\{moduleName\}/g, moduleName);
                    str = str.replace(/\$\{className\}/g, className);

                    var listNotificationInterests = "";
                    var handleNotification = "";
                    for(let p of list){
                        const pName = getPName(p);
                        listNotificationInterests += `            EventType.${pName},
`;
                        handleNotification += `            case EventType.${pName}:`

                        handleNotification += `
                break;
`;
                    }

                    str = str.replace("${listNotificationInterests}", listNotificationInterests);
                    str = str.replace("${handleNotification}", handleNotification);

                    str = str.replace(/\$\{http_type_table_columns\}/g, http_type_table_columns);
                    str = str.replace(/\$\{http_type_index\}/g, http_type_index);
                    str = str.replace(/\$\{http_type_show\}/g, http_type_show);
                    str = str.replace(/\$\{http_type_update\}/g, http_type_update);
                    str = str.replace(/\$\{http_type_store\}/g, http_type_store);

                    fs.writeFile(outputFile, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(className + "Mediator.ts 写入成功！");
                    });
                }
            });
        }
    });

}

//生成proxy
function writeProxy(){
    var outputFile_iproxy = path.join(__dirname, `../src/views/${moduleName}/proxy/I${className}Proxy.ts`);
    fs.exists(outputFile_iproxy,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "proxy", "iproxy.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{className\}/g, className);

                    fs.writeFile(outputFile_iproxy, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log("I" + className + "Proxy.ts 写入成功！");
                    });
                }
            });
        }
    });

    var outputFile_proxy = path.join(__dirname, `../src/views/${moduleName}/proxy/${className}Proxy.ts`);
    fs.exists(outputFile_proxy,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "proxy", "proxy.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{className\}/g, className);
                    str = str.replace(/\$\{http_type_table_columns\}/g, http_type_table_columns);
                    str = str.replace(/\$\{http_type_index\}/g, http_type_index);
                    str = str.replace(/\$\{http_type_show\}/g, http_type_show);
                    str = str.replace(/\$\{http_type_update\}/g, http_type_update);
                    str = str.replace(/\$\{http_type_store\}/g, http_type_store);

                    fs.writeFile(outputFile_proxy, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(className + "Proxy.ts 写入成功！");
                    });
                }
            });
        }
    });
}

// 生成vue
function writeVue(){
    var outputFile = path.join(__dirname, `../src/views/${moduleName}/view/${className}.vue`);
    fs.exists(outputFile,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "view", "vue.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{className\}/g, className);

                    fs.writeFile(outputFile, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(className + ".vue 写入成功！");
                    });
                }
            });
        }
    });

    var outputFile_header = path.join(__dirname, `../src/views/${moduleName}/view/${className}Header.vue`);
    fs.exists(outputFile_header,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "view", "vue_header.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{className\}/g, className);

                    fs.writeFile(outputFile_header, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(className + "Header.vue 写入成功！");
                    });
                }
            });
        }
    });

    var outputFile_body = path.join(__dirname, `../src/views/${moduleName}/view/${className}Body.vue`);
    fs.exists(outputFile_body,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "view", "vue_body.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{className\}/g, className);

                    fs.writeFile(outputFile_body, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(className + "Body.vue 写入成功！");
                    });
                }
            });
        }
    });

    var outputFile_dialog = path.join(__dirname, `../src/views/${moduleName}/view/${className}Dialog.vue`);
    fs.exists(outputFile_dialog,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto_template", "view", "vue_dialog.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{className\}/g, className);

                    fs.writeFile(outputFile_dialog, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(className + "Dialog.vue 写入成功！");
                    });
                }
            });
        }
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
