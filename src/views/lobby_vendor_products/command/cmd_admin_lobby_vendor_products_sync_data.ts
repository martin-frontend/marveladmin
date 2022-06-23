import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/lobby_vendor_products/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_admin_lobby_vendor_products_sync_data extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_lobby_vendor_products_sync_data, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result:ResponseVO){
        if(result.status === 0){
            this.sendNotification(EventType.admin_lobby_vendor_products_sync_data, result.data);
        }
    }
}
