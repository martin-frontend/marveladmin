import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/recharge_channels_paymethods/setting";
import { MessageBox } from "element-ui";
import IRechargeChannelsPaymethodsProxy from "./IRechargeChannelsPaymethodsProxy";
import i18n from "@/lang";
export default class RechargeChannelsPaymethodsProxy extends AbstractProxy implements IRechargeChannelsPaymethodsProxy {
    static NAME = "RechargeChannelsPaymethodsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_recharge_channels_table_columns);
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
            account: { name: "APPID账号", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            block_network_id: { name: "区块网络", options: {} },
            coin_relations: { 30000: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "编号", options: {} },
            is_delete: { name: "是否删除", options: {} },
            name: { name: "充值渠道名称", options: {} },
            plat_id: { name: "所属平台", options: {} },
            secret: { name: "APPKEY密钥", options: {} },
            status: { name: "状态", options: {} },
            support_paymethods: { name: "充值支付方式", options: {} },
            type: { name: "厂商类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            vendor_id: {
                name: "充值厂商",
                options: {
                    4: "",
                    94: "",
                    95: "",
                    100: "",
                    101: "",
                    102: "",
                },
                options_key: {
                    4: {},
                    94: {},
                    95: {},
                    100: {},
                    101: {},
                    102: {},
                },
            },
        },
        orderData: {
            id: "",
            opt: "", //操作:1-置顶 |2-置底 |3-上调 |4-下调
            plat_id: "",
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
        page_count: 1,
        page_size: 20,
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            plat_id: null,
            vendor_id: null,
            name: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**弹窗相关数据 */
    addDialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            paychannel_id: "4", //4 数字货币
            paymethod_id: "",
            title: "-", //不显示
            subtitle: "",
            notice: "",
            min_gold: "",
            max_gold: "",
            diy_paytype: "-",
            status: "1",
            is_fixed_gold: "1",
            fixed_gold_list: [],
            block_network_id: "",
            coin_name_unique: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**弹窗表格相关数据 recharge_channels_paymethods*/
    dialogTableData = {
        columns: {
            coin_name_unique: { name: "币种", options: {} },
            block_network_id: { name: "链", options: {} },
            coin_network_map: { options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            diy_paytype: { name: "自定义支付类型", options: {} },
            fixed_gold_list: { name: "固定金额列表", options: {} },
            id: { name: "编号", options: {} },
            is_delete: { name: "是否删除", options: {} },
            is_fixed_gold: { name: "是否固定金额", options: {} },
            max_gold: { name: "最大充值金额", options: {} },
            min_gold: { name: "最小充值金额", options: {} },
            notice: { name: "提示信息", options: {} },
            paychannel_id: { name: "充值渠道", options: {} },
            paymethod_id: { name: "充值方式", options: {} },
            status: { name: "状态", options: {} },
            subtitle: { name: "充值说明", options: {} },
            title: { name: "充值标签", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**渠道数据 */
    channelList = {
        list: [],
    };

    private paychannel_id: any = null;

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
    }

    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, data);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {});
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        this.dialogData.formSource = data;
        this.paychannel_id = data.id;
        Object.assign(this.dialogData.form, data);
        this.sendNotification(HttpType.admin_recharge_channels_paymethods_table_columns);
        this.getDialogData();
    }

    /**取弹窗数据 */
    getDialogData() {
        this.sendNotification(HttpType.admin_recharge_channels_paymethods_index, {
            paychannel_id: this.paychannel_id,
        });
    }

    /**显示添加渠道弹窗 */
    showAddDialog(status: string, data?: any) {
        this.addDialogData.bShow = true;
        this.addDialogData.status = status;
        if (status == DialogStatus.update) {
            this.addDialogData.formSource = data;
            data.paymethod_id = data.paymethod_id.toString();
            data.status = data.status.toString();

            Object.assign(this.addDialogData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.resetDialogForm();
            this.addDialogData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
        this.addDialogData.bShow = false;
    }

    /**隐藏新增/编辑弹窗 */
    hideAddDialog() {
        this.addDialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.addDialogData.form, {
            paychannel_id: "",
            paymethod_id: "4",
            title: "-",
            subtitle: "",
            notice: "",
            min_gold: "",
            max_gold: "",
            status: "1",
            block_network_id: "",
            coin_name_unique: "",
            is_fixed_gold: "",
            fixed_gold_list: [],
            diy_paytype: "-",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_recharge_channels_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const {
            max_gold,
            min_gold,
            notice,
            paychannel_id,
            paymethod_id,
            status,
            subtitle,
            title,
            block_network_id,
            coin_name_unique,
            is_fixed_gold,
            fixed_gold_list,
            diy_paytype,
        } = this.addDialogData.form;
        const formCopy: any = {
            // TODO
            max_gold,
            min_gold,
            notice,
            paychannel_id,
            paymethod_id,
            status,
            subtitle,
            title,
            block_network_id,
            coin_name_unique,
            is_fixed_gold,
            fixed_gold_list,
            diy_paytype,
        };
        formCopy.fixed_gold_list = JSON.stringify(fixed_gold_list);
        formCopy.paychannel_id = this.paychannel_id;
        this.sendNotification(HttpType.admin_recharge_channels_paymethods_store, formCopy);
    }

    /**更新数据 */
    onUpdate(data?: any) {
        const formCopy: any = formCompared(this.addDialogData.form, this.addDialogData.formSource);
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.addDialogData.bShow = false;
            return false;
        }
        formCopy.id = this.addDialogData.form.id;
        this.sendNotification(HttpType.admin_recharge_channels_paymethods_update, formCopy);
    }

    /**更新状态数据 */
    onUpdateSwitch(data: any, flag?: string) {
        if (flag === "body") {
            this.sendNotification(HttpType.admin_recharge_channels_update, data);
        } else {
            this.sendNotification(HttpType.admin_recharge_channels_paymethods_update, data);
        }
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_recharge_channels_paymethods_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }

    /**设置dialog 表头数据 */
    setDialogTableColumns(data: any) {
        Object.assign(this.dialogTableData.columns, data);
    }

    /**设置dialog 数据 */
    setDialogTableData(data: any) {
        data.list.forEach((item: any) => {
            item.status = item.status.toString(); // status 转字串
        });
        this.channelList.list = JSON.parse(JSON.stringify(data.list));
    }

    /**排序 */
    onOrderList() {
        const formCopy = this.tableData.orderData;
        this.sendNotification(HttpType.admin_recharge_channels_paymethods_update, formCopy);
    }
}
