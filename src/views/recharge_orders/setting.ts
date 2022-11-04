/**
 * description: 用户充值订单
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705140
 */
import cmd_admin_recharge_orders_table_columns from "@/views/recharge_orders/command/cmd_admin_recharge_orders_table_columns";
import cmd_admin_recharge_orders_index from "@/views/recharge_orders/command/cmd_admin_recharge_orders_index";
import cmd_admin_recharge_orders_update_remark from "@/views/recharge_orders/command/cmd_admin_recharge_orders_update_remark";
import cmd_admin_recharge_orders_update_complete from "@/views/recharge_orders/command/cmd_admin_recharge_orders_update_complete";
/**协议*/
export var HttpType = {
    admin_recharge_orders_table_columns: "admin/recharge_orders/table_columns",
    admin_recharge_orders_index: "admin/recharge_orders/index",
    admin_recharge_orders_update_remark: "admin/recharge_orders/update_remark/{id}",
    admin_recharge_orders_update_complete: "admin/recharge_orders/update/{id}/complete",
};
/**事件*/
export var EventType = {
    admin_recharge_orders_table_columns: "admin_recharge_orders_table_columns",
    admin_recharge_orders_index: "admin_recharge_orders_index",
    admin_recharge_orders_update_remark: "admin_recharge_orders_update_remark",
    admin_recharge_orders_update_complete: "admin_recharge_orders_update_complete",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_recharge_orders_table_columns, cmd_admin_recharge_orders_table_columns);
facade.registerCommand(HttpType.admin_recharge_orders_index, cmd_admin_recharge_orders_index);
facade.registerCommand(HttpType.admin_recharge_orders_update_remark, cmd_admin_recharge_orders_update_remark);
facade.registerCommand(HttpType.admin_recharge_orders_update_complete, cmd_admin_recharge_orders_update_complete);

