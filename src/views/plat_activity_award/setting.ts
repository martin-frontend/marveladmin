/**
 * description: 派奖查询
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6559439
 */
import cmd_admin_plat_activity_award_table_columns from "@/views/plat_activity_award/command/cmd_admin_plat_activity_award_table_columns";
import cmd_admin_plat_activity_award_index from "@/views/plat_activity_award/command/cmd_admin_plat_activity_award_index";
import cmd_admin_plat_activity_award_show from "@/views/plat_activity_award/command/cmd_admin_plat_activity_award_show";
import cmd_admin_plat_activity_award_send_by_hand from "@/views/plat_activity_award/command/cmd_admin_plat_activity_award_send_by_hand";
import cmd_admin_plat_index from "@/views/plat_activity_award/command/cmd_admin_plat_index";
/**协议*/
export var HttpType = {
    admin_plat_activity_award_table_columns: "admin/plat_activity_award/table_columns",
    admin_plat_activity_award_index: "admin/plat_activity_award/index",
    admin_plat_activity_award_show: "admin/plat_activity_award/show/{id}",
    admin_plat_activity_award_send_by_hand: "admin/plat_activity_award/send_by_hand",
    admin_plat_index: "admin/plat/index",
};
/**事件*/
export var EventType = {
    admin_plat_activity_award_table_columns: "admin_plat_activity_award_table_columns",
    admin_plat_activity_award_index: "admin_plat_activity_award_index",
    admin_plat_activity_award_show: "admin_plat_activity_award_show",
    admin_plat_activity_award_send_by_hand: "admin_plat_activity_award_send_by_hand",
    admin_plat_index: "admin_plat_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_activity_award_table_columns, cmd_admin_plat_activity_award_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_award_index, cmd_admin_plat_activity_award_index);
facade.registerCommand(HttpType.admin_plat_activity_award_show, cmd_admin_plat_activity_award_show);
facade.registerCommand(HttpType.admin_plat_activity_award_send_by_hand, cmd_admin_plat_activity_award_send_by_hand);
facade.registerCommand(HttpType.admin_plat_index, cmd_admin_plat_index);

