// 首字大写
String.prototype.firstUpperCase = function() {
    return this.replace(/^\S/, function(s) {
        return s.toUpperCase();
    })
}

var path = require("path");
var fs = require("fs");

const moduleName = process.argv[2];
if(moduleName && moduleName.substr(0,1) == "_"){
    readProto(moduleName);
}

// 读取配置
function readProto(moduleName) {
    var confStr =  fs.readFileSync(path.join(__dirname, `proto/${moduleName}.json`), "utf-8");
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/command`));
    mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/view`));

    var conf = JSON.parse(confStr);
    writeSetting(conf, moduleName);

    var tabpanelStr = "";
    var importsStr = "";
    var idx = 1;
    for (const pName of conf.list) {
        if(pName.indexOf("--") == -1){
            writeCommand(pName, moduleName);
        }else{
            var params = formatInfo(pName);
            var tabTitle = params.tabTitle;
            var tabName = params.tabName;

            tabpanelStr += `                <el-tab-pane label="${tabTitle}" name="tab${idx}">
                    <${getVueClassName(tabName)} v-if="activeName == 'tab${idx}'" />
                </el-tab-pane>\n`;
            importsStr += `import ${getVueClassName(tabName)} from "./${tabName}/view/${getVueClassName(tabName)}.vue";\n`;
            idx++;

            mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/view/${tabName}/mediator`));
            mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/view/${tabName}/view`));
            mkdirsSync(path.join(__dirname, `../src/views/${moduleName}/view/${tabName}/proxy`));

            writeTab(tabName, conf.list.slice(conf.list.indexOf(pName) + 1));
        }
    }

    var cname = getVueClassName(moduleName);
    writeVUE(cname, moduleName, conf.name, tabpanelStr, importsStr);
}

// 生成vue
function writeVUE(cname, moduleName, dialogName, tabpanelStr, importsStr) {
    // var outputFile = path.join(view_output_dir, cname + ".vue");
    var outputFile = path.join(__dirname, `../src/views/${moduleName}/view/${cname}.vue`);
    fs.exists(outputFile,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto1_template", "vue.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{vueClassName\}/g, cname);
                    str = str.replace("${dialogName}", dialogName);
                    str = str.replace("${tabpanel}", tabpanelStr);
                    str = str.replace("${imports}", importsStr);

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
function writeMediator(info,    cname, list, moduleName) {
    var params = info.substr(2).split("&");
    // var folderName = 


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
        if(p.indexOf("--") != -1){
            importStr += `// ${p}\n`; 
            httpTypeStr += `// ${p}\n`;
            eventTypeStr += `// ${p}\n`;
            regStr += `// ${p}\n`;
            continue;
        } 
        var pName = getPName(p);
        importStr += `import cmd_${pName} from "@/views/${moduleName}/command/cmd_${pName}";
`;
        httpTypeStr += `    ${pName}: "${p} ",
`;
        eventTypeStr += `    ${pName}: "_${pName}",
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

function writeTab(tabName, list) {
    var cname = getVueClassName(tabName);
    var outputFileMediator = path.join(__dirname, `../src/views/${moduleName}/view/${tabName}/mediator/${cname}Mediator.ts`);
    fs.exists(outputFileMediator,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto1_template", "tab-mediator.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败: tab-mediator.template");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{ClassName\}/g, cname);

                    var listNotificationInterests = [];
                    var handleNotification = [];
                    for(let p of list){
                        if(p.indexOf("--") == -1){
                            const pName = getPName(p);
                            listNotificationInterests.push(`            EventType.${pName},`);
                            handleNotification.push( `            case EventType.${pName}:
                    break;`);
                        }else break;
                    }

                    str = str.replace("${listNotificationInterests}", listNotificationInterests.join("\n"));
                    str = str.replace("${handleNotification}", handleNotification.join("\n"));

                    fs.writeFile(outputFileMediator, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(cname + "Mediator.ts 写入成功！");
                    });
                }
            });
        }
    });
    var outputFileView = path.join(__dirname, `../src/views/${moduleName}/view/${tabName}/view/${cname}.vue`);
    fs.exists(outputFileView,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto1_template", "tab-view.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败: tab-view.template");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{ClassName\}/g, cname);

                    fs.writeFile(outputFileView, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(cname + ".vue 写入成功！");
                    });
                }
            });
        }
    });
    var outputFileProxy = path.join(__dirname, `../src/views/${moduleName}/view/${tabName}/proxy/${cname}Proxy.ts`);
    fs.exists(outputFileProxy,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto1_template", "tab-proxy.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败: tab-proxy.template");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{ClassName\}/g, cname);

                    fs.writeFile(outputFileProxy, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(cname + "Proxy.ts 写入成功！");
                    });
                }
            });
        }
    });
    var outputFileIProxy = path.join(__dirname, `../src/views/${moduleName}/view/${tabName}/proxy/I${cname}Proxy.ts`);
    fs.exists(outputFileIProxy,exists => {
        if(!exists){
            fs.readFile(path.join(__dirname, "proto1_template", "tab-iproxy.template"), "utf-8", function(err, data) {
                if (err) {
                    console.log("读取模板失败: tab-iproxy.template");
                } else {
                    var str = data.replace("${moduleName}", moduleName);
                    str = str.replace(/\$\{ClassName\}/g, cname);

                    fs.writeFile(outputFileIProxy, str, function(err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log("I" + cname + "Proxy.ts 写入成功！");
                    });
                }
            });
        }
    });
}




function formatInfo(info) {
    var params = info.substr(2).split("&");
    return {
        tabTitle: params[0],
        tabName: "tab_" + params[1]
    }
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

