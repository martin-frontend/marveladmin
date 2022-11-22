/**
 * description: 大厅跑马灯
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66921
 */
import cmd_admin_plats_marquee_table_columns from "@/views/plat_marquee/command/cmd_admin_plats_marquee_table_columns";
import cmd_admin_plats_marquee_index from "@/views/plat_marquee/command/cmd_admin_plats_marquee_index";
import cmd_admin_plats_marquee_show from "@/views/plat_marquee/command/cmd_admin_plats_marquee_show";
import cmd_admin_plats_marquee_store from "@/views/plat_marquee/command/cmd_admin_plats_marquee_store";
import cmd_admin_plats_marquee_update from "@/views/plat_marquee/command/cmd_admin_plats_marquee_update";
/**协议*/
export var HttpType = {
    admin_plats_marquee_table_columns: "admin/plats_marquee/table_columns",
    admin_plats_marquee_index: "admin/plats_marquee/index",
    admin_plats_marquee_show: "admin/plats_marquee/show/{id}",
    admin_plats_marquee_store: "admin/plats_marquee/store",
    admin_plats_marquee_update: "admin/plats_marquee/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plats_marquee_table_columns: "admin_plats_marquee_table_columns",
    admin_plats_marquee_index: "admin_plats_marquee_index",
    admin_plats_marquee_show: "admin_plats_marquee_show",
    admin_plats_marquee_store: "admin_plats_marquee_store",
    admin_plats_marquee_update: "admin_plats_marquee_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plats_marquee_table_columns, cmd_admin_plats_marquee_table_columns);
facade.registerCommand(HttpType.admin_plats_marquee_index, cmd_admin_plats_marquee_index);
facade.registerCommand(HttpType.admin_plats_marquee_show, cmd_admin_plats_marquee_show);
facade.registerCommand(HttpType.admin_plats_marquee_store, cmd_admin_plats_marquee_store);
facade.registerCommand(HttpType.admin_plats_marquee_update, cmd_admin_plats_marquee_update);
