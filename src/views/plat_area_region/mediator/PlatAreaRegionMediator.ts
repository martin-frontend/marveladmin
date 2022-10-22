import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_area_region/setting";
import { Message } from "element-ui";
import PlatAreaRegionProxy from "../proxy/PlatAreaRegionProxy";

interface IPlatAreaRegion extends IEventDispatcher {

}

export default class PlatAreaRegionMediator extends AbstractMediator {
    private myProxy: PlatAreaRegionProxy = <any>this.getProxy(PlatAreaRegionProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatAreaRegion = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_area_region_table_columns,
            EventType.admin_plat_area_region_index,
            EventType.admin_plat_area_region_store,
            EventType.admin_plat_area_region_update,
            EventType.admin_plat_area_region_delete,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatAreaRegionProxy = <any>this.facade.retrieveProxy(PlatAreaRegionProxy.NAME);
        const myView: IPlatAreaRegion = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_area_region_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_area_region_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_area_region_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_area_region_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_area_region_delete:
                break;

        }
    }
}
