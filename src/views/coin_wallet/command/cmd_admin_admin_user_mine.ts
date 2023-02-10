import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/coin_wallet/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";
import SelfModel from "@/core/model/SelfModel";

export default class cmd_admin_admin_user_mine extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_admin_user_mine, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result: ResponseVO) {
        if (result.status === 0) {
            this.sendNotification(EventType.admin_admin_user_mine, result.data);
            const selfModel: SelfModel = <any>this.facade.retrieveProxy(SelfModel.NAME);
            if (result.data.sidebar) selfModel.setMineInfo(result.data);
        }
    }
}
