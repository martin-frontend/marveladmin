import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/statistic_plat_days_deliver_channel/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_admin_statistic_plat_days_deliver_edit_deliver_name extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_statistic_plat_days_deliver_edit_deliver_name, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result: ResponseVO) {
        if (result.status === 0) {
            this.sendNotification(EventType.admin_statistic_plat_days_deliver_edit_deliver_name, result.data);
        }
    }
}
