/**
 * description: 兑换流水审核
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705468
 */
import cmd_admin_gold_water_table_columns from "@/views/gold_water/command/cmd_admin_gold_water_table_columns";
import cmd_admin_gold_water_index from "@/views/gold_water/command/cmd_admin_gold_water_index";
import cmd_admin_gold_water_approved from "@/views/gold_water/command/cmd_admin_gold_water_approved";
import cmd_admin_gold_water_store from "@/views/gold_water/command/cmd_admin_gold_water_store";
/**协议*/
export var HttpType = {
    admin_gold_water_table_columns: "admin/gold_water/table_columns",
    admin_gold_water_index: "admin/gold_water/index",
    admin_gold_water_approved: "admin/gold_water/approved/{id}",
    admin_gold_water_store: "admin/gold_water/store",
};
/**事件*/
export var EventType = {
    admin_gold_water_table_columns: "admin_gold_water_table_columns",
    admin_gold_water_index: "admin_gold_water_index",
    admin_gold_water_approved: "admin_gold_water_approved",
    admin_gold_water_store: "admin_gold_water_store",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_gold_water_table_columns, cmd_admin_gold_water_table_columns);
facade.registerCommand(HttpType.admin_gold_water_index, cmd_admin_gold_water_index);
facade.registerCommand(HttpType.admin_gold_water_approved, cmd_admin_gold_water_approved);
facade.registerCommand(HttpType.admin_gold_water_store, cmd_admin_gold_water_store);

