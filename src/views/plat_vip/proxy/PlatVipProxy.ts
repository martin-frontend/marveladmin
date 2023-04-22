import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_vip/setting";
import { MessageBox } from "element-ui";
import IPlatVipProxy from "./IPlatVipProxy";
import i18n from "@/lang";
export default class PlatVipProxy extends AbstractProxy implements IPlatVipProxy {
    static NAME = "PlatVipProxy";

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
            // TODO
            app_types: { name: "运营平台", options: {} },
            backwater_config: { name: "实时返水配置", options: {} },
            backwater_model_id: { name: "实时返水设定", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            extends: { name: "配置参数", options: {} },
            gold: { name: "公共钱包", options: {} },
            is_bind_phone_award: { name: "绑定手机-领取奖励", options: {} },
            is_bind_phone_exchange: { name: "绑定手机-收款", options: {} },
            is_delete: { name: "是否删除", options: {} },
            kf_url: { name: "客服链接", options: {} },
            plat_id: { name: "平台ID", options: {} },
            plat_name: { name: "平台名称", options: {} },
            promotion_banner: { name: "推广图解", options: {} },
            promotion_config: { name: "推广配置", options: {} },
            promotion_config_version: { name: "推广配置版本", options: {} },
            promotion_floor: { name: "代理保底", options: {} },
            promotion_model_id: { name: "推广配置", options: {} },
            status: { name: "状态", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            vendor_type: { name: "产品类型", options: <any>{}, options_type: {}, options_rate: {} },
            vip_config: { name: "VIP等级配置", options: {} },
            vip_model_id: { name: "VIP设定", options: {} },
            water_config: { name: "流水配置", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
    };

    /**平台下拉选单 */
    selectOptions = <any>{};

    /**vip 叙述 */
    vipModeDesc = {};

    /**vip 数据 */
    vipData = <any>[];

    types = [];

    /**备份 初始化vip */
    copyVipData = [];

    /**数据编辑 */
    isEdit = false;

    /**最高等级 options */
    levelOptions = <any>[];

    /**最高等级 */
    maxLevel = "";

    /**存党用id */
    saveId = "";

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        // 移除key:0
        delete this.tableData.columns.vendor_type.options[0];
    }

    /**表格数据 */
    setTableData(value: any) {
        const data = JSON.parse(JSON.stringify(value.list));
        data.forEach((list: any) => {
            this.selectOptions[list.plat_id] = list.plat_name;
        });
        if (Object.keys(this.selectOptions).length > 0) {
            if (!this.listQuery.plat_id) {
                this.listQuery.plat_id = Object.keys(this.selectOptions)[0];
            }
            this.onQuery();
        }
    }

    /**详细数据 */
    setDetail(data: any) {
        const { vip_model_id, vip_config, plat_id } = data;
        this.saveId = plat_id;
        this.vipData = [];
        this.vipData = vip_config;

        if (vip_model_id) {
            this.levelOptions = [];
            for (let i = 0; i < vip_config.length; i++) {
                this.levelOptions[i] = i + 1;
            }
            this.maxLevel = this.levelOptions.length;
            this.levelOptions = Object.assign({}, this.levelOptions);
            this.sendNotification(HttpType.admin_plat_users_vip_model_show, { vip_model_id });
        } else {
            this.vipModeDesc = {};
            this.maxLevel = "";
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
        MessageBox.confirm(<string>LangUtil("是否保存本次编辑"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                let data = {
                    plat_id: this.saveId,
                    vip_config: JSON.stringify(this.vipData),
                };
                this.sendNotification(HttpType.admin_plat_update, data);
            })
            .catch(() => { });
    }

    /**vip model 叙述 */
    setVipModel(value: any) {
        this.copyVipData = JSON.parse(JSON.stringify(value.vip_config));
        this.vipModeDesc = value;
        const { vip_config, types } = value;
        this.vipData = [];
        this.vipData = vip_config;
        this.types = types;
    }

    /**初始化模版 */
    onInitModel() {
        MessageBox.confirm(<string>LangUtil("您是否初始化数据"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.vipData = JSON.parse(JSON.stringify(this.copyVipData));
                this.maxLevel = this.copyVipData.length.toString();
            })
            .catch(() => { });
    }

    /**最高等级切换 */
    onLevelChange(e: any) {
        let start = Number(e);
        this.vipData = JSON.parse(JSON.stringify(this.copyVipData));
        this.vipData.splice(start + 1);
    }
}
