/**
 * description: 全盘分红配置
 * document: http://18.167.151.206:8090/pages/viewpage.action?pageId=11075831
 */
import cmd_admin_plat_bonus_all_stock_set_table_columns from "@/views/plat_bonus_all/command/cmd_admin_plat_bonus_all_stock_set_table_columns";
import cmd_admin_plat_bonus_all_stock_set_index from "@/views/plat_bonus_all/command/cmd_admin_plat_bonus_all_stock_set_index";
import cmd_admin_plat_bonus_all_stock_set_show from "@/views/plat_bonus_all/command/cmd_admin_plat_bonus_all_stock_set_show";
import cmd_admin_plat_bonus_all_stock_set_update from "@/views/plat_bonus_all/command/cmd_admin_plat_bonus_all_stock_set_update";
import cmd_admin_plat_bonus_all_stock_table_columns from "@/views/plat_bonus_all/command/cmd_admin_plat_bonus_all_stock_table_columns";
import cmd_admin_plat_bonus_all_stock_index from "@/views/plat_bonus_all/command/cmd_admin_plat_bonus_all_stock_index";
import cmd_admin_plat_bonus_all_stock_model_show from "@/views/plat_bonus_all/command/cmd_admin_plat_bonus_all_stock_model_show";
import cmd_admin_plat_update from "@/views/plat_bonus_all/command/cmd_admin_plat_update";
import cmd_admin_plat_show from "@/views/plat_bonus_all/command/cmd_admin_plat_show";
import cmd_admin_resource_upload from "@/views/plat_bonus_all/command/cmd_admin_resource_upload";
import cmd_admin_plat_agent_promotion_model_table_columns from "@/views/plat_bonus_all/command/cmd_admin_plat_agent_promotion_model_table_columns";
import cmd_admin_plat_agent_promotion_model_show from "@/views/plat_bonus_all/command/cmd_admin_plat_agent_promotion_model_show";
/**协议*/
export var HttpType = {
    admin_plat_bonus_all_stock_set_table_columns: "admin/plat_bonus_all_stock_set/table_columns",
    admin_plat_bonus_all_stock_set_index: "admin/plat_bonus_all_stock_set/index",
    admin_plat_bonus_all_stock_set_show: "admin/plat_bonus_all_stock_set/show/{id}",
    admin_plat_bonus_all_stock_set_update: "admin/plat_bonus_all_stock_set/update/{id}",
    admin_plat_bonus_all_stock_table_columns: "admin/plat_bonus_all_stock/table_columns",
    admin_plat_bonus_all_stock_index: "admin/plat_bonus_all_stock/index",
    admin_plat_bonus_all_stock_model_show: "admin/plat_bonus_all_stock_model/show/{all_bonus_model_id}",
    admin_plat_update: "admin/plat/update/{plat_id}",
    admin_plat_show: "admin/plat/show/{plat_id}",
    admin_resource_upload: "admin/resource/upload",
    admin_plat_agent_promotion_model_table_columns: "admin/plat_agent_promotion_model/table_columns",
    admin_plat_agent_promotion_model_show: "admin/plat_agent_promotion_model/show/{promotion_model_id}",
};
/**事件*/
export var EventType = {
    admin_plat_bonus_all_stock_set_table_columns: "admin_plat_bonus_all_stock_set_table_columns",
    admin_plat_bonus_all_stock_set_index: "admin_plat_bonus_all_stock_set_index",
    admin_plat_bonus_all_stock_set_show: "admin_plat_bonus_all_stock_set_show",
    admin_plat_bonus_all_stock_set_update: "admin_plat_bonus_all_stock_set_update",
    admin_plat_bonus_all_stock_table_columns: "admin_plat_bonus_all_stock_table_columns",
    admin_plat_bonus_all_stock_index: "admin_plat_bonus_all_stock_index",
    admin_plat_bonus_all_stock_model_show: "admin_plat_bonus_all_stock_model_show",
    admin_plat_update: "admin_plat_update",
    admin_plat_show: "admin_plat_show",
    admin_resource_upload: "admin_resource_upload",
    admin_plat_agent_promotion_model_table_columns: "admin_plat_agent_promotion_model_table_columns",
    admin_plat_agent_promotion_model_show: "admin_plat_agent_promotion_model_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_plat_bonus_all_stock_set_table_columns,
    cmd_admin_plat_bonus_all_stock_set_table_columns
);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_set_index, cmd_admin_plat_bonus_all_stock_set_index);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_set_show, cmd_admin_plat_bonus_all_stock_set_show);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_set_update, cmd_admin_plat_bonus_all_stock_set_update);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_table_columns, cmd_admin_plat_bonus_all_stock_table_columns);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_index, cmd_admin_plat_bonus_all_stock_index);
facade.registerCommand(HttpType.admin_plat_bonus_all_stock_model_show, cmd_admin_plat_bonus_all_stock_model_show);
facade.registerCommand(HttpType.admin_plat_update, cmd_admin_plat_update);
facade.registerCommand(HttpType.admin_plat_show, cmd_admin_plat_show);
facade.registerCommand(HttpType.admin_resource_upload, cmd_admin_resource_upload);
facade.registerCommand(
    HttpType.admin_plat_agent_promotion_model_table_columns,
    cmd_admin_plat_agent_promotion_model_table_columns
);
facade.registerCommand(HttpType.admin_plat_agent_promotion_model_show, cmd_admin_plat_agent_promotion_model_show);
