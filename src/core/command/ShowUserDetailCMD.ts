import { page1, page2 } from "@/views/_user_detail/PageSetting";
import { checkUnique, unique } from "@/core/global/Permission";
import Vue from "vue";

export default class ShowUserDetailCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        if (checkUnique(unique.plat_user_show)) {
            const page = page1.bShow ? page2 : page1;
            page.user_id = notification.getBody();
            page.bShow = false;

            Vue.nextTick(() => {
                page.bShow = true;
            });
        }
    }
}
