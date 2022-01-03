/**
 * description: 平台客服功能管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=65748, http://18.166.154.73:8090/pages/viewpage.action?pageId=66957, http://18.166.154.73:8090/pages/viewpage.action?pageId=67044
 */
import cmd_admin_plats_fag_table_columns from "@/views/plat_service/command/cmd_admin_plats_fag_table_columns";
import cmd_admin_plats_fag_index from "@/views/plat_service/command/cmd_admin_plats_fag_index";
import cmd_admin_plats_fag_show from "@/views/plat_service/command/cmd_admin_plats_fag_show";
import cmd_admin_plats_fag_store from "@/views/plat_service/command/cmd_admin_plats_fag_store";
import cmd_admin_plats_fag_update from "@/views/plat_service/command/cmd_admin_plats_fag_update";
import cmd_admin_plats_fag_sync from "@/views/plat_service/command/cmd_admin_plats_fag_sync";
import cmd_admin_plat_show from "@/views/plat_service/command/cmd_admin_plat_show";
import cmd_admin_plat_update from "@/views/plat_service/command/cmd_admin_plat_update";
/**协议*/
export var HttpType = {
    admin_plats_fag_table_columns: "admin/plats_fag/table_columns",
    admin_plats_fag_index: "admin/plats_fag/index",
    admin_plats_fag_show: "admin/plats_fag/show/{id}",
    admin_plats_fag_store: "admin/plats_fag/store",
    admin_plats_fag_update: "admin/plats_fag/update/{id}",
    admin_plats_fag_sync: "admin/plats_fag/sync",
    admin_plat_show: "admin/plat/show/{plat_id}",
    admin_plat_update: "admin/plat/update/{plat_id}",
};
/**事件*/
export var EventType = {
    admin_plats_fag_table_columns: "admin_plats_fag_table_columns",
    admin_plats_fag_index: "admin_plats_fag_index",
    admin_plats_fag_show: "admin_plats_fag_show",
    admin_plats_fag_store: "admin_plats_fag_store",
    admin_plats_fag_update: "admin_plats_fag_update",
    admin_plats_fag_sync: "admin_plats_fag_sync",
    admin_plat_show: "admin_plat_show",
    admin_plat_update: "admin_plat_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plats_fag_table_columns, cmd_admin_plats_fag_table_columns);
facade.registerCommand(HttpType.admin_plats_fag_index, cmd_admin_plats_fag_index);
facade.registerCommand(HttpType.admin_plats_fag_show, cmd_admin_plats_fag_show);
facade.registerCommand(HttpType.admin_plats_fag_store, cmd_admin_plats_fag_store);
facade.registerCommand(HttpType.admin_plats_fag_update, cmd_admin_plats_fag_update);
facade.registerCommand(HttpType.admin_plats_fag_sync, cmd_admin_plats_fag_sync);
facade.registerCommand(HttpType.admin_plat_show, cmd_admin_plat_show);
facade.registerCommand(HttpType.admin_plat_update, cmd_admin_plat_update);

