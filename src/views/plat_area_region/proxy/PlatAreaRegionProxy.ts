import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_area_region/setting";
import { MessageBox } from "element-ui";
import IPlatAreaRegionProxy from "./IPlatAreaRegionProxy";
import i18n from "@/lang";

export default class PlatAreaRegionProxy extends AbstractProxy implements IPlatAreaRegionProxy {
    static NAME = "PlatAreaRegionProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_area_region_table_columns);
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
            area_region: { name: "地区", options: {} as Record<string, string> },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            id: { name: "编号", options: {} },
            index_no: { name: "排序", options: {} },
            plat_id: { name: "平台ID", options: {} as Record<string, string> },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            default_sms_area_code: { name: "默认区号", options: {} as Record<string, string> },
            show_sms_area_code: {
                name: "显示区号",
                options: {} as Record<string, Record<string, { area_code: number; name: string }>>,
            },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isResort: false, // 是否重新排序
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
        status: DialogStatus.create as "create" | "update",
        form: {
            id: null,
            area_region: "",
            plat_id: "",
            default_sms_area_code: "",
            show_sms_area_code: [],
        },
        formSource: null as null | { show_sms_area_code: string }, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.isResort = true;
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
            area_region: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: "create" | "update", data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)), {
                show_sms_area_code: data.show_sms_area_code.split(",").filter((i: string) => Boolean(i)),
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
            plat_id: "",
            area_region: "",
            default_sms_area_code: "",
            show_sms_area_code: [],
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_area_region_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { plat_id, area_region, default_sms_area_code, show_sms_area_code } = this.dialogData.form;
        const formCopy: any = {
            area_region,
            plat_id,
            default_sms_area_code,
            show_sms_area_code,
        };
        this.sendNotification(HttpType.admin_plat_area_region_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const { show_sms_area_code: _, ...formCopy } = formCompared(this.dialogData.form, this.dialogData.formSource);
        const new_show_sms_area_code = this.dialogData.form.show_sms_area_code.join(",");
        const isShowSmsAreaCodeEdited = this.dialogData.formSource?.show_sms_area_code != new_show_sms_area_code;
        // 删除多余无法去除的参数
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0 && !isShowSmsAreaCodeEdited) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.id = this.dialogData.form.id;

        const show_sms_area = {
            show_sms_area_code: new_show_sms_area_code,
        };
        const form = {
            ...formCopy,
            ...(isShowSmsAreaCodeEdited ? show_sms_area : {}),
        };
        // 发送消息
        this.sendNotification(HttpType.admin_plat_area_region_update, form);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_area_region_delete, { id });
            })
            .catch(() => {});
    }

    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_plat_area_region_update, { id: id, next_id: next_id, opt: 11 });
    }
}
