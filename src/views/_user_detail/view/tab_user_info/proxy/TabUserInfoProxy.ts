import AbstractProxy from "@/core/abstract/AbstractProxy";
import { HttpType } from "@/views/_user_detail/setting";
import ITabUserInfoProxy from "./ITabUserInfoProxy";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import GlobalEventType from "@/core/global/GlobalEventType";
import { MD5 } from "@/core/global/MD5";

export default class TabUserInfoProxy extends AbstractProxy implements ITabUserInfoProxy {
    static NAME = "TabUserInfoProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.relationChain.length = 0;
    }

    /**表头信息 */
    tableColumns: any = {
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
        gold_columns_disable: { name: "金币明细列屏蔽", options: <any>{} },
        google_key: { name: "谷歌验证码KEY", options: <any>{} },
        invite_user_id: { name: "邀请码人ID", options: {} },
        is_channel_statistic_display: { name: "渠道统计展示", options: {} },
        is_promotion_statistics_display: { name: "推广统计展示", options: {} },
        is_google_scan: { name: "是扫描过二维码", options: {} },
        is_login_need_google: { name: "登录是否需要谷歌验证码", options: {} },
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
        base_recharge: { name: "", options: {} },
        base_water: { name: "", options: {} },
        is_receive_commission: { name: "", options: {} },
        is_check_gold_water: { name: "", options: {} },
        is_exchange_order_auto_check: { name: "", options: {} },
        is_can_game: { name: "", options: {} },
        is_receive_reward: { name: "", options: {} },
        is_gold_transfer: { name: "", options: {} },
        water_config: { name: "", options: {} },
        pretty_user_id: { name: "推广靓号", options: {} },

        credit_rate: { name: "信用占比", options: {} },
        show_credit_statistic: { name: '"显示信用统计"', options: {} },
        show_credit_report: { name: "信用报表", options: {} },
        is_credit_user: { name: "信用用户", options: {} },
        is_gold_exchange: { name: "是否货币互转", options: {} },
        show_credit_set: { name: "允许多层", options: {} },
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
        google_key: "",
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
        status: "1",
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
        gold_info: {
            plat_money: "",
            safe_gold: "",
            sum_money: "",
            vendors_money: "",
            vendors_detail: [],
        },
        gold_columns_disable: "",
        gold_columns_disable_ary: <any>[],
        gold_columns_disable_list: "",
        is_promotion_statistics_display: "0",
        is_channel_statistic_display: "0",
        base_recharge: "",
        base_water: "",
        is_receive_commission: "0",
        is_check_gold_water: "0",
        is_exchange_order_auto_check: "0",
        is_can_game: "0",
        is_receive_reward: "0",
        is_gold_transfer: "0",
        pretty_user_id: "",
        show_credit_statistic: "0",
        show_credit_report: "0",
        show_credit_set: "0",
        credit_rate: 60,
        is_credit_user: "98",
        is_gold_exchange: "98",
        is_login_need_google: "0",
    };
    /**代理关系链 */
    relationChain: string[] = [];
    /**弹窗数据 */
    dialogData = {
        bShow: false,
        filed: "",
        filedValue: "",
        filedValue1: "",
    };
    /**
     * 打开弹窗
     * @param filed 要修改的属性
     */
    showDialog(filed: string) {
        this.dialogData.filed = filed;
        this.dialogData.filedValue = this.dialogData.filedValue1 = "";
        if (filed != "password") {
            // @ts-ignore
            this.dialogData.filedValue = this.userInfo[filed];
        }
        if (filed == "gold_columns_disable") {
            this.dialogData.filedValue = this.userInfo.gold_columns_disable_ary;
        }
        this.dialogData.bShow = true;
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableColumns, data);
        this.getUserDetail(getPageSetting().user_id);
    }
    /**设置用户信息 */
    setUserInfo(data: any) {
        Object.assign(this.userInfo, data);
        getPageSetting().plat_id = data.plat_id;
        let str = "";
        let strAry = this.userInfo.gold_columns_disable.split(",");
        if (!this.userInfo.gold_columns_disable) {
            str = "-";
            strAry = [];
        } else {
            for (let i = 0; i < strAry.length; i++) {
                str += this.tableColumns.gold_columns_disable.options[strAry[i]];
                if (i < strAry.length - 1) {
                    str += ",";
                }
            }
        }
        this.userInfo.gold_columns_disable_ary = strAry;
        this.userInfo.gold_columns_disable_list = str;
    }
    /**设置关系链 */
    setRelationChain(data: any) {
        this.relationChain.length = 0;
        this.relationChain.push(...data.bind_relation.split("-").filter((value: string) => value != ""));
    }
    /**获取用户详情及关系链 */
    getUserDetail(user_id: any) {
        this.sendNotification(HttpType.admin_plat_user_show, { user_id });
        this.sendNotification(HttpType.admin_plat_user_agent_bind_show, { user_id, hideLoading: true });
    }
    /**修改 */
    onEdit(filed: string, filedValue: string) {
        if (filed == "password") filedValue = MD5.createInstance().hex_md5(filedValue);
        if (filed == "base_recharge" || filed == "base_water") {
            this.sendNotification(HttpType.admin_plat_user_update_level_exp, {
                user_id: this.userInfo.user_id,
                [filed]: filedValue,
            });
        } else {
            this.sendNotification(HttpType.admin_plat_user_update, {
                user_id: this.userInfo.user_id,
                [filed]: filedValue,
            });
        }
    }
    /**获取手机号 */
    onGetPhone() {
        this.sendNotification(HttpType.admin_plat_user_phone, { user_id: this.userInfo.user_id });
    }
    /**打开用户详情页 */
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
    /**清除緩存 */
    clearCache(user_id: number) {
        this.sendNotification(HttpType.admin_plat_user_clear_cache, { user_id: user_id });
    }

    /**清除谷歌验证码 */
    clearGoogle(user_id: number) {
        this.sendNotification(HttpType.admin_plat_user_update, { user_id: user_id, google_key: "" });
    }
}
