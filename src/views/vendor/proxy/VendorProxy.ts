import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/vendor/setting";
import { MessageBox } from "element-ui";
import IVendorProxy from "./IVendorProxy";
import { jsonStringify, jsonToObject } from "@/core/global/Functions";
import i18n from "@/lang";
export default class VendorProxy extends AbstractProxy implements IVendorProxy {
    static NAME = "VendorProxy";

    /**在这里获取基础数据，退出页面时，proxy不会销毁，所以只会获取一次 */
    onRegister() { }

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_vendor_table_columns);
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
            bet_detail_url: { name: '投注记录详情链接', options: {} },
            bet_code_content: { name: '下注内容映射关系', options: {} },
            bet_result_content: { name: '下注结果映射关系', options: {} },
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            cron_id: { name: '定时任务编号', options: {} },
            extends: { name: "", options: {} },
            extends_coin: { name: '厂商币种映射', options: {} },
            is_delete: { name: "", options: {} },
            status: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            vendor_desc: { name: "", options: {} },
            vendor_icon: { name: "", options: {} },
            vendor_id: { name: "", options: {} },
            vendor_name: { name: "", options: {} },
            vendor_name_unique: { name: "", options: {} },
            vendor_types: { name: "", options: {} },
            is_save_bet_info: { name: "", options: {} },
            currency_type: { name: "", options: {} },
            proxy_key: { name: "", options: {} },
            time_region_hour_interval: { name: "", options: {} },
            languages: { name: "", options: {} },
            url_get_balance: { name: "", options: {} },
            url_update_balance: { name: "", options: {} },
            vendor_wallet_type: { name: "", options: {} },
            settle_coin_name_unique: { name: "", options: {} },
            visitor_allowed: { name: '游客登录', options: {} },
            coin_name_unique: { name: '可配置币种', options: {} },
            is_digital_currency: { name: '币种类型', options: {} },
            coin_tag: { name: '币种前缀' },
            vendor_coin_name_unique: { name: '厂商币种编号' },
            cancel_order: { name: '取消订单', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**币种数据 */
    coinList = {
        list: <any>[],
    };

    /**查询条件 */
    listQuery = {
        settle_coin_name_unique: "",
        status: "",
        vendor_id: "",
        vendor_name: "",
        vendor_name_unique: "",
        vendor_wallet_type: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            bet_detail_url: 0,
            bet_code_content: "",
            bet_result_content: "",
            cron_id: "",
            vendor_id: null,
            vendor_name: "",
            vendor_name_unique: "",
            vendor_types: [],
            extends: "",
            status: 1,
            vendor_desc: "",
            is_save_bet_info: 1,
            proxy_key: "",
            time_region_hour_interval: 0,
            languages: [],
            url_get_balance: "",
            url_update_balance: "",
            vendor_wallet_type: "",
            settle_coin_name_unique: "",
            visitor_allowed: 98,
            extends_coin: "",
            cancel_order: "",
        },
        formSource: null, // 表单的原始数据
        // 扩展数据
        extendsData: {},
        betCodeContentData: {},
        betResultContentData: {},
    };
    /**支持币种相关数据 */
    dialogCoinData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            coin_name_unique: "",
            vendor_coin_name_unique: "",
        },
        formSource: null, // 表单的原始数据
    }
    /**测试弹窗 */
    testDialogData = {
        bShow: false,
        form: {
            vendor_id: "",
            value: "",
        },
    };

    /**设置表头数据 */
    setTableCoulmns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
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
        this.dialogData.extendsData = jsonToObject(data.extends);
        this.dialogData.betCodeContentData = jsonToObject(data.bet_code_content);
        this.dialogData.betResultContentData = jsonToObject(data.bet_result_content);
        this.coinList.list = JSON.parse(JSON.stringify(data.extends_coin));
        Object.assign(this.dialogData.form, data);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            settle_coin_name_unique: "",
            status: "",
            vendor_id: "",
            vendor_name: "",
            vendor_name_unique: "",
            vendor_wallet_type: "",
            page_count: 1,
            page_size: 20,
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;

        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            this.dialogData.extendsData = jsonToObject(data.extends);
            this.dialogData.betCodeContentData = jsonToObject(data.bet_code_content);
            this.dialogData.betResultContentData = jsonToObject(data.bet_result_content);
            Object.assign(this.dialogData.form, data);
            this.sendNotification(HttpType.admin_vendor_show, { vendor_id: data.vendor_id });
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
            bet_detail_url: 0,
            cron_id: "",
            vendor_id: null,
            vendor_name: "",
            vendor_name_unique: "",
            vendor_types: [],
            extends: "",
            status: 1,
            vendor_desc: "",
            is_save_bet_info: 1,
            proxy_key: "",
            time_region_hour_interval: 0,
            languages: [],
            url_get_balance: "",
            url_update_balance: "",
            vendor_wallet_type: 1,
            settle_coin_name_unique: "",
            visitor_allowed: 98,
            extends_coin: "",
            cancel_order: "",
        });
        this.dialogData.extendsData = {};
        this.dialogData.betCodeContentData = {};
        this.dialogData.betResultContentData = {};
    }
    /**重置币种弹窗表单 */
    resetCoinDialogForm() {
        Object.assign(this.dialogCoinData.form, {
            coin_name_unique: "",
            vendor_coin_name_unique: "",
        });
    }
    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_vendor_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {
            bet_detail_url,
            cron_id,
            vendor_id,
            vendor_name,
            vendor_name_unique,
            vendor_types,
            status,
            vendor_desc,
            proxy_key,
            time_region_hour_interval,
            languages,
            url_get_balance,
            url_update_balance,
            vendor_wallet_type,
            settle_coin_name_unique,
            is_save_bet_info,
            visitor_allowed,
            cancel_order,
        } = this.dialogData.form;
        const formCopy: any = {
            bet_detail_url,
            cron_id,
            vendor_id,
            vendor_name,
            vendor_name_unique,
            vendor_types,
            status,
            vendor_desc,
            proxy_key,
            time_region_hour_interval,
            languages,
            url_get_balance,
            url_update_balance,
            vendor_wallet_type,
            settle_coin_name_unique,
            is_save_bet_info,
            visitor_allowed,
            cancel_order,
        };
        formCopy.vendor_types = JSON.stringify(formCopy.vendor_types);
        formCopy.languages = JSON.stringify(formCopy.languages);
        formCopy.extends = jsonStringify(this.dialogData.extendsData);
        formCopy.bet_code_content = jsonStringify(this.dialogData.betCodeContentData);
        formCopy.bet_result_content = jsonStringify(this.dialogData.betResultContentData);
        formCopy.extends_coin = jsonStringify(this.coinList.list);
        this.sendNotification(HttpType.admin_vendor_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        this.dialogData.form.extends = jsonStringify(this.dialogData.extendsData);
        this.dialogData.form.bet_code_content = jsonStringify(this.dialogData.betCodeContentData);
        this.dialogData.form.bet_result_content = jsonStringify(this.dialogData.betResultContentData);
        this.dialogData.form.extends_coin = jsonStringify(this.coinList.list);
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 特殊处理参数
        // 添加主键
        formCopy.vendor_id = this.dialogData.form.vendor_id;
        this.sendNotification(HttpType.admin_vendor_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_vendor_update, { vendor_id: id, is_delete: 1 });
            })
            .catch(() => { });
    }
    /**测试数据 */
    onTest(value: string) {
        this.sendNotification(HttpType.admin_vendor_test_vendor, {
            vendor_id: this.testDialogData.form.vendor_id,
            value: value,
        });
    }
    /**添加币种数据 */
    showCoinDialog(status: string, data?: any) {
        this.dialogCoinData.bShow = true;
        this.dialogCoinData.status = status;

        if (status == DialogStatus.update) {
            this.dialogCoinData.formSource = data;
            Object.assign(this.dialogCoinData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.resetCoinDialogForm();
            this.dialogCoinData.formSource = null;
        }
    }
    /**隐藏币种弹窗 */
    hideCoinDialog() {
        this.dialogCoinData.bShow = false;
    }
}
