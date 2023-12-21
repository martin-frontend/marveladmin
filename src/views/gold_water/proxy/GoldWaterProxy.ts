import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/gold_water/setting";
import { MessageBox } from "element-ui";
import IGoldWaterProxy from "./IGoldWaterProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import i18n from "@/lang";
import { BaseInfo } from "@/components/vo/commonVo";

export default class GoldWaterProxy extends AbstractProxy implements IGoldWaterProxy {
    static NAME = "GoldWaterProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_gold_water_table_columns);
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
            id: { name: "主键", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            user_id: { name: "用户ID", options: [] },
            plat_id: { name: "平台ID", options: [] },
            gold: { name: "资产数量", options: [] },
            gold_scale: { name: "资产变化的金额[乘比率后]", options: [] },
            coin_name_unique: { name: "币种", options: [] },
            scale: { name: "汇率", options: [] },
            water: { name: "打码流水$", options: [] },
            water_limit: { name: "审核流水$", options: [] },
            type: { name: "金币类型", options: [] },
            pass_type: { name: "流水通过类型", options: [] },
            status: { name: "流水状态", options: [] },
            relation_ids: { name: "关联记录IDS", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_at: { name: "更新时间", options: [] },
            updated_by: { name: "修改人", options: [] },
            username: { name: "用户帐号", options: [] },
            nick_name: { name: "用户昵称", options: [] },
            water_multiple: { name: "流水倍数", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        user_id: "",
        username: "",
        nick_name: "",
        status: "",
        "water_multiple-{<=}": "",
        "water_multiple-{>=}": "",
        "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
        type: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        form: {
            user_id: "",
            water_limit: "",
        },
    };

    /**设置通过 ID */
    approvedId = "";

    /**打开用户详情 ID */
    userDetailId = "";

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const platIdOptionsKeys = Object.keys(this.tableData.columns.plat_id.options);
        if (platIdOptionsKeys.length > 0) {
            if (!platIdOptionsKeys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = platIdOptionsKeys[0];
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

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            user_id: "",
            water_limit: "",
        });
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            user_id: "",
            username: "",
            nick_name: "",
            status: "",
            "water_multiple-{<=}": "",
            "water_multiple-{>=}": "",
            "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            "created_at-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
            type: "",
        });
    }

    /**显示弹窗 */
    showDialog() {
        this.dialogData.bShow = true;
        this.resetDialogForm();
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_gold_water_index, objectRemoveNull(this.listQuery));
    }

    /**搜寻全部资料 */
    onQueryAll() {
        this.tableData.isExportExcel = true;
        let queryCopy: any = JSON.parse(JSON.stringify(this.listQuery));
        queryCopy.page_size = this.tableData.excelPageSize;
        queryCopy.page_count = 1;
        this.sendNotification(HttpType.admin_gold_water_index, objectRemoveNull(queryCopy));
    }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>i18n.t(`gold_water.export`)}-${plat_name}`;
        if (this.listQuery["created_at-{>=}"] && this.listQuery["created_at-{<=}"] != "") {
            name += `-${this.listQuery["created_at-{>=}"]}～${this.listQuery["created_at-{<=}"]}`;
        }
        return name;
    }

    /**导出excel */
    onExportExcel(data: any) {
        this.tableData.isExportExcel = false;
        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            Object.keys(this.tableData.columns),
            this.tableData.columns,
            data.list,
            ["plat_id", "pass_type", "type", "status"],
            []
        );
    }

    /**添加流水审核 */
    onAddWaterLimit() {
        const { user_id, water_limit } = this.dialogData.form;
        const formCopy: any = {
            user_id,
            water_limit,
        };
        this.sendNotification(HttpType.admin_gold_water_store, formCopy);
    }

    /**更新数据 */
    onUpdate() {
        MessageBox.confirm(<string>LangUtil("是否通过此兑换兑换流水审核"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_gold_water_approved, { id: this.approvedId });
            })
            .catch(() => { });
    }

    /**打开用户详情 */
    onShowUserDetail() {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, this.userDetailId);
    }
}
