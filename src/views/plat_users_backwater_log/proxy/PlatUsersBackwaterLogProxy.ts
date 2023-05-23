import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, objectRemoveNull, jsonStringify } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_users_backwater_log/setting";
import IPlatUsersBackwaterLogProxy from "./IPlatUsersBackwaterLogProxy";
import { BaseInfo } from "@/components/vo/commonVo";
export default class PlatUsersBackwaterLogProxy extends AbstractProxy implements IPlatUsersBackwaterLogProxy {
    static NAME = "PlatUsersBackwaterLogProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_backwater_log_table_columns);
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
            plat_id: { name: "", options: {} },
            backwater_id: { name: "", options: {} },
            backwater_config: { name: "", options: {} },
            created_at: { name: "", options: {} },
            user_id: { name: "", options: {} },
            nick_name: { name: "", options: {} },
            settlement_type: { name: "", options: {} },
            total_backwater: { name: "", options: {} },
            total_water: { name: "", options: {} },
            settlement_from_date: { name: "", options: {} },
            settlement_to_date: { name: "", options: {} },
            main_coin_name_unique: { name: "主币", options: {} },
            reward_coin_name_unique: { name: "奖励币", options: {} },
            water_2: { name: "棋牌流水", options: [] },
            water_4: { name: "彩票流水", options: [] },
            water_8: { name: "捕鱼流水", options: [] },
            water_16: { name: "电子流水", options: [] },
            water_32: { name: "真人流水", options: [] },
            water_64: { name: "体育流水", options: [] },
            water_128: { name: "电竞流水", options: [] },
            username: { name: "", options: {} },
            remark: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        total_people: 0,
        total_water: 0,
        total_backwater: 0,
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
        user_id: "",
        nick_name: "",
        "created_at-{>=}": dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
        "created_at-{<=}": dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
        page_count: 1,
        page_size: 20,
        username: "",
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "backwater_id",
            "plat_id",
            "user_id",
            "nick_name",
            "settlement_type",
            "total_water",
            "total_backwater",
            "created_at"
        ],
    };

    /**导出 相关数据 */
    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            user_id: 0,
            nick_name: "",
            settlement_type: 0,
            total_water: 0,
            total_backwater: 0,
            created_at: "",
            detail: [
                {
                    vendor_type: 0,
                    water: "",
                    backwater_rate: 0,
                    backwater: "",
                    gold_scale: "",
                },
            ],
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        const { total_people, total_water, total_backwater } = data;
        Object.assign(this.tableData, {
            total_people,
            total_water,
            total_backwater,
        });
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
            nick_name: "",
            username: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_users_backwater_log_show, {
                plat_id: data.plat_id,
                backwater_id: data.backwater_id,
                id: data.backwater_id,
            });
        } else {
            this.dialogData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_backwater_log_index, objectRemoveNull(this.listQuery));
    }

    /**显示用户详情弹窗 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil("挖矿明细")}-${plat_name}`;
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
        queryCopy.is_export = true;
        this.sendNotification(HttpType.admin_plat_users_backwater_log_index, objectRemoveNull(queryCopy));
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
        // @ts-ignore
        newData.forEach(element => { element.total_backwater = jsonStringify(element.total_backwater); });

        const exportField = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item)
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            exportField,
            this.tableData.columns,
            newData,
            ["plat_id", "settlement_type"],
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
