import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_vendor_gold_log/setting";
import { MessageBox } from "element-ui";
import IPlatUsersVendorGoldLogProxy from "./IPlatUsersVendorGoldLogProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import i18n from "@/lang";
import { BaseInfo } from "@/components/vo/commonVo";

export default class PlatUsersVendorGoldLogProxy extends AbstractProxy implements IPlatUsersVendorGoldLogProxy {
    static NAME = "PlatUsersVendorGoldLogProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_table_columns);
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
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            gold: { name: "金额", options: {} },
            gold_before: { name: "金币变化前的值", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            order_at: { name: "订单时间", options: {} },
            order_no: { name: "订单编号", options: {} },
            plat_id: { name: "所属平台", options: <any>{} },
            response: { name: "接口响应信息", options: {} },
            response_code: { name: "接口状态值", options: {} },
            status: { name: "状态", options: {} },
            type: { name: "订单类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            user_id: { name: "用户ID", options: {} },
            vendor_gold_log_id: { name: "ID", options: {} },
            vendor_id: { name: "产品厂商", options: {} },
            wallet_type: { name: "使用钱包类型", options: {} },
            coin_name_unique: { name: "币种", options: {}},
            scale: { name: "游戏比率", options: {}},
            gold_scale: { name: "金额[乘比率后]", options: {}},
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
        "order_at-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
        "order_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        value: "",
        order_no: "",
        vendor_id: "",
        nick_name: "",
        type: "",
        user_id: "",
        status: "",
        plat_id: "",
        coin_name_unique: "",
    };

    /**操作数据 */
    confirmData = {
        title: "",
        status: "",
        vendor_gold_log_id: "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        console.log(1, plat_id_options_keys);

        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
                console.warn(this.listQuery.plat_id);
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

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            "order_at-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
            "order_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            value: "",
            order_no: "",
            vendor_id: "",
            nick_name: "",
            type: "",
            user_id: "",
            status: "",
            coin_name_unique: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_index, objectRemoveNull(this.listQuery));
    }

    /**更新数据 */
    onUpdate() {
        MessageBox.confirm(
            <string>i18n.t("plat_users_vendor_gold_log.updateConfirmStr", { "0": this.confirmData.title }),
            <string>i18n.t("common.prompt"),
            {
                confirmButtonText: <string>i18n.t("common.determine"),
                cancelButtonText: <string>i18n.t("common.cancel"),
                type: "warning",
            }
        )
            .then(() => {
                const { vendor_gold_log_id, status } = this.confirmData;
                this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_update_manual, {
                    vendor_gold_log_id,
                    status,
                });
            })
            .catch(() => {});
    }

    /**用户详情 */
    onShowUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**搜寻全部资料 */
    onQueryAll() {
        this.tableData.isExportExcel = true;
        let queryCopy: any = JSON.parse(JSON.stringify(this.listQuery));
        queryCopy.page_size = this.tableData.excelPageSize;
        queryCopy.page_count = 1;
        this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_index, objectRemoveNull(queryCopy));
    }

    /**统计栏位导出顺序 */
    _platKeyList = [
        "plat_id",
        "vendor_id",
        "order_no",
        "order_at",
        "user_id",
        "nick_name",
        "type",
        "gold",
        "status",
        "response",
    ];

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>i18n.t(`plat_users_vendor_gold_log.export`)}-${plat_name}`;
        if (this.listQuery["order_at-{>=}"] && this.listQuery["order_at-{<=}"] != "") {
            name += `-${this.listQuery["order_at-{>=}"]}～${this.listQuery["order_at-{<=}"]}`;
        }
        return name;
    }

    /**导出excel */
    onExportExcel(data: any) {
        this.tableData.isExportExcel = false;
        let list = data.list;
        list.map((element: any) => {
            element.response = element.status === 2 ? JSON.parse(element.response).third_response : "-";
        });
        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            this._platKeyList,
            this.tableData.columns,
            list,
            ["plat_id", "vendor_id", "type", "status"],
            []
        );
    }
    /**检测错误 */
    admin_plat_users_vendor_gold_log_auto_check(vendor_gold_log_id: any) {
        this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_auto_check, { vendor_gold_log_id });
    }
}
