/**
 * description: 奖励活动任务
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777599
 */
import cmd_admin_plat_coin_tasks_table_columns from "@/views/plat_coin_tasks/command/cmd_admin_plat_coin_tasks_table_columns";
import cmd_admin_plat_coin_tasks_index from "@/views/plat_coin_tasks/command/cmd_admin_plat_coin_tasks_index";
import cmd_admin_plat_coin_tasks_store from "@/views/plat_coin_tasks/command/cmd_admin_plat_coin_tasks_store";
import cmd_admin_plat_coin_tasks_update from "@/views/plat_coin_tasks/command/cmd_admin_plat_coin_tasks_update";
import cmd_admin_plat_coin_tasks_batch_cancel from "@/views/plat_coin_tasks/command/cmd_admin_plat_coin_tasks_batch_cancel";
/**协议*/
export var HttpType = {
    admin_plat_coin_tasks_table_columns: "admin/plat_coin_tasks/table_columns",
    admin_plat_coin_tasks_index: "admin/plat_coin_tasks/index",
    admin_plat_coin_tasks_store: "admin/plat_coin_tasks/store",
    admin_plat_coin_tasks_update: "admin/plat_coin_tasks/update/{id}",
    admin_plat_coin_tasks_batch_cancel: "admin/plat_coin_tasks/batch_cancel",
};
/**事件*/
export var EventType = {
    admin_plat_coin_tasks_table_columns: "admin_plat_coin_tasks_table_columns",
    admin_plat_coin_tasks_index: "admin_plat_coin_tasks_index",
    admin_plat_coin_tasks_store: "admin_plat_coin_tasks_store",
    admin_plat_coin_tasks_update: "admin_plat_coin_tasks_update",
    admin_plat_coin_tasks_batch_cancel: "admin_plat_coin_tasks_batch_cancel",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_coin_tasks_table_columns, cmd_admin_plat_coin_tasks_table_columns);
facade.registerCommand(HttpType.admin_plat_coin_tasks_index, cmd_admin_plat_coin_tasks_index);
facade.registerCommand(HttpType.admin_plat_coin_tasks_store, cmd_admin_plat_coin_tasks_store);
facade.registerCommand(HttpType.admin_plat_coin_tasks_update, cmd_admin_plat_coin_tasks_update);
facade.registerCommand(HttpType.admin_plat_coin_tasks_batch_cancel, cmd_admin_plat_coin_tasks_batch_cancel);

