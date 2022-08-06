import AbstractProxy from "@/core/abstract/AbstractProxy";
import { formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/exchange_orders/setting";
import IExchangeAutoCheckProxy from "./IExchangeAutoCheckProxy";
import router from "@/router";
import { dateFormat } from "@/core/global/Functions";
import cmd_admin_lobby_product_show from "@/views/lobby_product/command/cmd_admin_lobby_product_show";

export default class ExchangeAutoCheckProxy extends AbstractProxy implements IExchangeAutoCheckProxy {
    static NAME = "ExchangeAutoCheckProxy";

    /**进入页面时调用 */
    enter() {
        // 先注释掉 暂时没有此功能，不然会报权限错误
        // this.sendNotification(HttpType.admin_exchange_auto_check_setting_table_columns);
    }

    /**离开页面时调用 */
    leave() {}

    /**表格相关数据 */
    tableData = {
        columns: {
            check_win_loss: { name: "输赢核对", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            login_ip_num: { name: "相同登录IP", options: {} },
            plat_id: { name: "平台", options: {} },
            register_ip_num: { name: "相同创建IP", options: {} },
            single_max_gold: { name: "单笔最大金额", options: {} },
            single_min_gold: { name: "单笔最小金额", options: {} },
            status: { name: "状态", options: {} },
            total_gold: { name: "审核总额", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
        },
        list: <any>[],
        message: {},
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
    };

    /**自动审核弹窗 */
    autoCheckDialog = {
        bShow: false,
        form: <any>{
            plat_id: "",
            total_gold: "50000",
            single_gold: "10000",
            stop_gold: "200",
            check_win_loss: 1,
            register_ip_num: 10,
            login_ip_num: 10,
            status: null,
        },
        isFirst: true,
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options.length > 0) {
            if (!plat_id_options.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = "0";
            }
        }
        this.checkVerify();
    }

    /**重置 */
    resetDialogForm() {
        Object.assign(this.autoCheckDialog.form, {
            // plat_id: "",
            total_gold: "50000",
            single_gold: "10000",
            stop_gold: "200",
            check_win_loss: 1,
            register_ip_num: 10,
            login_ip_num: 10,
            status: null,
        });
        this.autoCheckDialog.isFirst = true;
        this.autoCheckDialog.formSource = null;
    }

    /**自动审核 弹窗 */
    onShowAutoCheckDialog() {
        this.autoCheckDialog.bShow = true;
        this.checkVerify();
    }

    /**確定平台是否在審核中 */
    checkVerify() {
        this.sendNotification(HttpType.admin_exchange_auto_check_setting_show, {
            plat_id: this.listQuery.plat_id,
        });
    }
    /**写入審核中 数据 */
    setVerify(body: any) {
        console.log("setVerify", body);
        if (Object.keys(body).length > 0) {
            // console.log("setVerify 再次進來");
            this.autoCheckDialog.isFirst = false;
            Object.assign(this.autoCheckDialog.form, body);
            this.autoCheckDialog.formSource = JSON.parse(JSON.stringify(body));
            this.autoCheckDialog.form.plat_id = this.autoCheckDialog.form.plat_id.toString();
        } else {
            // console.log("setVerify 第一次");
            this.resetDialogForm();
        }
    }

    /**自动审核 开始 */
    actionAutoCheck() {
        const {
            plat_id,
            total_gold,
            single_gold,
            stop_gold,
            check_win_loss,
            register_ip_num,
            login_ip_num,
        } = this.autoCheckDialog.form;
        let formCopy: any = {
            plat_id,
            total_gold,
            single_gold,
            stop_gold,
            check_win_loss,
            register_ip_num,
            login_ip_num,
        };
        if (this.autoCheckDialog.isFirst === true) {
            this.sendNotification(HttpType.admin_exchange_auto_check_setting_store, formCopy);
        } else {
            formCopy = formCompared(formCopy, this.autoCheckDialog.formSource);
            formCopy.plat_id = this.autoCheckDialog.form.plat_id;
            formCopy.status = 1;

            this.sendNotification(HttpType.admin_exchange_auto_check_setting_update, formCopy);
        }
    }

    /**关闭弹窗 */
    hideDialog() {
        this.autoCheckDialog.bShow = false;
        this.resetDialogForm();
    }

    /**停止审核  */
    stopVerify() {
        this.sendNotification(HttpType.admin_exchange_auto_check_setting_update, {
            plat_id: this.autoCheckDialog.form.plat_id,
            status: 98,
        });
    }
}
