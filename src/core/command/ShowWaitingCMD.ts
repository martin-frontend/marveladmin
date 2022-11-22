import { Loading } from "element-ui";
export default class ShowWaitingCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        // Loading是一个单例，所以多次赋值结果一样
        // @ts-ignore
        window["g_loading"] = Loading.service({});
    }
}
