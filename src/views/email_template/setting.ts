/**
 * description: 邮件模版
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766275
 */
import cmd_admin_email_template_table_columns from "@/views/email_template/command/cmd_admin_email_template_table_columns";
import cmd_admin_email_template_index from "@/views/email_template/command/cmd_admin_email_template_index";
import cmd_admin_email_template_show from "@/views/email_template/command/cmd_admin_email_template_show";
import cmd_admin_email_template_store from "@/views/email_template/command/cmd_admin_email_template_store";
import cmd_admin_email_template_update from "@/views/email_template/command/cmd_admin_email_template_update";
/**协议*/
export var HttpType = {
    admin_email_template_table_columns: "admin/email_template/table_columns",
    admin_email_template_index: "admin/email_template/index",
    admin_email_template_show: "admin/email_template/show/{email_vender_id}",
    admin_email_template_store: "admin/email_template/store",
    admin_email_template_update: "admin/email_template/update/{email_vender_id}",
};
/**事件*/
export var EventType = {
    admin_email_template_table_columns: "admin_email_template_table_columns",
    admin_email_template_index: "admin_email_template_index",
    admin_email_template_show: "admin_email_template_show",
    admin_email_template_store: "admin_email_template_store",
    admin_email_template_update: "admin_email_template_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_email_template_table_columns, cmd_admin_email_template_table_columns);
facade.registerCommand(HttpType.admin_email_template_index, cmd_admin_email_template_index);
facade.registerCommand(HttpType.admin_email_template_show, cmd_admin_email_template_show);
facade.registerCommand(HttpType.admin_email_template_store, cmd_admin_email_template_store);
facade.registerCommand(HttpType.admin_email_template_update, cmd_admin_email_template_update);
