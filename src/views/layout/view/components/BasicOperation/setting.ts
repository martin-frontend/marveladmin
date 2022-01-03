/**
 * description: 账户信息新增
 * document: http://18.167.151.206:8090/pages/viewpage.action?pageId=11076183#id-6.%E5%B8%81%E5%95%86%E4%BB%A3%E4%BB%98%E8%AE%A2%E5%8D%95-%E4%BC%98%E5%8C%96%E8%AE%B0%E5%BD%95%E6%9F%A5%E8%AF%A2
 */

import cmd_admin_coin_wallet_update from "@/views/coin_wallet/command/cmd_admin_coin_wallet_update";
import cmd_admin_coin_wallet_index from "@/views/coin_wallet/command/cmd_admin_coin_wallet_index";

/**协议*/
export var HttpType = {
    admin_coin_wallet_update: "admin/coin_wallet/update",
    admin_coin_wallet_index: "admin/coin_wallet/index",
};
/**事件*/
export var EventType = {
    admin_coin_wallet_update: "admin_coin_wallet_update",
    admin_coin_wallet_index: "admin_coin_wallet_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_coin_wallet_update, cmd_admin_coin_wallet_update);
facade.registerCommand(HttpType.admin_coin_wallet_index, cmd_admin_coin_wallet_index);
