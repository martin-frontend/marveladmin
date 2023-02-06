import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_backwater/setting";
import { MessageBox, Message } from "element-ui";
import IPlatBackwaterProxy from "./IPlatBackwaterProxy";
import i18n from "@/lang";

export default class PlatBackwaterProxy extends AbstractProxy implements IPlatBackwaterProxy {
    static NAME = "PlatBackwaterProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_table_columns);
        this.sendNotification(HttpType.admin_plat_index, {
            page_count: 1,
            page_size: 1000,
        });
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
            app_types: { name: "运营平台", options: {} },
            backwater_config: { name: "实时返水配置", options: {} },
            backwater_model_id: { name: "实时返水设定", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            extends: { name: "配置参数", options: {} },
            gold: { name: "公共钱包", options: {} },
            gold_transfer_fee: { name: "划转手续费", options: {} },
            gold_transfer_water_multiple: { name: "划转流水", options: {} },
            is_bet_water_display: { name: "投注流水展示", options: {} },
            is_bind_phone_award: { name: "绑定手机-领取奖励", options: {} },
            is_bind_phone_exchange: { name: "绑定手机-收款", options: {} },
            is_bind_phone_transfer: { name: "绑定手机-金币划转", options: {} },
            is_bind_real_name: { name: "兑换绑定真名", options: {} },
            is_delete: { name: "是否删除", options: {} },
            is_gold_transfer: { name: "划转开关", options: {} },
            is_promotion_same: { name: "保底是否平级", options: {} },
            is_promotion_statistics_display: { name: "推广统计展示", options: {} },
            kf_url: { name: "客服链接", options: {} },
            plat_id: { name: "平台ID", options: {} },
            plat_name: { name: "平台名称", options: {} },
            promotion_banner: { name: "推广图解", options: {} },
            promotion_config: { name: "推广配置", options: {} },
            promotion_config_version: { name: "推广配置版本", options: {} },
            promotion_floor: { name: "代理保底", options: {} },
            promotion_floor_unit: { name: "保底设定最小单位", options: {} },
            promotion_model_id: { name: "推广配置", options: {} },
            status: { name: "状态", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            vendor_type: { name: "产品类型", options: {}, options_type: {}, options_rate: {} },
            //vip_config: {name: "VIP等级配置",options: ["等级{num}", "返水比率"],options_key: [{total_water: "有效流水", total_recharge: "总充值"}, {2: "主币", 3: "奖励币"}]
            vip_config: { name: "VIP等级配置", options: {}, options_key: [] },
            vip_model_id: { name: "VIP设定", options: {} },
            water_config: { name: "流水配置", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
    };

    backWaterData = {
        /**列表 */
        vendor_type_options: {},
        /**平台下拉选单 */
        selectOptions: <any>{},
        /**backWater 叙述 */
        backWaterModeDesc: {},
        /**备份 初始化backWater */
        copybackWaterData: [],
        /**数据编辑 */
        isEdit: false,
        /**存党用id */
        saveId: "",
        /**是否显示返水列表 */
        showBackWater: false,
        backWaterConfig: {},
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        delete data.vendor_type.options[0];
        this.backWaterData.vendor_type_options = data.vendor_type.options;
    }

    /**表格数据 */
    setTableData(value: any) {
        const data = JSON.parse(JSON.stringify(value.list));
        data.forEach((list: any) => {
            this.backWaterData.selectOptions[list.plat_id] = list.plat_name;
        });
        if (Object.keys(this.backWaterData.selectOptions).length > 0) {
            if (!this.listQuery.plat_id) {
                this.listQuery.plat_id = Object.keys(this.backWaterData.selectOptions)[0];
            }
            this.onQuery();
        }
    }

    /**详细数据 */
    setDetail(data: any) {
        const { vip_model_id, backwater_model_id, plat_id } = data;
        this.backWaterData.saveId = plat_id;
        this.backWaterData.backWaterConfig = data.backwater_config;
        this.backWaterData.showBackWater = Object.keys(this.backWaterData.backWaterConfig).length > 0;
        if (backwater_model_id) {
            this.sendNotification(HttpType.admin_plat_users_backwater_model_show, { backwater_model_id });
        } else {
            this.backWaterData.backWaterModeDesc = {};
        }
    }

    /**查询 */
    onQuery() {
        this.facade.sendNotification(HttpType.admin_plat_show, {
            plat_id: this.listQuery.plat_id,
        });
    }

    /**更新数据 */
    onUpdate() {
        MessageBox.confirm(<string>LangUtil("您是否保存本次编辑"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                let data = {
                    plat_id: this.backWaterData.saveId,
                    backwater_config: JSON.stringify(this.backWaterData.backWaterConfig),
                };
                this.backWaterData.isEdit = false;
                this.sendNotification(HttpType.admin_plat_update, data);
            })
            .catch(() => { });
    }
    updateSuccess() {
        this.sendNotification(HttpType.admin_plat_show, {
            plat_id: this.listQuery.plat_id,
        });
    }

    onEdit() {
        if (this.backWaterData.isEdit) {
            MessageBox.confirm(<string>LangUtil("您是否取消本次编辑"), <string>LangUtil("提示"), {
                confirmButtonText: <string>LangUtil("确定"),
                cancelButtonText: <string>LangUtil("取消"),
                type: "warning",
            })
                .then(() => {
                    // this.initModel();
                    this.backWaterData.isEdit = false;
                    this.updateSuccess();
                })
                .catch(() => { });
        } else {
            this.backWaterData.isEdit = !this.backWaterData.isEdit;
        }
    }

    /**backwater model 叙述 */
    setBackWaterModel(value: any) {
        this.backWaterData.copybackWaterData = JSON.parse(JSON.stringify(value.backwater_config));
        this.backWaterData.backWaterModeDesc = value;
    }
    /**初始化模版 */
    onInitModel() {
        MessageBox.confirm(<string>LangUtil("您是否初始化数据"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.backWaterData.backWaterConfig = JSON.parse(JSON.stringify(this.backWaterData.copybackWaterData));
            })
            .catch(() => { });
    }

    checkRate(obj: any): boolean {
        let result = true;
        for (const key of Object.keys(obj)) {
            const backwater_rate = parseFloat(obj[key].backwater_rate);
            if (isNaN(backwater_rate) || backwater_rate >= 1) {
                result = false;
            }
        }
        return result;
    }
}
