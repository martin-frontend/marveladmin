import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/plat_user_agent_bonus/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_admin_plat_user_agent_bonus_send_mail extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_plat_user_agent_bonus_send_mail, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result:ResponseVO){
        if(result.status === 0){
            this.sendNotification(EventType.admin_plat_user_agent_bonus_send_mail, result.data);
        }
    }
}
