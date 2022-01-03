import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/gold_water/setting";
import { Message } from "element-ui";
import GoldWaterProxy from "../proxy/GoldWaterProxy";
import i18n from "@/lang";

interface IGoldWater extends IEventDispatcher {}

export default class GoldWaterMediator extends AbstractMediator {
    private myProxy: GoldWaterProxy = <any>this.getProxy(GoldWaterProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IGoldWater = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_gold_water_table_columns,
            EventType.admin_gold_water_index,
            EventType.admin_gold_water_approved,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: GoldWaterProxy = <any>this.facade.retrieveProxy(GoldWaterProxy.NAME);
        const myView: IGoldWater = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_gold_water_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_gold_water_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_gold_water_approved:
                Message.success(<any>i18n.t("successMessage.operation"));
                myProxy.onQuery();
                break;
        }
    }
}
