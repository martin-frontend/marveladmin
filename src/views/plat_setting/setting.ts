/**
 * description: 平台设定
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707117
 */
import cmd_admin_plat_setting_table_columns from "@/views/plat_setting/command/cmd_admin_plat_setting_table_columns";
import cmd_admin_plat_setting_show from "@/views/plat_setting/command/cmd_admin_plat_setting_show";
/**协议*/
export var HttpType = {
    admin_plat_setting_table_columns: "admin/plat_setting/table_columns",
    admin_plat_setting_show: "admin/plat_setting/show/{plat_id}",
};
/**事件*/
export var EventType = {
    admin_plat_setting_table_columns: "admin_plat_setting_table_columns",
    admin_plat_setting_show: "admin_plat_setting_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_setting_table_columns, cmd_admin_plat_setting_table_columns);
facade.registerCommand(HttpType.admin_plat_setting_show, cmd_admin_plat_setting_show);
