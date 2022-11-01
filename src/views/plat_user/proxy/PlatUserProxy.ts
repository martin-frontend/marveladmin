import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_user/setting";
import { Message, MessageBox } from "element-ui";
import IPlatUserProxy from "./IPlatUserProxy";
import i18n from "@/lang";
import ExchangeOrdersProxy from "@/views/exchange_orders/proxy/ExchangeOrdersProxy";

export default class PlatUserProxy extends AbstractProxy implements IPlatUserProxy {
    static NAME = "PlatUserProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
        Object.assign(this.tableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
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
            is_credit_user: { name: "信用用户", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = <any>{
        plat_id: "",
        username: "",
        channel_id: "",
        status: "",
        user_id: "",
        nick_name: "",

        "total_win-{>=}": "",
        "total_win-{<}": "",
        "created_at-{>=}": "",
        "created_at-{<}": "",
        "last_online_at-{>=}": "",
        "last_online_at-{<}": "",

        last_login_ip: "",
        register_ip: "",
        last_login_device: "",
        phone: "",
        max_level: "",
        min_level: "",
        order_by: <any>null,
        remark: '',
        is_credit_user: '',

        page_count: 1,
        page_size: 20,
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
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        for(const item of data.list){
            item.plat_money = "-";
            item.sum_money = "-";
            item.vendors_money = "-";
        }
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        const temp = [];
        for (const item of this.tableData.list) {
            if (item.user_id == data.user_id && data.gold_info_summary) {
                item.plat_money = data.gold_info_summary.plat_money;
                item.sum_money = data.gold_info_summary.sum_money;
                item.vendors_money = data.gold_info_summary.vendors_money
            }
            temp.push(item);
        }
        this.tableData.list.length = 0;
        this.tableData.list.push(...temp);

        this.dialogData.formSource = data;
        const { user_id, nick_name, gold } = data;
        Object.assign(this.dialogData.form, {
            user_id,
            nick_name,
            gold,
            deductGold: "",
        });
    }
    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            username: "",
            channel_id: "",
            status: "",
            user_id: "",
            nick_name: "",

            "total_win-{>=}": "",
            "total_win-{<}": "",
            "created_at-{>=}": "",
            "created_at-{<}": "",
            "last_online_at-{>=}": "",
            "last_online_at-{<}": "",

            last_login_ip: "",
            register_ip: "",
            last_login_device: "",
            phone: "",
            max_level: "",
            min_level: "",
            order_by: <any>null,
            is_credit_user: '',
        });
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

        this.sendNotification(HttpType.admin_plat_user_show, { user_id, modules: "[1,2]" });
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_user_index, objectRemoveNull(this.listQuery));
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
    // 刷新金币
    onRefrushGold(user_id: number) {
        this.sendNotification(HttpType.admin_plat_user_show, { user_id, modules: "[1,2]" });
    }
    // 扣款
    onDeductGold() {
        const { user_id, gold, deductGold } = this.dialogData.form;
        if (deductGold != "" && parseFloat(deductGold) > 0 && parseFloat(deductGold) <= gold) {
            MessageBox.confirm(
                <string>i18n.t("common.confirmDeductMoney", { "0": deductGold }),
                <string>i18n.t("common.prompt"),
                {
                    confirmButtonText: <string>i18n.t("common.determine"),
                    cancelButtonText: <string>i18n.t("common.cancel"),
                    type: "warning",
                    center: true,
                }
            ).then(() => {
                this.sendNotification(HttpType.admin_plat_user_update_user_gold, { user_id, gold: deductGold });
            });
        } else {
            let error: any = i18n.t("common.moneyInputError");
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
}
