/**
 * description: 落地页域名配置
 * document: http://18.167.151.206:8090/pages/viewpage.action?pageId=66159
 */
import cmd_admin_plat_load_page_domain_table_columns from "@/views/plat_load_page_domain/command/cmd_admin_plat_load_page_domain_table_columns";
import cmd_admin_plat_load_page_domain_index from "@/views/plat_load_page_domain/command/cmd_admin_plat_load_page_domain_index";
import cmd_admin_plat_load_page_domain_show from "@/views/plat_load_page_domain/command/cmd_admin_plat_load_page_domain_show";
import cmd_admin_plat_load_page_domain_store from "@/views/plat_load_page_domain/command/cmd_admin_plat_load_page_domain_store";
import cmd_admin_plat_load_page_domain_update from "@/views/plat_load_page_domain/command/cmd_admin_plat_load_page_domain_update";
import cmd_admin_plat_show from "@/views/plat_load_page_domain/command/cmd_admin_plat_show";
import cmd_admin_plat_upload_load_page from "@/views/plat_load_page_domain/command/cmd_admin_plat_upload_load_page";
/**协议*/
export var HttpType = {
    admin_plat_load_page_domain_table_columns: "admin/plat_load_page_domain/table_columns",
    admin_plat_load_page_domain_index: "admin/plat_load_page_domain/index",
    admin_plat_load_page_domain_show: "admin/plat_load_page_domain/show/{id}",
    admin_plat_load_page_domain_store: "admin/plat_load_page_domain/store",
    admin_plat_load_page_domain_update: "admin/plat_load_page_domain/update/{id}",
    admin_plat_show: "admin/plat/show/{plat_id}",
    admin_plat_upload_load_page: "admin/plat/upload_load_page/{plat_id}",
};
/**事件*/
export var EventType = {
    admin_plat_load_page_domain_table_columns: "admin_plat_load_page_domain_table_columns",
    admin_plat_load_page_domain_index: "admin_plat_load_page_domain_index",
    admin_plat_load_page_domain_show: "admin_plat_load_page_domain_show",
    admin_plat_load_page_domain_store: "admin_plat_load_page_domain_store",
    admin_plat_load_page_domain_update: "admin_plat_load_page_domain_update",
    admin_plat_show: "admin_plat_show",
    admin_plat_upload_load_page: "admin_plat_upload_load_page",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_load_page_domain_table_columns, cmd_admin_plat_load_page_domain_table_columns);
facade.registerCommand(HttpType.admin_plat_load_page_domain_index, cmd_admin_plat_load_page_domain_index);
facade.registerCommand(HttpType.admin_plat_load_page_domain_show, cmd_admin_plat_load_page_domain_show);
facade.registerCommand(HttpType.admin_plat_load_page_domain_store, cmd_admin_plat_load_page_domain_store);
facade.registerCommand(HttpType.admin_plat_load_page_domain_update, cmd_admin_plat_load_page_domain_update);
facade.registerCommand(HttpType.admin_plat_show, cmd_admin_plat_show);
facade.registerCommand(HttpType.admin_plat_upload_load_page, cmd_admin_plat_upload_load_page);

