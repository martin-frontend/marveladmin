import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/core/global/GlobalSetting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";
import SelfModel from "../model/SelfModel";
import GlobalVar from "../global/GlobalVar";

export default class cmd_admin_index_message_show extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_index_message_show, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result: ResponseVO) {
        if (result.status === 0) {
            const facade = puremvc.Facade.getInstance();
            facade.sendNotification(EventType.admin_index_message_show, result.data);
            const selfModel: SelfModel = <any>facade.retrieveProxy(SelfModel.NAME);
            selfModel.setMessageInfo(result.data);
        }
    }
}
