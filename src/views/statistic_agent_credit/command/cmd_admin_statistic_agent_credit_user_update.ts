import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/statistic_agent_credit/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_admin_statistic_agent_credit_user_update extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_statistic_agent_credit_user_update, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result:ResponseVO){
        if(result.status === 0){
            this.sendNotification(EventType.admin_statistic_agent_credit_user_update, result.data);
        }
    }
}
