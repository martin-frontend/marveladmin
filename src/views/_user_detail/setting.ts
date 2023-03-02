/**
 * description: 用户详情, 下划线开头的模块，是公共弹窗页面，不生成路由
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66855
 */
// --基本信息&user_info
import cmd_admin_plat_user_table_columns from "@/views/_user_detail/command/cmd_admin_plat_user_table_columns";
import cmd_admin_plat_user_show from "@/views/_user_detail/command/cmd_admin_plat_user_show";
import cmd_admin_plat_user_update from "@/views/_user_detail/command/cmd_admin_plat_user_update";
import cmd_admin_plat_user_phone from "@/views/_user_detail/command/cmd_admin_plat_user_phone";
import cmd_admin_plat_user_update_level_exp from "@/views/_user_detail/command/cmd_admin_plat_user_update_level_exp";
import cmd_admin_plat_user_clear_cache from "@/views/_user_detail/command/cmd_admin_plat_user_clear_cache";
// --用户钱包&wallet
import cmd_admin_plat_user_vendor_withdraw from "@/views/_user_detail/command/cmd_admin_plat_user_vendor_withdraw";
import cmd_admin_plat_user_update_safe_gold from "@/views/_user_detail/command/cmd_admin_plat_user_update_safe_gold";
import cmd_admin_plat_user_update_user_gold from "@/views/_user_detail/command/cmd_admin_plat_user_update_user_gold";
import cmd_admin_plat_user_recharge_address from "@/views/_user_detail/command/cmd_admin_plat_user_recharge_address";
import cmd_admin_plat_user_transfer_user_gold from "@/views/_user_detail/command/cmd_admin_plat_user_transfer_user_gold";
// --金币明细&gold
import cmd_admin_plat_users_gold_log_table_columns from "@/views/_user_detail/command/cmd_admin_plat_users_gold_log_table_columns";
import cmd_admin_plat_users_gold_log_index from "@/views/_user_detail/command/cmd_admin_plat_users_gold_log_index";
// --投注明细&bet
import cmd_admin_plat_users_bet_table_columns from "@/views/_user_detail/command/cmd_admin_plat_users_bet_table_columns";
import cmd_admin_plat_users_bet_index from "@/views/_user_detail/command/cmd_admin_plat_users_bet_index";
import cmd_admin_plat_users_bet_show from "@/views/_user_detail/command/cmd_admin_plat_users_bet_show";
import cmd_admin_plat_users_bet_show_url from "@/views/_user_detail/command/cmd_admin_plat_users_bet_show_url";
// --流水打码&water
import cmd_admin_statistic_user_days_table_columns from "@/views/_user_detail/command/cmd_admin_statistic_user_days_table_columns";
import cmd_admin_statistic_user_days_index from "@/views/_user_detail/command/cmd_admin_statistic_user_days_index";
// --团队成员&team
import cmd_admin_plat_user_agent_bind_index from "@/views/_user_detail/command/cmd_admin_plat_user_agent_bind_index";
import cmd_admin_plat_user_agent_bind_show from "@/views/_user_detail/command/cmd_admin_plat_user_agent_bind_show";
// --返佣明细&commission
import cmd_admin_plat_user_commission_table_columns from "@/views/_user_detail/command/cmd_admin_plat_user_commission_table_columns";
import cmd_admin_plat_user_commission_index from "@/views/_user_detail/command/cmd_admin_plat_user_commission_index";
import cmd_admin_plat_user_commission_show from "@/views/_user_detail/command/cmd_admin_plat_user_commission_show";
import cmd_admin_plat_user_commission_show_directs_water from "@/views/_user_detail/command/cmd_admin_plat_user_commission_show_directs_water";
// --关联查询&related_users
import cmd_admin_plat_user_related_users from "@/views/_user_detail/command/cmd_admin_plat_user_related_users";
// --登入日志&login_record
import cmd_admin_plat_user_login_record_table_columns from "@/views/_user_detail/command/cmd_admin_plat_user_login_record_table_columns";
import cmd_admin_plat_user_login_record_index from "@/views/_user_detail/command/cmd_admin_plat_user_login_record_index";
// --用户厂商&plat_vendor_user
import cmd_admin_plat_vendor_user_table_columns from "@/views/_user_detail/command/cmd_admin_plat_vendor_user_table_columns";
import cmd_admin_plat_vendor_user_index from "@/views/_user_detail/command/cmd_admin_plat_vendor_user_index";
import cmd_admin_plat_vendor_user_show from "@/views/_user_detail/command/cmd_admin_plat_vendor_user_show";
import cmd_admin_plat_vendor_user_money from "@/views/_user_detail/command/cmd_admin_plat_vendor_user_money";
// --信用代理&credit
import cmd_admin_plat_user_direct_users from "@/views/_user_detail/command/cmd_admin_plat_user_direct_users";
import cmd_admin_plat_users_credit_log_table_columns from "@/views/_user_detail/command/cmd_admin_plat_users_credit_log_table_columns";
import cmd_admin_plat_users_credit_log_index from "@/views/_user_detail/command/cmd_admin_plat_users_credit_log_index";
/**协议*/
export var HttpType = {
    // --基本信息&user_info
    admin_plat_user_table_columns: "admin/plat_user/table_columns ",
    admin_plat_user_show: "admin/plat_user/show/{user_id} ",
    admin_plat_user_update: "admin/plat_user/update/{user_id} ",
    admin_plat_user_phone: "admin/plat_user/phone/{user_id} ",
    admin_plat_user_update_level_exp: "admin/plat_user/update_level_exp/{user_id} ",
    admin_plat_user_clear_cache: "admin/plat_user/clear_cache/{user_id} ",
    // --用户钱包&wallet
    admin_plat_user_vendor_withdraw: "admin/plat_user/{user_id}/vendor/withdraw ",
    admin_plat_user_update_safe_gold: "admin/plat_user/update_safe_gold/{user_id} ",
    admin_plat_user_update_user_gold: "admin/plat_user/update_user_gold/{user_id} ",
    admin_plat_user_recharge_address: "admin/plat_user/recharge_address/{user_id} ",
    admin_plat_user_transfer_user_gold: "admin/plat_user/transfer_user_gold/{user_id} ",
    // --金币明细&gold
    admin_plat_users_gold_log_table_columns: "admin/plat_users_gold_log/table_columns ",
    admin_plat_users_gold_log_index: "admin/plat_users_gold_log/index ",
    // --投注明细&bet
    admin_plat_users_bet_table_columns: "admin/plat_users_bet/table_columns ",
    admin_plat_users_bet_index: "admin/plat_users_bet/index ",
    admin_plat_users_bet_show: "admin/plat_users_bet/show/{plat_id}/{bet_id} ",
    admin_plat_users_bet_show_url: "admin/plat_users_bet/show_url/{plat_id}/{bet_id} ",
    // --流水打码&water
    admin_statistic_user_days_table_columns: "admin/statistic_user_days/table_columns ",
    admin_statistic_user_days_index: "admin/statistic_user_days/index ",
    // --团队成员&team
    admin_plat_user_agent_bind_index: "admin/plat_user/agent_bind/index ",
    admin_plat_user_agent_bind_show: "admin/plat_user/agent_bind/show/{user_id} ",
    // --返佣明细&commission
    admin_plat_user_commission_table_columns: "admin/plat_user/commission/table_columns ",
    admin_plat_user_commission_index: "admin/plat_user/commission/index ",
    admin_plat_user_commission_show: "admin/plat_user/commission/show ",
    admin_plat_user_commission_show_directs_water: "admin/plat_user/commission/show/directs_water ",
    // --关联查询&related_users
    admin_plat_user_related_users: "admin/plat_user/related_users/{user_id} ",
    // --登入日志&login_record
    admin_plat_user_login_record_table_columns: "admin/plat_user_login_record/table_columns ",
    admin_plat_user_login_record_index: "admin/plat_user_login_record/index ",
    // --用户厂商&plat_vendor_user
    admin_plat_vendor_user_table_columns: "admin/plat_vendor_user/table_columns ",
    admin_plat_vendor_user_index: "admin/plat_vendor_user/index ",
    admin_plat_vendor_user_show: "admin/plat_vendor_user/show/{vendor_user_id} ",
    admin_plat_vendor_user_money: "admin/plat_vendor_user/money/{vendor_user_id} ",
    // --信用代理&credit
    admin_plat_user_direct_users: "admin/plat_user/direct_users ",
    admin_plat_users_credit_log_table_columns: "admin/plat_users_credit_log/table_columns ",
    admin_plat_users_credit_log_index: "admin/plat_users_credit_log/index ",
};
/**事件*/
export var EventType = {
    // --基本信息&user_info
    admin_plat_user_table_columns: "_admin_plat_user_table_columns",
    admin_plat_user_show: "_admin_plat_user_show",
    admin_plat_user_update: "_admin_plat_user_update",
    admin_plat_user_phone: "_admin_plat_user_phone",
    admin_plat_user_update_level_exp: "_admin_plat_user_update_level_exp",
    admin_plat_user_clear_cache: "_admin_plat_user_clear_cache",
    // --用户钱包&wallet
    admin_plat_user_vendor_withdraw: "_admin_plat_user_vendor_withdraw",
    admin_plat_user_update_safe_gold: "_admin_plat_user_update_safe_gold",
    admin_plat_user_update_user_gold: "_admin_plat_user_update_user_gold",
    admin_plat_user_recharge_address: "_admin_plat_user_recharge_address",
    admin_plat_user_transfer_user_gold: "_admin_plat_user_transfer_user_gold",
    // --金币明细&gold
    admin_plat_users_gold_log_table_columns: "_admin_plat_users_gold_log_table_columns",
    admin_plat_users_gold_log_index: "_admin_plat_users_gold_log_index",
    // --投注明细&bet
    admin_plat_users_bet_table_columns: "_admin_plat_users_bet_table_columns",
    admin_plat_users_bet_index: "_admin_plat_users_bet_index",
    admin_plat_users_bet_show: "_admin_plat_users_bet_show",
    admin_plat_users_bet_show_url: "_admin_plat_users_bet_show_url",
    // --流水打码&water
    admin_statistic_user_days_table_columns: "_admin_statistic_user_days_table_columns",
    admin_statistic_user_days_index: "_admin_statistic_user_days_index",
    // --团队成员&team
    admin_plat_user_agent_bind_index: "_admin_plat_user_agent_bind_index",
    admin_plat_user_agent_bind_show: "_admin_plat_user_agent_bind_show",
    // --返佣明细&commission
    admin_plat_user_commission_table_columns: "_admin_plat_user_commission_table_columns",
    admin_plat_user_commission_index: "_admin_plat_user_commission_index",
    admin_plat_user_commission_show: "_admin_plat_user_commission_show",
    admin_plat_user_commission_show_directs_water: "_admin_plat_user_commission_show_directs_water",
    // --关联查询&related_users
    admin_plat_user_related_users: "_admin_plat_user_related_users",
    // --登入日志&login_record
    admin_plat_user_login_record_table_columns: "_admin_plat_user_login_record_table_columns",
    admin_plat_user_login_record_index: "_admin_plat_user_login_record_index",
    // --用户厂商&plat_vendor_user
    admin_plat_vendor_user_table_columns: "_admin_plat_vendor_user_table_columns",
    admin_plat_vendor_user_index: "_admin_plat_vendor_user_index",
    admin_plat_vendor_user_show: "_admin_plat_vendor_user_show",
    admin_plat_vendor_user_money: "_admin_plat_vendor_user_money",
    // --信用代理&credit
    admin_plat_user_direct_users: "_admin_plat_user_direct_users",
    admin_plat_users_credit_log_table_columns: "_admin_plat_users_credit_log_table_columns",
    admin_plat_users_credit_log_index: "_admin_plat_users_credit_log_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
// --基本信息&user_info
facade.registerCommand(HttpType.admin_plat_user_table_columns, cmd_admin_plat_user_table_columns);
facade.registerCommand(HttpType.admin_plat_user_show, cmd_admin_plat_user_show);
facade.registerCommand(HttpType.admin_plat_user_update, cmd_admin_plat_user_update);
facade.registerCommand(HttpType.admin_plat_user_phone, cmd_admin_plat_user_phone);
facade.registerCommand(HttpType.admin_plat_user_update_level_exp, cmd_admin_plat_user_update_level_exp);
facade.registerCommand(HttpType.admin_plat_user_clear_cache, cmd_admin_plat_user_clear_cache);
// --用户钱包&wallet
facade.registerCommand(HttpType.admin_plat_user_vendor_withdraw, cmd_admin_plat_user_vendor_withdraw);
facade.registerCommand(HttpType.admin_plat_user_update_safe_gold, cmd_admin_plat_user_update_safe_gold);
facade.registerCommand(HttpType.admin_plat_user_update_user_gold, cmd_admin_plat_user_update_user_gold);
facade.registerCommand(HttpType.admin_plat_user_recharge_address, cmd_admin_plat_user_recharge_address);
facade.registerCommand(HttpType.admin_plat_user_transfer_user_gold, cmd_admin_plat_user_transfer_user_gold);
// --金币明细&gold
facade.registerCommand(HttpType.admin_plat_users_gold_log_table_columns, cmd_admin_plat_users_gold_log_table_columns);
facade.registerCommand(HttpType.admin_plat_users_gold_log_index, cmd_admin_plat_users_gold_log_index);
// --投注明细&bet
facade.registerCommand(HttpType.admin_plat_users_bet_table_columns, cmd_admin_plat_users_bet_table_columns);
facade.registerCommand(HttpType.admin_plat_users_bet_index, cmd_admin_plat_users_bet_index);
facade.registerCommand(HttpType.admin_plat_users_bet_show, cmd_admin_plat_users_bet_show);
facade.registerCommand(HttpType.admin_plat_users_bet_show_url, cmd_admin_plat_users_bet_show_url);
// --流水打码&water
facade.registerCommand(HttpType.admin_statistic_user_days_table_columns, cmd_admin_statistic_user_days_table_columns);
facade.registerCommand(HttpType.admin_statistic_user_days_index, cmd_admin_statistic_user_days_index);
// --团队成员&team
facade.registerCommand(HttpType.admin_plat_user_agent_bind_index, cmd_admin_plat_user_agent_bind_index);
facade.registerCommand(HttpType.admin_plat_user_agent_bind_show, cmd_admin_plat_user_agent_bind_show);
// --返佣明细&commission
facade.registerCommand(HttpType.admin_plat_user_commission_table_columns, cmd_admin_plat_user_commission_table_columns);
facade.registerCommand(HttpType.admin_plat_user_commission_index, cmd_admin_plat_user_commission_index);
facade.registerCommand(HttpType.admin_plat_user_commission_show, cmd_admin_plat_user_commission_show);
facade.registerCommand(HttpType.admin_plat_user_commission_show_directs_water, cmd_admin_plat_user_commission_show_directs_water);
// --关联查询&related_users
facade.registerCommand(HttpType.admin_plat_user_related_users, cmd_admin_plat_user_related_users);
// --登入日志&login_record
facade.registerCommand(HttpType.admin_plat_user_login_record_table_columns, cmd_admin_plat_user_login_record_table_columns);
facade.registerCommand(HttpType.admin_plat_user_login_record_index, cmd_admin_plat_user_login_record_index);
// --用户厂商&plat_vendor_user
facade.registerCommand(HttpType.admin_plat_vendor_user_table_columns, cmd_admin_plat_vendor_user_table_columns);
facade.registerCommand(HttpType.admin_plat_vendor_user_index, cmd_admin_plat_vendor_user_index);
facade.registerCommand(HttpType.admin_plat_vendor_user_show, cmd_admin_plat_vendor_user_show);
facade.registerCommand(HttpType.admin_plat_vendor_user_money, cmd_admin_plat_vendor_user_money);
// --信用代理&credit
facade.registerCommand(HttpType.admin_plat_user_direct_users, cmd_admin_plat_user_direct_users);
facade.registerCommand(HttpType.admin_plat_users_credit_log_table_columns, cmd_admin_plat_users_credit_log_table_columns);
facade.registerCommand(HttpType.admin_plat_users_credit_log_index, cmd_admin_plat_users_credit_log_index);

