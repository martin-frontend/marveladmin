import { BaseInfo } from "@/components/vo/commonVo";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import router from "@/router";
import CoinReceivePaymentChannelMediator from "@/views/coin_receive_payment_channel/mediator/CoinReceivePaymentChannelMediator";
import { HttpType } from "@/views/coin_wallet/setting";
import { MessageBox } from "element-ui";
import ICoinWalletProxy from "./ICoinWalletProxy";

export default class CoinWalletProxy extends AbstractProxy implements ICoinWalletProxy {
    static NAME = "CoinWalletProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_coin_wallet_table_columns);
        this.sendNotification(HttpType.admin_coin_wallet_log_table_columns);
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
            plat_id: { name: "", options: {} },
            admin_user_id: { name: "", options: {} },
            admin_username: { name: "", options: {} },
            gold: { name: "", options: {} },
            type: { name: "", options: {} },
        },
        list: <any>[],
        isCoinWalletIndex: true,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        admin_user_id: "",
        admin_username: "",
        type: "",
        page_count: 1,
        page_size: 20,
    };
    /**记录查询条件 */
    logListQuery = {
        admin_user_id: "",
        [BaseInfo.DateRangeKey.dateFrom]: "",
        [BaseInfo.DateRangeKey.dateTo]: "",
        type: "",
        page_count: 1,
        page_size: 20,
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
    /**上分相关数据 */
    depositData = {
        bShow: false,
        form: {
            admin_username: "",
            id: "",
            plat_id: "",
            gold: "",
            amount: "",
        },
    };
    /**下分相关数据 */
    withdrawData = {
        bShow: false,
        form: {
            admin_username: "",
            id: "",
            plat_id: "",
            amount: "",
        },
    };
    /**记录查询数据 */
    logDialogData = {
        bShow: false,
        columns: {
            plat_id: { name: "", options: {} },
            admin_user_id: { name: "", options: {} },
            admin_username: { name: "", options: {} },
            created_at: { name: "", options: {} },
            type: { name: "", options: <any>{} },
            gold: { name: "", options: {} },
            created_by: { name: "", options: {} },
            gold_after: { name: "", options: {} },
            gold_before: { name: "", options: {} },
            order_no: { name: "", options: {} },
        },
        isCoinWalletShow: true,
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
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
    /**设置记录表头数据 */
    setLogTableColumns(data: any) {
        Object.assign(this.logDialogData.columns, data);
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.isCoinWalletIndex = false;
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }
    /**记录数据 */
    setLogData(data: any) {
        this.logDialogData.list.length = 0;
        this.logDialogData.list.push(...data.list);
        Object.assign(this.logDialogData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            admin_user_id: "",
            admin_username: "",
        });
    }
    /**重置记录查询条件 */
    resetLogQuery() {
        Object.assign(this.logListQuery, {
            [BaseInfo.DateRangeKey.dateFrom]: "",
            [BaseInfo.DateRangeKey.dateTo]: "",
            type: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**显示上分弹窗 */
    showDeposit(data?: any) {
        this.depositData.bShow = true;
        Object.assign(this.depositData.form, JSON.parse(JSON.stringify(data)));
        this.depositData.form.amount = "";
    }
    /**隐藏上分弹窗 */
    hideDeposit() {
        this.depositData.bShow = false;
    }
    /**显示下分弹窗 */
    showWithdraw(data?: any) {
        this.withdrawData.bShow = true;
        Object.assign(this.withdrawData.form, JSON.parse(JSON.stringify(data)));
        this.withdrawData.form.amount = "";
    }
    /**隐藏下分弹窗 */
    hideWithdraw() {
        this.withdrawData.bShow = false;
    }
    /**显示记录查询弹窗 */
    showLog(admin_user_id: string) {
        this.logDialogData.bShow = true;
        this.logListQuery.admin_user_id = admin_user_id;
        this.onLogQuery();
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_coin_wallet_index, objectRemoveNull(this.listQuery));
    }

    /**记录查询 */
    onLogQuery() {
        this.sendNotification(HttpType.admin_coin_wallet_log_index, objectRemoveNull(this.logListQuery));
    }

    /**上分 */
    onDeposit(data: any) {
        const { id, amount, plat_id } = data;
        const formCopy: any = {};
        Object.assign(formCopy, { id: id, amount: amount, plat_id: plat_id });
        this.sendNotification(HttpType.admin_coin_wallet_deposit, objectRemoveNull(formCopy));
    }
    /**下分 */
    onWithdraw(data: any) {
        const { id, amount, plat_id } = data;
        const formCopy: any = {};
        Object.assign(formCopy, { id: id, amount: amount, plat_id: plat_id });
        this.sendNotification(HttpType.admin_coin_wallet_withdraw, objectRemoveNull(formCopy));
    }

    /**更新状态 */
    onUpdateStatus(obj: any) {
        this.sendNotification(HttpType.admin_coin_wallet_update, {
            status: obj.status,
            id: obj.id,
        });
    }

    /**取得所有资料 */
    onQueryAll() {
        this.logDialogData.isExportExcel = true;
        let queryCopy: any = JSON.parse(JSON.stringify(this.logListQuery));
        queryCopy.page_size = this.logDialogData.excelPageSize;
        queryCopy.page_count = 1;
        this.facade.sendNotification(HttpType.admin_coin_wallet_log_index, objectRemoveNull(queryCopy));
    }

    /**统计栏位导出顺序 */
    _KeyList = [
        "admin_user_id",
        "created_by",
        "admin_username",
        "created_at",
        "type",
        "gold_before",
        "gold",
        "gold_after",
    ];

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${router.currentRoute.name}-${plat_name}`;
        if (this.logListQuery["created_at-{>=}"] && this.logListQuery["created_at-{<=}"] != "") {
            name += `-${this.logListQuery["created_at-{>=}"]}～${this.logListQuery["created_at-{<=}"]}`;
        }
        return name;
    }

    /**导出excel */
    exportExcel(data: any) {
        this.logDialogData.isExportExcel = false;
        for (const item of data.list) {
            item.type = this.logDialogData.columns["type"].options[item.type];
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            this._KeyList,
            this.logDialogData.columns,
            data.list,
            [],
            []
        );
    }
}
