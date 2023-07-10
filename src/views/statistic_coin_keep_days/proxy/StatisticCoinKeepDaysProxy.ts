import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_coin_keep_days/setting";
import { MessageBox } from "element-ui";
import IStatisticCoinKeepDaysProxy from "./IStatisticCoinKeepDaysProxy";
import LangUtil from "@/core/global/LangUtil";

export default class StatisticCoinKeepDaysProxy extends AbstractProxy implements IStatisticCoinKeepDaysProxy {
    static NAME = "StatisticCoinKeepDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_coin_keep_days_table_columns);
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
            channel_id: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_date: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            coin_name_unique: { name: "", options: {} },
            user_ids: { name: "", options: {} },
            day_1: { name: "", options: {} },
            day_2: { name: "", options: {} },
            day_3: { name: "", options: {} },
            day_4: { name: "", options: {} },
            day_5: { name: "", options: {} },
            day_6: { name: "", options: {} },
            day_7: { name: "", options: {} },
            day_14: { name: "", options: {} },
            day_30: { name: "", options: {} },
            id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            type: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            user_count: { name: "", options: {} },
            user_all_count: { name: "", options: {} },
        },
        list: <any>[],
        isExportExcel: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        // coin_name_unique: "",
        channel_id: "",
        "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd hh:mm:ss"),
        "created_date-{<=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
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
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        // Object.assign(this.tableData.summary, data.summary);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // coin_name_unique: "",
            channel_id: "",
            "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd hh:mm:ss"),
            "created_date-{<=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        // if (status == DialogStatus.update) {
        //     this.dialogData.formSource = data;
        //     Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        //     this.sendNotification(HttpType.undefined, { id: data.id });
        // } else {
        //     this.resetDialogForm();
        //     this.dialogData.formSource = null;
        // }
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
    myExportPagedata = <any>{};
    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_coin_keep_days_index, objectRemoveNull(this.listQuery));
    }
    onQuery_export(pageInfo: any) {
        const obj = JSON.parse(JSON.stringify(this.listQuery));
        // if (obj.coin_name_unique == "-") {
        //     obj.coin_name_unique = "";
        // }
        obj.page_count = pageInfo.pageCount;
        obj.page_size = pageInfo.page_size;
        this.sendNotification(HttpType.admin_statistic_coin_keep_days_index, objectRemoveNull(obj));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = {
            // TODO
        };
        // this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
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
        // TODO
        // 发送消息
        // this.sendNotification(HttpType.undefined, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {}
    _userList = [
        "created_date",
        "plat_id",
        "channel_id",
        "user_count",
        "user_all_count",
        // "coin_name_unique",
        "day_1",
        "day_2",
        "day_3",
        "day_4",
        "day_5",
        "day_6",
        "day_7",
        "day_14",
        "day_30",
    ];
    /**导出excel */
    exportExcel(data: any) {
        //修改里面的值
        const days = [1, 2, 3, 4, 5, 6, 7, 14, 30];
        for (let index = 0; index < data.list.length; index++) {
            const element = data.list[index];
            if (element.channel_id == 0 || element.channel_id == "0") {
                element.channel_id = LangUtil("全部渠道");
            }
            for (let n = 0; n < days.length; n++) {
                element[`day_${days[n]}`] = `${element[`day_${days[n]}`]}(${this.toPercent(
                    element[`day_${days[n]}`],
                    element.user_count
                )})`;
            }
        }
        this.myExportPagedata = JSON.parse(JSON.stringify(data));
    }
    toPercent(curAmount: string, total: string) {
        if (total == "0" || curAmount == "0") {
            return "0";
        }
        return Number((Number(curAmount) / Number(total)).toString().match(/^\d+(?:\.\d{0,2})?/));
        //return ((Number(curAmount) / Number(total)) ).toFixed(3) ;
    }
}
