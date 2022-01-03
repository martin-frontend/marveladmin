import AbstractMediator from "@/core/abstract/AbstractMediator";
import GlobalEventType from "@/core/global/GlobalEventType";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { HttpType } from "../setting";
interface IView extends IEventDispatcher {
}
export default class TableListMediator extends AbstractMediator {
    protected initViewData() {
        const myView: IView = this.viewComponent;
        myView.addEventListener("showUserDetail", this.showUserDetail, this);
    }

    private showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}