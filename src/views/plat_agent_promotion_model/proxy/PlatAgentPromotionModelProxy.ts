import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_agent_promotion_model/setting";
import { MessageBox } from "element-ui";
import IPlatAgentPromotionModelProxy from "./IPlatAgentPromotionModelProxy";
import i18n from "@/lang";
export default class PlatAgentPromotionModelProxy extends AbstractProxy implements IPlatAgentPromotionModelProxy {
    static NAME = "PlatAgentPromotionModelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_agent_promotion_model_table_columns);
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
            desc: { name: "", options: {} },
            name: { name: "", options: {} },
            calc_type: { name: "", options: {} },
            promotion_config: { name: "", options: <any>{} },
            promotion_model_id: { name: "", options: {} },
            type: { name: "", options: {} },
            is_promotion_num_added: { name: "", options: {} },
            promotion_reward_coin_ratio: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            promotion_model_id: "",
            name: "",
            desc: "",
            type: "",
            promotion_reward_coin_ratio: 0,
            is_promotion_num_added: 98,
            calc_type: "1",
            promotion_config: {
                // 0: [{ commission_num: 30, total_performance: 0, commission_num_added: 0 }],
                2: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                4: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                8: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                16: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                32: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                64: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                128: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
            },
            promotion_config2: {
                0: [{ commission_num: 30, total_performance: 0, commission_num_added: 0 }],
            },
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
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
        const obj = JSON.parse(JSON.stringify(data));
        for (const vConf of Object.keys(obj.promotion_config)) {
            obj.promotion_config[vConf].forEach((element: any, index: any) => {
                obj.promotion_config[vConf][index].commission_num = Number(element.commission_num).toFixed(3);
                obj.promotion_config[vConf][index].total_performance = Number(element.total_performance).toFixed(3);
            });
        }
        this.dialogData.formSource = obj;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(obj)));
        this.dialogData.form.calc_type = this.dialogData.form.calc_type.toString();
        if (this.dialogData.form.calc_type == "2") {
            if (this.dialogData.form["promotion_config2"]) {
                //@ts-ignore
                this.dialogData.form["promotion_config2"]["0"] = this.dialogData.form.promotion_config[0];
            } else {
                let promotion_config2 = {};
                //@ts-ignore
                promotion_config2["0"] = this.dialogData.form.promotion_config[0];
                //@ts-ignore
                this.dialogData.form["promotion_config2"] = promotion_config2;
            }
        }
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_agent_promotion_model_show, {
                promotion_model_id: data.promotion_model_id,
            });
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
            promotion_model_id: "",
            name: "",
            desc: "",
            type: "",
            promotion_reward_coin_ratio: 0,
            calc_type: "1",
            is_promotion_num_added: 98,
            promotion_config: {
                // 0: [{ commission_num: 30, total_performance: 0, commission_num_added: 0 }],
                2: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                4: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                8: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                16: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                32: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                64: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
                128: [{ commission_num: 0, total_performance: 0, commission_num_added: 0 }],
            },
            promotion_config2: {
                0: [{ commission_num: 30, total_performance: 0, commission_num_added: 0 }],
            },
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_agent_promotion_model_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {
            name,
            desc,
            type,
            promotion_reward_coin_ratio,
            promotion_config,
            promotion_config2,
            is_promotion_num_added,
            calc_type,
        } = this.dialogData.form;
        const formCopy: any = {
            name,
            desc,
            type,
            promotion_reward_coin_ratio,
            promotion_config,
            is_promotion_num_added,
            calc_type,
        };
        if (calc_type == "2") {
            formCopy.promotion_config["0"] = promotion_config2["0"];
        }

        formCopy.promotion_config = JSON.stringify(formCopy.promotion_config);
        console.error(formCopy);

        this.sendNotification(HttpType.admin_plat_agent_promotion_model_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const calc_type = this.dialogData.form.calc_type;
        let formCopy: any = null;
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (calc_type == "1") {
            //@ts-ignore
            delete this.dialogData.form.promotion_config[0];
            formCopy = formCompared(this.dialogData.form, this.dialogData.formSource);
        } else {
            formCopy = this.dialogData.form;
            formCopy.promotion_config["0"] = formCopy.promotion_config2[0];
            console.warn("formCopy", formCopy);
            if (formCopy.promotion_config) {
                formCopy.promotion_config = JSON.stringify(formCopy.promotion_config);
            }
        }
        delete formCopy.promotion_config2;
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }

        // 添加必填参数
        formCopy.promotion_model_id = this.dialogData.form.promotion_model_id;
        this.sendNotification(HttpType.admin_plat_agent_promotion_model_update, formCopy);
    }
    /**删除数据 */
    onDelete(data: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该模版"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_agent_promotion_model_update, {
                    promotion_model_id: data.promotion_model_id,
                    is_delete: 1,
                });
            })
            .catch(() => {});
    }
}
