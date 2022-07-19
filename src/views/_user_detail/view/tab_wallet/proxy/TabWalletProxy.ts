import AbstractProxy from "@/core/abstract/AbstractProxy";
import { objectRemoveNull } from "@/core/global/Functions";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabWalletProxy from "./ITabWalletProxy";

export default class TabWalletProxy extends AbstractProxy implements ITabWalletProxy {
    static NAME = "TabWalletProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_table_columns);
    }

    /**离开页面时调用 */
    leave() { }

    /**表头信息 */
    tableColumns = {
        area_code: { name: "手机区号", options: {} },
        avatar: { name: "头像", options: {} },
        balance: { name: "账户余额", options: {}, tips: "账户余额=平台余额+厂商钱包金币总和" },
        channel_id: { name: "所属渠道", options: {} },
        created_at: { name: "创建时间", options: {} },
        created_by: { name: "创建人", options: {} },
        data_belong: { name: "数据归属标记", options: {} },
        email: { name: "邮箱", options: {} },
        gender: { name: "性别", options: {} },
        gold: { name: "平台余额", options: {}, tips: "" },
        gold_columns_disable: { name: "金币明细列屏蔽", options: {} },
        invite_user_id: { name: "邀请码人ID", options: {} },
        is_channel_statistic_display: { name: "渠道统计展示", options: {} },
        is_promotion_statistics_display: { name: "推广统计展示", options: {} },
        last_login_app_type: { name: "最近登陆应用平台", options: {} },
        last_login_at: { name: "最近登入时间", options: {} },
        last_login_device: { name: "最近登录设备号", options: {} },
        last_login_ip: { name: "最近登录IP", options: {} },
        last_logout_at: { name: "最近注销时间", options: {} },
        last_logout_type: { name: "最近注销类型", options: {} },
        last_online_at: { name: "最近在线时间", options: {} },
        max_level: { name: "最大等级" },
        max_mail_content_id: { name: "已处理的最大邮件内容ID", options: {} },
        min_level: { name: "最小等级" },
        nick_name: { name: "用户昵称", options: {} },
        password: { name: "用户密码", options: {} },
        phone: { name: "手机号", options: {} },
        phone_bind_at: { name: "手机号绑定时间", options: {} },
        plat_id: { name: "所属平台", options: {} },
        qq: { name: "QQ", options: {} },
        real_name: { name: "真实姓名", options: {} },
        register_app_type: { name: "创建应用平台", options: {} },
        register_ip: { name: "创建IP", options: {} },
        remark: { name: "备注", options: {} },
        safe_gold: { name: "保险箱", options: {}, tips: "存入到保险箱的金币数量" },
        salt: { name: "盐", options: {} },
        status: { name: "状态", options: {} },
        total_bet: { name: "用户总投注", options: {} },
        total_exchange: { name: "用户总兑换", options: {} },
        total_recharge: { name: "用户总充值", options: {} },
        total_valid_bet: { name: "用户总有效投注", options: {} },
        total_water: { name: "用户总流水", options: {} },
        total_win: { name: "用户总输赢", options: {} },
        updated_at: { name: "修改时间", options: {} },
        updated_by: { name: "修改人", options: {} },
        user_id: { name: "用户ID", options: {} },
        user_type: { name: "用户类型", options: {} },
        username: { name: "用户账号", options: {} },
        vendors_money: { name: "厂商余额", options: {}, tips: "在游戏厂商中的金币余额" },
        vip_level: { name: "VIP等级", options: {} },
        wechat: { name: "微信", options: {} },
    };
    /**用户详情 */
    userInfo = {
        area_code: "",
        avatar: "",
        balance: "-",
        channel_id: 0,
        created_at: "",
        created_by: "",
        data_belong: "",
        email: null,
        gender: 0,
        gold: "0.000",
        invite_user_id: 0,
        last_login_app_type: 2,
        last_login_at: "",
        last_login_device: "",
        last_login_ip: "",
        last_logout_at: "",
        last_logout_type: 0,
        last_online_at: "",
        max_mail_content_id: 353,
        nick_name: "",
        password: "xxxxxxxxxxxxxxxx",
        phone: null,
        phone_bind_at: "",
        plat_id: 0,
        qq: null,
        real_name: "",
        register_app_type: 0,
        register_ip: "",
        safe_gold: "0.000",
        salt: "",
        status: 1,
        remark: "",
        total_bet: "0.000",
        total_recharge: "0.000",
        total_exchange: "0.000",
        total_valid_bet: "0.000",
        total_water: "0.000",
        total_win: "0.000",
        updated_at: "",
        updated_by: "",
        user_id: 0,
        user_type: 1,
        username: "",
        vendors_money: "-",
        wechat: null,
        gold_info: <any>{
            // plat_money: "",
            // safe_gold: "",
            // sum_money: "",
            // vendors_money: "",
            // vendors_detail: [],
        },
        is_promotion_statistics_display: 0,
    };
    /**平台资产 */
    platMoney = <any>[];
    /**厂商资产 */
    vendorMoney = <any>[];
    /**是否正在刷新 */
    refreshing = false;

    /**扣款页面数据 */
    dialogDeductGoldData = {
        bShow: false,
        gold: "",
        coin_name_unique: "",
    };
    /**用户充值地址数据 */
    dialogRechargeAddress = {
        bShow: false,
        coin_name_unique: "",
        addressList: <any>[],
    };
    /**打开扣款弹窗 */
    showDialog(coin_name_unique: string) {
        this.dialogDeductGoldData.coin_name_unique = coin_name_unique;
        this.dialogDeductGoldData.gold = "";
        this.dialogDeductGoldData.bShow = true;
    }
    /**打开用户充值地址弹窗 */
    showRechargeAddressDialog(coin_name_unique: string) {
        this.dialogRechargeAddress.coin_name_unique = coin_name_unique;
        this.getAddressDetail(coin_name_unique);
    }

    /**取得用户充值地址 */
    getAddressDetail(coin_name_unique: string) {
        this.sendNotification(
            HttpType.admin_plat_user_recharge_address, { user_id: this.userInfo.user_id, coin_name_unique: coin_name_unique });
    }

    setRechargeAddress(data: any) {
        this.dialogRechargeAddress.addressList = data;
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableColumns, data);
        this.getGoldInfo(getPageSetting().user_id);
    }
    /**设置用户信息 */
    setUserInfo(data: any) {
        Object.assign(this.userInfo, data);
        if (data.gold_info) {
            const plat_money = [];
            const vendor_money = [];
            const keys = Object.keys(this.userInfo.gold_info);
            for (const key of keys) {
                const item = this.userInfo.gold_info[key];
                plat_money.push({
                    coin_name_unique: key,
                    sum_money: item.sum_money,
                    plat_money: item.plat_money,
                });
                for (const detail of item.vendors_detail) {
                    vendor_money.push({
                        coin_name_unique: key,
                        vendor_id: detail.vendor_id,
                        vendor_name: detail.vendor_name,
                        currency: detail.currency,
                    });
                }
            }
            this.platMoney = plat_money;
            this.vendorMoney = vendor_money;
            console.log("this.platMoney: ", this.platMoney);
            console.log("this.vendorMoney: ", this.vendorMoney);
        }
    }
    /**获取金币详情 */
    getGoldInfo(user_id: number) {
        this.refreshing = true;
        this.sendNotification(HttpType.admin_plat_user_show, { user_id, modules: "[1,2]" });
    }
    /**扣除金币 */
    onUpdateGold(gold: number, coin_name_unique: string) {
        this.sendNotification(HttpType.admin_plat_user_update_user_gold, { user_id: this.userInfo.user_id, gold, coin_name_unique });
    }
    /**提取厂商金币 */
    withdrawVendor(coin_name_unique: string, vendor_id?: number) {
        const data = { user_id: this.userInfo.user_id, vendor_id, coin_name_unique };
        this.sendNotification(HttpType.admin_plat_user_vendor_withdraw, objectRemoveNull(data));
    }
    /**提取保险箱 */
    withdrawSafeBox() {
        this.sendNotification(HttpType.admin_plat_user_update_safe_gold, { user_id: this.userInfo.user_id });
    }
}
