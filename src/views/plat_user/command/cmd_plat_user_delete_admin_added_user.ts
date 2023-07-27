import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/plat_user/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_plat_user_delete_admin_added_user extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.plat_user_delete_admin_added_user, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result:ResponseVO){
        if(result.status === 0){
            this.sendNotification(EventType.plat_user_delete_admin_added_user, result.data);
        }
    }
}
