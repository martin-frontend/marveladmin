/**
 * description: 区块网络配置
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766099
 */
import cmd_admin_block_network_table_columns from "@/views/block_network/command/cmd_admin_block_network_table_columns";
import cmd_admin_block_network_index from "@/views/block_network/command/cmd_admin_block_network_index";
import cmd_admin_block_network_show from "@/views/block_network/command/cmd_admin_block_network_show";
import cmd_admin_block_network_store from "@/views/block_network/command/cmd_admin_block_network_store";
import cmd_admin_block_network_update from "@/views/block_network/command/cmd_admin_block_network_update";
/**协议*/
export var HttpType = {
    admin_block_network_table_columns: "admin/block_network/table_columns",
    admin_block_network_index: "admin/block_network/index",
    admin_block_network_show: "admin/block_network/show/{id}",
    admin_block_network_store: "admin/block_network/store",
    admin_block_network_update: "admin/block_network/update/{id}",
};
/**事件*/
export var EventType = {
    admin_block_network_table_columns: "admin_block_network_table_columns",
    admin_block_network_index: "admin_block_network_index",
    admin_block_network_show: "admin_block_network_show",
    admin_block_network_store: "admin_block_network_store",
    admin_block_network_update: "admin_block_network_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_block_network_table_columns, cmd_admin_block_network_table_columns);
facade.registerCommand(HttpType.admin_block_network_index, cmd_admin_block_network_index);
facade.registerCommand(HttpType.admin_block_network_show, cmd_admin_block_network_show);
facade.registerCommand(HttpType.admin_block_network_store, cmd_admin_block_network_store);
facade.registerCommand(HttpType.admin_block_network_update, cmd_admin_block_network_update);

