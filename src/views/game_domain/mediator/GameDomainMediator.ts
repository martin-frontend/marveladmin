import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/game_domain/setting";
import { Message } from "element-ui";
import GameDomainProxy from "../proxy/GameDomainProxy";

interface IGameDomain extends IEventDispatcher {}

export default class GameDomainMediator extends AbstractMediator {
    private myProxy: GameDomainProxy = <any>this.getProxy(GameDomainProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IGameDomain = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_game_domain_table_columns,
            EventType.admin_game_domain_index,
            EventType.admin_game_domain_show,
            EventType.admin_game_domain_store,
            EventType.admin_game_domain_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: GameDomainProxy = <any>this.facade.retrieveProxy(GameDomainProxy.NAME);
        const myView: IGameDomain = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_game_domain_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_game_domain_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_game_domain_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_game_domain_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_game_domain_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
