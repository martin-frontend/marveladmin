/**
 * description: 排行榜
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75271151
 */
import cmd_admin_plat_activity_rank_list_table_columns from "@/views/plat_activity_rank/command/cmd_admin_plat_activity_rank_list_table_columns";
import cmd_admin_plat_activity_rank_list_index from "@/views/plat_activity_rank/command/cmd_admin_plat_activity_rank_list_index";
import cmd_admin_plat_activity_rank_list_update from "@/views/plat_activity_rank/command/cmd_admin_plat_activity_rank_list_update";
import cmd_admin_plat_activity_rank_list_user_table_columns from "@/views/plat_activity_rank/command/cmd_admin_plat_activity_rank_list_user_table_columns";
import cmd_admin_plat_activity_rank_list_user_index from "@/views/plat_activity_rank/command/cmd_admin_plat_activity_rank_list_user_index";
/**协议*/
export var HttpType = {
    admin_plat_activity_rank_list_table_columns: "admin/plat_activity/rank_list/table_columns",
    admin_plat_activity_rank_list_index: "admin/plat_activity/rank_list/index",
    admin_plat_activity_rank_list_update: "admin/plat_activity/rank_list/update/{id}",
    admin_plat_activity_rank_list_user_table_columns: "admin/plat_activity/rank_list_user/table_columns",
    admin_plat_activity_rank_list_user_index: "admin/plat_activity/rank_list_user/index",
};
/**事件*/
export var EventType = {
    admin_plat_activity_rank_list_table_columns: "admin_plat_activity_rank_list_table_columns",
    admin_plat_activity_rank_list_index: "admin_plat_activity_rank_list_index",
    admin_plat_activity_rank_list_update: "admin_plat_activity_rank_list_update",
    admin_plat_activity_rank_list_user_table_columns: "admin_plat_activity_rank_list_user_table_columns",
    admin_plat_activity_rank_list_user_index: "admin_plat_activity_rank_list_user_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_activity_rank_list_table_columns, cmd_admin_plat_activity_rank_list_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_rank_list_index, cmd_admin_plat_activity_rank_list_index);
facade.registerCommand(HttpType.admin_plat_activity_rank_list_update, cmd_admin_plat_activity_rank_list_update);
facade.registerCommand(HttpType.admin_plat_activity_rank_list_user_table_columns, cmd_admin_plat_activity_rank_list_user_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_rank_list_user_index, cmd_admin_plat_activity_rank_list_user_index);

