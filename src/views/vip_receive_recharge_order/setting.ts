/**
 * description: VIP充值订单
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707617
 */
import cmd_admin_vip_receive_recharge_order_table_columns from "@/views/vip_receive_recharge_order/command/cmd_admin_vip_receive_recharge_order_table_columns";
import cmd_admin_vip_receive_recharge_order_index from "@/views/vip_receive_recharge_order/command/cmd_admin_vip_receive_recharge_order_index";
import cmd_admin_vip_receive_recharge_order_show from "@/views/vip_receive_recharge_order/command/cmd_admin_vip_receive_recharge_order_show";
/**协议*/
export var HttpType = {
    admin_vip_receive_recharge_order_table_columns: "admin/vip_receive_recharge_order/table_columns",
    admin_vip_receive_recharge_order_index: "admin/vip_receive_recharge_order/index",
    admin_vip_receive_recharge_order_show: "admin/vip_receive_recharge_order/show/{id}",
};
/**事件*/
export var EventType = {
    admin_vip_receive_recharge_order_table_columns: "admin_vip_receive_recharge_order_table_columns",
    admin_vip_receive_recharge_order_index: "admin_vip_receive_recharge_order_index",
    admin_vip_receive_recharge_order_show: "admin_vip_receive_recharge_order_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_vip_receive_recharge_order_table_columns, cmd_admin_vip_receive_recharge_order_table_columns);
facade.registerCommand(HttpType.admin_vip_receive_recharge_order_index, cmd_admin_vip_receive_recharge_order_index);
facade.registerCommand(HttpType.admin_vip_receive_recharge_order_show, cmd_admin_vip_receive_recharge_order_show);

