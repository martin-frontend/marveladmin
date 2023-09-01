import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_activity_statistic_ball/setting";
import { Message } from "element-ui";
import PlatActivityStatisticBallProxy from "../proxy/PlatActivityStatisticBallProxy";

interface IPlatActivityStatisticBall extends IEventDispatcher {}

export default class PlatActivityStatisticBallMediator extends AbstractMediator {
    private myProxy: PlatActivityStatisticBallProxy = <any>this.getProxy(PlatActivityStatisticBallProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatActivityStatisticBall = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_activity_statistic_ball_table_columns,
            EventType.admin_plat_activity_statistic_ball_index,
            EventType.admin_plat_activity_statistic_ball_user_table_columns,
            EventType.admin_plat_activity_statistic_ball_user_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatActivityStatisticBallProxy = <any>(
            this.facade.retrieveProxy(PlatActivityStatisticBallProxy.NAME)
        );
        const myView: IPlatActivityStatisticBall = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_activity_statistic_ball_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_activity_statistic_ball_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_plat_activity_statistic_ball_user_table_columns:
                myProxy.setTableColumns_ball_user(body);
                break;
            case EventType.admin_plat_activity_statistic_ball_user_index:
                if (myProxy.tableData_ball_user.isExportExcel) {
                    myProxy.exportExcel_ball_user(body);
                } else {
                    myProxy.setTableData_ball_user(body);
                }
                break;
        }
    }
}
