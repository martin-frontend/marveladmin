/**
 * description: 大额爆奖图管理
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47776945
 */
import cmd_admin_plat_big_award_table_columns from "@/views/plat_big_award/command/cmd_admin_plat_big_award_table_columns";
import cmd_admin_plat_big_award_index from "@/views/plat_big_award/command/cmd_admin_plat_big_award_index";
import cmd_admin_plat_big_award_show from "@/views/plat_big_award/command/cmd_admin_plat_big_award_show";
import cmd_admin_plat_big_award_store from "@/views/plat_big_award/command/cmd_admin_plat_big_award_store";
import cmd_admin_plat_big_award_update from "@/views/plat_big_award/command/cmd_admin_plat_big_award_update";
import cmd_admin_resource_upload from "@/views/plat_big_award/command/cmd_admin_resource_upload";
/**协议*/
export var HttpType = {
    admin_plat_big_award_table_columns: "admin/plat_big_award/table_columns",
    admin_plat_big_award_index: "admin/plat_big_award/index",
    admin_plat_big_award_show: "admin/plat_big_award/show/{id}",
    admin_plat_big_award_store: "admin/plat_big_award/store",
    admin_plat_big_award_update: "admin/plat_big_award/update/{id}",
    admin_resource_upload: "admin/resource/upload",
};
/**事件*/
export var EventType = {
    admin_plat_big_award_table_columns: "admin_plat_big_award_table_columns",
    admin_plat_big_award_index: "admin_plat_big_award_index",
    admin_plat_big_award_show: "admin_plat_big_award_show",
    admin_plat_big_award_store: "admin_plat_big_award_store",
    admin_plat_big_award_update: "admin_plat_big_award_update",
    admin_resource_upload: "admin_resource_upload",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_big_award_table_columns, cmd_admin_plat_big_award_table_columns);
facade.registerCommand(HttpType.admin_plat_big_award_index, cmd_admin_plat_big_award_index);
facade.registerCommand(HttpType.admin_plat_big_award_show, cmd_admin_plat_big_award_show);
facade.registerCommand(HttpType.admin_plat_big_award_store, cmd_admin_plat_big_award_store);
facade.registerCommand(HttpType.admin_plat_big_award_update, cmd_admin_plat_big_award_update);
facade.registerCommand(HttpType.admin_resource_upload, cmd_admin_resource_upload);

