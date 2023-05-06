import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_vendors_wallet/setting";
import { MessageBox, TableColumn } from "element-ui";
import IPlatVendorsWalletProxy from "./IPlatVendorsWalletProxy";
import i18n from "@/lang";

export default class PlatVendorsWalletProxy extends AbstractProxy implements IPlatVendorsWalletProxy {
    static NAME = "PlatVendorsWalletProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_vendors_wallet_table_columns);
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
            // TODO
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            gold: { name: "金币余额", options: {} },
            id: { name: "自增ID", options: {} },
            is_limit_user_recharge: { name: "是否限制用户上分额度", options: {} },
            plat_id: { name: "所属平台", options: {} },
            status: { name: "状态", options: {} },
            type: { name: "使用钱包类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_recharge_max: { name: "用户进入游戏最高额度", options: {} },
            vendor_id: { name: "厂商ID", options: {} },
            vendor_name: { name: "厂商名称", options: {} },
            currency_type: { name: "结算方式", options: {} },
            vendor_desc: { name: '厂商描述', options: {} },
            vendor_id_options: {},
        },
        list: <any>[],
        platInfo: {
            gold: "",
            plat_id: 0,
            plat_name: "",
        },
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        vendor_id: "",
    };

    /**记录 查询条件 */
    logListQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        vendor_id: "",
        "created_at-{>}": "",
        "created_at-{<}": "",
    };

    /**表格操作弹窗 相关数据 */
    vendorDialogData = {
        setting: {
            bShow: false,
            formSource: <any>{}, // 表单的原始数据
            form: <any>{
                plat_id: "",
                vendor_id: "",
                type: 0,
                status: 0,
                id: 0,
            },
        },
        log: {
            bShow: false,
        },
        wallet: {
            bShow: false,
            form: {
                gold: 0,
                id: 0,
                type: 1, //1 上分, 2 下分
            },
            title: <any>{
                1: LangUtil("上分"),
                2: LangUtil("下分"),
            },
        },
        limit: {
            bShow: false,
            form: {
                id: 0,
                is_limit_user_recharge: 0, //是否限制用户上分:0-否|1-是
                user_recharge_max: null,
            },
        },
        create: {
            bShow: false,
            form: {
                checkboxData: <any>[],
                data: [],
            },
        },
    };

    /**公共钱包弹窗 相关数据 */
    publicDialogData = {
        isPublicCtrl: false,
        log: {
            bShow: false,
        },
        wallet: {
            bShow: false,
            form: {
                plat_id: "",
                type: 1, //1 上分, 2 下分
                gold: 0,
            },
            title: <any>{
                1: LangUtil("上分"),
                2: LangUtil("下分"),
            },
        },
    };

    /**记录查询表格相关数据 */
    logData = {
        columns: {
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            gold: { name: "金额", options: {} },
            id: { name: "自增ID", options: {} },
            plat_id: { name: "平台ID", options: {} },
            type: { name: "类型", options: {} },
            vendor_id: { name: "厂商ID", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const vendor_id_options_keys = Object.keys(this.tableData.columns.vendor_id.options);
        if (plat_id_options_keys.length > 0 && vendor_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (this.listQuery.plat_id) {
                this.tableData.columns.vendor_id_options = this.tableData.columns.vendor_id.options[
                    this.listQuery.plat_id
                ];
            }
            this.onQuery();
        }
    }

    /**设置记录 表头数据 */
    setLogTableColumns(data: any) {
        Object.assign(this.logData.columns, data);
        this.onLogQuery();
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.platInfo = data.plat_info;
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**设置记录 表格数据 */
    setLogTableData(data: any) {
        this.logData.list.length = 0;
        this.logData.list.push(...data.list);
        Object.assign(this.logData.pageInfo, data.pageInfo);
        if (this.publicDialogData.isPublicCtrl) {
            this.publicDialogData.log.bShow = true;
        } else {
            this.vendorDialogData.log.bShow = true;
        }
    }

    /**重置紀錄 查询条件 */
    resetLogListQuery() {
        Object.assign(this.logListQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            "created_at-{>}": "",
            "created_at-{<}": "",
        });
    }

    /**重置 搜寻条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            page_count: 1,
            page_size: 20,
            vendor_id: "",
        });
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.vendorDialogData.setting.bShow = false;
        this.vendorDialogData.log.bShow = false;
        this.vendorDialogData.wallet.bShow = false;
        this.vendorDialogData.limit.bShow = false;
        this.vendorDialogData.create.bShow = false;
        this.publicDialogData.log.bShow = false;
        this.publicDialogData.wallet.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        // 厂商上下分
        Object.assign(this.vendorDialogData.wallet.form, {
            gold: "",
        });
        // 额度设置
        Object.assign(this.vendorDialogData.limit.form, {
            user_recharge_max: null,
            is_limit_user_recharge: 0,
        });
        // 新增
        Object.assign(this.vendorDialogData.create.form, {
            checkboxData: [],
            data: [],
        });
        // log
        Object.assign(this.publicDialogData.wallet.form, {
            type: 1, //1 上分, 2 下分
            gold: "",
        });
        Object.assign(this.logListQuery, {
            page_count: 1,
            page_size: 20,
            plat_id: "",
            vendor_id: "",
            "created_at-{>}": "",
            "created_at-{<}": "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_vendors_wallet_index, objectRemoveNull(this.listQuery));
    }

    /**记录查询 */
    onLogQuery() {
        if (this.publicDialogData.isPublicCtrl) {
            this.sendNotification(HttpType.admin_plat_wallet_log_index, objectRemoveNull(this.logListQuery));
        } else {
            this.sendNotification(HttpType.admin_plat_vendors_wallet_log_index, objectRemoveNull(this.logListQuery));
        }
    }

    /**添加钱包 */
    onAdd() {
        const formCopy: any = {
            plat_id: this.listQuery.plat_id,
            vendor_ids: JSON.stringify(this.vendorDialogData.create.form.data),
        };
        this.sendNotification(HttpType.admin_plat_vendors_wallet_store, objectRemoveNull(formCopy));
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_vendors_wallet_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }

    /**操作-> 设这数据 */
    onSettingDialog(row: any) {
        const { plat_id, vendor_id, type, status, id } = row;
        this.vendorDialogData.setting.form = {
            plat_id,
            vendor_id,
            type,
            status,
            id,
        };
        this.vendorDialogData.setting.formSource = {
            plat_id,
            vendor_id,
            type,
            status,
            id,
        };
        this.vendorDialogData.setting.bShow = true;
    }

    /**操作-> 设这 存挡 */
    onSettingUpdate() {
        // 删除多余无法去除的参数
        const formCopy: any = formCompared(
            this.vendorDialogData.setting.form,
            this.vendorDialogData.setting.formSource
        );
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.vendorDialogData.setting.bShow = false;
            return false;
        }
        // 发送消息
        formCopy.id = this.vendorDialogData.setting.form.id;
        this.sendNotification(HttpType.admin_plat_vendors_wallet_update, formCopy);
    }

    /**记录 */
    onLog(row: any) {
        this.resetDialogForm();
        const { plat_id, vendor_id } = row;
        this.sendNotification(HttpType.admin_plat_vendors_wallet_log_table_columns);
        this.logListQuery.plat_id = plat_id;
        this.logListQuery.vendor_id = vendor_id;
    }

    /**操作-> 上下分弹窗 */
    onShowVenderWalletDialog() {
        this.resetDialogForm();
        this.vendorDialogData.wallet.bShow = true;
    }

    /**操作-> 上下分存挡 */
    onVenderWalletUpdate() {
        const formCopy = this.vendorDialogData.wallet.form;
        this.sendNotification(HttpType.admin_plat_vendors_wallet_update_gold, formCopy);
    }

    /**操作-> 额度设置弹窗 */
    onShowVendorLimitDialog() {
        this.resetDialogForm();
        this.vendorDialogData.limit.bShow = true;
    }

    /**操作-> 额度设置存挡 */
    onVenderLimitUpdate() {
        const formCopy = this.vendorDialogData.limit.form;
        this.sendNotification(HttpType.admin_plat_vendors_wallet_update, objectRemoveNull(formCopy));
    }

    /**新增钱包 数据 */
    onCreateWallet() {
        this.resetDialogForm();
        const vendor_options_keys = <any>Object.keys(this.tableData.columns.vendor_id.options[this.listQuery.plat_id]);
        vendor_options_keys.forEach((item: any) => {
            this.vendorDialogData.create.form.checkboxData.push({
                key: item,
                value: this.tableData.columns.vendor_id.options[this.listQuery.plat_id][item],
            });

        })
        this.vendorDialogData.create.bShow = true;
    }

    /**新增钱包 数据存挡 */
    setCreateData(data: any = null) {
        // 阵列的值转字串
        const vendor_options_keys = <any>Object.keys(this.tableData.columns.vendor_id.options);
        if (vendor_options_keys.length > 0) {
            // 已经有的不显示
            let result = vendor_options_keys.filter((v: any) => {
                return data.indexOf(parseInt(v)) == -1;
            });
            // 组成资料
            result.forEach((item: any) => {
                this.vendorDialogData.create.form.checkboxData.push({
                    key: item,
                    value: this.tableData.columns.vendor_id.options[item],
                });
            });
            this.vendorDialogData.create.bShow = true;
        }
    }

    /**公共钱包 记录查询 */
    onPublicLog() {
        this.resetDialogForm();
        this.sendNotification(HttpType.admin_plat_vendors_wallet_log_table_columns);
        this.logListQuery.plat_id = this.listQuery.plat_id;
    }

    /**公共钱包 上下分弹窗 */
    showPublicWalletDialog() {
        this.publicDialogData.wallet.bShow = true;
    }

    /**公共钱包 上下分存挡 */
    onPublicWalletUpdate() {
        this.sendNotification(HttpType.admin_plat_wallet_update_gold, this.publicDialogData.wallet.form);
    }
}
