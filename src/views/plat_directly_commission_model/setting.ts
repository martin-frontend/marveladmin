/**
 * description: 直属分红模版
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75270767
 */
import cmd_admin_plat_directly_commission_model_table_columns from "@/views/plat_directly_commission_model/command/cmd_admin_plat_directly_commission_model_table_columns";
import cmd_admin_plat_directly_commission_model_index from "@/views/plat_directly_commission_model/command/cmd_admin_plat_directly_commission_model_index";
import cmd_admin_plat_directly_commission_model_show from "@/views/plat_directly_commission_model/command/cmd_admin_plat_directly_commission_model_show";
import cmd_admin_plat_directly_commission_model_store from "@/views/plat_directly_commission_model/command/cmd_admin_plat_directly_commission_model_store";
import cmd_admin_plat_directly_commission_model_update from "@/views/plat_directly_commission_model/command/cmd_admin_plat_directly_commission_model_update";
import cmd_admin_plat_update from "@/views/plat_directly_commission_model/command/cmd_admin_plat_update";
/**协议*/
export var HttpType = {
    admin_plat_directly_commission_model_table_columns: "admin/plat_directly_commission_model/table_columns",
    admin_plat_directly_commission_model_index: "admin/plat_directly_commission_model/index",
    admin_plat_directly_commission_model_show: "admin/plat_directly_commission_model/show/{commission_model_id}",
    admin_plat_directly_commission_model_store: "admin/plat_directly_commission_model/store",
    admin_plat_directly_commission_model_update: "admin/plat_directly_commission_model/update/{commission_model_id}",
    admin_plat_update: "admin/plat/update/{plat_id}",
};
/**事件*/
export var EventType = {
    admin_plat_directly_commission_model_table_columns: "admin_plat_directly_commission_model_table_columns",
    admin_plat_directly_commission_model_index: "admin_plat_directly_commission_model_index",
    admin_plat_directly_commission_model_show: "admin_plat_directly_commission_model_show",
    admin_plat_directly_commission_model_store: "admin_plat_directly_commission_model_store",
    admin_plat_directly_commission_model_update: "admin_plat_directly_commission_model_update",
    admin_plat_update: "admin_plat_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_directly_commission_model_table_columns, cmd_admin_plat_directly_commission_model_table_columns);
facade.registerCommand(HttpType.admin_plat_directly_commission_model_index, cmd_admin_plat_directly_commission_model_index);
facade.registerCommand(HttpType.admin_plat_directly_commission_model_show, cmd_admin_plat_directly_commission_model_show);
facade.registerCommand(HttpType.admin_plat_directly_commission_model_store, cmd_admin_plat_directly_commission_model_store);
facade.registerCommand(HttpType.admin_plat_directly_commission_model_update, cmd_admin_plat_directly_commission_model_update);
facade.registerCommand(HttpType.admin_plat_update, cmd_admin_plat_update);

