/**
 * description: 充值厂商
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705057
 */
import cmd_admin_recharge_vendors_table_columns from "@/views/recharge_vendors/command/cmd_admin_recharge_vendors_table_columns";
import cmd_admin_recharge_vendors_index from "@/views/recharge_vendors/command/cmd_admin_recharge_vendors_index";
import cmd_admin_recharge_vendors_show from "@/views/recharge_vendors/command/cmd_admin_recharge_vendors_show";
import cmd_admin_recharge_vendors_store from "@/views/recharge_vendors/command/cmd_admin_recharge_vendors_store";
import cmd_admin_recharge_vendors_update from "@/views/recharge_vendors/command/cmd_admin_recharge_vendors_update";
/**协议*/
export var HttpType = {
    admin_recharge_vendors_table_columns: "admin/recharge_vendors/table_columns",
    admin_recharge_vendors_index: "admin/recharge_vendors/index",
    admin_recharge_vendors_show: "admin/recharge_vendors/show/{id}",
    admin_recharge_vendors_store: "admin/recharge_vendors/store",
    admin_recharge_vendors_update: "admin/recharge_vendors/update/{vendor_id}",
};
/**事件*/
export var EventType = {
    admin_recharge_vendors_table_columns: "admin_recharge_vendors_table_columns",
    admin_recharge_vendors_index: "admin_recharge_vendors_index",
    admin_recharge_vendors_show: "admin_recharge_vendors_show",
    admin_recharge_vendors_store: "admin_recharge_vendors_store",
    admin_recharge_vendors_update: "admin_recharge_vendors_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_recharge_vendors_table_columns, cmd_admin_recharge_vendors_table_columns);
facade.registerCommand(HttpType.admin_recharge_vendors_index, cmd_admin_recharge_vendors_index);
facade.registerCommand(HttpType.admin_recharge_vendors_show, cmd_admin_recharge_vendors_show);
facade.registerCommand(HttpType.admin_recharge_vendors_store, cmd_admin_recharge_vendors_store);
facade.registerCommand(HttpType.admin_recharge_vendors_update, cmd_admin_recharge_vendors_update);

