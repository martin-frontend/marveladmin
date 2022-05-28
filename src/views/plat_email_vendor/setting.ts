/**
 * description: 邮件通道
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=36766278
 */
import cmd_admin_plat_email_vendor_table_columns from "@/views/plat_email_vendor/command/cmd_admin_plat_email_vendor_table_columns";
import cmd_admin_plat_email_vendor_index from "@/views/plat_email_vendor/command/cmd_admin_plat_email_vendor_index";
import cmd_admin_plat_email_vendor_show from "@/views/plat_email_vendor/command/cmd_admin_plat_email_vendor_show";
import cmd_admin_plat_email_vendor_store from "@/views/plat_email_vendor/command/cmd_admin_plat_email_vendor_store";
import cmd_admin_plat_email_vendor_update from "@/views/plat_email_vendor/command/cmd_admin_plat_email_vendor_update";
import cmd_admin_plat_email_vendor_test_send from "@/views/plat_email_vendor/command/cmd_admin_plat_email_vendor_test_send";
/**协议*/
export var HttpType = {
    admin_plat_email_vendor_table_columns: "admin/plat_email_vendor/table_columns",
    admin_plat_email_vendor_index: "admin/plat_email_vendor/index",
    admin_plat_email_vendor_show: "admin/plat_email_vendor/show/{id}",
    admin_plat_email_vendor_store: "admin/plat_email_vendor/store",
    admin_plat_email_vendor_update: "admin/plat_email_vendor/update/{id}",
    admin_plat_email_vendor_test_send: "admin/plat_email_vendor/test_send/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_email_vendor_table_columns: "admin_plat_email_vendor_table_columns",
    admin_plat_email_vendor_index: "admin_plat_email_vendor_index",
    admin_plat_email_vendor_show: "admin_plat_email_vendor_show",
    admin_plat_email_vendor_store: "admin_plat_email_vendor_store",
    admin_plat_email_vendor_update: "admin_plat_email_vendor_update",
    admin_plat_email_vendor_test_send: "admin_plat_email_vendor_test_send",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_email_vendor_table_columns, cmd_admin_plat_email_vendor_table_columns);
facade.registerCommand(HttpType.admin_plat_email_vendor_index, cmd_admin_plat_email_vendor_index);
facade.registerCommand(HttpType.admin_plat_email_vendor_show, cmd_admin_plat_email_vendor_show);
facade.registerCommand(HttpType.admin_plat_email_vendor_store, cmd_admin_plat_email_vendor_store);
facade.registerCommand(HttpType.admin_plat_email_vendor_update, cmd_admin_plat_email_vendor_update);
facade.registerCommand(HttpType.admin_plat_email_vendor_test_send, cmd_admin_plat_email_vendor_test_send);

