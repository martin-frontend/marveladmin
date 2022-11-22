import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabRelatedUsersProxy from "./ITabRelatedUsersProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import { Message, MessageBox } from "element-ui";
import i18n from "@/lang";
export default class TabRelatedUsersProxy extends AbstractProxy implements ITabRelatedUsersProxy {
    static NAME = "TabRelatedUsersProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.dialogData = {
            bShow: false,
            form: {
                nick_name: "",
                user_id: "",
                gold: 0,
                deductGold: "",
            },
            formSource: null, // 表单的原始数据
        };
    }

    /**表格相关数据 */
    tableData = {
        columns: {
            area_code: { name: "手机区号", options: {} },
            balance: { name: "账户余额", options: {}, tips: "" },
            channel_id: { name: "所属渠道", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            email: { name: "邮箱", options: {} },
            gender: { name: "性别", options: {} },
            gold: { name: "平台余额", options: {}, tips: "" },
            invite_user_id: { name: "邀请码人ID", options: {} },
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
            safe_gold: { name: "保险箱", options: {}, tips: "" },
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
            vendors_money: { name: "厂商余额", options: {}, tips: "" },
            vip_level: { name: "VIP等级", options: {} },
            wechat: { name: "微信", options: {} },
        },
        devicelList: <any>[],
        iplList: <any>[],
        bankList: <any>[],
        coinlList: <any>[],
        devicePageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        ipPageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        bankPageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        coinPageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        form: {
            nick_name: "",
            user_id: "",
            gold: 0,
            deductGold: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.devicelList.length = 0;
        this.tableData.iplList.length = 0;
        this.tableData.bankList.length = 0;
        this.tableData.coinlList.length = 0;
        this.tableData.devicelList.push(...data.same_device_users.list);
        this.tableData.iplList.push(...data.same_ip_users.list);
        this.tableData.bankList.push(...data.same_bank_users.list);
        this.tableData.coinlList.push(...data.same_coin_users.list);
        Object.assign(this.tableData.devicePageInfo, data.same_device_users.pageInfo);
        Object.assign(this.tableData.ipPageInfo, data.same_ip_users.pageInfo);
        Object.assign(this.tableData.bankPageInfo, data.same_bank_users.pageInfo);
        Object.assign(this.tableData.coinPageInfo, data.same_coin_users.pageInfo);
    }

    /**显示弹窗 */
    showDialog(data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.formSource = data;

        const { user_id, nick_name, gold } = data;
        Object.assign(this.dialogData.form, {
            user_id,
            nick_name,
            gold,
            deductGold: "",
        });

        console.log("data", this.dialogData);

        this.sendNotification(HttpType.admin_plat_user_show, { user_id, modules: "[1,2]" });
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
    // 刷新金币
    onRefrushGold(user_id: number) {
        this.sendNotification(HttpType.admin_plat_user_related_users, { user_id: getPageSetting().user_id });
    }
    // 扣款
    onDeductGold() {
        const { user_id, gold, deductGold } = this.dialogData.form;
        if (deductGold != "" && parseFloat(deductGold) > 0 && parseFloat(deductGold) <= gold) {
            MessageBox.confirm(<string>LangUtil("undefined"), <string>LangUtil("提示"), {
                confirmButtonText: <string>LangUtil("确定"),
                cancelButtonText: <string>LangUtil("取消"),
                type: "warning",
                center: true,
            }).then(() => {
                this.sendNotification(HttpType.admin_plat_user_update_user_gold, { user_id, gold: deductGold });
            });
        } else {
            let error: any = LangUtil("请输入正确的扣除金额，大于0，小于平台余额");
            Message.error({
                type: "error",
                message: error,
            });
        }
    }

    // 状态切换
    onToggleStatus(user_id: number, status: number) {
        this.facade.sendNotification(HttpType.admin_plat_user_update, { user_id, status });
    }

    getRelatedUsers() {
        this.sendNotification(HttpType.admin_plat_user_related_users, { user_id: getPageSetting().user_id });
    }
}
