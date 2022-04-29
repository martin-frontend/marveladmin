/**
 * description: 区块合约配置
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766096
 */
import cmd_admin_block_contract_table_columns from "@/views/block_contract/command/cmd_admin_block_contract_table_columns";
import cmd_admin_block_contract_index from "@/views/block_contract/command/cmd_admin_block_contract_index";
import cmd_admin_block_contract_show from "@/views/block_contract/command/cmd_admin_block_contract_show";
import cmd_admin_block_contract_store from "@/views/block_contract/command/cmd_admin_block_contract_store";
import cmd_admin_block_contract_update from "@/views/block_contract/command/cmd_admin_block_contract_update";
/**协议*/
export var HttpType = {
    admin_block_contract_table_columns: "admin/block_contract/table_columns",
    admin_block_contract_index: "admin/block_contract/index",
    admin_block_contract_show: "admin/block_contract/show/{id}",
    admin_block_contract_store: "admin/block_contract/store",
    admin_block_contract_update: "admin/block_contract/update/{id}",
};
/**事件*/
export var EventType = {
    admin_block_contract_table_columns: "admin_block_contract_table_columns",
    admin_block_contract_index: "admin_block_contract_index",
    admin_block_contract_show: "admin_block_contract_show",
    admin_block_contract_store: "admin_block_contract_store",
    admin_block_contract_update: "admin_block_contract_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_block_contract_table_columns, cmd_admin_block_contract_table_columns);
facade.registerCommand(HttpType.admin_block_contract_index, cmd_admin_block_contract_index);
facade.registerCommand(HttpType.admin_block_contract_show, cmd_admin_block_contract_show);
facade.registerCommand(HttpType.admin_block_contract_store, cmd_admin_block_contract_store);
facade.registerCommand(HttpType.admin_block_contract_update, cmd_admin_block_contract_update);

