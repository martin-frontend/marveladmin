/**
 * description: 第三方登录厂商 
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706722
 */
import cmd_admin_third_party_vendor_login_table_columns from "@/views/third_party_vendor_login/command/cmd_admin_third_party_vendor_login_table_columns";
import cmd_admin_third_party_vendor_login_index from "@/views/third_party_vendor_login/command/cmd_admin_third_party_vendor_login_index";
import cmd_admin_third_party_vendor_login_show from "@/views/third_party_vendor_login/command/cmd_admin_third_party_vendor_login_show";
import cmd_admin_third_party_vendor_login_store from "@/views/third_party_vendor_login/command/cmd_admin_third_party_vendor_login_store";
import cmd_admin_third_party_vendor_login_update from "@/views/third_party_vendor_login/command/cmd_admin_third_party_vendor_login_update";
/**协议*/
export var HttpType = {
    admin_third_party_vendor_login_table_columns: "admin/third_party_vendor_login/table_columns",
    admin_third_party_vendor_login_index: "admin/third_party_vendor_login/index",
    admin_third_party_vendor_login_show: "admin/third_party_vendor_login/show/{id}",
    admin_third_party_vendor_login_store: "admin/third_party_vendor_login/store",
    admin_third_party_vendor_login_update: "admin/third_party_vendor_login/update/{id}",
};
/**事件*/
export var EventType = {
    admin_third_party_vendor_login_table_columns: "admin_third_party_vendor_login_table_columns",
    admin_third_party_vendor_login_index: "admin_third_party_vendor_login_index",
    admin_third_party_vendor_login_show: "admin_third_party_vendor_login_show",
    admin_third_party_vendor_login_store: "admin_third_party_vendor_login_store",
    admin_third_party_vendor_login_update: "admin_third_party_vendor_login_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_third_party_vendor_login_table_columns, cmd_admin_third_party_vendor_login_table_columns);
facade.registerCommand(HttpType.admin_third_party_vendor_login_index, cmd_admin_third_party_vendor_login_index);
facade.registerCommand(HttpType.admin_third_party_vendor_login_show, cmd_admin_third_party_vendor_login_show);
facade.registerCommand(HttpType.admin_third_party_vendor_login_store, cmd_admin_third_party_vendor_login_store);
facade.registerCommand(HttpType.admin_third_party_vendor_login_update, cmd_admin_third_party_vendor_login_update);

