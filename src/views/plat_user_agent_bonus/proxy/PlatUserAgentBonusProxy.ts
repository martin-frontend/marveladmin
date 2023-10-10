import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_user_agent_bonus/setting";
import { BaseInfo } from "@/components/vo/commonVo";
import IPlatUserAgentBonusProxy from "./IPlatUserAgentBonusProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import router from "@/router";
import LangUtil from "@/core/global/LangUtil";

export default class PlatUserAgentBonusProxy extends AbstractProxy implements IPlatUserAgentBonusProxy {
    static NAME = "PlatUserAgentBonusProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_agent_bonus_table_columns);
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
            agent_bonus: { name: "代理分红", options: {} },
            agent_bonus_rate: { name: "代理分红比例", options: {} },
            agent_user_id: { name: "代理ID", options: {} },
            attachment_content: { name: '附近奖励内容', options: {} },
            bind_depth: { name: "代理级别", options: {} },
            bind_relation: { name: "绑定关系", options: {} },
            binded_at: { name: "绑定时间", options: {} },
            channel_id: { name: "所属渠道", options: {} },
            child_agent_bonus: { name: "下级代理总分红", options: {} },
            commission_awaiting_num: { name: "当前可领取佣金", options: {} },
            commission_received_num: { name: "已领取佣金总额", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            directly_users: { name: "直属代理人数", options: {} },
            group_all_bonus: { name: "团队总分红", options: {} },
            group_all_recharge: { name: "团队总充值", options: {} },
            group_loss: {
                name: "团队净亏损",
                options: {},
                tips: "团队游戏总输赢-团队代理总佣金-三方游戏成本-充值成本-提现成本-活动成本-挖矿返水",
            },
            group_recharge_users: { name: "团队充值人数", options: {} },
            group_users: { name: "团队人数", options: {} },
            invite_user_id: { name: "绑定上级ID", options: {} },
            is_agent_bonus: { name: "总代分红", options: {} },
            last_be_binded_at: { name: "最后被绑定时间", options: {} },
            nick_name: { name: '昵称', options: {} },
            operator: { name: "操作", options: {} },
            parent_info: { name: "上级信息", options: {} },
            parent_nick_name: { name: '绑定上级昵称', options: {} },
            plat_id: { name: "所属平台", options: {} },
            plat_info: { name: "平台信息", options: {} },
            remark: { name: "代理备注", options: {} },
            send_bonus_time: { name: "已发放分红时间", options: {} },
            settlement_at: { name: "结算时间", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            user_id: { name: "用户ID", options: {} },
            user_info: { name: "用户信息", options: {} },
            cate: {
                name: LangUtil('邮件分类'),
                options: { 1: '平台' }
            },
            type: {
                name: LangUtil('邮件类型'),
                options: { 3: '群发邮件' }
            },
            send_type: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        settlement_date_start: dateFormat(getTodayOffset(-6), "yyyy-MM-dd hh:mm:ss"),
        settlement_date_end: dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        channel_id: "",
        user_id: "",
        invite_user_id: "",
        agent_user_id: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            plat_id: "",
            title: "代理分红发放",
            content: "{0}月{1}日到{2}月{3}日分红金额已经发放，感谢您一直以来对{4}的支持，在今后的日子里让我们继续携手前行，共创辉煌！",
            cate: "1",
            type: "3",
            user_id: "",
            bonus_multiple: "0",
            attachment_content: "",
            coin_type: "",
            amount: "",
            send_type: 1, //发送类型 1-人工发送|11-系统发送
            attachment_type: 11, //附件类型 1-无附件 | 11-奖励物件
            settlement_date_start: "",
            settlement_date_end: "",
        },
        formSource: null, // 表单的原始数据
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "plat_id",
            "channel_id",
            "user_id",
            "nick_name",
            "binded_at",
            "invite_user_id",
            "parent_nick_name",
            "bind_depth",
            "group_users",
            "group_recharge_users",
            "group_all_recharge",
            "group_loss",
            "agent_bonus_rate",
            "agent_bonus",
            "group_all_bonus",
            "child_agent_bonus",
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
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const channel_id_options_keys = Object.keys(this.tableData.columns.channel_id.options);
        if (plat_id_options_keys.length > 0 && channel_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (this.listQuery.plat_id) {
                this.tableData.columns.channel_id_options = this.tableData.columns.channel_id.options[
                    this.listQuery.plat_id
                ];
                const channel_id_keys = Object.keys(this.tableData.columns.channel_id_options);
                channel_id_keys.forEach((key: any) => {
                    this.tableData.columns.channel_id_options[key] = key;
                });
            }
            // this.onQuery();
        }
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
            channel_id: "",
            user_id: "",
            invite_user_id: "",
            agent_user_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.resetDialogForm();
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.dialogData.form.coin_type = data.extents.coin_name_unique;
            this.dialogData.form.amount = data.extents.agent_bonus_gold;
            this.dialogData.form.content = this.changeContent(this.dialogData.form.content,
                this.listQuery.settlement_date_start.split(" ")[0].split("-")[1],
                this.listQuery.settlement_date_start.split(" ")[0].split("-")[2],
                this.listQuery.settlement_date_end.split(" ")[0].split("-")[1],
                this.listQuery.settlement_date_end.split(" ")[0].split("-")[2],
                this.tableData.columns["plat_id"].options[this.listQuery.plat_id].split("]")[1])
        } else {
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
            title: "代理分红发放",
            content: "{0}月{1}日到{2}月{3}日分红金额已经发放，感谢您一直以来对{4}的支持，在今后的日子里让我们继续携手前行，共创辉煌！",
            cate: "1",
            type: "3",
            user_id: "",
            bonus_multiple: "0",
            attachment_content: "",
            coin_type: "",
            amount: "",
            send_type: 1, //发送类型 1-人工发送|11-系统发送
            attachment_type: 11, //附件类型 1-无附件 | 11-奖励物件
            settlement_date_start: "",
            settlement_date_end: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_user_agent_bonus_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const { plat_id, title, content, cate, type, user_id, bonus_multiple, attachment_content, coin_type, amount, send_type, attachment_type } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            title,
            content,
            cate,
            type,
            bonus_multiple,
            attachment_content,
            send_type,
            attachment_type
        };
        formCopy.user_list = user_id;
        formCopy.settlement_date_start = this.listQuery.settlement_date_start;
        formCopy.settlement_date_end = this.listQuery.settlement_date_end;
        let bonus: any = {};
        bonus[coin_type] = amount;
        formCopy.attachment_content = JSON.stringify(bonus);
        this.sendNotification(HttpType.admin_plat_user_agent_bonus_send_mail, formCopy);
    }

    /**更新数据 */
    onUpdate() {
    }

    /**删除数据 */
    onDelete(id: any) {
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        let name = `${router.currentRoute.name}`;
        return `${name}-${this.listQuery["settlement_date_start"]}～${this.listQuery["settlement_date_end"]}`;
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
        this.sendNotification(HttpType.admin_plat_user_agent_bonus_index, objectRemoveNull(queryCopy));
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

    changeContent(str: string, ...args: any[]) {
        let result: string = str;
        for (let i = 0; i < args.length; i++) {
            result = result.replace(`{${i}}`, args[i]);
        }
        return result;
    }
}
