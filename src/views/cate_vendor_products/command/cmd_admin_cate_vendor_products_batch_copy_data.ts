import Http from "@/core/net/Http";
import { EventType, HttpType } from "@/views/cate_vendor_products/setting";
import { ResponseVO } from "@/core/vo/ResponseVO";
import { getUrl } from "@/core/global/Functions";

export default class cmd_admin_cate_vendor_products_batch_copy_data extends puremvc.SimpleCommand{
    execute(notification: puremvc.INotification) {
        const body = notification.getBody() || {};
        const url = getUrl(HttpType.admin_cate_vendor_products_batch_copy_data, body);
        // @ts-ignore
        Http.request(body, url).then(this.response.bind(this));
    }

    private response(result:ResponseVO){
        if(result.status === 0){
            this.sendNotification(EventType.admin_cate_vendor_products_batch_copy_data, result.data);
        }
    }
}
