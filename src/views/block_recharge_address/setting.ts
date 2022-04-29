/**
 * description: 用户帐号列表
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766101
 */
import cmd_admin_block_recharge_address_table_columns from "@/views/block_recharge_address/command/cmd_admin_block_recharge_address_table_columns";
import cmd_admin_block_recharge_address_index from "@/views/block_recharge_address/command/cmd_admin_block_recharge_address_index";
/**协议*/
export var HttpType = {
    admin_block_recharge_address_table_columns: "admin/block_recharge_address/table_columns",
    admin_block_recharge_address_index: "admin/block_recharge_address/index",
};
/**事件*/
export var EventType = {
    admin_block_recharge_address_table_columns: "admin_block_recharge_address_table_columns",
    admin_block_recharge_address_index: "admin_block_recharge_address_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_block_recharge_address_table_columns, cmd_admin_block_recharge_address_table_columns);
facade.registerCommand(HttpType.admin_block_recharge_address_index, cmd_admin_block_recharge_address_index);

