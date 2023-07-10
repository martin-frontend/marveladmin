import AbstractProxy from "@/core/abstract/AbstractProxy";
import { HttpType } from "@/views/_user_detail/setting";
import ITabEasybetProxy from "./ITabEasybetProxy";
import TabUserInfoProxy from "@/views/_user_detail/view/tab_user_info/proxy/TabUserInfoProxy";

export default class TabEasybetProxy extends TabUserInfoProxy {
    static NAME = "TabEasybetProxy";
    /**进入页面时调用 */
    enter() {
        super.enter();
    }

    /**离开页面时调用 */
    leave() {
        super.leave();
    }

    dialogData = {
        bShow: false,
        form: <any>{
            user_id: 0, //用户id
            user_level: -1, //当前的等级
            level_type: "",// 等级的类型 EASY_BET, CRICKET
            update_type:1, // 1：玩家个人 2：自己以及下线成员
        },
        optionData:<any>[],
        org_option_data:<any>{},
    };

    showDialog() {
        this.dialogData.bShow = true;
       
    }

    onUpdate() {
        this.dialogData.form.user_id = this.userInfo.user_id;
        this.sendNotification(HttpType.admin_plat_user_update_user_level, { ...this.dialogData.form });
    }

    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            user_id: 0, //用户id
            user_level: -1, //当前的等级
            level_type: 1,// 等级的类型 EASY_BET, CRICKET
            update_type:1, // 1：玩家个人 2：自己以及下线成员
        });
    }
}
