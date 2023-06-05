import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/plat_users_vendor_gold_log_alarm/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_admin_plat_users_vendor_gold_log_alarm_update extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_plat_users_vendor_gold_log_alarm_update, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result:ResponseVO){
        if(result.status === 0){
            this.sendNotification(EventType.admin_plat_users_vendor_gold_log_alarm_update, result.data);
        }
    }
}
