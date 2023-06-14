import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_credit_user/setting";
import IStatisticCreditUserProxy from "./IStatisticCreditUserProxy";
import { BaseInfo } from "@/components/vo/commonVo";

export default class StatisticCreditUserProxy extends AbstractProxy implements IStatisticCreditUserProxy {
    static NAME = "StatisticCreditUserProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_credit_user_table_columns);
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
            backwater_coin: { name: '实际返水', options: {} },
            backwater_except_user_coin: { name: '结算返水', options: {} },
            bet_gold_coin: { name: '投注金额', options: {} },
            coin_name_unique: { name: '币种', options: {} },
            credit_rate_self: { name: '我的占成', options: {} },
            invite_user_id: { name: '上级用户ID', options: {} },
            invite_username: { name: '上级用户账号', options: {} },
            plat_id: { name: '所属平台', options: {} },
            record_count: { name: '下注笔数', options: {} },
            user_id: { name: '用户ID', options: {} },
            username: { name: '用户账号', options: {} },
            valid_bet_gold_coin: { name: '有效投注', options: {} },
            vendor_type: { name: '游戏类型', options: {} },
            win_gold_coin: { name: '玩家输赢', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "plat_id",
            "user_id",
            "username",
            "invite_user_id",
            "invite_username",
            "coin_name_unique",
            "record_count",
            "bet_gold_coin",
            "win_gold_coin",
            "valid_bet_gold_coin",
            "backwater_coin",
            "backwater_except_user_coin",
            "credit_rate_self"
        ]
    };

    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };


    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        user_id: "",
        username: "",
        invite_user_id: "",
        invite_username: "",
        coin_name_unique: "",
        settlement_date_start: dateFormat(getTodayOffset(-7), "yyyy-MM-dd 00:00:00"),
        settlement_date_end: dateFormat(getTodayOffset(-1), "yyyy-MM-dd 23:59:59"),
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
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (this.listQuery.plat_id) {
                this.tableData.columns.coin_name_unique_option = this.tableData.columns.coin_name_unique.options[this.listQuery.plat_id];
            }
            this.onQuery();
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
            user_id: "",
            username: "",
            invite_user_id: "",
            invite_username: "",
            coin_name_unique: "",
            settlement_date_start: dateFormat(getTodayOffset(-7), "yyyy-MM-dd 00:00:00"),
            settlement_date_end: dateFormat(getTodayOffset(-1), "yyyy-MM-dd 23:59:59"),
        });
    }

    /**日期快捷 */
    pickerOptions = {
        shortcuts: [
            {
                text: LangUtil("昨日"),
                onClick(picker: any) {
                    const start = getTodayOffset(-1);
                    const end = getTodayOffset(0, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一周"),
                onClick(picker: any) {
                    const start = getTodayOffset(-7);
                    const end = getTodayOffset(-1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-31);
                    const end = getTodayOffset(-1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };


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
        this.sendNotification(HttpType.admin_statistic_credit_user_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() { }

    /**更新数据 */
    onUpdate() { }

    /**删除数据 */
    onDelete(id: any) { }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil("代理用户报表")}-${plat_name}`;

        if (this.listQuery["settlement_date_start"] && this.listQuery["settlement_date_end"] != "") {
            name += `-${this.listQuery["settlement_date_start"]}～${this.listQuery["settlement_date_end"]}`;
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
        this.sendNotification(HttpType.admin_statistic_credit_user_index, objectRemoveNull(queryCopy));
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
        for (const item of newData) {
            item.credit_rate_self = item.credit_rate_self + '%';
        }
        const exportField: string[] = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }
        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            // this.curKeyList,
            exportField,
            this.tableData.columns,
            // summary,
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

}
