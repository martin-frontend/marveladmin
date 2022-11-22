/**
 * description: 实时返水配置
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558271
 */
import cmd_admin_plat_users_backwater_model_table_columns from "@/views/plat_users_backwater_model/command/cmd_admin_plat_users_backwater_model_table_columns";
import cmd_admin_plat_users_backwater_model_index from "@/views/plat_users_backwater_model/command/cmd_admin_plat_users_backwater_model_index";
import cmd_admin_plat_users_backwater_model_show from "@/views/plat_users_backwater_model/command/cmd_admin_plat_users_backwater_model_show";
import cmd_admin_plat_users_backwater_model_store from "@/views/plat_users_backwater_model/command/cmd_admin_plat_users_backwater_model_store";
import cmd_admin_plat_users_backwater_model_update from "@/views/plat_users_backwater_model/command/cmd_admin_plat_users_backwater_model_update";
import cmd_admin_plat_users_backwater_model_destroy from "@/views/plat_users_backwater_model/command/cmd_admin_plat_users_backwater_model_destroy";
/**协议*/
export var HttpType = {
    admin_plat_users_backwater_model_table_columns: "admin/plat_users_backwater_model/table_columns",
    admin_plat_users_backwater_model_index: "admin/plat_users_backwater_model/index",
    admin_plat_users_backwater_model_show: "admin/plat_users_backwater_model/show/{backwater_model_id}",
    admin_plat_users_backwater_model_store: "admin/plat_users_backwater_model/store",
    admin_plat_users_backwater_model_update: "admin/plat_users_backwater_model/update/{backwater_model_id}",
    admin_plat_users_backwater_model_destroy: "admin/plat_users_backwater_model/destroy/{backwater_model_id}",
};
/**事件*/
export var EventType = {
    admin_plat_users_backwater_model_table_columns: "admin_plat_users_backwater_model_table_columns",
    admin_plat_users_backwater_model_index: "admin_plat_users_backwater_model_index",
    admin_plat_users_backwater_model_show: "admin_plat_users_backwater_model_show",
    admin_plat_users_backwater_model_store: "admin_plat_users_backwater_model_store",
    admin_plat_users_backwater_model_update: "admin_plat_users_backwater_model_update",
    admin_plat_users_backwater_model_destroy: "admin_plat_users_backwater_model_destroy",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_plat_users_backwater_model_table_columns,
    cmd_admin_plat_users_backwater_model_table_columns
);
facade.registerCommand(HttpType.admin_plat_users_backwater_model_index, cmd_admin_plat_users_backwater_model_index);
facade.registerCommand(HttpType.admin_plat_users_backwater_model_show, cmd_admin_plat_users_backwater_model_show);
facade.registerCommand(HttpType.admin_plat_users_backwater_model_store, cmd_admin_plat_users_backwater_model_store);
facade.registerCommand(HttpType.admin_plat_users_backwater_model_update, cmd_admin_plat_users_backwater_model_update);
facade.registerCommand(HttpType.admin_plat_users_backwater_model_destroy, cmd_admin_plat_users_backwater_model_destroy);
