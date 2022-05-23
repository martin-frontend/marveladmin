/**
 * description: 全盘分红配置
 * document: http://18.167.151.206:8090/pages/viewpage.action?pageId=11075898
 */
import cmd_admin_plat_bonus_all_stock_model_table_columns from "@/views/plat_bonus_all_stock_model/command/cmd_admin_plat_bonus_all_stock_model_table_columns";
import cmd_admin_plat_bonus_all_stock_model_index from "@/views/plat_bonus_all_stock_model/command/cmd_admin_plat_bonus_all_stock_model_index";
import cmd_admin_plat_bonus_all_stock_model_show from "@/views/plat_bonus_all_stock_model/command/cmd_admin_plat_bonus_all_stock_model_show";
import cmd_admin_plat_bonus_all_stock_model_store from "@/views/plat_bonus_all_stock_model/command/cmd_admin_plat_bonus_all_stock_model_store";
import cmd_admin_plat_bonus_all_stock_model_update from "@/views/plat_bonus_all_stock_model/command/cmd_admin_plat_bonus_all_stock_model_update";
/**协议*/
export var HttpType = {
    admin_plat_bonus_all_stock_model_table_columns: "admin/plat_bonus_all_stock_model/table_columns",
    admin_plat_bonus_all_stock_model_index: "admin/plat_bonus_all_stock_model/index",
    admin_plat_bonus_all_stock_model_show: "admin/plat_bonus_all_stock_model/show/{all_bonus_model_id}",
    admin_plat_bonus_all_stock_model_store: "admin/plat_bonus_all_stock_model/store",
    admin_plat_bonus_all_stock_model_update: "admin/plat_bonus_all_stock_model/update/{all_bonus_model_id}",
};
/**事件*/
export var EventType = {
    admin_plat_bonus_all_stock_model_table_columns: "admin_plat_bonus_all_stock_model_table_columns",
    admin_plat_bonus_all_stock_model_index: "admin_plat_bonus_all_stock_model_index",
    admin_plat_bonus_all_stock_model_show: "admin_plat_bonus_all_stock_model_show",
    admin_plat_bonus_all_stock_model_store: "admin_plat_bonus_all_stock_model_store",
    admin_plat_bonus_all_stock_model_update: "admin_plat_bonus_all_stock_model_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_model_table_columns, cmd_admin_plat_bonus_all_stock_model_table_columns);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_model_index, cmd_admin_plat_bonus_all_stock_model_index);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_model_show, cmd_admin_plat_bonus_all_stock_model_show);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_model_store, cmd_admin_plat_bonus_all_stock_model_store);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_model_update, cmd_admin_plat_bonus_all_stock_model_update);

