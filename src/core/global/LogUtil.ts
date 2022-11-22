export default class LogUtil {
    static init() {
        // @ts-ignore
        const compiletype = process.env.VUE_APP_ENV;
        if (compiletype === "production") {
            if (window.console) {
                const methods = ["log", "debug", "warn", "info", "group", "groupCollapsed"];
                for (let i = 0; i < methods.length; i++) {
                    let c: any = console;
                    c[methods[i]] = function() {};
                }
            }

            window.onerror = function(msg, url, lineNo, columnNo, error) {
                LogUtil.sendLog("page_error", { msg, url, lineNo, columnNo, error });
            };
        }

        // let a:any;
        // console.log(a.b);
    }

    static sendLog(actionName: string, actionParameter?: any) {
        let data: any = {};
        data.projectName = "athena";
        data.actionName = actionName;
        data.actionParameter = JSON.stringify(actionParameter);

        // const selfModel: SelfModel = <any>AppFacade.getInstance().retrieveProxy("SelfModel");
        // if (selfModel) {
        //     data.channelId = "";
        //     data.platformId = selfModel.userInfo.platform.toString();
        //     data.userId = selfModel.userInfo.uid.toString();
        // }

        // JBDot.send(data);
    }
}
