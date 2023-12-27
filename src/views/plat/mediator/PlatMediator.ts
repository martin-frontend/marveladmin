import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat/setting";
import { Message } from "element-ui";
import PlatProxy from "../proxy/PlatProxy";
import i18n from "@/lang";
interface IPlat extends IEventDispatcher { }

export default class PlatMediator extends AbstractMediator {
    private myProxy: PlatProxy = <any>this.getProxy(PlatProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlat = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_table_columns,
            EventType.admin_plat_index,
            EventType.admin_plat_store,
            EventType.admin_plat_show,
            EventType.admin_plat_update,
            EventType.admin_plat_agent_promotion_model_index,
            EventType.admin_plat_bonus_all_stock_model_index,
            EventType.admin_plat_clear_cache,
            EventType.admin_plat_clear_stake_bonus,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatProxy = <any>this.facade.retrieveProxy(PlatProxy.NAME);
        const myView: IPlat = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_update:
            case EventType.admin_plat_clear_stake_bonus:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.hideVipModelDialog();
                myProxy.hideBackwaterModelDialog();
                myProxy.hidePromotionModelDialog();
                myProxy.hidePromotionDiscountDialog();
                myProxy.hideAllBonusModelDialog();
                myProxy.hideCommissionDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_agent_promotion_model_index:
                myProxy.setPromotionModel(body.list);
                break;
            case EventType.admin_plat_bonus_all_stock_model_index:
                myProxy.setAllBonusModel(body.list);
                break;
            case EventType.admin_plat_clear_cache:
                Message.success(<any>LangUtil("操作成功"));
                break;
        }
    }
}
