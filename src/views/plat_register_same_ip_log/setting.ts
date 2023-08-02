/**
 * description: 同IP注册用户风控
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=36766215#id-%E5%85%AC%E5%91%8A%E7%AE%A1%E7%90%86-%E5%90%8CIP%E6%B3%A8%E5%86%8C%E7%94%A8%E6%88%B7%E9%A3%8E%E6%8E%A7%E8%A1%A8%E5%A4%B4%E4%BF%A1%E6%81%AF
 */
import cmd_admin_plat_register_same_ip_log_table_columns from "@/views/plat_register_same_ip_log/command/cmd_admin_plat_register_same_ip_log_table_columns";
import cmd_admin_plat_register_same_ip_log_index from "@/views/plat_register_same_ip_log/command/cmd_admin_plat_register_same_ip_log_index";
import cmd_admin_plat_register_same_ip_log_update from "@/views/plat_register_same_ip_log/command/cmd_admin_plat_register_same_ip_log_update";
import cmd_admin_plat_register_same_ip_log_show from "@/views/plat_register_same_ip_log/command/cmd_admin_plat_register_same_ip_log_show";
/**协议*/
export var HttpType = {
    admin_plat_register_same_ip_log_table_columns: "admin/plat_register_same_ip_log/table_columns",
    admin_plat_register_same_ip_log_index: "admin/plat_register_same_ip_log/index",
    admin_plat_register_same_ip_log_update: "admin/plat_register_same_ip_log/update/{id}",
    admin_plat_register_same_ip_log_show: "admin/plat_register_same_ip_log/show/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_register_same_ip_log_table_columns: "admin_plat_register_same_ip_log_table_columns",
    admin_plat_register_same_ip_log_index: "admin_plat_register_same_ip_log_index",
    admin_plat_register_same_ip_log_update: "admin_plat_register_same_ip_log_update",
    admin_plat_register_same_ip_log_show: "admin_plat_register_same_ip_log_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_register_same_ip_log_table_columns, cmd_admin_plat_register_same_ip_log_table_columns);
facade.registerCommand(HttpType.admin_plat_register_same_ip_log_index, cmd_admin_plat_register_same_ip_log_index);
facade.registerCommand(HttpType.admin_plat_register_same_ip_log_update, cmd_admin_plat_register_same_ip_log_update);
facade.registerCommand(HttpType.admin_plat_register_same_ip_log_show, cmd_admin_plat_register_same_ip_log_show);

