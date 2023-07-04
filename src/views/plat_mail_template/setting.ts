/**
 * description: 平台邮件模版
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777752
 */
import cmd_admin_plat_mail_template_table_columns from "@/views/plat_mail_template/command/cmd_admin_plat_mail_template_table_columns";
import cmd_admin_plat_mail_template_index from "@/views/plat_mail_template/command/cmd_admin_plat_mail_template_index";
import cmd_admin_plat_mail_template_show from "@/views/plat_mail_template/command/cmd_admin_plat_mail_template_show";
import cmd_admin_plat_mail_template_store from "@/views/plat_mail_template/command/cmd_admin_plat_mail_template_store";
import cmd_admin_plat_mail_template_update from "@/views/plat_mail_template/command/cmd_admin_plat_mail_template_update";
import cmd_admin_plat_mail_template_delete from "@/views/plat_mail_template/command/cmd_admin_plat_mail_template_delete";
/**协议*/
export var HttpType = {
    admin_plat_mail_template_table_columns: "admin/plat_mail_template/table_columns",
    admin_plat_mail_template_index: "admin/plat_mail_template/index",
    admin_plat_mail_template_show: "admin/plat_mail_template/show/{id}",
    admin_plat_mail_template_store: "admin/plat_mail_template/store",
    admin_plat_mail_template_update: "admin/plat_mail_template/update/{id}",
    admin_plat_mail_template_delete: "admin/plat_mail_template/delete/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_mail_template_table_columns: "admin_plat_mail_template_table_columns",
    admin_plat_mail_template_index: "admin_plat_mail_template_index",
    admin_plat_mail_template_show: "admin_plat_mail_template_show",
    admin_plat_mail_template_store: "admin_plat_mail_template_store",
    admin_plat_mail_template_update: "admin_plat_mail_template_update",
    admin_plat_mail_template_delete: "admin_plat_mail_template_delete",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_mail_template_table_columns, cmd_admin_plat_mail_template_table_columns);
facade.registerCommand(HttpType.admin_plat_mail_template_index, cmd_admin_plat_mail_template_index);
facade.registerCommand(HttpType.admin_plat_mail_template_show, cmd_admin_plat_mail_template_show);
facade.registerCommand(HttpType.admin_plat_mail_template_store, cmd_admin_plat_mail_template_store);
facade.registerCommand(HttpType.admin_plat_mail_template_update, cmd_admin_plat_mail_template_update);
facade.registerCommand(HttpType.admin_plat_mail_template_delete, cmd_admin_plat_mail_template_delete);

