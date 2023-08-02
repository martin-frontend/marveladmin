/**
 * description: 平台设定
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707117
 */
import cmd_admin_plat_users_event_record_table_columns from "@/views/plat_users_event_record/command/cmd_admin_plat_users_event_record_table_columns";
import cmd_admin_plat_users_event_record_index from "@/views/plat_users_event_record/command/cmd_admin_plat_users_event_record_index";
/**协议*/
export var HttpType = {
    admin_plat_users_event_record_table_columns: "admin/plat_users_event_record/table_columns",
    admin_plat_users_event_record_index: "admin/plat_users_event_record/index",
};
/**事件*/
export var EventType = {
    admin_plat_users_event_record_table_columns: "admin_plat_users_event_record_table_columns",
    admin_plat_users_event_record_index: "admin_plat_users_event_record_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_event_record_table_columns, cmd_admin_plat_users_event_record_table_columns);
facade.registerCommand(HttpType.admin_plat_users_event_record_index, cmd_admin_plat_users_event_record_index);

