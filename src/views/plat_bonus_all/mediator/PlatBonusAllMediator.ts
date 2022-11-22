import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_bonus_all/setting";
import { Message } from "element-ui";
import PlatBonusAllProxy from "../proxy/PlatBonusAllProxy";
import PlatBonusAllStockProxy from "../proxy/PlatBonusAllStockProxy";
import PlatAgentPromotionModelProxy from "../proxy/PlatAgentPromotionModelProxy";
import i18n from "@/lang";

interface IPlatBonusAll extends IEventDispatcher {}

export default class PlatBonusAllMediator extends AbstractMediator {
    private myProxy: PlatBonusAllProxy = <any>this.getProxy(PlatBonusAllProxy);
    private bonusAllStockModelProxy: PlatBonusAllStockProxy = <any>this.getProxy(PlatBonusAllStockProxy);
    private agentPromotionModelProx: PlatAgentPromotionModelProxy = <any>this.getProxy(PlatAgentPromotionModelProxy);

    onRegister() {
        this.myProxy.enter();
        this.agentPromotionModelProx.enter();
    }

    onRemove() {
        this.myProxy.leave();
        this.agentPromotionModelProx.leave();
    }

    protected initViewData() {
        const myView: IPlatBonusAll = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_bonus_all_stock_set_table_columns,
            EventType.admin_plat_bonus_all_stock_set_index,
            EventType.admin_plat_bonus_all_stock_set_show,
            EventType.admin_plat_bonus_all_stock_set_update,
            EventType.admin_plat_bonus_all_stock_table_columns,
            EventType.admin_plat_bonus_all_stock_index,
            EventType.admin_plat_update,
            EventType.admin_plat_show,
            EventType.admin_resource_upload,
            EventType.admin_plat_agent_promotion_model_table_columns,
            EventType.admin_plat_agent_promotion_model_show,
            EventType.admin_plat_bonus_all_stock_model_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatBonusAllProxy = <any>this.facade.retrieveProxy(PlatBonusAllProxy.NAME);
        const bonusAllStockModelProxy: PlatBonusAllStockProxy = <any>(
            this.facade.retrieveProxy(PlatBonusAllStockProxy.NAME)
        );
        const agentPromotionModelProx: PlatAgentPromotionModelProxy = <any>(
            this.facade.retrieveProxy(PlatAgentPromotionModelProxy.NAME)
        );

        const myView: IPlatBonusAll = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_bonus_all_stock_set_table_columns:
                myProxy.receive_admin_plat_bonus_all_stock_set_table_columns(body);
                break;
            case EventType.admin_plat_bonus_all_stock_set_index:
                myProxy.receive_admin_plat_bonus_all_stock_set_index(body);
                break;
            case EventType.admin_plat_bonus_all_stock_set_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.admin_plat_bonus_all_stock_set_index();
                myProxy.admin_plat_show();
                break;
            case EventType.admin_plat_bonus_all_stock_table_columns:
                agentPromotionModelProx.receive_admin_plat_bonus_all_stock_table_columns(body);
                break;
            case EventType.admin_plat_bonus_all_stock_index:
                agentPromotionModelProx.receive_admin_plat_bonus_all_stock_index(body);
                break;
            case EventType.admin_plat_update:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideDialog();
                bonusAllStockModelProxy.hideDialog();
                myProxy.admin_plat_show();
                break;
            case EventType.admin_plat_show:
                myProxy.receive_admin_plat_show(body);
                if (body.all_bonus_config) {
                    bonusAllStockModelProxy.receive_admin_plat_show(body);
                }
                break;
            case EventType.admin_resource_upload:
                myProxy.onBannerUploadSuccess(body);
                break;
            case EventType.admin_plat_agent_promotion_model_table_columns:
                agentPromotionModelProx.receive_admin_plat_agent_promotion_model_table_columns(body);
                break;
            case EventType.admin_plat_bonus_all_stock_model_show:
                myProxy.receive_admin_plat_bonus_all_stock_model_show(body);
                if (!myProxy.tableData.detail.all_bonus_model_id) {
                    bonusAllStockModelProxy.setOriginalTemplateData(body);
                }
                break;
        }
    }
}
