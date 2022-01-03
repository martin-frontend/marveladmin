import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/recharge_plats_paymethods/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_admin_recharge_plats_paymethods_index extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_recharge_plats_paymethods_index, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result:ResponseVO){
        if(result.status === 0){
            this.sendNotification(EventType.admin_recharge_plats_paymethods_index, result.data);
        }
    }
}
