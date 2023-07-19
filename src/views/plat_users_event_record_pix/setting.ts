/**
 * description: pix事件统计
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777985
 */
import cmd_admin_plat_users_event_record_pix_table_columns from "@/views/plat_users_event_record_pix/command/cmd_admin_plat_users_event_record_pix_table_columns";
import cmd_admin_plat_users_event_record_pix_index from "@/views/plat_users_event_record_pix/command/cmd_admin_plat_users_event_record_pix_index";
/**协议*/
export var HttpType = {
    admin_plat_users_event_record_pix_table_columns: "admin/plat_users_event_record/pix/table_columns",
    admin_plat_users_event_record_pix_index: "admin/plat_users_event_record/pix/index",
};
/**事件*/
export var EventType = {
    admin_plat_users_event_record_pix_table_columns: "admin_plat_users_event_record_pix_table_columns",
    admin_plat_users_event_record_pix_index: "admin_plat_users_event_record_pix_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_event_record_pix_table_columns, cmd_admin_plat_users_event_record_pix_table_columns);
facade.registerCommand(HttpType.admin_plat_users_event_record_pix_index, cmd_admin_plat_users_event_record_pix_index);

