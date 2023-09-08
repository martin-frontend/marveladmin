import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_pops/setting";
import { MessageBox } from "element-ui";
import IPlatPopsProxy from "./IPlatPopsProxy";

export default class PlatPopsProxy extends AbstractProxy implements IPlatPopsProxy {
    static NAME = "PlatPopsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_pops_table_columns);
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
            id: { name: "弹窗ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            plat_id: { name: "平台ID", options: {} },
            title: { name: "弹窗标题", options: [] },
            app_platform: { name: "应用平台", options: [] },
            languages: { name: "语言", options: {} },
            type: { name: "弹窗类型", options: {} },
            type_bind_id: { name: "类型绑定id", options: [] },
            rules: { name: "规则", options: [] },
            scenarios_type: { name: "弹窗情景类型", options: [] },
            range_type_all: { name: "受众范围所有", options: [] },
            range_user_ids: { name: "范围-用户", options: [] },
            range_user_tag_ids: { name: "范围-标签内容", options: [] },
            range_channel_ids: { name: "范围-渠道号内容", options: [] },
            condition_balance: { name: "条件-余额", options: [] },
            condition_is_first_login: { name: "条件-首次登入", options: [] },
            condition_is_first_recharge: { name: "条件-首次充值", options: [] },
            index_no: { name: "排序序号", options: [] },
            start_time: { name: "发布时间", options: [] },
            end_time: { name: "结束时间", options: [] },
            status: { name: "状态", options: [] },
            is_delete: { name: "是否删除", options: ["否", "是"] },
            created_by: { name: "创建人", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_by: { name: "修改人", options: [] },
            updated_at: { name: "修改时间", options: [] },
            channel_id: { name: "所属渠道", options: [] },
            conditions: { name: "条件", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        orderData: {
            id: "",
            opt: "", //操作:1-置顶 |2-置底 |3-上调 |4-下调
            plat_id: "",
        },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        status: "",
        plat_id: "",
        type: "",
        channel_id: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            plat_id: "",
            app_platform: <any>[],
            languages: [],
        },
        formSource: null, // 表单的原始数据
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
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.isResort = true;
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            status: "",
            type: "",
            channel_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_pops_show, { id: data.id });
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
            // TODO
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_pops_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = {
            // TODO
        };
        this.sendNotification(HttpType.admin_plat_pops_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        // TODO
        // 发送消息
        this.sendNotification(HttpType.admin_plat_pops_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_pops_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
    /**是否重新排序 */
    isResort = false;
    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_plat_pops_update, { id: id, next_id: next_id, opt: 11 });
    }

    /**排序 */
    onOrderList() {
        const formCopy = this.tableData.orderData;
        this.sendNotification(HttpType.admin_plat_pops_update, formCopy);
    }
}
