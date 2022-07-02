/**
 * description: 平台管理
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558265
 */
import cmd_admin_plat_table_columns from "@/views/plat/command/cmd_admin_plat_table_columns";
import cmd_admin_plat_index from "@/views/plat/command/cmd_admin_plat_index";
import cmd_admin_plat_store from "@/views/plat/command/cmd_admin_plat_store";
import cmd_admin_plat_show from "@/views/plat/command/cmd_admin_plat_show";
import cmd_admin_plat_update from "@/views/plat/command/cmd_admin_plat_update";
import cmd_admin_plat_agent_promotion_model_index from "@/views/plat/command/cmd_admin_plat_agent_promotion_model_index";
import cmd_admin_plat_bonus_all_stock_model_index from "@/views/plat/command/cmd_admin_plat_bonus_all_stock_model_index";
import cmd_admin_plat_clear_cache from "@/views/plat/command/cmd_admin_plat_clear_cache";
import cmd_admin_plat_clear_stake_bonus from "@/views/plat/command/cmd_admin_plat_clear_stake_bonus";
/**协议*/
export var HttpType = {
    admin_plat_table_columns: "admin/plat/table_columns",
    admin_plat_index: "admin/plat/index",
    admin_plat_store: "admin/plat/store",
    admin_plat_show: "admin/plat/show/{plat_id}",
    admin_plat_update: "admin/plat/update/{plat_id}",
    admin_plat_agent_promotion_model_index: "admin/plat_agent_promotion_model/index",
    admin_plat_bonus_all_stock_model_index: "admin/plat_bonus_all_stock_model/index",
    admin_plat_clear_cache: "admin/plat/clear_cache/{plat_id}",
    admin_plat_clear_stake_bonus: "admin/plat/clear_stake_bonus/{plat_id}",
};
/**事件*/
export var EventType = {
    admin_plat_table_columns: "admin_plat_table_columns",
    admin_plat_index: "admin_plat_index",
    admin_plat_store: "admin_plat_store",
    admin_plat_show: "admin_plat_show",
    admin_plat_update: "admin_plat_update",
    admin_plat_agent_promotion_model_index: "admin_plat_agent_promotion_model_index",
    admin_plat_bonus_all_stock_model_index: "admin_plat_bonus_all_stock_model_index",
    admin_plat_clear_cache: "admin_plat_clear_cache",
    admin_plat_clear_stake_bonus: "admin_plat_clear_stake_bonus",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_table_columns, cmd_admin_plat_table_columns);
facade.registerCommand(HttpType.admin_plat_index, cmd_admin_plat_index);
facade.registerCommand(HttpType.admin_plat_store, cmd_admin_plat_store);
facade.registerCommand(HttpType.admin_plat_show, cmd_admin_plat_show);
facade.registerCommand(HttpType.admin_plat_update, cmd_admin_plat_update);
facade.registerCommand(HttpType.admin_plat_agent_promotion_model_index, cmd_admin_plat_agent_promotion_model_index);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_model_index, cmd_admin_plat_bonus_all_stock_model_index);
facade.registerCommand(HttpType.admin_plat_clear_cache, cmd_admin_plat_clear_cache);
facade.registerCommand(HttpType.admin_plat_clear_stake_bonus, cmd_admin_plat_clear_stake_bonus);

