import AbstractProxy from "@/core/abstract/AbstractProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabTeamProxy, { MemberTree } from "./ITabTeamProxy";

export default class TabTeamProxy extends AbstractProxy implements ITabTeamProxy {
    static NAME = "TabTeamProxy";
    /**进入页面时调用 */
    enter() {
        this.getRoot();
    }

    /**离开页面时调用 */
    leave() {}

    /**团队树 */
    private _memberTree: MemberTree = new MemberTree();
    get memberTree() {
        return this._memberTree;
    }
    /**取得根节点 */
    getRoot() {
        this.sendNotification(HttpType.admin_plat_user_agent_bind_show, { user_id: getPageSetting().user_id });
    }
    /**设置根节点 */
    setRoot(data: any) {
        this.memberTree.setRoot(data);
        this.getMoreMember({ invite_user_id: getPageSetting().user_id, page_count: 1 });
    }
    /**取得更多成员 */
    getMoreMember({ invite_user_id, page_count }: { [key: string]: number }) {
        this.sendNotification(HttpType.admin_plat_user_agent_bind_index, {
            invite_user_id: invite_user_id,
            page_count: page_count,
            page_size: 10,
        });
    }
    /**增加节点 */
    addTree(data: any) {
        this._memberTree.addTree(data);
    }
    /**打开用户详情页 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
