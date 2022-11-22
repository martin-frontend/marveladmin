import { Message, MessageBox } from "element-ui";
import GlobalEventType from "@/core/global/GlobalEventType";
import router from "@/router";
import SelfModel from "../model/SelfModel";
export default class RequestErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        this.sendNotification(GlobalEventType.HIDE_WAITING);
        const { result } = notification.getBody();
        // 所有账号异常的错误，都需要跳转到登录页面
        const arrAccountErrorCode = [10102, 10103, 10104, 10124, 10125, 10126, 10127, 10128, 10129, 10130];
        if (arrAccountErrorCode.includes(result.status)) {
            // @ts-ignore
            if (router.history.current.path != "/login") {
                MessageBox(result.msg)
                    .catch(() => {})
                    .finally(() => {
                        // router.replace("/login");
                        window.localStorage.clear();
                        router.push(`/login`);
                        location.reload();
                    });
            }
        } else {
            Message.warning(result.msg);
        }
    }
}
