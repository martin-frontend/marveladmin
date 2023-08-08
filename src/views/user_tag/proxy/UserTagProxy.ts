import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/user_tag/setting";
import { MessageBox } from "element-ui";
import IUserTagProxy from "./IUserTagProxy";
import { BaseInfo } from "@/components/vo/commonVo";
import router from "@/router";
import LangUtil from "@/core/global/LangUtil";
import GlobalEventType from "@/core/global/GlobalEventType";

export default class UserTagProxy extends AbstractProxy implements IUserTagProxy {
    static NAME = "UserTagProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_user_tag_table_columns);
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
        columns: <any>{
            id: { name: "ID", options: [] },
            name: { name: "标签名称", options: [] },
            plat_id: { name: "平台ID", options: [] },
            channel_id: { name: "渠道ID", options: [] },
            tag_users_num: { name: "标签人数", options: [] },
            is_delete: { name: "是否删除", options: ["否", "是"] },
            remark: { name: "备注", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            created_by: { name: "创建人", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_by: { name: "更新人", options: [] },
            updated_at: { name: "修改时间", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        // channel_id: "",
        name: "",
        remark: "",
        created_by: "",
        "created_at-{>=}": "",
        "created_at-{<=}": "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            id: null,
            plat_id: "",
            name: "",
            remark: "",
        },
        formSource: null, // 表单的原始数据
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "name",
            "tag_users_num",
            "created_at",
            "created_by",
            "plat_id",
            // "channel_id",
            "remark",
        ],
    };

    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
        }
        this.onQuery();
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // channel_id: "",
            name: "",
            remark: "",
            created_by: "",
            "created_at-{>=}": "",
            "created_at-{<=}": "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            // this.dialogData.formSource = data;
            // Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_user_tag_show, { id: data.id });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
        }
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            id: null,
            plat_id: "",
            name: "",
            remark: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_user_tag_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { plat_id, name, remark } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            name,
            remark,
        };
        this.sendNotification(HttpType.admin_user_tag_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.id = this.dialogData.form.id;
        // 发送消息
        this.sendNotification(HttpType.admin_user_tag_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_user_tag_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        let name = `${router.currentRoute.name}`;
        if (this.listQuery["created_at-{>=}"]) {
            return `${name}-${this.listQuery["created_at-{>=}"]}～${this.listQuery["created_at-{<=}"]}`;
        }
        return name;
    }

    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        queryCopy.plat_id = queryCopy.plat_id === "0" ? "" : queryCopy.plat_id;
        this.sendNotification(HttpType.admin_user_tag_index, objectRemoveNull(queryCopy));
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

    /**导出excel */
    exportExcel() {
        const newData = JSON.parse(JSON.stringify(this.exportData.list));
        const exportField = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            exportField,
            this.tableData.columns,
            newData,
            ["plat_id"],
            []
        );
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

    /** 批次進度 */
    get percentage() {
        return Math.round((this.exportData.pageInfo.pageCurrent / this.exportData.pageInfo.pageCount) * 100);
    }

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }

    /**用户列表弹窗 */
    usersDialogData = {
        bShow: false,
        query: {
            page_count: 1,
            page_size: 20,
            id: "",
        },

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
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    showUsersDialog(id: any) {
        this.usersDialogData.bShow = true;
        Object.assign(this.usersDialogData.query, {
            page_count: 1,
            page_size: 20,
            id,
        });
        this.sendNotification(HttpType.admin_plat_user_table_columns);
        this.onUsersQuery();
    }

    onUsersQuery() {
        this.sendNotification(HttpType.admin_user_tag_show_users, { ...this.usersDialogData.query });
    }

    setUsersData(data: any) {
        this.usersDialogData.list.length = 0;
        this.usersDialogData.list.push(...data.list);
        Object.assign(this.usersDialogData.pageInfo, data.pageInfo);
    }

    setUsersTableColumn(data: any) {
        Object.assign(this.usersDialogData.columns, data);
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
