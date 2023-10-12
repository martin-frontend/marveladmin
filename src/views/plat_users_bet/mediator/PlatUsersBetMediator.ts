import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_bet/setting";
import PlatUsersBetProxy from "../proxy/PlatUsersBetProxy";
import { Message } from "element-ui";
import GlobalEventType from "@/core/global/GlobalEventType";
import { MessageBox } from "element-ui";
import LangUtil from "@/core/global/LangUtil";
interface IPlatUsersBet extends IEventDispatcher { }

export default class PlatUsersBetMediator extends AbstractMediator {
    private myProxy: PlatUsersBetProxy = <any>this.getProxy(PlatUsersBetProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersBet = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_bet_table_columns,
            EventType.admin_plat_users_bet_index,
            EventType.admin_plat_users_bet_show,
            EventType.admin_plat_users_bet_show_url,
            EventType.admin_plat_users_bet_credit_log_table_columns,
            EventType.admin_plat_users_bet_credit_log_index,
            EventType.admin_plat_users_bet_vendors,
            GlobalEventType.IO_ERROR,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersBetProxy = <any>this.facade.retrieveProxy(PlatUsersBetProxy.NAME);
        const myView: IPlatUsersBet = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_bet_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_bet_index:
                myProxy.exportData.isSearch = true;
                if (myProxy.exportData.stop) {
                    myProxy.exportData.stop = false;
                } else {
                    if (myProxy.exportData.isExportExcel) {
                        myProxy.onSaveExportData(body);
                    } else {
                        myProxy.setTableData(body);
                    }
                }
                break;
            case EventType.admin_plat_users_bet_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_users_bet_show_url:
                {
                    if (myProxy.dialogData.trun_bet_detail_text == 1 || myProxy.dialogData.trun_bet_detail_text == "1") {
                        let json;
                        try {
                            json = JSON.parse(body);
                            if (!json) {
                                throw "aaa";
                            }
                            console.log("---", json);
                            if (json.status_code == 200) {
                                if (json && json.data && json.data.html) {
                                    const winHandler: any = window.open("", "_blank");
                                    winHandler.document.body.innerHTML = json.data.html;
                                } else {
                                    throw "bbb";
                                }
                            } else {
                                Message.error(json.message);
                            }
                        } catch (d) {
                            window.open(body);
                        }
                    } else {
                        window.open(body);
                    }
                }
                break;
            case EventType.admin_plat_users_bet_credit_log_table_columns:
                myProxy.setCreditLogTableColumns(body);
                break;
            case EventType.admin_plat_users_bet_credit_log_index:
                myProxy.setCreditLogList(body);
                break;
            case EventType.admin_plat_users_bet_vendors:
                myProxy.showStatisticDialog(body);
                break;
            case GlobalEventType.IO_ERROR:
                MessageBox.confirm(<string>LangUtil("网络错误，是否继续下载？"), <string>LangUtil("提示"), {
                    confirmButtonText: <string>LangUtil("继续下载"),
                    cancelButtonText: <string>LangUtil("取消下载"),
                    type: "warning",
                }).then(() => {
                    this.myProxy.onQueryExportData();
                }).catch(() => {
                    this.myProxy.exportData.stop = true;
                    this.myProxy.resetExportData(0);
                    this.myProxy.exportData.isSearch = true;
                });
                break;
        }
    }
}
