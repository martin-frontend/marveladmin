/**
 * description: 活动模版配置
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6559173
 */
import cmd_admin_plat_activity_model_table_columns from "@/views/plat_activity_model/command/cmd_admin_plat_activity_model_table_columns";
import cmd_admin_plat_activity_model_index from "@/views/plat_activity_model/command/cmd_admin_plat_activity_model_index";
import cmd_admin_plat_activity_model_store from "@/views/plat_activity_model/command/cmd_admin_plat_activity_model_store";
import cmd_admin_plat_activity_model_show from "@/views/plat_activity_model/command/cmd_admin_plat_activity_model_show";
import cmd_admin_plat_activity_model_update from "@/views/plat_activity_model/command/cmd_admin_plat_activity_model_update";
import cmd_admin_plat_activity_model_plat_table_columns from "@/views/plat_activity_model/command/cmd_admin_plat_activity_model_plat_table_columns";
import cmd_admin_plat_activity_model_plat_index from "@/views/plat_activity_model/command/cmd_admin_plat_activity_model_plat_index";
import cmd_admin_plat_activity_model_plat_store from "@/views/plat_activity_model/command/cmd_admin_plat_activity_model_plat_store";
import cmd_admin_plat_index from "@/views/plat_activity_model/command/cmd_admin_plat_index";
import cmd_admin_plat_activity_rule_index from "@/views/plat_activity_model/command/cmd_admin_plat_activity_rule_index";
/**协议*/
export var HttpType = {
    admin_plat_activity_model_table_columns: "admin/plat_activity_model/table_columns",
    admin_plat_activity_model_index: "admin/plat_activity_model/index",
    admin_plat_activity_model_store: "admin/plat_activity_model/store",
    admin_plat_activity_model_show: "admin/plat_activity_model/show/{id}",
    admin_plat_activity_model_update: "admin/plat_activity_model/update/{id}",
    admin_plat_activity_model_plat_table_columns: "admin/plat_activity_model_plat/table_columns",
    admin_plat_activity_model_plat_index: "admin/plat_activity_model_plat/index",
    admin_plat_activity_model_plat_store: "admin/plat_activity_model_plat/store",
    admin_plat_index: "admin/plat/index",
    admin_plat_activity_rule_index: "admin/plat_activity_rule/index",
};
/**事件*/
export var EventType = {
    admin_plat_activity_model_table_columns: "admin_plat_activity_model_table_columns",
    admin_plat_activity_model_index: "admin_plat_activity_model_index",
    admin_plat_activity_model_store: "admin_plat_activity_model_store",
    admin_plat_activity_model_show: "admin_plat_activity_model_show",
    admin_plat_activity_model_update: "admin_plat_activity_model_update",
    admin_plat_activity_model_plat_table_columns: "admin_plat_activity_model_plat_table_columns",
    admin_plat_activity_model_plat_index: "admin_plat_activity_model_plat_index",
    admin_plat_activity_model_plat_store: "admin_plat_activity_model_plat_store",
    admin_plat_index: "admin_plat_index",
    admin_plat_activity_rule_index: "admin_plat_activity_rule_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_activity_model_table_columns, cmd_admin_plat_activity_model_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_model_index, cmd_admin_plat_activity_model_index);
facade.registerCommand(HttpType.admin_plat_activity_model_store, cmd_admin_plat_activity_model_store);
facade.registerCommand(HttpType.admin_plat_activity_model_show, cmd_admin_plat_activity_model_show);
facade.registerCommand(HttpType.admin_plat_activity_model_update, cmd_admin_plat_activity_model_update);
facade.registerCommand(HttpType.admin_plat_activity_model_plat_table_columns, cmd_admin_plat_activity_model_plat_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_model_plat_index, cmd_admin_plat_activity_model_plat_index);
facade.registerCommand(HttpType.admin_plat_activity_model_plat_store, cmd_admin_plat_activity_model_plat_store);
facade.registerCommand(HttpType.admin_plat_index, cmd_admin_plat_index);
facade.registerCommand(HttpType.admin_plat_activity_rule_index, cmd_admin_plat_activity_rule_index);

