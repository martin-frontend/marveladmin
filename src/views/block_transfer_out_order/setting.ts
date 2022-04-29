/**
 * description: 数字兑换订单
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766092
 */
import cmd_admin_block_transfer_out_order_table_columns from "@/views/block_transfer_out_order/command/cmd_admin_block_transfer_out_order_table_columns";
import cmd_admin_block_transfer_out_order_index from "@/views/block_transfer_out_order/command/cmd_admin_block_transfer_out_order_index";
/**协议*/
export var HttpType = {
    admin_block_transfer_out_order_table_columns: "admin/block_transfer_out_order/table_columns",
    admin_block_transfer_out_order_index: "admin/block_transfer_out_order/index",
};
/**事件*/
export var EventType = {
    admin_block_transfer_out_order_table_columns: "admin_block_transfer_out_order_table_columns",
    admin_block_transfer_out_order_index: "admin_block_transfer_out_order_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_block_transfer_out_order_table_columns, cmd_admin_block_transfer_out_order_table_columns);
facade.registerCommand(HttpType.admin_block_transfer_out_order_index, cmd_admin_block_transfer_out_order_index);

