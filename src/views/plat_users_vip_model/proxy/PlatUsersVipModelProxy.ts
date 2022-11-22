import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_vip_model/setting";
import { MessageBox } from "element-ui";
import IPlatUsersVipModelProxy from "./IPlatUsersVipModelProxy";
import i18n from "@/lang";
export default class PlatUsersVipModelProxy extends AbstractProxy implements IPlatUsersVipModelProxy {
    static NAME = "PlatUsersVipModelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_vip_model_table_columns);
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
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            desc: { name: "", options: {} },
            is_delete: { name: "", options: {} },
            max_vip_level: { name: "", options: {} },
            name: { name: "", options: {} },
            types: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            vip_config: { name: "", options: {}, options_key: [] },
            vip_model_id: { name: "", options: {} },
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
            vip_model_id: "",
            name: "",
            desc: "",
            types: [1],
            vip_config: [],
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
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_users_vip_model_show, { vip_model_id: data.vip_model_id });
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
            vip_model_id: "",
            name: "",
            desc: "",
            types: [1],
            vip_config: [],
        });
    }
    /**types更新时调用 */
    typesChange() {
        const form = this.dialogData.form;
        const vip_config: any = form.vip_config;
        for (const vConf of vip_config) {
            vConf.total_water = form.types.includes(1) ? vConf.total_water || 1000 : undefined;
            vConf.total_recharge = form.types.includes(2) ? vConf.total_recharge || 1000 : undefined;
        }
    }
    /**添加等级 */
    addLevel() {
        const newConfig: any = {
            total_water: 1000,
            total_recharge: 1000,
            backwater_config: {},
        };

        const keys = Object.keys(this.tableData.columns.vip_config.options_key[1]);
        for (const key of keys) {
            newConfig.backwater_config[key] = { backwater_rate: 0 };
        }
        (this.dialogData.form.vip_config as any).push(newConfig);
    }
    /**删除等级 */
    deleteLevel(index: number) {
        this.dialogData.form.vip_config.splice(index, 1);
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_vip_model_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { name, desc, types, vip_config } = this.dialogData.form;
        const formCopy: any = {
            name,
            desc,
            types,
            vip_config,
        };
        formCopy.types = JSON.stringify(formCopy.types);
        formCopy.vip_config = JSON.stringify(formCopy.vip_config);
        this.sendNotification(HttpType.admin_plat_users_vip_model_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        // 原数据total_water/total_recharge 是小数点保留二位的字符串，更新前需要处理一下。
        const vip_config: any = this.dialogData.form.vip_config;
        for (const vConf of vip_config) {
            if (vConf.total_water && typeof vConf.total_water == "number")
                vConf.total_water = vConf.total_water.toFixed(2);
            if (vConf.total_recharge && typeof vConf.total_recharge == "number")
                vConf.total_recharge = vConf.total_recharge.toFixed(2);
        }
        // 获取对比后的数据，并处理数组和对象
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.vip_model_id = this.dialogData.form.vip_model_id;
        formCopy.types = JSON.stringify(this.dialogData.form.types);
        // 发送消息
        this.sendNotification(HttpType.admin_plat_users_vip_model_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_users_vip_model_update, { vip_model_id: id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
