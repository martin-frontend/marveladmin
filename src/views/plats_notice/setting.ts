/**
 * description: 平台公告管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=67042, http://18.166.154.73:8090/pages/viewpage.action?pageId=65748
 */
import cmd_admin_plats_notice_table_columns from "@/views/plats_notice/command/cmd_admin_plats_notice_table_columns";
import cmd_admin_plats_notice_index from "@/views/plats_notice/command/cmd_admin_plats_notice_index";
import cmd_admin_plats_notice_store from "@/views/plats_notice/command/cmd_admin_plats_notice_store";
import cmd_admin_plats_notice_update from "@/views/plats_notice/command/cmd_admin_plats_notice_update";
import cmd_admin_plats_notice_show from "@/views/plats_notice/command/cmd_admin_plats_notice_show";
import cmd_admin_resource_upload from "@/views/plats_notice/command/cmd_admin_resource_upload";
/**协议*/
export var HttpType = {
    admin_plats_notice_table_columns: "admin/plats_notice/table_columns",
    admin_plats_notice_index: "admin/plats_notice/index",
    admin_plats_notice_store: "admin/plats_notice/store",
    admin_plats_notice_update: "admin/plats_notice/update/{id}",
    admin_plats_notice_show: "admin/plats_notice/show/{id}",
    admin_resource_upload: "admin/resource/upload",
};
/**事件*/
export var EventType = {
    admin_plats_notice_table_columns: "admin_plats_notice_table_columns",
    admin_plats_notice_index: "admin_plats_notice_index",
    admin_plats_notice_store: "admin_plats_notice_store",
    admin_plats_notice_update: "admin_plats_notice_update",
    admin_plats_notice_show: "admin_plats_notice_show",
    admin_resource_upload: "admin_resource_upload",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plats_notice_table_columns, cmd_admin_plats_notice_table_columns);
facade.registerCommand(HttpType.admin_plats_notice_index, cmd_admin_plats_notice_index);
facade.registerCommand(HttpType.admin_plats_notice_store, cmd_admin_plats_notice_store);
facade.registerCommand(HttpType.admin_plats_notice_update, cmd_admin_plats_notice_update);
facade.registerCommand(HttpType.admin_plats_notice_show, cmd_admin_plats_notice_show);
facade.registerCommand(HttpType.admin_resource_upload, cmd_admin_resource_upload);

