/**
 * description: 厂商管理
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558275
 */
import cmd_admin_vendor_table_columns from "@/views/vendor/command/cmd_admin_vendor_table_columns";
import cmd_admin_vendor_index from "@/views/vendor/command/cmd_admin_vendor_index";
import cmd_admin_vendor_store from "@/views/vendor/command/cmd_admin_vendor_store";
import cmd_admin_vendor_show from "@/views/vendor/command/cmd_admin_vendor_show";
import cmd_admin_vendor_update from "@/views/vendor/command/cmd_admin_vendor_update";
import cmd_admin_system_config_index from "@/views/vendor/command/cmd_admin_system_config_index";
import cmd_admin_vendor_test_vendor from "@/views/vendor/command/cmd_admin_vendor_test_vendor";
/**协议*/
export var HttpType = {
    admin_vendor_table_columns: "admin/vendor/table_columns",
    admin_vendor_index: "admin/vendor/index",
    admin_vendor_store: "admin/vendor/store",
    admin_vendor_show: "admin/vendor/show/{vendor_id}",
    admin_vendor_update: "admin/vendor/update/{vendor_id}",
    admin_system_config_index: "admin/system_config/index",
    admin_vendor_test_vendor: "admin/vendor/test_vendor/{vendor_id}",
};
/**事件*/
export var EventType = {
    admin_vendor_table_columns: "admin_vendor_table_columns",
    admin_vendor_index: "admin_vendor_index",
    admin_vendor_store: "admin_vendor_store",
    admin_vendor_show: "admin_vendor_show",
    admin_vendor_update: "admin_vendor_update",
    admin_system_config_index: "admin_system_config_index",
    admin_vendor_test_vendor: "admin_vendor_test_vendor",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_vendor_table_columns, cmd_admin_vendor_table_columns);
facade.registerCommand(HttpType.admin_vendor_index, cmd_admin_vendor_index);
facade.registerCommand(HttpType.admin_vendor_store, cmd_admin_vendor_store);
facade.registerCommand(HttpType.admin_vendor_show, cmd_admin_vendor_show);
facade.registerCommand(HttpType.admin_vendor_update, cmd_admin_vendor_update);
facade.registerCommand(HttpType.admin_system_config_index, cmd_admin_system_config_index);
facade.registerCommand(HttpType.admin_vendor_test_vendor, cmd_admin_vendor_test_vendor);
