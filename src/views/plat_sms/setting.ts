/**
 * description: 短信通道
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=67152
 */
import cmd_admin_plat_sms_table_columns from "@/views/plat_sms/command/cmd_admin_plat_sms_table_columns";
import cmd_admin_plat_sms_index from "@/views/plat_sms/command/cmd_admin_plat_sms_index";
import cmd_admin_plat_sms_show from "@/views/plat_sms/command/cmd_admin_plat_sms_show";
import cmd_admin_plat_sms_store from "@/views/plat_sms/command/cmd_admin_plat_sms_store";
import cmd_admin_plat_sms_update from "@/views/plat_sms/command/cmd_admin_plat_sms_update";
import cmd_admin_plat_sms_send from "@/views/plat_sms/command/cmd_admin_plat_sms_send";
import cmd_admin_plat_sms_getBalance from "@/views/plat_sms/command/cmd_admin_plat_sms_getBalance";
/**协议*/
export var HttpType = {
    admin_plat_sms_table_columns: "admin/plat_sms/table_columns",
    admin_plat_sms_index: "admin/plat_sms/index",
    admin_plat_sms_show: "admin/plat_sms/show/{id}",
    admin_plat_sms_store: "admin/plat_sms/store",
    admin_plat_sms_update: "admin/plat_sms/update/{id}",
    admin_plat_sms_send: "admin/plat_sms/send/{id}",
    admin_plat_sms_getBalance: "admin/plat_sms/getBalance/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_sms_table_columns: "admin_plat_sms_table_columns",
    admin_plat_sms_index: "admin_plat_sms_index",
    admin_plat_sms_show: "admin_plat_sms_show",
    admin_plat_sms_store: "admin_plat_sms_store",
    admin_plat_sms_update: "admin_plat_sms_update",
    admin_plat_sms_send: "admin_plat_sms_send",
    admin_plat_sms_getBalance: "admin_plat_sms_getBalance",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_sms_table_columns, cmd_admin_plat_sms_table_columns);
facade.registerCommand(HttpType.admin_plat_sms_index, cmd_admin_plat_sms_index);
facade.registerCommand(HttpType.admin_plat_sms_show, cmd_admin_plat_sms_show);
facade.registerCommand(HttpType.admin_plat_sms_store, cmd_admin_plat_sms_store);
facade.registerCommand(HttpType.admin_plat_sms_update, cmd_admin_plat_sms_update);
facade.registerCommand(HttpType.admin_plat_sms_send, cmd_admin_plat_sms_send);
facade.registerCommand(HttpType.admin_plat_sms_getBalance, cmd_admin_plat_sms_getBalance);
