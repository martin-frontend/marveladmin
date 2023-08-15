import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/user_tag/setting";
import { Message } from "element-ui";
import UserTagProxy from "../proxy/UserTagProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

interface IUserTag extends IEventDispatcher {}

export default class UserTagMediator extends AbstractMediator {
    private myProxy: UserTagProxy = <any>this.getProxy(UserTagProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IUserTag = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_user_tag_table_columns,
            EventType.admin_user_tag_index,
            EventType.admin_user_tag_store,
            EventType.admin_user_tag_show,
            EventType.admin_user_tag_update,
            EventType.admin_user_tag_delete,
            EventType.admin_user_tag_show_users,
            EventType.admin_plat_user_table_columns,
            GlobalEventType.REFRESH_PAGE,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: UserTagProxy = <any>this.facade.retrieveProxy(UserTagProxy.NAME);
        const myView: IUserTag = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_user_tag_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_user_tag_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_user_tag_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_user_tag_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_user_tag_update:
            case EventType.admin_user_tag_delete:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_user_tag_show_users:
                myProxy.setUsersData(body);
                break;
            case EventType.admin_plat_user_table_columns:
                myProxy.setUsersTableColumn(body);
                break;
            case GlobalEventType.REFRESH_PAGE:
                myProxy.onQuery();
                myProxy.onUsersQuery();
        }
    }
}
