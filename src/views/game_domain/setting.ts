/**
 * description: 游戏域名
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707718
 */
import cmd_admin_game_domain_table_columns from "@/views/game_domain/command/cmd_admin_game_domain_table_columns";
import cmd_admin_game_domain_index from "@/views/game_domain/command/cmd_admin_game_domain_index";
import cmd_admin_game_domain_show from "@/views/game_domain/command/cmd_admin_game_domain_show";
import cmd_admin_game_domain_store from "@/views/game_domain/command/cmd_admin_game_domain_store";
import cmd_admin_game_domain_update from "@/views/game_domain/command/cmd_admin_game_domain_update";
/**协议*/
export var HttpType = {
    admin_game_domain_table_columns: "admin/game_domain/table_columns",
    admin_game_domain_index: "admin/game_domain/index",
    admin_game_domain_show: "admin/game_domain/show/{id}",
    admin_game_domain_store: "admin/game_domain/store",
    admin_game_domain_update: "admin/game_domain/update/{id}",
};
/**事件*/
export var EventType = {
    admin_game_domain_table_columns: "admin_game_domain_table_columns",
    admin_game_domain_index: "admin_game_domain_index",
    admin_game_domain_show: "admin_game_domain_show",
    admin_game_domain_store: "admin_game_domain_store",
    admin_game_domain_update: "admin_game_domain_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_game_domain_table_columns, cmd_admin_game_domain_table_columns);
facade.registerCommand(HttpType.admin_game_domain_index, cmd_admin_game_domain_index);
facade.registerCommand(HttpType.admin_game_domain_show, cmd_admin_game_domain_show);
facade.registerCommand(HttpType.admin_game_domain_store, cmd_admin_game_domain_store);
facade.registerCommand(HttpType.admin_game_domain_update, cmd_admin_game_domain_update);

