/**
 * description: 区号管理
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=36766261
 */
import cmd_admin_system_sms_area_code_table_columns from "@/views/system_sms_area_code/command/cmd_admin_system_sms_area_code_table_columns";
import cmd_admin_system_sms_area_code_index from "@/views/system_sms_area_code/command/cmd_admin_system_sms_area_code_index";
import cmd_admin_system_sms_area_code_store from "@/views/system_sms_area_code/command/cmd_admin_system_sms_area_code_store";
import cmd_admin_system_sms_area_code_update from "@/views/system_sms_area_code/command/cmd_admin_system_sms_area_code_update";
/**协议*/
export var HttpType = {
    admin_system_sms_area_code_table_columns: "admin/system_sms_area_code/table_columns",
    admin_system_sms_area_code_index: "admin/system_sms_area_code/index",
    admin_system_sms_area_code_store: "admin/system_sms_area_code/store",
    admin_system_sms_area_code_update: "admin/system_sms_area_code/update/{id}",
};
/**事件*/
export var EventType = {
    admin_system_sms_area_code_table_columns: "admin_system_sms_area_code_table_columns",
    admin_system_sms_area_code_index: "admin_system_sms_area_code_index",
    admin_system_sms_area_code_store: "admin_system_sms_area_code_store",
    admin_system_sms_area_code_update: "admin_system_sms_area_code_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_system_sms_area_code_table_columns, cmd_admin_system_sms_area_code_table_columns);
facade.registerCommand(HttpType.admin_system_sms_area_code_index, cmd_admin_system_sms_area_code_index);
facade.registerCommand(HttpType.admin_system_sms_area_code_store, cmd_admin_system_sms_area_code_store);
facade.registerCommand(HttpType.admin_system_sms_area_code_update, cmd_admin_system_sms_area_code_update);

