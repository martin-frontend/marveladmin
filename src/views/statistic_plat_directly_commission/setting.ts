/**
 * description: 直属亏损分红管理
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75270763
 */
import cmd_admin_statistic_plat_directly_commission_table_columns from "@/views/statistic_plat_directly_commission/command/cmd_admin_statistic_plat_directly_commission_table_columns";
import cmd_admin_statistic_plat_directly_commission_index from "@/views/statistic_plat_directly_commission/command/cmd_admin_statistic_plat_directly_commission_index";
import cmd_admin_statistic_plat_directly_user_commission_table_columns from "@/views/statistic_plat_directly_commission/command/cmd_admin_statistic_plat_directly_user_commission_table_columns";
import cmd_admin_statistic_plat_directly_user_commission_index from "@/views/statistic_plat_directly_commission/command/cmd_admin_statistic_plat_directly_user_commission_index";
import cmd_admin_plat_channel_table_columns from "@/views/statistic_plat_directly_commission/command/cmd_admin_plat_channel_table_columns";
import cmd_admin_plat_channel_index from "@/views/statistic_plat_directly_commission/command/cmd_admin_plat_channel_index";
import cmd_admin_plat_channel_update from "@/views/statistic_plat_directly_commission/command/cmd_admin_plat_channel_update";
import cmd_admin_plat_agent_bind_update from "@/views/statistic_plat_directly_commission/command/cmd_admin_plat_agent_bind_update";
import cmd_admin_plat_user_agent_bonus_send_mail from "@/views/statistic_plat_directly_commission/command/cmd_admin_plat_user_agent_bonus_send_mail";
import cmd_admin_plat_update from "@/views/statistic_plat_directly_commission/command/cmd_admin_plat_update";
/**协议*/
export var HttpType = {
    admin_statistic_plat_directly_commission_table_columns: "admin/statistic_plat_directly_commission/table_columns",
    admin_statistic_plat_directly_commission_index: "admin/statistic_plat_directly_commission/index",
    admin_statistic_plat_directly_user_commission_table_columns: "admin/statistic_plat_directly_user_commission/table_columns",
    admin_statistic_plat_directly_user_commission_index: "admin/statistic_plat_directly_user_commission/index",
    admin_plat_channel_table_columns: "admin/plat_channel/table_columns",
    admin_plat_channel_index: "admin/plat_channel/index",
    admin_plat_channel_update: "admin/plat_channel/update/{id}",
    admin_plat_agent_bind_update: "admin/plat_agent_bind/update/{user_id}",
    admin_plat_user_agent_bonus_send_mail: "admin_plat_user_agent_bonus_send_mail",
    admin_plat_update: "admin/plat/update/{plat_id}",
};
/**事件*/
export var EventType = {
    admin_statistic_plat_directly_commission_table_columns: "admin_statistic_plat_directly_commission_table_columns",
    admin_statistic_plat_directly_commission_index: "admin_statistic_plat_directly_commission_index",
    admin_statistic_plat_directly_user_commission_table_columns: "admin_statistic_plat_directly_user_commission_table_columns",
    admin_statistic_plat_directly_user_commission_index: "admin_statistic_plat_directly_user_commission_index",
    admin_plat_channel_table_columns: "admin_plat_channel_table_columns",
    admin_plat_channel_index: "admin_plat_channel_index",
    admin_plat_channel_update: "admin_plat_channel_update",
    admin_plat_agent_bind_update: "admin_plat_agent_bind_update",
    admin_plat_user_agent_bonus_send_mail: "admin_plat_user_agent_bonus_send_mail",
    admin_plat_update: "admin_plat_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_plat_directly_commission_table_columns, cmd_admin_statistic_plat_directly_commission_table_columns);
facade.registerCommand(HttpType.admin_statistic_plat_directly_commission_index, cmd_admin_statistic_plat_directly_commission_index);
facade.registerCommand(HttpType.admin_statistic_plat_directly_user_commission_table_columns, cmd_admin_statistic_plat_directly_user_commission_table_columns);
facade.registerCommand(HttpType.admin_statistic_plat_directly_user_commission_index, cmd_admin_statistic_plat_directly_user_commission_index);
facade.registerCommand(HttpType.admin_plat_channel_table_columns, cmd_admin_plat_channel_table_columns);
facade.registerCommand(HttpType.admin_plat_channel_index, cmd_admin_plat_channel_index);
facade.registerCommand(HttpType.admin_plat_channel_update, cmd_admin_plat_channel_update);
facade.registerCommand(HttpType.admin_plat_agent_bind_update, cmd_admin_plat_agent_bind_update);
facade.registerCommand(HttpType.admin_plat_user_agent_bonus_send_mail, cmd_admin_plat_user_agent_bonus_send_mail);
facade.registerCommand(HttpType.admin_plat_update, cmd_admin_plat_update);

