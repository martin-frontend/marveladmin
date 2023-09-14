/**
 * description: 活动管理
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6559212
 */
import cmd_admin_plat_activity_table_columns from "@/views/plat_activity/command/cmd_admin_plat_activity_table_columns";
import cmd_admin_plat_activity_index from "@/views/plat_activity/command/cmd_admin_plat_activity_index";
import cmd_admin_plat_activity_store from "@/views/plat_activity/command/cmd_admin_plat_activity_store";
import cmd_admin_plat_activity_show from "@/views/plat_activity/command/cmd_admin_plat_activity_show";
import cmd_admin_plat_activity_update from "@/views/plat_activity/command/cmd_admin_plat_activity_update";
import cmd_admin_plat_index from "@/views/plat_activity/command/cmd_admin_plat_index";
import cmd_admin_plat_activity_model_index from "@/views/plat_activity/command/cmd_admin_plat_activity_model_index";
import cmd_admin_plat_activity_rule_index from "@/views/plat_activity/command/cmd_admin_plat_activity_rule_index";
import cmd_admin_plat_activity_model_show from "@/views/plat_activity/command/cmd_admin_plat_activity_model_show";
import cmd_admin_resource_upload from "@/views/plat_activity/command/cmd_admin_resource_upload";
import cmd_admin_plat_activity_ball_prize_update from "@/views/plat_activity/command/cmd_admin_plat_activity_ball_prize_update";
import cmd_admin_plat_activity_condition_table_columns from "@/views/plat_activity/command/cmd_admin_plat_activity_condition_table_columns";
import cmd_admin_plat_activity_condition_show from "@/views/plat_activity/command/cmd_admin_plat_activity_condition_show";
import cmd_admin_plat_activity_condition_update from "@/views/plat_activity/command/cmd_admin_plat_activity_condition_update";
/**协议*/
export var HttpType = {
    admin_plat_activity_table_columns: "admin/plat_activity/table_columns",
    admin_plat_activity_index: "admin/plat_activity/index",
    admin_plat_activity_store: "admin/plat_activity/store",
    admin_plat_activity_show: "admin/plat_activity/show/{id}",
    admin_plat_activity_update: "admin/plat_activity/update/{id}",
    admin_plat_index: "admin/plat/index",
    admin_plat_activity_model_index: "admin/plat_activity_model/index",
    admin_plat_activity_rule_index: "admin/plat_activity_rule/index",
    admin_plat_activity_model_show: "admin/plat_activity_model/show/{id}",
    admin_resource_upload: "admin/resource/upload",
    admin_plat_activity_ball_prize_update: "admin/plat_activity/ball_prize_update/{id}",
    admin_plat_activity_condition_table_columns: "admin/plat_activity_condition/table_columns",
    admin_plat_activity_condition_show: "admin/plat_activity_condition/show/{id}",
    admin_plat_activity_condition_update: "admin/plat_activity_condition/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_activity_table_columns: "admin_plat_activity_table_columns",
    admin_plat_activity_index: "admin_plat_activity_index",
    admin_plat_activity_store: "admin_plat_activity_store",
    admin_plat_activity_show: "admin_plat_activity_show",
    admin_plat_activity_update: "admin_plat_activity_update",
    admin_plat_index: "admin_plat_index",
    admin_plat_activity_model_index: "admin_plat_activity_model_index",
    admin_plat_activity_rule_index: "admin_plat_activity_rule_index",
    admin_plat_activity_model_show: "admin_plat_activity_model_show",
    admin_resource_upload: "admin_resource_upload",
    admin_plat_activity_ball_prize_update: "admin_plat_activity_ball_prize_update",
    admin_plat_activity_condition_table_columns: "admin_plat_activity_condition_table_columns",
    admin_plat_activity_condition_show: "admin_plat_activity_condition_show",
    admin_plat_activity_condition_update: "admin_plat_activity_condition_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_activity_table_columns, cmd_admin_plat_activity_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_index, cmd_admin_plat_activity_index);
facade.registerCommand(HttpType.admin_plat_activity_store, cmd_admin_plat_activity_store);
facade.registerCommand(HttpType.admin_plat_activity_show, cmd_admin_plat_activity_show);
facade.registerCommand(HttpType.admin_plat_activity_update, cmd_admin_plat_activity_update);
facade.registerCommand(HttpType.admin_plat_index, cmd_admin_plat_index);
facade.registerCommand(HttpType.admin_plat_activity_model_index, cmd_admin_plat_activity_model_index);
facade.registerCommand(HttpType.admin_plat_activity_rule_index, cmd_admin_plat_activity_rule_index);
facade.registerCommand(HttpType.admin_plat_activity_model_show, cmd_admin_plat_activity_model_show);
facade.registerCommand(HttpType.admin_resource_upload, cmd_admin_resource_upload);
facade.registerCommand(HttpType.admin_plat_activity_ball_prize_update, cmd_admin_plat_activity_ball_prize_update);
facade.registerCommand(HttpType.admin_plat_activity_condition_table_columns, cmd_admin_plat_activity_condition_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_condition_show, cmd_admin_plat_activity_condition_show);
facade.registerCommand(HttpType.admin_plat_activity_condition_update, cmd_admin_plat_activity_condition_update);

