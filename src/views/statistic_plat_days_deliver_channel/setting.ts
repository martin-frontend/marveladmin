/**
 * description: 投放统计
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75268194
 */
import cmd_admin_statistic_plat_days_deliver_channel_table_columns from "@/views/statistic_plat_days_deliver_channel/command/cmd_admin_statistic_plat_days_deliver_channel_table_columns";
import cmd_admin_statistic_plat_days_deliver_channel_index from "@/views/statistic_plat_days_deliver_channel/command/cmd_admin_statistic_plat_days_deliver_channel_index";
import cmd_admin_statistic_plat_days_deliver_edit_deliver_name from "@/views/statistic_plat_days_deliver_channel/command/cmd_admin_statistic_plat_days_deliver_edit_deliver_name";
/**协议*/
export var HttpType = {
    admin_statistic_plat_days_deliver_channel_table_columns: "admin/statistic_plat_days_deliver_channel/table_columns",
    admin_statistic_plat_days_deliver_channel_index: "admin/statistic_plat_days_deliver_channel/index",
    admin_statistic_plat_days_deliver_edit_deliver_name: "admin/statistic_plat_days_deliver/edit_deliver_name",
};
/**事件*/
export var EventType = {
    admin_statistic_plat_days_deliver_channel_table_columns: "admin_statistic_plat_days_deliver_channel_table_columns",
    admin_statistic_plat_days_deliver_channel_index: "admin_statistic_plat_days_deliver_channel_index",
    admin_statistic_plat_days_deliver_edit_deliver_name: "admin_statistic_plat_days_deliver_edit_deliver_name",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_statistic_plat_days_deliver_channel_table_columns,
    cmd_admin_statistic_plat_days_deliver_channel_table_columns
);
facade.registerCommand(
    HttpType.admin_statistic_plat_days_deliver_channel_index,
    cmd_admin_statistic_plat_days_deliver_channel_index
);
facade.registerCommand(
    HttpType.admin_statistic_plat_days_deliver_edit_deliver_name,
    cmd_admin_statistic_plat_days_deliver_edit_deliver_name
);
