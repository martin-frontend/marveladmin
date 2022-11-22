/**
 * description: 平台活动规则配置
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6559410
 */
import cmd_admin_plat_activity_rule_table_columns from "@/views/plat_activity_rule/command/cmd_admin_plat_activity_rule_table_columns";
import cmd_admin_plat_activity_rule_index from "@/views/plat_activity_rule/command/cmd_admin_plat_activity_rule_index";
import cmd_admin_plat_activity_rule_store from "@/views/plat_activity_rule/command/cmd_admin_plat_activity_rule_store";
import cmd_admin_plat_activity_rule_show from "@/views/plat_activity_rule/command/cmd_admin_plat_activity_rule_show";
import cmd_admin_plat_activity_rule_update from "@/views/plat_activity_rule/command/cmd_admin_plat_activity_rule_update";
/**协议*/
export var HttpType = {
    admin_plat_activity_rule_table_columns: "admin/plat_activity_rule/table_columns",
    admin_plat_activity_rule_index: "admin/plat_activity_rule/index",
    admin_plat_activity_rule_store: "admin/plat_activity_rule/store",
    admin_plat_activity_rule_show: "admin/plat_activity_rule/show/{id}",
    admin_plat_activity_rule_update: "admin/plat_activity_rule/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_activity_rule_table_columns: "admin_plat_activity_rule_table_columns",
    admin_plat_activity_rule_index: "admin_plat_activity_rule_index",
    admin_plat_activity_rule_store: "admin_plat_activity_rule_store",
    admin_plat_activity_rule_show: "admin_plat_activity_rule_show",
    admin_plat_activity_rule_update: "admin_plat_activity_rule_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_activity_rule_table_columns, cmd_admin_plat_activity_rule_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_rule_index, cmd_admin_plat_activity_rule_index);
facade.registerCommand(HttpType.admin_plat_activity_rule_store, cmd_admin_plat_activity_rule_store);
facade.registerCommand(HttpType.admin_plat_activity_rule_show, cmd_admin_plat_activity_rule_show);
facade.registerCommand(HttpType.admin_plat_activity_rule_update, cmd_admin_plat_activity_rule_update);
