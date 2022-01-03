/**
 * description: VIP模版配置
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66143
 */
import cmd_admin_plat_users_vip_model_table_columns from "@/views/plat_users_vip_model/command/cmd_admin_plat_users_vip_model_table_columns";
import cmd_admin_plat_users_vip_model_index from "@/views/plat_users_vip_model/command/cmd_admin_plat_users_vip_model_index";
import cmd_admin_plat_users_vip_model_show from "@/views/plat_users_vip_model/command/cmd_admin_plat_users_vip_model_show";
import cmd_admin_plat_users_vip_model_store from "@/views/plat_users_vip_model/command/cmd_admin_plat_users_vip_model_store";
import cmd_admin_plat_users_vip_model_update from "@/views/plat_users_vip_model/command/cmd_admin_plat_users_vip_model_update";
import cmd_admin_plat_users_vip_model_destroy from "@/views/plat_users_vip_model/command/cmd_admin_plat_users_vip_model_destroy";
/**协议*/
export var HttpType = {
    admin_plat_users_vip_model_table_columns: "admin/plat_users_vip_model/table_columns",
    admin_plat_users_vip_model_index: "admin/plat_users_vip_model/index",
    admin_plat_users_vip_model_show: "admin/plat_users_vip_model/show/{vip_model_id}",
    admin_plat_users_vip_model_store: "admin/plat_users_vip_model/store",
    admin_plat_users_vip_model_update: "admin/plat_users_vip_model/update/{vip_model_id}",
    admin_plat_users_vip_model_destroy: "admin/plat_users_vip_model/destroy/{vip_model_id}",
};
/**事件*/
export var EventType = {
    admin_plat_users_vip_model_table_columns: "admin_plat_users_vip_model_table_columns",
    admin_plat_users_vip_model_index: "admin_plat_users_vip_model_index",
    admin_plat_users_vip_model_show: "admin_plat_users_vip_model_show",
    admin_plat_users_vip_model_store: "admin_plat_users_vip_model_store",
    admin_plat_users_vip_model_update: "admin_plat_users_vip_model_update",
    admin_plat_users_vip_model_destroy: "admin_plat_users_vip_model_destroy",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_vip_model_table_columns, cmd_admin_plat_users_vip_model_table_columns);
facade.registerCommand(HttpType.admin_plat_users_vip_model_index, cmd_admin_plat_users_vip_model_index);
facade.registerCommand(HttpType.admin_plat_users_vip_model_show, cmd_admin_plat_users_vip_model_show);
facade.registerCommand(HttpType.admin_plat_users_vip_model_store, cmd_admin_plat_users_vip_model_store);
facade.registerCommand(HttpType.admin_plat_users_vip_model_update, cmd_admin_plat_users_vip_model_update);
facade.registerCommand(HttpType.admin_plat_users_vip_model_destroy, cmd_admin_plat_users_vip_model_destroy);

