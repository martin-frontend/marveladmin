import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_directly_commission/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatDirectlyCommissionProxy from "./IStatisticPlatDirectlyCommissionProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import LangUtil from "@/core/global/LangUtil";

export default class StatisticPlatDirectlyCommissionProxy extends AbstractProxy implements IStatisticPlatDirectlyCommissionProxy {
    static NAME = "StatisticPlatDirectlyCommissionProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_directly_commission_table_columns);
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
            already_direct_commission: { name: '已派发金额', options: {} },
            created_at: { name: '创建时间', options: {} },
            direct_commission: { name: '分红金额', options: {} },
            direct_total_win_loss: { name: '平台直属总亏损', options: {} },
            id: { name: 'ID', options: {} },
            plat_id: { name: '平台ID', options: {} },
            settlement_date: { name: '结算日期', options: {} },
            settlement_date_end: { name: '结算结束日期', options: {} },
            settlement_date_start: { name: '开始日期', options: {} },
            settlement_period: { name: '结算周期', options: {} },
            settlement_type: { name: '结算方式', options: {} },
            updated_at: { name: '修改时间', options: {} },
            cate: {
                name: LangUtil('邮件分类'),
                options: { 1: '平台' }
            },
            type: {
                name: LangUtil('邮件类型'),
                options: { 3: '群发邮件' }
            },
            max_level: { name: LangUtil('最高等级'), options: {} },
        },
        list: <any>[],
        commission_info: {
            commission_config: {},
            desc: "",
            name: "",
        },
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**表格相关数据 */
    detailTableData = {
        columns: <any>{
            bonus_ratio: { name: '分红比例', options: {} },
            channel_id: { name: '渠道ID', options: {} },
            coin_name_unique: { name: '币种', options: {} },
            created_at: { name: '创建时间', options: {} },
            created_by: { name: '创建人', options: {} },
            direct_commission: { name: '分红金额', options: {} },
            direct_total_win_loss: { name: '直属总输赢', options: {} },
            directly_commission_status: { name: '是否参与分红', options: {} },
            id: { name: 'ID', options: {} },
            plat_id: { name: '平台ID', options: {} },
            send_bonus_status: { name: '发送分红状态', options: {} },
            send_bonus_time: { name: '分红发送时间', options: {} },
            settlement_date: { name: '日期', options: {} },
            settlement_date_end: { name: '结算结束日期', options: {} },
            settlement_date_start: { name: '结算开始日期', options: {} },
            updated_at: { name: '修改时间', options: {} },
            updated_by: { name: '修改人', options: {} },
            user_id: { name: '用户ID', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
    };

    detailListQuery = {
        page_count: 1,
        page_size: 20,
        channel_id: "",
        user_id: "",
        directly_commission_status: "",
        send_bonus_status: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
        },
        formSource: null, // 表单的原始数据
    };

    dialogSettingData = {
        bShow: false,
        form: <any>{
            commission_config: {},
            desc: "",
            name: "",
            max_level: "",
            settlement_type: "",
            settlement_period: "",
        }
    }

    dialogDetailData = {
        bShow: false,
    };

    dialogBonusData = {
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

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
    }

    setDetailTableColumns(data: any) {
        this.dialogDetailData.bShow = true;
        Object.assign(this.detailTableData.columns, data);
        this.onQueryDetailTable();
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.commission_info, JSON.parse(JSON.stringify(data.commission_info)));
        Object.assign(this.tableData.pageInfo, data.pageInfo);

        // 设定配置内容
        Object.assign(this.dialogSettingData.form, JSON.parse(JSON.stringify(data.commission_info)));
        this.dialogSettingData.form.settlement_type = data.commission_info.commission_config.settlement_type;
        this.dialogSettingData.form.settlement_period = data.commission_info.commission_config.settlement_period;
        if (data.max_level) {
            this.dialogSettingData.form.max_level = data.max_level;
        } else {
            this.dialogSettingData.form.max_level = data.commission_info.commission_config.commission_config.length;
            let result = <any>{};
            for (let i = 1; i <= this.dialogSettingData.form.max_level; i++) {
                result[i] = i;
            }
            this.tableData.columns.max_level.options = result;
        }
    }

    setDetailTableData(data: any) {
        this.detailTableData.list.length = 0;
        this.detailTableData.list.push(...data.list);
        Object.assign(this.detailTableData.pageInfo, data.pageInfo);
    }

    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
        });
    }

    resetDetailListQuery() {
        Object.assign(this.detailListQuery, {
            channel_id: "",
            user_id: "",
            directly_commission_status: "",
            send_bonus_status: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
        }
    }

    showDetailDialog() {
        this.sendNotification(HttpType.admin_statistic_plat_directly_user_commission_table_columns);
    }

    showBonusDialog(status: string, data?: any) {
        this.dialogBonusData.bShow = true;
        this.resetBonusDialogForm();
        this.dialogBonusData.status = status;
        if (status == DialogStatus.update) {
            this.dialogBonusData.formSource = data;
            Object.assign(this.dialogBonusData.form, JSON.parse(JSON.stringify(data)));
            this.dialogBonusData.form.coin_type = data.direct_total_win_loss.coin_name_unique;
            this.dialogBonusData.form.amount = data.direct_total_win_loss.value;
            this.dialogBonusData.form.content = this.changeContent(this.dialogBonusData.form.content,
                data.settlement_date_start.split("-")[1],
                data.settlement_date_start.split("-")[2],
                data.settlement_date_end.split("-")[1],
                data.settlement_date_end.split("-")[2],
                this.tableData.columns["plat_id"].options[this.listQuery.plat_id].split("]")[1])
        } else {
            this.dialogBonusData.formSource = null;
        }
    }

    /**显示配置弹窗 */
    showSettingDialog() {
        this.dialogSettingData.bShow = true;
        this.onQuery();
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    hideSettingDialog() {
        this.dialogSettingData.bShow = false;
    }

    hideBonusDialog() {
        this.dialogBonusData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
        });
    }

    resetBonusDialogForm() {
        Object.assign(this.dialogBonusData.form, {
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
        this.sendNotification(HttpType.admin_statistic_plat_directly_commission_index, objectRemoveNull(this.listQuery));
    }

    onQueryDetailTable() {
        this.sendNotification(HttpType.admin_statistic_plat_directly_user_commission_index, objectRemoveNull({ plat_id: this.listQuery.plat_id, ...this.detailListQuery }));
    }

    /**添加数据 */
    onAdd() { }

    /**更新数据 */
    onUpdate() { }

    /**删除数据 */
    onDelete(id: any) { }

    /**更新数据 */
    onUpdateSetting() {
        const { settlement_type, settlement_period, max_level, } = this.dialogSettingData.form;
        const formCopy: any = {};
        const commission_config: any = {
            settlement_type,
            settlement_period,
            max_level,
        };
        formCopy.commission_model_id = this.dialogSettingData.form.commission_config.commission_model_id;
        commission_config.commission_config = this.dialogSettingData.form.commission_config.commission_config;
        formCopy.commission_config = JSON.stringify(commission_config)
        this.sendNotification(HttpType.admin_plat_update, { plat_id: this.listQuery.plat_id, ...formCopy });
    }

    /**发放分红 */
    onAddBonus() {
        const { plat_id, title, content, cate, type, user_id, bonus_multiple, attachment_content, coin_type, amount, send_type, attachment_type, settlement_date_start, settlement_date_end } = this.dialogBonusData.form;
        const formCopy: any = {
            plat_id,
            title,
            content,
            cate,
            type,
            bonus_multiple,
            attachment_content,
            send_type,
            attachment_type,
            settlement_date_start,
            settlement_date_end
        };
        formCopy.user_list = user_id;
        let bonus: any = {};
        bonus[coin_type] = amount;
        formCopy.attachment_content = JSON.stringify(bonus);
        formCopy.custom_send_type = 2;
        this.sendNotification(HttpType.admin_plat_user_agent_bonus_send_mail, formCopy);
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**更新状态数据 */
    onUpdateSwitch(data: any) {
        this.sendNotification(HttpType.admin_plat_agent_bind_update, data);
    }

    changeContent(str: string, ...args: any[]) {
        let result: string = str;
        for (let i = 0; i < args.length; i++) {
            result = result.replace(`{${i}}`, args[i]);
        }
        return result;
    }
}
