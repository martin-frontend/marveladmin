import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_block_coins_log/setting";
import { Message } from "element-ui";
import PlatBlockCoinsLogProxy from "../proxy/PlatBlockCoinsLogProxy";

interface IPlatBlockCoinsLog extends IEventDispatcher {
    
}

export default class PlatBlockCoinsLogMediator extends AbstractMediator {
    private myProxy: PlatBlockCoinsLogProxy = <any>this.getProxy(PlatBlockCoinsLogProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatBlockCoinsLog = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_block_coins_log_table_columns,
            EventType.admin_plat_block_coins_log_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatBlockCoinsLogProxy = <any>this.facade.retrieveProxy(PlatBlockCoinsLogProxy.NAME);
        const myView: IPlatBlockCoinsLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_block_coins_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_block_coins_log_index:
                myProxy.setTableData(body);
                break;

        }
    }
}
