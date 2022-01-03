/**
 * description: 消息系统
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706867
 */
import cmd_admin_plat_message_table_columns from "@/views/plat_message/command/cmd_admin_plat_message_table_columns";
import cmd_admin_plat_message_index from "@/views/plat_message/command/cmd_admin_plat_message_index";
/**协议*/
export var HttpType = {
    admin_plat_message_table_columns: "admin/plat_message/table_columns",
    admin_plat_message_index: "admin/plat_message/index",
};
/**事件*/
export var EventType = {
    admin_plat_message_table_columns: "admin_plat_message_table_columns",
    admin_plat_message_index: "admin_plat_message_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_message_table_columns, cmd_admin_plat_message_table_columns);
facade.registerCommand(HttpType.admin_plat_message_index, cmd_admin_plat_message_index);

