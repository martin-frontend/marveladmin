import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { formCompared, getUrl, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_user/setting";
import { Message, MessageBox } from "element-ui";
import IPlatUserProxy from "./IPlatUserProxy";
import { MD5 } from "@/core/global/MD5";
import { BaseInfo } from "@/components/vo/commonVo";
import { checkUnique, unique } from "@/core/global/Permission";
import { DialogStatus, SuccessMessage } from "@/core/global/Constant";
import Http from "@/core/net/Http";

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
    protected isChannelUser = false;
    /**表格相关数据 */
    tableData = {
        columns: <any>{
            user_id: { name: "用户ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            plat_id: { name: "所属平台", options: {} },
            channel_id: { name: "所属渠道", options: {} },
            username: { name: "用户账号", options: [] },
            password: { name: "用户密码", options: [] },
            password_gold: { name: "用户金币密码", options: [] },
            nick_name: { name: "用户昵称", options: [] },
            real_name: { name: "真实姓名", options: [] },
            email: { name: "邮箱", options: [] },
            area_code: { name: "手机区号", options: [] },
            phone: { name: "手机号", options: [] },
            backup_phone: { name: "手机号(选填)", options: [] },
            phone_bind_at: { name: "手机号绑定时间", options: [] },
            wechat: { name: "微信", options: [] },
            qq: { name: "QQ", options: [] },
            bsc_address: { name: "钱包地址", options: [] },
            avatar: { name: "头像", options: [] },
            gender: { name: "性别", options: {} },
            user_type: { name: "用户类型", options: {} },
            status: { name: "状态", options: {} },
            salt: { name: "盐", options: [] },
            pretty_user_id: { name: "推广靓号", options: [] },
            invite_user_id: { name: "邀请码人ID", options: [] },
            is_promotion_statistics_display: { name: "推广统计展示", options: {} },
            is_channel_statistic_display: { name: "渠道统计展示", options: {} },
            is_receive_commission: { name: "佣金可否领取", options: {} },
            is_check_gold_water: { name: "是否审核流水", options: {} },
            is_exchange_order_auto_check: { name: "兑换自动审核", options: {} },
            is_can_game: { name: "是否进行游戏", options: {} },
            is_receive_reward: { name: "是否领取奖励", options: {} },
            is_gold_transfer: { name: "是否划转资产", options: {} },
            is_credit_user: { name: "用户类型", options: {} },
            show_credit_statistic: { name: "显示信用统计", options: {} },
            show_credit_report: { name: "信用报表", options: {} },
            show_credit_set: { name: "允许多层", options: {} },
            credit_rate_min: { name: "信用占成-最小", options: [] },
            credit_rate_max: { name: "信用占成-最大", options: [] },
            credit_rate: { name: "我的占成", options: [] },
            credit_rate_invited: { name: "上级占成", options: [] },
            is_gold_exchange: { name: "是否货币互转", options: {} },
            water_config: { name: "流水配置", options: [] },
            vendor_type_switch: { name: "游戏类型开关", options: [] },
            vendor_config: { name: "三方游戏配置", options: [] },
            gold_columns_disable: { name: "金币明细列屏蔽", options: {} },
            ignore_statistic: { name: "统计是否忽略", options: {} },
            register_ip: { name: "创建IP", options: [] },
            register_app_type: { name: "创建应用平台", options: [] },
            last_login_app_type: { name: "最近登陆应用平台", options: {} },
            first_login_device: { name: "首次登录设备号", options: [] },
            last_login_device: { name: "最近登录设备号", options: [] },
            last_login_ip: { name: "最近登录IP", options: [] },
            last_login_at: { name: "最近登入时间", options: [] },
            last_online_at: { name: "最近在线时间", options: [] },
            last_logout_type: { name: "最近注销类型", options: {} },
            last_logout_at: { name: "最近注销时间", options: [] },
            remark: { name: "备注", options: [], tips: "输入*会搜出非空的资料" },
            business_card: { name: "个人名片", options: [] },
            google_key: { name: "谷歌验证码KEY", options: [] },
            is_google_scan: { name: "是扫描过二维码", options: [] },
            is_login_need_google: { name: "登录是否需要谷歌验证码", options: [] },
            find_at: { name: "员工找到客户日期", options: [] },
            user_source: { name: "客户来源", options: [] },
            recharge_times: { name: "充值笔数", options: {} },
            exchange_times: { name: "兑换笔数", options: [] },
            created_by: { name: "创建人", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_by: { name: "修改人", options: [] },
            updated_at: { name: "修改时间", options: [] },
            gold: {
                name: "平台余额",
                options: [],
                tips: "当前平台剩余金币数量。已经进入到厂商的金币、以及保险箱的金币不算在内",
            },
            reward_gold: { name: "用户奖励币", options: [] },
            safe_gold: { name: "保险箱", options: [], tips: "存入到保险箱的金币数量" },
            total_recharge: { name: "用户总充值", options: [] },
            total_reward_gold: { name: "用户总奖励币", options: [] },
            total_exchange: { name: "用户总兑换", options: [] },
            total_bet: { name: "用户总投注", options: [] },
            total_valid_bet: { name: "用户总有效投注", options: [] },
            total_win: { name: "用户总输赢", options: [] },
            base_recharge: { name: "用户总充值基础值", options: [] },
            total_water: { name: "用户总流水", options: [] },
            base_water: { name: "用户总流水基础值", options: [] },
            max_mail_content_id: { name: "已处理的最大邮件内容ID", options: [] },
            vendor_type: { name: "产品类型", options: {} },
            agent_user_id: { name: "代理ID" },
            balance: { name: "账户余额", options: [], tips: "账户余额=平台余额+厂商钱包金币总和" },
            vendors_money: { name: "厂商余额", options: [], tips: "在游戏厂商中的金币余额" },
            max_level: { name: "最大等级" },
            min_level: { name: "最小等级" },
            vip_level: { name: "VIP等级", options: {} },
            first_recharge: { name: "", options: {} },
            contact_info: { name: "", options: {} },
            invite_user: { name: "", options: {} },
            last_exchange: { name: "", options: {} },
            last_recharge: { name: "", options: {} },
            coin_name_unique_arr: { name: "", options: {} },
            is_cash_agent: { name: "充值兑换开关", options: {} },
            cpf: { name: "cpf", options: {} },
            is_recharged: { name: "是否充值", options: {} },
            is_back_visit: { name: "是否回访", options: {} },
            recharge_amount: { name: "充值金额", options: [] },
            paytime: { name: "第一次充值时间", options: [] },
            city: { name: "城市", options: [] },
            country: { name: "国家", options: [] },
            user_tag: { name: "用户标签", options: {} },
            ma_token: { name: "ma_token", options: {} },
            bet_at: { name: '最后投注时间', options: {} },
            is_ma_token: { name: 'ma_token用户', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        multipleSelection: <any>[],
    };
    /**查询条件 */
    listQuery = <any>{
        agent_user_id: "",
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
        first_login_device: "",
        last_login_device: "",
        phone: "",
        max_level: "",
        min_level: "",
        order_by: <any>null,
        remark: "",
        is_credit_user: "",
        is_gold_exchange: "",
        cpf: "",
        is_recharged: "",
        is_back_visit: "",
        recharge_amount: "",
        page_count: 1,
        page_size: 20,
        "paytime-{>=}": "",
        "paytime-{<}": "",
        user_tag: "",
        email: "",
        ma_token: "",
        is_ma_token: "",
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "plat_id",
            "channel_id",
            "user_id",
            "ma_token",
            "username",
            "nick_name",
            "remark",
            "vip_level",
            "real_name",
            "is_credit_user",
            "phone",
            "email",
            "status",
            "is_back_visit",
            "balance",
            "gold",
            "vendors_money",
            "safe_gold",
            "is_recharged",
            "user_tag",
            "total_recharge",
            "total_exchange",
            "total_water",
            "total_win",
            "first_login_device",
            "last_login_device",
            "created_at",
            "last_online_at",
            "register_ip",
            "last_login_ip",
            "city",
            "country",
        ],
    };

    /**导出 相关数据 */
    exportData = {
        fieldOrder: <any>[],
        stop: false,
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
        isSearch: true,
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        form: {
            nick_name: "",
            user_id: "",
            gold: 0,
            deductGold: "",
            show_credit_report: 0,
        },
        formSource: null, // 表单的原始数据
    };

    walletDialogData = {
        bShow: false,
        data: <any>{},
    };

    creditUserDialogData = {
        bShow: false,
        form: <any>{
            show_credit_report: 0,
            username: "",
            password: "",
            water_config: { "0": 0, "2": 0, "4": 0, "8": 0, "16": 0, "32": 0, "64": 0, "128": 0 },
            credit_rate_min: "",
            credit_rate_max: "",
            is_cash_agent: 98,
        },
        backwater_config: <any>{ "0": 0, "2": 0, "4": 0, "8": 0, "16": 0, "32": 0, "64": 0, "128": 0 },
    };

    listQuery_mutiple = <any>{
        plat_id: "",
        user_id: "",
        username: "",
        channel_id: "",
        status: "",
        nick_name: "",
        "created_at-{>=}": "",
        "created_at-{<}": "",
        remark: "",
        is_credit_user: "",
        is_gold_exchange: "",
        admin_added_batch: "",
        page_count: 1,
        page_size: 20,
    };
    resetListQuery_mutiple() {
        Object.assign(this.listQuery_mutiple, {
            user_id: "",
            username: "",
            channel_id: "",
            status: "",
            nick_name: "",
            "created_at-{>=}": "",
            "created_at-{<}": "",
            remark: "",
            admin_added_batch: "",
            is_credit_user: "",
            is_gold_exchange: "",
            page_count: 1,
            page_size: 20,
        });
    }
    mutipleUserDialogData = {
        bShow: false,
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    addMutipleUserData = {
        status: DialogStatus.create,
        bShow: false,
        isExportExcel: false,
        form: {
            usernames: "",
            passwords: "",
            status: 1,
            plat_id: "",
            channel_id: "",
            remark: "",
            admin_added_batch: "",
            user_id: "", //用户 id
            user_count: 0, //新增数量
            username: "",
        },
        formSource: null, // 表单的原始数据
        excelColumnInfo: {
            username: { name: LangUtil("用户账号"), options: {} },
            password: { name: LangUtil("密码"), options: {} },
        },
    };

    changeChannelDialogData = {
        bShow: false,
        form: <any>{
            channel_id: "",
        },
    };

    addMutipleTagData = {
        bShow: false,
        isUpdateAll: false,
        form: <any>{
            tags: [],
        },
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
        for (const item of data.list) {
            item.plat_money = "-";
            item.sum_money = "-";
            item.vendors_money = "-";

            if (item.coin_name_unique_arr && item.coin_name_unique_arr.length > 0) {
                item.gold_info = <any>{};
                for (let index = 0; index < item.coin_name_unique_arr.length; index++) {
                    const element = item.coin_name_unique_arr[index];
                    item.gold_info[element] = <any>{};
                    item.gold_info[element].sum_money = "-";
                }
            }

            const newArr: any = [];
            if (item.user_tag) {
                const arr = item.user_tag.split(",");
                // @ts-ignore
                arr.forEach(tag => {
                    if (this.tableData.columns.user_tag.options[this.listQuery.plat_id][Number(tag)]) {
                        newArr.push(Number(tag));
                    }
                });
            }
            item.user_tag = newArr;
        }
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**新增多位用户表格数据 */
    setMutipleUserDialogTableData(data: any) {
        this.mutipleUserDialogData.list.length = 0;
        this.mutipleUserDialogData.list.push(...data.list);
        Object.assign(this.mutipleUserDialogData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        const temp = [];
        for (const item of this.tableData.list) {
            if (item.user_id == data.user_id && data.gold_info_summary) {
                item.plat_money = data.gold_info_summary.plat_money;
                item.sum_money = data.gold_info_summary.sum_money;
                item.vendors_money = data.gold_info_summary.vendors_money;

                if (item.gold_info) {
                    const keys = Object.keys(item.gold_info);
                    for (let index = 0; index < keys.length; index++) {
                        Object.assign(item.gold_info[keys[index]], data.gold_info[keys[index]]);
                    }
                }
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
            agent_user_id: "",
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
            first_login_device: "",
            last_login_device: "",
            phone: "",
            max_level: "",
            min_level: "",
            order_by: <any>null,
            is_credit_user: "",
            cpf: "",
            is_recharged: "",
            is_back_visit: "",
            recharge_amount: "",
            "paytime-{>=}": "",
            "paytime-{<}": "",
            user_tag: "",
            email: "",
            ma_token: "",
            is_ma_token: "",
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
    /**显示弹窗 */
    showAddMultipleUserDialog(status: string, data?: any) {
        this.addMutipleUserData.bShow = true;
        this.addMutipleUserData.status = status;

        if (status == DialogStatus.update) {
            this.addMutipleUserData.formSource = data;
            Object.assign(this.addMutipleUserData.form, JSON.parse(JSON.stringify(data)));
            this.addMutipleUserData.form.plat_id = this.addMutipleUserData.form.plat_id + "";
            this.addMutipleUserData.form.channel_id = this.addMutipleUserData.form.channel_id + "";

            console.log("-----data----", this.addMutipleUserData.form);
        } else {
            this.resetDialogForm_multiple();
            this.addMutipleUserData.form.plat_id = this.listQuery.plat_id;
            this.addMutipleUserData.formSource = null;
        }
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
        this.creditUserDialogData.bShow = false;
        this.changeChannelDialogData.bShow = false;
        this.addMutipleTagData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
        });
    }
    /**重置批量添加的表单 */
    resetDialogForm_multiple() {
        Object.assign(this.addMutipleUserData.form, {
            usernames: "",
            passwords: "",
            status: 1,
            plat_id: "",
            channel_id: "",
            remark: "",
            admin_added_batch: "",
            user_id: "", //用户 id
            user_count: 0, //新增数量
            username: "",
        });
    }
    /**查询 */
    onQuery() {
        if (checkUnique(unique.admin_plat_user_index2)) {
            this.sendNotification(HttpType.admin_plat_user_index2, objectRemoveNull(this.listQuery));
        } else {
            this.sendNotification(HttpType.admin_plat_user_index, objectRemoveNull(this.listQuery));
        }
    }
    onQueryForAddMultipleUserTable() {
        this.sendNotification(HttpType.admin_plat_user_get_admin_added_user, objectRemoveNull(this.listQuery_mutiple));
    }
    onQueryForAddMultipleUserTable_export(pageInfo: any) {
        const obj = JSON.parse(JSON.stringify(this.listQuery_mutiple));
        obj.page_count = pageInfo.pageCount;
        obj.page_size = pageInfo.page_size;
        this.sendNotification(HttpType.admin_plat_user_get_admin_added_user, objectRemoveNull(obj));
    }
    resetExportData(timeout: any) {
        setTimeout(() => {
            this.exportData.isExportExcel = false;
            this.exportData.list = [];
            Object.assign(this.exportData.pageInfo, {
                pageCurrent: 0,
            });
        }, timeout);
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
            MessageBox.confirm(<string>LangUtil("您是否扣除该玩家{0}金币", deductGold), <string>LangUtil("提示"), {
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
    onToggleIsBack(user_id: number, is_back: number) {
        this.facade.sendNotification(HttpType.admin_plat_user_update, {
            user_id: user_id,
            is_back_visit: is_back,
        });
    }
    showWallet() {
        // this.walletDialogData.bShow = true;
        const { user_id, plat_id } = this.listQuery;
        this.sendNotification(
            HttpType.admin_plat_users_wallet_show_plat,
            objectRemoveNull({
                plat_id,
                // user_id,
            })
        );
    }
    setWallet(data: any) {
        this.walletDialogData.bShow = true;
        this.walletDialogData.data = data;
    }

    showCreditUserDialog() {
        const { plat_id } = this.listQuery;
        this.sendNotification(HttpType.admin_plat_user_backwater_config, { plat_id });
        this.resetCreditUserForm();
    }
    /**批量添加的主弹窗 */
    showMultipleUserDialog() {
        this.resetListQuery_mutiple();
        this.listQuery_mutiple.plat_id = this.listQuery.plat_id;
        this.onQueryForAddMultipleUserTable();
        this.mutipleUserDialogData.bShow = true;
    }

    setPlatUserBackwaterConfig(data: any) {
        Object.assign(this.creditUserDialogData.backwater_config, data);
        this.creditUserDialogData.bShow = true;
    }

    setPlatAddMultipleUserConfig() {
        // Object.assign(this.mutipleUserDialogData.backwater_config, data);
        // this.mutipleUserDialogData.bShow = true;
        this.addMutipleUserData.bShow = false;
        this.onQueryForAddMultipleUserTable();
    }

    resetCreditUserForm() {
        Object.assign(this.creditUserDialogData.form, {
            show_credit_report: 0,
            username: "",
            password: "",
            water_config: { "0": 0, "2": 0, "4": 0, "8": 0, "16": 0, "32": 0, "64": 0, "128": 0 },
            credit_rate_min: "",
            credit_rate_max: "",
            is_cash_agent: 98,
        });
    }

    // resetAddMultipleUserForm() {
    //     Object.assign(this.mutipleUserDialogData.list, {
    //         show_credit_report: 0,
    //         username: "",
    //         password: "",
    //         water_config: { "0": 0, "2": 0, "4": 0, "8": 0, "16": 0, "32": 0, "64": 0, "128": 0 },
    //         credit_rate_min: "",
    //         credit_rate_max: "",
    //         is_cash_agent: 98,
    //     });
    // }
    onUpdate_multiple() {
        const formCopy: any = formCompared(this.addMutipleUserData.form, this.addMutipleUserData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.addMutipleUserData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.admin_added_batch = this.addMutipleUserData.form.admin_added_batch;
        delete formCopy.passwords;
        delete formCopy.usernames;
        // 发送消息
        this.sendNotification(HttpType.admin_plat_user_update_admin_added_user, formCopy);
    }
    onAddCreditUser_multiple() {
        //检测是否能发送出去
        const accountArr = this.addMutipleUserData.form.usernames.split(",");
        const passwordArr = this.addMutipleUserData.form.passwords.split(",");
        if (passwordArr.length > 1 && passwordArr.length != accountArr.length) {
            Message.info(<any>LangUtil("密码数量错误，应该为1个或者数量与账号数量相同"));
            return;
        }
        const formCopy = JSON.parse(JSON.stringify(this.addMutipleUserData.form));
        this.sendNotification(HttpType.admin_plat_user_store_user_by_admin, objectRemoveNull(formCopy));
    }

    onUpdata_multiple_callback() {
        this.addMutipleUserData.bShow = false;
        this.onQueryForAddMultipleUserTable();
    }
    onAddCreditUser() {
        const { plat_id } = this.listQuery;
        let {
            username,
            password,
            credit_rate_min,
            credit_rate_max,
            show_credit_report,
            is_cash_agent,
        } = this.creditUserDialogData.form;
        let water_config = JSON.parse(JSON.stringify(this.creditUserDialogData.form.water_config));
        password = MD5.createInstance().hex_md5(password);
        Object.keys(water_config).forEach(key => {
            water_config[key] = water_config[key] / 100;
        });
        water_config = JSON.stringify(water_config);
        const formCopy = {
            username,
            password,
            water_config,
            credit_rate_min,
            credit_rate_max,
            plat_id,
            show_credit_report,
            is_cash_agent,
        };
        this.sendNotification(HttpType.admin_plat_user_store_credit_user, objectRemoveNull(formCopy));
    }

    showChangeChannelDialog(data: any) {
        this.changeChannelDialogData.form = JSON.parse(JSON.stringify(data));
        this.changeChannelDialogData.bShow = true;
    }

    onChangeChannel() {
        MessageBox.confirm(<string>LangUtil("是否确认更换"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                const { channel_id, user_id } = this.changeChannelDialogData.form;
                this.sendNotification(HttpType.admin_plat_user_change_channel, { channel_id, user_id });
            })
            .catch(() => { });
    }

    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        this.exportData.isSearch = false;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        queryCopy.is_export = true;
        if (checkUnique(unique.admin_plat_user_index2)) {
            this.sendNotification(HttpType.admin_plat_user_index2, objectRemoveNull(queryCopy));
        } else {
            this.sendNotification(HttpType.admin_plat_user_index, objectRemoveNull(queryCopy));
        }
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData(500);
        }
    }

    /**导出 Excel */
    exportExcel() {
        const newData = JSON.parse(JSON.stringify(this.exportData.list));

        // 要导出的栏位
        // let exportColumn = this.exportData.fieldOrder;
        // 栏位中文名称
        // let exportHeader = <any>[];
        // exportColumn.forEach((column: any) => {
        //     exportHeader.push(this.tableData.columns[column].name);
        // });
        // 导出资料
        // let exportData = this.dataMatching(exportColumn, data);
        // exportJson2Excel(exportHeader, exportData, this.getFileName, undefined, undefined);

        const exportField = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }

        // @ts-ignore
        newData.forEach(element => {
            let total_recharge: string = `${this.tableData.columns.recharge_times.name} : ${element.recharge_times};  `;
            let total_exchange: string = `${this.tableData.columns.exchange_times.name} : ${element.exchange_times};  `;
            let total_bet: string = ``;
            let total_win: string = ``;

            for (const item of element.user_statistic) {
                total_recharge =
                    total_recharge + `${item.coin_name_unique} : ${Math.abs(item.total_recharge).toFixed(3)};`;
                total_exchange =
                    total_exchange + `${item.coin_name_unique} : ${Math.abs(item.total_exchange).toFixed(3)};`;
                total_bet = total_bet + `${item.coin_name_unique} : ${Math.abs(item.total_bet).toFixed(3)};`;
                total_win = total_win + `${item.coin_name_unique} : ${Math.abs(item.total_win).toFixed(3)};`;
            }

            element.total_recharge = total_recharge;
            element.total_exchange = total_exchange;
            element.total_bet = total_bet;
            element.total_win = total_win;

            if (element.user_tag) {
                const arr = element.user_tag.split(",");
                const newArr: any = [];
                // @ts-ignore
                arr.forEach(tag => {
                    if (this.tableData.columns.user_tag.options[this.listQuery.plat_id][Number(tag)]) {
                        newArr.push(this.tableData.columns.user_tag.options[this.listQuery.plat_id][Number(tag)]);
                    }
                });
                element.user_tag = newArr.join();
            }
        });

        new BaseInfo.ExportExcel(
            this.getFileName,
            exportField,
            this.tableData.columns,
            newData,
            ["plat_id", "is_credit_user", "status", "is_recharged", "is_back_visit"],
            []
        );
    }

    /**导出资料合并 */
    dataMatching(filterKeys: any, listData: any) {
        return listData.map((data: any) =>
            filterKeys.map((key: string) => {
                if (key === "plat_id") {
                    return this.tableData.columns["plat_id"].options[data.plat_id];
                }
                if (key === "is_credit_user") {
                    return this.tableData.columns["is_credit_user"].options[data.is_credit_user];
                }
                return data[key];
            })
        );
    }

    // 导出挡案名
    get getFileName() {
        let fileFirstName: any = "";
        let fileLastName: any = "";
        let str: any = this.tableData.columns["plat_id"].options[this.listQuery.plat_id];
        fileFirstName = LangUtil("平台用户[{0}]", str);
        return `${fileFirstName}${fileLastName}`;
    }

    /** 批次進度 */
    get percentage() {
        return Math.round((this.exportData.pageInfo.pageCurrent / this.exportData.pageInfo.pageCount) * 100);
    }

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }

    /**删除数据 */
    onDelete(batchId: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                // this.sendNotification(HttpType.admin_plat_mail_content_update, { admin_added_batch: batchId });
            })
            .catch(() => { });
    }
    /**删除数据 */
    onDelete_multiple(batchId: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_user_delete_admin_added_user, { admin_added_batch: batchId });
            })
            .catch(() => { });
    }

    _userList = [
        "admin_added_batch",
        "plat_id",
        "channel_id",
        "user_id",
        "user_count",
        "status",
        "created_at",
        "created_by",
        "remark",
    ];
    myExportPagedata = <any>{};
    /**导出excel */
    exportExcel_multiple(data: any) {
        // if (data && data.list) {
        //     this.resetTabdata(data);
        // }
        this.myExportPagedata = JSON.parse(JSON.stringify(data));
    }

    showAddMultipleTagDialog(isUpdateAll: boolean) {
        this.addMutipleTagData.bShow = true;
        this.addMutipleTagData.isUpdateAll = isUpdateAll;
        this.addMutipleTagData.form.tags.length = 0;
        if (!isUpdateAll) {
            this.addMutipleTagData.form.tags.push(...this.tableData.multipleSelection[0].user_tag);
        }
    }

    onUpdateTags() {
        const tag_ids = this.addMutipleTagData.form.tags.join();
        if (!this.addMutipleTagData.isUpdateAll) {
            let count = 0;
            // @ts-ignore
            this.tableData.multipleSelection.forEach(item => {
                // 发送消息
                Http.request({ tag_ids }, getUrl(HttpType.admin_plat_user_update_tag, { user_id: item.user_id })).then(
                    (result: any) => {
                        count++;
                        if (this.addMutipleTagData.bShow) {
                            this.hideDialog();
                            Message.success(SuccessMessage.update);
                        }
                        if (count == this.tableData.multipleSelection.length) {
                            this.onQuery();
                        }
                    }
                );
            });
        } else {
            const newQuery = { ...this.listQuery, tag_ids };
            delete newQuery.page_count;
            delete newQuery.page_size;
            this.sendNotification(HttpType.admin_plat_user_batch_update_tag, objectRemoveNull(newQuery));
        }
    }
}
