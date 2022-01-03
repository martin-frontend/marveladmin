/**
 * description: 登录
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558237
 */
import cmd_admin_admin_user_login from "@/core/command/cmd_admin_admin_user_login";
import cmd_admin_admin_user_mine from "@/core/command/cmd_admin_admin_user_mine";
import cmd_admin_index_message_show from "@/core/command/cmd_admin_index_message_show";
import cmd_admin_admin_user_google_key from "@/views/login/command/cmd_admin_admin_user_google_key";
/**协议*/
export var HttpType = {
    admin_admin_user_login: "admin/admin_user/login",
    admin_admin_user_mine: "admin/admin_user/mine",
    admin_admin_user_google_key:"admin/admin_user/google_key",
    admin_index_message_show: "admin/index_message/show"
};
/**事件*/
export var EventType = {
    admin_admin_user_login: "admin_admin_user_login",
    admin_admin_user_mine: "admin_admin_user_mine",
    admin_admin_user_google_key:"admin_admin_user_google_key",
    admin_index_message_show: "admin_index_message_show"
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_user_login, cmd_admin_admin_user_login);
facade.registerCommand(HttpType.admin_admin_user_mine, cmd_admin_admin_user_mine);
facade.registerCommand(HttpType.admin_admin_user_google_key, cmd_admin_admin_user_google_key);
facade.registerCommand(HttpType.admin_index_message_show, cmd_admin_index_message_show);