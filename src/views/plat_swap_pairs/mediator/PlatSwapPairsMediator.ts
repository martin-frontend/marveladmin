import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_swap_pairs/setting";
import { Message } from "element-ui";
import PlatSwapPairsProxy from "../proxy/PlatSwapPairsProxy";

interface IPlatSwapPairs extends IEventDispatcher {}

export default class PlatSwapPairsMediator extends AbstractMediator {
    private myProxy: PlatSwapPairsProxy = <any>this.getProxy(PlatSwapPairsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatSwapPairs = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_swap_pairs_table_columns,
            EventType.admin_plat_swap_pairs_index,
            EventType.admin_plat_swap_pairs_store,
            EventType.admin_plat_swap_pairs_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatSwapPairsProxy = <any>this.facade.retrieveProxy(PlatSwapPairsProxy.NAME);
        const myView: IPlatSwapPairs = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_swap_pairs_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_swap_pairs_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_swap_pairs_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_swap_pairs_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
