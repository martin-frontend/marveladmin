import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_days_channel_core_channel/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatDaysChannelCoreChannelProxy from "./IStatisticPlatDaysChannelCoreChannelProxy";

type TagName = "group" | "channel";
export default class StatisticPlatDaysChannelCoreChannelProxy extends AbstractProxy implements IStatisticPlatDaysChannelCoreChannelProxy {
    static NAME = "StatisticPlatDaysChannelCoreChannelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_days_channel_core_channel_table_columns);
        this.sendNotification(HttpType.admin_statistic_plat_days_channel_core_group_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
        Object.assign(this.tableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
        this.tabName = "channel";
    }
    tabName: TagName = "channel";

    channelColumns = {
        active_user: { name: '活跃人数', options: {} },
        blog_exchange: { name: '博主兑换金额', options: {} },
        channel_id: { name: '所属渠道', options: {} },
        exchange: { name: '总兑换金额', options: {} },
        exchange_user: { name: '兑换人数', options: {} },
        net_rech: { name: '充-兑', options: {} },
        new_register: { name: '注册人数', options: {} },
        nor_exchange: { name: '玩家兑换金额', tips: '玩家兑换金额 = 总兑换金额 - 博主兑换金额', options: {} },
        plat_id: { name: '平台消息', options: {} },
        plat_info: { name: '平台信息', options: {} },
        recharge: { name: '充值金额', options: {} },
        recharge_user: { name: '充值人数', options: {} },
        time_period: { name: '日期', options: {} },
        user_id: { name: '用户ID', options: {} },
        water: { name: '游戏流水', options: {} },
        win_loss: { name: '游戏输赢', options: {} },
    }

    groupColumns = {
        active_user: { name: '活跃人数', options: {} },
        blog_exchange: { name: '博主兑换金额', options: {} },
        channel_id: { name: '所属渠道', options: {} },
        exchange: { name: '总兑换金额', options: {} },
        exchange_user: { name: '兑换人数', options: {} },
        net_rech: { name: '充-兑', options: {} },
        new_register: { name: '注册人数', options: {} },
        nor_exchange: { name: '玩家兑换金额', tips: '玩家兑换金额 = 总兑换金额 - 博主兑换金额', options: {} },
        plat_id: { name: '平台消息', options: {} },
        plat_info: { name: '平台信息', options: {} },
        recharge: { name: '充值金额', options: {} },
        recharge_user: { name: '充值人数', options: {} },
        time_period: { name: '日期', options: {} },
        user_id: { name: '用户ID', options: {} },
        water: { name: '游戏流水', options: {} },
        win_loss: { name: '游戏输赢', options: {} },
    }

    /**渠道表格相关数据 */
    tableData = {
        columns: <any>{
            ...this.groupColumns,
            ...this.channelColumns,
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**团队表格相关数据 */
    groupTableData = {
        columns: <any>{
            active_user: { name: '活跃人数', options: {} },
            blog_exchange: { name: '博主兑换金额', options: {} },
            channel_id: { options: {} },
            exchange: { name: '总兑换金额', options: {} },
            exchange_user: { name: '兑换人数', options: {} },
            net_rech: { name: '充-兑', options: {} },
            new_register: { name: '注册人数', options: {} },
            nor_exchange: { name: '玩家兑换金额', tips: '玩家兑换金额 = 总兑换金额 - 博主兑换金额', options: {} },
            plat_id: { options: {} },
            plat_info: { name: '平台信息', options: {} },
            recharge: { name: '充值金额', options: {} },
            recharge_user: { name: '充值人数', options: {} },
            time_period: { name: '日期', options: {} },
            user_id: { name: '用户ID', options: {} },
            water: { name: '游戏流水', options: {} },
            win_loss: { name: '游戏输赢', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery: any = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        user_id: "",
        "time_period-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        "time_period-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null
            // TODO
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const channel_id_options_keys = Object.keys(this.tableData.columns.channel_id.options);
        if (plat_id_options_keys.length > 0) {
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
            this.onQuery();
        }
    }

    setTableColumnsByGroyp(data: any) {
        Object.assign(this.groupColumns, data);
    }

    /**合计 相关数据 */
    summaryData = {
        active_user: "",
        blog_exchange: "",
        exchange: "",
        exchange_user: "",
        net_rech: "",
        new_register: "",
        nor_exchange: "",
        recharge: "",
        recharge_user: "",
        water: "",
        win_loss: ""
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        Object.assign(this.summaryData, {
            ...data.summary,
            plat_id: LangUtil("合计"),
        });
        // 把summaryData 插入第一笔
        this.tableData.list.splice(0, 0, this.summaryData);
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
            "time_period-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
            "time_period-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
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
        const query = { ...this.listQuery };
        if (this.tabName == "channel") {
            delete query.user_id;
            this.sendNotification(
                HttpType.admin_statistic_plat_days_channel_core_channel_index,
                objectRemoveNull(this.listQuery)
            );
        } else {
            this.sendNotification(
                HttpType.admin_statistic_plat_days_channel_core_group_index,
                objectRemoveNull(this.listQuery)
            );
        }
    }

    /**添加数据 */
    onAdd() { }

    /**更新数据 */
    onUpdate() { }

    /**删除数据 */
    onDelete(id: any) { }

    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
        data: <any>{},
    };

    channelFieldOptions = [

    ];
    groupFieldOptions = [

    ];

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [...this.channelFieldOptions],
    };

    onChangeTab() {
        this.fieldSelectionData.fieldOptions.length = 0;
        if (this.tabName == "channel") {
            Object.assign(this.tableData.columns, JSON.parse(JSON.stringify(this.channelColumns)));
            this.fieldSelectionData.fieldOptions.push(...this.channelFieldOptions);
        } else {
            Object.assign(this.tableData.columns, JSON.parse(JSON.stringify(this.groupColumns)));
            this.fieldSelectionData.fieldOptions.push(...this.groupFieldOptions);
        }
        this.listQuery.page_count = 1;
        this.onQuery();
    }
}
