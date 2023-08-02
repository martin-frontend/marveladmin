import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_bet_vendor_days/setting";
import { MessageBox } from "element-ui";
import IStatisticBetVendorDaysProxy from "./IStatisticBetVendorDaysProxy";

export default class StatisticBetVendorDaysProxy extends AbstractProxy implements IStatisticBetVendorDaysProxy {
    static NAME = "StatisticBetVendorDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_bet_vendor_days_table_columns);
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
            // TODO
            created_date: { name: "", options: {} },
            plat_id: { name: "所属平台", options: {} },
            id: { name: "所属平台", options: {} },
            time_region_hour_interval: { name: "", options: {} },
            vendor_id: { name: "", options: {} },
            win_gold: { name: "", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            vendor_wallet_type: { name: "", options: {} },
            vendor_type: { name: "游戏类型", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false,
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        vendor_id: "0",
        plat_id: "",
        time_region_hour_interval: "",
        "created_date-{>=}": this.getFirstDay(),
        "created_date-{<=}": dateFormat(new Date(new Date().getTime()-24*60*60*1000), "yyyy-MM-dd 23:59:59"),
        vendor_type: "0",
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

    getFirstDay() {
        const date = new Date();
        const day = date.getDate();
        return dateFormat(getTodayOffset(-day + 1), "yyyy-MM-dd hh:mm:ss");
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];

            const time_region_hour_interval_keys = Object.keys(
                this.tableData.columns["time_region_hour_interval"].options
            );
            this.listQuery.time_region_hour_interval = time_region_hour_interval_keys[0];
            this.onQuery();
        }

        // this.onQuery();
    }
    resetTabdata(data: any, isexport: boolean = false) {
        const newdata = [];
        //将数据中的 表格数据重组
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            element._myTable_id = index;
            if (element.list) {
                for (let n = 0; n < element.list.length; n++) {
                    const obj = JSON.parse(JSON.stringify(element));
                    if (isexport) {
                        obj.list = [];
                    }
                    const keys = Object.keys(obj.list[n]);
                    for (let p = 0; p < keys.length; p++) {
                        obj[keys[p]] = obj.list[n][keys[p]];
                    }
                    newdata.push(obj);
                }
            } else {
                newdata.push(element);
            }
        }
        return newdata;
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...this.resetTabdata(data.list));
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
            // TODO
            vendor_id: "0",
            "created_date-{>=}": this.getFirstDay(),
            "created_date-{<=}": dateFormat(new Date(new Date().getTime()-24*60*60*1000), "yyyy-MM-dd 23:59:59"),
            vendor_type: "0",
        });

        const time_region_hour_interval_keys = Object.keys(this.tableData.columns["time_region_hour_interval"].options);
        this.listQuery.time_region_hour_interval = time_region_hour_interval_keys[0];
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            //this.sendNotification(HttpType.undefined, { id: data.id });
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
        this.sendNotification(HttpType.admin_statistic_bet_vendor_days_index, objectRemoveNull(this.listQuery));
    }
    onQuery_export(pageInfo: any) {
        const obj = JSON.parse(JSON.stringify(this.listQuery));
        obj.page_count = pageInfo.pageCount;
        obj.page_size = pageInfo.page_size;
        this.sendNotification(HttpType.admin_statistic_bet_vendor_days_index, objectRemoveNull(obj));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = {
            // TODO
        };
        //this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
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
        //this.sendNotification(HttpType.undefined, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                //this.sendNotification(HttpType.undefined, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
    _userList = ["vendor_id", "time_region_hour_interval", "vendor_wallet_type", "coin_name_unique", "win_gold", "vendor_type"];
    myExportPagedata = <any>{};
    /**导出excel */
    exportExcel(data: any) {
        if (data && data.list) {
            data.list = this.resetTabdata(data.list);
        }
        this.myExportPagedata = JSON.parse(JSON.stringify(data));
    }
}
