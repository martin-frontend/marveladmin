import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/coin_receive_payment_channel/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_admin_coin_receive_payment_channel_store extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_coin_receive_payment_channel_store, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result:ResponseVO){
        if(result.status === 0){
            this.sendNotification(EventType.admin_coin_receive_payment_channel_store, result.data);
        }
    }
}
