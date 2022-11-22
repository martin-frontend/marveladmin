/**
 * description: 平台代理配置
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66312
 */
import cmd_admin_plat_table_columns from "@/views/plat_agent/command/cmd_admin_plat_table_columns";
import cmd_admin_plat_index from "@/views/plat_agent/command/cmd_admin_plat_index";
import cmd_admin_plat_show from "@/views/plat_agent/command/cmd_admin_plat_show";
import cmd_admin_plat_update from "@/views/plat_agent/command/cmd_admin_plat_update";
import cmd_admin_plat_agent_promotion_model_table_columns from "@/views/plat_agent/command/cmd_admin_plat_agent_promotion_model_table_columns";
import cmd_admin_plat_agent_promotion_model_show from "@/views/plat_agent/command/cmd_admin_plat_agent_promotion_model_show";
import cmd_admin_resource_upload from "@/views/plat_agent/command/cmd_admin_resource_upload";
/**协议*/
export var HttpType = {
    admin_plat_table_columns: "admin/plat/table_columns",
    admin_plat_index: "admin/plat/index",
    admin_plat_show: "admin/plat/show/{plat_id}",
    admin_plat_update: "admin/plat/update/{plat_id}",
    admin_plat_agent_promotion_model_table_columns: "admin/plat_agent_promotion_model/table_columns",
    admin_plat_agent_promotion_model_show: "admin/plat_agent_promotion_model/show/{promotion_model_id}",
    admin_resource_upload: "admin/resource/upload",
};
/**事件*/
export var EventType = {
    admin_plat_table_columns: "admin_plat_table_columns",
    admin_plat_index: "admin_plat_index",
    admin_plat_show: "admin_plat_show",
    admin_plat_update: "admin_plat_update",
    admin_plat_agent_promotion_model_table_columns: "admin_plat_agent_promotion_model_table_columns",
    admin_plat_agent_promotion_model_show: "admin_plat_agent_promotion_model_show",
    admin_resource_upload: "admin_resource_upload",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_table_columns, cmd_admin_plat_table_columns);
facade.registerCommand(HttpType.admin_plat_index, cmd_admin_plat_index);
facade.registerCommand(HttpType.admin_plat_show, cmd_admin_plat_show);
facade.registerCommand(HttpType.admin_plat_update, cmd_admin_plat_update);
facade.registerCommand(
    HttpType.admin_plat_agent_promotion_model_table_columns,
    cmd_admin_plat_agent_promotion_model_table_columns
);
facade.registerCommand(HttpType.admin_plat_agent_promotion_model_show, cmd_admin_plat_agent_promotion_model_show);
facade.registerCommand(HttpType.admin_resource_upload, cmd_admin_resource_upload);
