/**
 * description: 定时任务
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706722
 */
import cmd_admin_admin_cron_table_columns from "@/views/admin_cron/command/cmd_admin_admin_cron_table_columns";
import cmd_admin_admin_cron_index from "@/views/admin_cron/command/cmd_admin_admin_cron_index";
import cmd_admin_admin_cron_queue_show from "@/views/admin_cron/command/cmd_admin_admin_cron_queue_show";
import cmd_admin_admin_cron_store from "@/views/admin_cron/command/cmd_admin_admin_cron_store";
import cmd_admin_admin_cron_update from "@/views/admin_cron/command/cmd_admin_admin_cron_update";
import cmd_admin_admin_cron_queue_table_columns from "@/views/admin_cron/command/cmd_admin_admin_cron_queue_table_columns";
import cmd_admin_admin_cron_queue_index from "@/views/admin_cron/command/cmd_admin_admin_cron_queue_index";
import cmd_admin_admin_cron_queue_update from "@/views/admin_cron/command/cmd_admin_admin_cron_queue_update";
import cmd_admin_admin_cron_queue_update_batch from "@/views/admin_cron/command/cmd_admin_admin_cron_queue_update_batch";
/**协议*/
export var HttpType = {
    admin_admin_cron_table_columns: "admin/admin_cron/table_columns",
    admin_admin_cron_index: "admin/admin_cron/index",
    admin_admin_cron_queue_show: "admin/admin_cron_queue/show/{id}",
    admin_admin_cron_store: "admin/admin_cron/store",
    admin_admin_cron_update: "admin/admin_cron/update/{id}",
    admin_admin_cron_queue_table_columns: "admin/admin_cron_queue/table_columns",
    admin_admin_cron_queue_index: "admin/admin_cron_queue/index",
    admin_admin_cron_queue_update: "admin/admin_cron_queue/update/{id}",
    admin_admin_cron_queue_update_batch: "admin/admin_cron_queue/update_batch",
};
/**事件*/
export var EventType = {
    admin_admin_cron_table_columns: "admin_admin_cron_table_columns",
    admin_admin_cron_index: "admin_admin_cron_index",
    admin_admin_cron_queue_show: "admin_admin_cron_queue_show",
    admin_admin_cron_store: "admin_admin_cron_store",
    admin_admin_cron_update: "admin_admin_cron_update",
    admin_admin_cron_queue_table_columns: "admin_admin_cron_queue_table_columns",
    admin_admin_cron_queue_index: "admin_admin_cron_queue_index",
    admin_admin_cron_queue_update: "admin_admin_cron_queue_update",
    admin_admin_cron_queue_update_batch: "admin_admin_cron_queue_update_batch",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_cron_table_columns, cmd_admin_admin_cron_table_columns);
facade.registerCommand(HttpType.admin_admin_cron_index, cmd_admin_admin_cron_index);
facade.registerCommand(HttpType.admin_admin_cron_queue_show, cmd_admin_admin_cron_queue_show);
facade.registerCommand(HttpType.admin_admin_cron_store, cmd_admin_admin_cron_store);
facade.registerCommand(HttpType.admin_admin_cron_update, cmd_admin_admin_cron_update);
facade.registerCommand(HttpType.admin_admin_cron_queue_table_columns, cmd_admin_admin_cron_queue_table_columns);
facade.registerCommand(HttpType.admin_admin_cron_queue_index, cmd_admin_admin_cron_queue_index);
facade.registerCommand(HttpType.admin_admin_cron_queue_update, cmd_admin_admin_cron_queue_update);
facade.registerCommand(HttpType.admin_admin_cron_queue_update_batch, cmd_admin_admin_cron_queue_update_batch);

