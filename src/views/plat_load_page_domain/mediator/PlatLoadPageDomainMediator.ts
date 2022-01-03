import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_load_page_domain/setting";
import PlatLoadPageDomainProxy from "../proxy/PlatLoadPageDomainProxy";
import { Message } from "element-ui";
import { SuccessMessage } from "@/core/global/Constant";

interface IPlatLoadPageDomain extends IEventDispatcher {

}

export default class PlatLoadPageDomainMediator extends AbstractMediator {
    private myProxy: PlatLoadPageDomainProxy = <any>this.getProxy(PlatLoadPageDomainProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatLoadPageDomain = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_load_page_domain_table_columns,
            EventType.admin_plat_load_page_domain_index,
            EventType.admin_plat_load_page_domain_show,
            EventType.admin_plat_load_page_domain_store,
            EventType.admin_plat_load_page_domain_update,
            EventType.admin_plat_show,
            EventType.admin_plat_upload_load_page,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatLoadPageDomainProxy = <any>this.facade.retrieveProxy(PlatLoadPageDomainProxy.NAME);
        const myView: IPlatLoadPageDomain = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_load_page_domain_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_load_page_domain_index:
                myProxy.setTableData(body);
                myProxy.onQueryLoadPage();
                break;
            case EventType.admin_plat_load_page_domain_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_load_page_domain_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_load_page_domain_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_show:
                myProxy.setLoadPage(body.load_page_extend);
                break;
            case EventType.admin_plat_upload_load_page:
                break;
        }
    }
}
