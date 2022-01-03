import GlobalEventType from "@/core/global/GlobalEventType";
import GlobalVar from "../global/GlobalVar";
export default class RequestStartCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody();
        if (!body.data.hideLoading) {
            GlobalVar.net_status.loading = true;
            Object.assign(GlobalVar.net_status.request, body);
        }
    }
}
