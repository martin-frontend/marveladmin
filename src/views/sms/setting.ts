/**
 * description: 短信厂商
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=67148
 */
import cmd_admin_sms_table_columns from "@/views/sms/command/cmd_admin_sms_table_columns";
import cmd_admin_sms_index from "@/views/sms/command/cmd_admin_sms_index";
import cmd_admin_sms_show from "@/views/sms/command/cmd_admin_sms_show";
import cmd_admin_sms_store from "@/views/sms/command/cmd_admin_sms_store";
import cmd_admin_sms_update from "@/views/sms/command/cmd_admin_sms_update";
/**协议*/
export var HttpType = {
    admin_sms_table_columns: "admin/sms/table_columns",
    admin_sms_index: "admin/sms/index",
    admin_sms_show: "admin/sms/show/{sms_id}",
    admin_sms_store: "admin/sms/store",
    admin_sms_update: "admin/sms/update/{sms_id}",
};
/**事件*/
export var EventType = {
    admin_sms_table_columns: "admin_sms_table_columns",
    admin_sms_index: "admin_sms_index",
    admin_sms_show: "admin_sms_show",
    admin_sms_store: "admin_sms_store",
    admin_sms_update: "admin_sms_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_sms_table_columns, cmd_admin_sms_table_columns);
facade.registerCommand(HttpType.admin_sms_index, cmd_admin_sms_index);
facade.registerCommand(HttpType.admin_sms_show, cmd_admin_sms_show);
facade.registerCommand(HttpType.admin_sms_store, cmd_admin_sms_store);
facade.registerCommand(HttpType.admin_sms_update, cmd_admin_sms_update);

