import GlobalVar from "@/core/global/GlobalVar";
import GlobalEventType from "@/core/global/GlobalEventType";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getFormWithObject } from "@/core/global/Functions";

export default class Http {
    static request(data: any, url: string, callback?: any): Promise<any> {
        puremvc.Facade.getInstance().sendNotification(GlobalEventType.REQUEST_START, { url, data });

        data.device = GlobalVar.device;
        data.lang = GlobalVar.lang;

        if (GlobalVar.admin_user_id) {
            data.login_admin_user_id = GlobalVar.admin_user_id;
            data.token = GlobalVar.token;
        }

        return new Promise((resolve, reject) => {
            const formData = getFormWithObject(data);

            console.group("http send >>> " + url);
            const jsonData: any = {};
            formData.forEach((value, key) => (jsonData[key] = value));
            console.log(jsonData);
            console.groupEnd();

            const ajax = new XMLHttpRequest();
            ajax.open("POST", GlobalVar.host + url);
            ajax.send(formData);
            ajax.onreadystatechange = function(e) {
                const facde = puremvc.Facade.getInstance();
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        const result: ResponseVO = JSON.parse(this.response);
                        GlobalVar.response_time = result.extend.microtime >> 0;
                        if (callback) callback(result);

                        console.group("http response >>> " + url);
                        console.log(JSON.parse(JSON.stringify(result)));
                        console.groupEnd();

                        if (result.status == 0) {
                            resolve(result);
                        } else {
                            // reject(e);
                            facde.sendNotification(GlobalEventType.REQUEST_ERROR, { url, data, result });
                        }

                        if (!GlobalVar.api_version) GlobalVar.api_version = result.extend.version;
                        if (GlobalVar.api_version && GlobalVar.api_version != result.extend.version) {
                            // facde.sendNotification(GlobalEventType.API_VERSION_UPDATE, result.extend.version);
                        }
                    } else {
                        reject(e);
                        facde.sendNotification(GlobalEventType.IO_ERROR, { url, data, e });
                    }
                    facde.sendNotification(GlobalEventType.REQUEST_END, { url, data });
                }
            };
        });
    }
}
