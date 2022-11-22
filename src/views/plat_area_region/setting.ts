/**
 * description: 平台地区管理
 * document:
 */
import cmd_admin_plat_area_region_table_columns from "@/views/plat_area_region/command/cmd_admin_plat_area_region_table_columns";
import cmd_admin_plat_area_region_index from "@/views/plat_area_region/command/cmd_admin_plat_area_region_index";
import cmd_admin_plat_area_region_store from "@/views/plat_area_region/command/cmd_admin_plat_area_region_store";
import cmd_admin_plat_area_region_update from "@/views/plat_area_region/command/cmd_admin_plat_area_region_update";
import cmd_admin_plat_area_region_delete from "@/views/plat_area_region/command/cmd_admin_plat_area_region_delete";
/**协议*/
export var HttpType = {
    admin_plat_area_region_table_columns: "admin/plat_area_region/table_columns",
    admin_plat_area_region_index: "admin/plat_area_region/index",
    admin_plat_area_region_store: "admin/plat_area_region/store",
    admin_plat_area_region_update: "admin/plat_area_region/update/{id}",
    admin_plat_area_region_delete: "admin/plat_area_region/delete/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_area_region_table_columns: "admin_plat_area_region_table_columns",
    admin_plat_area_region_index: "admin_plat_area_region_index",
    admin_plat_area_region_store: "admin_plat_area_region_store",
    admin_plat_area_region_update: "admin_plat_area_region_update",
    admin_plat_area_region_delete: "admin_plat_area_region_delete",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_area_region_table_columns, cmd_admin_plat_area_region_table_columns);
facade.registerCommand(HttpType.admin_plat_area_region_index, cmd_admin_plat_area_region_index);
facade.registerCommand(HttpType.admin_plat_area_region_store, cmd_admin_plat_area_region_store);
facade.registerCommand(HttpType.admin_plat_area_region_update, cmd_admin_plat_area_region_update);
facade.registerCommand(HttpType.admin_plat_area_region_delete, cmd_admin_plat_area_region_delete);
