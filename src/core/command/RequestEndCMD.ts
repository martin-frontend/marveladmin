import GlobalEventType from "@/core/global/GlobalEventType";
import GlobalVar from "../global/GlobalVar";
import Vue from "vue";

export default class RequestEndCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody();
        if (!body.data.hideLoading) {
            Vue.nextTick(() => {
                GlobalVar.net_status.loading = false;
            });
        }
    }
}
