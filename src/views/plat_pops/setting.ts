/**
 * description: 弹窗管理
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766151
 */
import cmd_admin_plat_pops_table_columns from "@/views/plat_pops/command/cmd_admin_plat_pops_table_columns";
import cmd_admin_plat_pops_index from "@/views/plat_pops/command/cmd_admin_plat_pops_index";
import cmd_admin_plat_pops_show from "@/views/plat_pops/command/cmd_admin_plat_pops_show";
import cmd_admin_plat_pops_store from "@/views/plat_pops/command/cmd_admin_plat_pops_store";
import cmd_admin_plat_pops_update from "@/views/plat_pops/command/cmd_admin_plat_pops_update";
/**协议*/
export var HttpType = {
    admin_plat_pops_table_columns: "admin/plat_pops/table_columns",
    admin_plat_pops_index: "admin/plat_pops/index",
    admin_plat_pops_show: "admin/plat_pops/show/{id}",
    admin_plat_pops_store: "admin/plat_pops/store",
    admin_plat_pops_update: "admin/plat_pops/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_pops_table_columns: "admin_plat_pops_table_columns",
    admin_plat_pops_index: "admin_plat_pops_index",
    admin_plat_pops_show: "admin_plat_pops_show",
    admin_plat_pops_store: "admin_plat_pops_store",
    admin_plat_pops_update: "admin_plat_pops_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_pops_table_columns, cmd_admin_plat_pops_table_columns);
facade.registerCommand(HttpType.admin_plat_pops_index, cmd_admin_plat_pops_index);
facade.registerCommand(HttpType.admin_plat_pops_show, cmd_admin_plat_pops_show);
facade.registerCommand(HttpType.admin_plat_pops_store, cmd_admin_plat_pops_store);
facade.registerCommand(HttpType.admin_plat_pops_update, cmd_admin_plat_pops_update);

