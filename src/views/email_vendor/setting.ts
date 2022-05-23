/**
 * description: 邮件厂商
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766268
 */
import cmd_admin_email_vendor_table_columns from "@/views/email_vendor/command/cmd_admin_email_vendor_table_columns";
import cmd_admin_email_vendor_index from "@/views/email_vendor/command/cmd_admin_email_vendor_index";
import cmd_admin_email_vendor_show from "@/views/email_vendor/command/cmd_admin_email_vendor_show";
import cmd_admin_email_vendor_store from "@/views/email_vendor/command/cmd_admin_email_vendor_store";
import cmd_admin_email_vendor_update from "@/views/email_vendor/command/cmd_admin_email_vendor_update";
/**协议*/
export var HttpType = {
    admin_email_vendor_table_columns: "admin/email_vendor/table_columns",
    admin_email_vendor_index: "admin/email_vendor/index",
    admin_email_vendor_show: "admin/email_vendor/show/{email_vender_id}",
    admin_email_vendor_store: "admin/email_vendor/store",
    admin_email_vendor_update: "admin/email_vendor/update/{email_vender_id}",
};
/**事件*/
export var EventType = {
    admin_email_vendor_table_columns: "admin_email_vendor_table_columns",
    admin_email_vendor_index: "admin_email_vendor_index",
    admin_email_vendor_show: "admin_email_vendor_show",
    admin_email_vendor_store: "admin_email_vendor_store",
    admin_email_vendor_update: "admin_email_vendor_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_email_vendor_table_columns, cmd_admin_email_vendor_table_columns);
facade.registerCommand(HttpType.admin_email_vendor_index, cmd_admin_email_vendor_index);
facade.registerCommand(HttpType.admin_email_vendor_show, cmd_admin_email_vendor_show);
facade.registerCommand(HttpType.admin_email_vendor_store, cmd_admin_email_vendor_store);
facade.registerCommand(HttpType.admin_email_vendor_update, cmd_admin_email_vendor_update);

