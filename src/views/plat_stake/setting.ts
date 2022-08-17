/**
 * description: 平台质押分红
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766406
 */
import cmd_admin_plat_stake_log_table_columns from "@/views/plat_stake/command/cmd_admin_plat_stake_log_table_columns";
import cmd_admin_plat_stake_log_index from "@/views/plat_stake/command/cmd_admin_plat_stake_log_index";
import cmd_admin_plat_stake_user_log_table_columns from "@/views/plat_stake/command/cmd_admin_plat_stake_user_log_table_columns";
import cmd_admin_plat_stake_user_log_index from "@/views/plat_stake/command/cmd_admin_plat_stake_user_log_index";
import cmd_admin_plat_stake_pool_log_table_columns from "@/views/plat_stake/command/cmd_admin_plat_stake_pool_log_table_columns";
import cmd_admin_plat_stake_pool_log_index from "@/views/plat_stake/command/cmd_admin_plat_stake_pool_log_index";
import cmd_admin_plat_stake_pool_log_update from "@/views/plat_stake/command/cmd_admin_plat_stake_pool_log_update";
import cmd_admin_plat_stake_bonus_log_table_columns from "@/views/plat_stake/command/cmd_admin_plat_stake_bonus_log_table_columns";
import cmd_admin_plat_stake_bonus_log_index from "@/views/plat_stake/command/cmd_admin_plat_stake_bonus_log_index";
import cmd_admin_plat_stake_bonus_user_log_table_columns from "@/views/plat_stake/command/cmd_admin_plat_stake_bonus_user_log_table_columns";
import cmd_admin_plat_stake_bonus_user_log_index from "@/views/plat_stake/command/cmd_admin_plat_stake_bonus_user_log_index";
import cmd_admin_plat_show from "@/views/plat_stake/command/cmd_admin_plat_show";
import cmd_admin_plat_update from "@/views/plat_stake/command/cmd_admin_plat_update";
import cmd_admin_plat_stake_config_update from "@/views/plat_stake/command/cmd_admin_plat_stake_config_update";
/**协议*/
export var HttpType = {
    admin_plat_stake_log_table_columns: "admin/plat_stake_log/table_columns",
    admin_plat_stake_log_index: "admin/plat_stake_log/index",
    admin_plat_stake_user_log_table_columns: "admin/plat_stake_user_log/table_columns",
    admin_plat_stake_user_log_index: "admin/plat_stake_user_log/index",
    admin_plat_stake_pool_log_table_columns: "admin/plat_stake_pool_log/table_columns",
    admin_plat_stake_pool_log_index: "admin/plat_stake_pool_log/index",
    admin_plat_stake_pool_log_update: "admin/plat_stake_pool_log/update/{id}",
    admin_plat_stake_bonus_log_table_columns: "admin/plat_stake_bonus_log/table_columns",
    admin_plat_stake_bonus_log_index: "admin/plat_stake_bonus_log/index",
    admin_plat_stake_bonus_user_log_table_columns: "admin/plat_stake_bonus_user_log/table_columns",
    admin_plat_stake_bonus_user_log_index: "admin/plat_stake_bonus_user_log/index",
    admin_plat_show: "admin/plat/show/{plat_id}",
    admin_plat_update: "admin/plat/update/{plat_id}",
    admin_plat_stake_config_update: "admin/plat_stake_config/update/{plat_id}",
};
/**事件*/
export var EventType = {
    admin_plat_stake_log_table_columns: "admin_plat_stake_log_table_columns",
    admin_plat_stake_log_index: "admin_plat_stake_log_index",
    admin_plat_stake_user_log_table_columns: "admin_plat_stake_user_log_table_columns",
    admin_plat_stake_user_log_index: "admin_plat_stake_user_log_index",
    admin_plat_stake_pool_log_table_columns: "admin_plat_stake_pool_log_table_columns",
    admin_plat_stake_pool_log_index: "admin_plat_stake_pool_log_index",
    admin_plat_stake_pool_log_update: "admin_plat_stake_pool_log_update",
    admin_plat_stake_bonus_log_table_columns: "admin_plat_stake_bonus_log_table_columns",
    admin_plat_stake_bonus_log_index: "admin_plat_stake_bonus_log_index",
    admin_plat_stake_bonus_user_log_table_columns: "admin_plat_stake_bonus_user_log_table_columns",
    admin_plat_stake_bonus_user_log_index: "admin_plat_stake_bonus_user_log_index",
    admin_plat_show: "admin_plat_show",
    admin_plat_update: "admin_plat_update",
    admin_plat_stake_config_update: "admin_plat_stake_config_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_stake_log_table_columns, cmd_admin_plat_stake_log_table_columns);
facade.registerCommand(HttpType.admin_plat_stake_log_index, cmd_admin_plat_stake_log_index);
facade.registerCommand(HttpType.admin_plat_stake_user_log_table_columns, cmd_admin_plat_stake_user_log_table_columns);
facade.registerCommand(HttpType.admin_plat_stake_user_log_index, cmd_admin_plat_stake_user_log_index);
facade.registerCommand(HttpType.admin_plat_stake_pool_log_table_columns, cmd_admin_plat_stake_pool_log_table_columns);
facade.registerCommand(HttpType.admin_plat_stake_pool_log_index, cmd_admin_plat_stake_pool_log_index);
facade.registerCommand(HttpType.admin_plat_stake_pool_log_update, cmd_admin_plat_stake_pool_log_update);
facade.registerCommand(HttpType.admin_plat_stake_bonus_log_table_columns, cmd_admin_plat_stake_bonus_log_table_columns);
facade.registerCommand(HttpType.admin_plat_stake_bonus_log_index, cmd_admin_plat_stake_bonus_log_index);
facade.registerCommand(HttpType.admin_plat_stake_bonus_user_log_table_columns, cmd_admin_plat_stake_bonus_user_log_table_columns);
facade.registerCommand(HttpType.admin_plat_stake_bonus_user_log_index, cmd_admin_plat_stake_bonus_user_log_index);
facade.registerCommand(HttpType.admin_plat_show, cmd_admin_plat_show);
facade.registerCommand(HttpType.admin_plat_update, cmd_admin_plat_update);
facade.registerCommand(HttpType.admin_plat_stake_config_update, cmd_admin_plat_stake_config_update);

