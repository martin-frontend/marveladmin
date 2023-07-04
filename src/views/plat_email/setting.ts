/**
 * description: 平台邮件
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=65999
 */
import cmd_admin_plat_mail_content_table_columns from "@/views/plat_email/command/cmd_admin_plat_mail_content_table_columns";
import cmd_admin_plat_mail_content_index from "@/views/plat_email/command/cmd_admin_plat_mail_content_index";
import cmd_admin_plat_mail_content_show from "@/views/plat_email/command/cmd_admin_plat_mail_content_show";
import cmd_admin_plat_mail_content_store from "@/views/plat_email/command/cmd_admin_plat_mail_content_store";
import cmd_admin_plat_email_store_attachment_store from "@/views/plat_email/command/cmd_admin_plat_email_store_attachment_store";
import cmd_admin_plat_mail_content_update from "@/views/plat_email/command/cmd_admin_plat_mail_content_update";
import cmd_admin_plat_users_mail_table_columns from "@/views/plat_email/command/cmd_admin_plat_users_mail_table_columns";
import cmd_admin_plat_users_mail_index from "@/views/plat_email/command/cmd_admin_plat_users_mail_index";
import cmd_admin_plat_mail_template_index from "@/views/plat_email/command/cmd_admin_plat_mail_template_index";
import cmd_admin_plat_mail_template_show from "@/views/plat_email/command/cmd_admin_plat_mail_template_show";
/**协议*/
export var HttpType = {
    admin_plat_mail_content_table_columns: "admin/plat_mail_content/table_columns",
    admin_plat_mail_content_index: "admin/plat_mail_content/index",
    admin_plat_mail_content_show: "admin/plat_mail_content/show/{content_id}",
    admin_plat_mail_content_store: "admin/plat_mail_content/store",
    admin_plat_email_store_attachment_store: "admin/plat_email_store_attachment/store",
    admin_plat_mail_content_update: "admin/plat_mail_content/update/{content_id}",
    admin_plat_users_mail_table_columns: "admin/plat_users_mail/table_columns",
    admin_plat_users_mail_index: "admin/plat_users_mail/index",
    admin_plat_mail_template_index: "admin/plat_mail_template/index",
    admin_plat_mail_template_show: "admin/plat_mail_template/show/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_mail_content_table_columns: "admin_plat_mail_content_table_columns",
    admin_plat_mail_content_index: "admin_plat_mail_content_index",
    admin_plat_mail_content_show: "admin_plat_mail_content_show",
    admin_plat_mail_content_store: "admin_plat_mail_content_store",
    admin_plat_email_store_attachment_store: "admin_plat_email_store_attachment_store",
    admin_plat_mail_content_update: "admin_plat_mail_content_update",
    admin_plat_users_mail_table_columns: "admin_plat_users_mail_table_columns",
    admin_plat_users_mail_index: "admin_plat_users_mail_index",
    admin_plat_mail_template_index: "admin_plat_mail_template_index",
    admin_plat_mail_template_show: "admin_plat_mail_template_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_mail_content_table_columns, cmd_admin_plat_mail_content_table_columns);
facade.registerCommand(HttpType.admin_plat_mail_content_index, cmd_admin_plat_mail_content_index);
facade.registerCommand(HttpType.admin_plat_mail_content_show, cmd_admin_plat_mail_content_show);
facade.registerCommand(HttpType.admin_plat_mail_content_store, cmd_admin_plat_mail_content_store);
facade.registerCommand(HttpType.admin_plat_email_store_attachment_store, cmd_admin_plat_email_store_attachment_store);
facade.registerCommand(HttpType.admin_plat_mail_content_update, cmd_admin_plat_mail_content_update);
facade.registerCommand(HttpType.admin_plat_users_mail_table_columns, cmd_admin_plat_users_mail_table_columns);
facade.registerCommand(HttpType.admin_plat_users_mail_index, cmd_admin_plat_users_mail_index);
facade.registerCommand(HttpType.admin_plat_mail_template_index, cmd_admin_plat_mail_template_index);
facade.registerCommand(HttpType.admin_plat_mail_template_show, cmd_admin_plat_mail_template_show);

