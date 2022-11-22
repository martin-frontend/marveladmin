import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { HttpType } from "@/views/plat_agent/setting";
import { Message, MessageBox } from "element-ui";
import IPlatAgentProxy from "./IPlatAgentProxy";
import i18n from "@/lang";

export default class PlatAgentProxy extends AbstractProxy implements IPlatAgentProxy {
    static NAME = "PlatAgentProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_agent_promotion_model_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.isEdit = false;
    }

    /**表格相关数据 */
    tableData = {
        columns: {
            app_type: { name: "应用平台", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            desc: { name: "模版描述", options: {} },
            is_delete: { name: "是否删除", options: {} },
            name: { name: "模版名称", options: {} },
            plat_id: { name: "所属平台", options: {} },
            promotion_config: { name: "推广配置", options: {}, options_key: {} },
            promotion_extra_config: { gift_rate: "", gold: "" },
            promotion_model_id: { name: "平台代理推广配置模版表ID", options: {} },
            type: { name: "类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            is_promotion_num_added: { name: "修改人", options: {} },
        },
        // 是否编辑状态
        isEdit: false,
        // 最高等级
        maxlevels: <any>{},
        // 平台数据详情
        detail: <any>{ promotion_model_id: 0, promotion_extra_config: {} },
        // 平台数据详情 源
        detail_source: <any>null,
        // 推广配置模板
        promotionModel: <any>{ promotion_model_id: 0, is_promotion_num_added: 98, calc_type: 0 },
        // 当前选择的标签页
        activeName: "2",
        // 更新
        update: 0,
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        form: <any>{},
        formSource: <any>{},
        // 当前操作的项
        currentKey: "",
        // 活动项
        activeKey: "",
        // 更新
        update: 0,
    };

    /**额外返佣配置弹窗相关数制 */
    promotionDialogData = {
        bShow: false,
        // 额外返佣配置
        extraConfig: <any>[],
        formSource: <any>{},
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        // 设置默认的平台
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
        // 设置默认的标签
        // const promotion_config_options_keys = Object.keys(this.tableData.columns.promotion_config.options);
        // if (promotion_config_options_keys.length > 0) {
        //     this.tableData.activeName = promotion_config_options_keys[0];
        //     console.log("this.tableData.activeName: ", this.tableData.activeName);
        // }
    }

    /**详细数据 */
    setDetail(value: any) {
        Object.assign(this.tableData.detail, JSON.parse(JSON.stringify(value)));
        this.tableData.detail_source = value;
        const confKeys = Object.keys(value.promotion_config);
        for (const key of confKeys) {
            this.tableData.maxlevels[key] = value.promotion_config[key].length;
        }
        // 弹窗 代理图片相关数据
        const keys = Object.keys(this.dialogData.form);
        for (const key of keys) {
            delete this.dialogData.form[key];
        }
        Object.assign(this.dialogData.form, value.promotion_banner);
        this.dialogData.formSource = JSON.parse(JSON.stringify(this.dialogData.form));
        // 获取模板
        const { promotion_model_id } = value;
        if (promotion_model_id) {
            this.sendNotification(HttpType.admin_plat_agent_promotion_model_show, { promotion_model_id });
        }
    }

    /**Promotion 数据 */
    setPromotionModel(value: any) {
        Object.assign(this.tableData.promotionModel, value);
        // 设置默认的标签
        if (this.tableData.promotionModel.calc_type == 1) {
            const promotion_config_options_keys = Object.keys(this.tableData.columns.promotion_config.options);
            if (promotion_config_options_keys.length > 0) {
                this.tableData.activeName = promotion_config_options_keys[0];
            }
        } else {
            this.tableData.activeName = "0";
        }
        console.log("this.tableData.activeName: ", this.tableData.activeName);
    }

    /**显示弹窗 */
    showDialog() {
        this.dialogData.bShow = true;
        Object.assign(this.dialogData.form, this.dialogData.formSource);
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**查询 */
    onQuery() {
        this.facade.sendNotification(HttpType.admin_plat_show, { plat_id: this.listQuery.plat_id });
    }

    /**图片更换 */
    onHandleChange(data: any) {
        this.sendNotification(HttpType.admin_resource_upload, data);
    }

    /**图片更换完成 */
    onUploadSuccess(data: any) {
        this.dialogData.form[this.dialogData.currentKey] = data.url;
        this.dialogData.update++;
    }

    /**banner 确认 */
    onSetBanner() {
        const banner = JSON.stringify(this.dialogData.form);
        if (banner == JSON.stringify(this.dialogData.formSource)) {
            this.dialogData.bShow = false;
            return false;
        }
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: this.listQuery.plat_id,
            promotion_banner: banner,
        });
    }

    /**初始化系统模板 */
    onInitModel() {
        MessageBox.confirm(<string>LangUtil("您是否初始化数据"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                const copyConfig = JSON.parse(JSON.stringify(this.tableData.promotionModel.promotion_config));
                this.tableData.detail.promotion_config = copyConfig;

                const confKeys = Object.keys(this.tableData.detail.promotion_config);
                for (const key of confKeys) {
                    this.tableData.maxlevels[key] = this.tableData.detail.promotion_config[key].length;
                }
                // 强制刷新页面
                this.tableData.update++;
            })
            .catch(() => {});
    }

    /**确定保存 */
    onSave() {
        const conf = this.tableData.detail.promotion_config;
        const confSource = this.tableData.detail_source.promotion_config;
        const strConf = JSON.stringify(conf);
        const strConfSource = JSON.stringify(confSource);
        if (strConf != strConfSource) {
            MessageBox.confirm(<string>LangUtil("是否保存本次编辑"), <string>LangUtil("提示"), {
                confirmButtonText: <string>LangUtil("确定"),
                cancelButtonText: <string>LangUtil("取消"),
                type: "warning",
            })
                .then(() => {
                    const promotionOptions: any = this.tableData.columns.promotion_config.options;
                    const types = Object.keys(conf);
                    for (const type of types) {
                        const c = conf[type];
                        for (let i = 0; i < c.length; i++) {
                            const item = c[i];
                            if (item.commission_num == undefined || item.total_performance == undefined) {
                                Message.warning(
                                    `${promotionOptions[type]}` +
                                        LangUtil("等级") +
                                        `${i + 1}` +
                                        LangUtil("没有录入数据")
                                );
                                return;
                            }
                        }
                    }

                    this.sendNotification(HttpType.admin_plat_update, {
                        plat_id: this.listQuery.plat_id,
                        promotion_config: strConf,
                    });
                    this.tableData.isEdit = false;
                })
                .catch(() => {});
        }
    }

    /**取消编辑, 恢复数据 */
    onCancel() {
        const copyConfig = JSON.parse(JSON.stringify(this.tableData.detail_source.promotion_config));
        this.tableData.detail.promotion_config = copyConfig;

        const confKeys = Object.keys(this.tableData.detail.promotion_config);
        for (const key of confKeys) {
            this.tableData.maxlevels[key] = this.tableData.detail.promotion_config[key].length;
        }
        // 强制刷新页面
        this.tableData.update++;
    }

    /**更改最高等级 */
    onLevelChange(type: string) {
        const tableData = this.tableData;
        const conf = tableData.detail.promotion_config[type];
        const maxLevel = tableData.maxlevels[type];
        if (conf.length > maxLevel) {
            // 如果长度大于最大，则减去后面的部分
            conf.splice(maxLevel);
        } else if (conf.length < maxLevel) {
            // 如果长充小于最大，则要从模板中取出后面的部分加上去
            const confModel = tableData.promotionModel.promotion_config[type];
            const arr = confModel.slice(conf.length, maxLevel);
            conf.push(...JSON.parse(JSON.stringify(arr)));
        }
        // 强制刷新页面
        this.tableData.update++;
    }

    /**显示返佣配置弹窗 */
    showPromotionDialog() {
        this.promotionDialogData.bShow = true;
        this.promotionDialogData.extraConfig = [];
        Object.values(this.tableData.detail.promotion_extra_config).forEach(value => {
            this.promotionDialogData.extraConfig.push(JSON.parse(JSON.stringify(value)));
        });
    }

    /**隐藏返佣配置弹窗 */
    hidePromotionDialog() {
        this.promotionDialogData.bShow = false;
    }

    /**添加返佣配置 */
    addPromotionConfig() {
        let config = {
            gift_rate: 0,
            gold: 0,
        };
        this.promotionDialogData.extraConfig.push(JSON.parse(JSON.stringify(config)));
    }

    /**删除返佣配置 */
    deletePromotionConfig(index: number) {
        this.promotionDialogData.extraConfig.splice(index, 1);
    }

    onSavePromotionConfig() {
        const strConf = JSON.stringify(this.promotionDialogData.extraConfig);
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: this.listQuery.plat_id,
            promotion_extra_config: strConf,
        });
    }
}
