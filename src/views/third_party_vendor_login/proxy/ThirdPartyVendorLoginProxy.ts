import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonToObject, objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { HttpType } from "@/views/third_party_vendor_login/setting";
import { Message, MessageBox } from "element-ui";
import IThirdPartyVendorLoginProxy from "./IThirdPartyVendorLoginProxy";

export default class ThirdPartyVendorLoginProxy extends AbstractProxy implements IThirdPartyVendorLoginProxy {
    static NAME = "ThirdPartyVendorLoginProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_third_party_vendor_login_table_columns);
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
            api_url: { name: "api 地址", options: {} },
            app_key: { name: "app key", options: {} },
            app_secret: { name: "app 密钥", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            extend_params: { name: "扩展参数", options: {} },
            id: { name: "主键", options: {} },
            is_delete: { name: "是否删除", options: {} },
            redirect_url: { name: "跳转地址", options: {} },
            status: { name: "使用状态", options: {} },
            unique_name: { name: "厂商唯一标记", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            vendor_name: { name: "厂商名称", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        api_url: "",
        app_key: "",
        app_secret: "",
        redirect_url: "",
        data_belong: "",
        extend_params: "",
        unique_name: "",
        vendor_name: "",
        status: "",
    };

    defaultForm = {
        id: null,
        api_url: "",
        app_key: "",
        app_secret: "",
        redirect_url: "",
        extend_params: {},
        unique_name: "",
        vendor_name: "",
        status: 1,
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            ...this.defaultForm,
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
        data.extend_params = jsonToObject(data.extend_params);
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            api_url: "",
            app_key: "",
            app_secret: "",
            redirect_url: "",
            data_belong: "",
            extend_params: "",
            unique_name: "",
            vendor_name: "",
            status: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_third_party_vendor_login_show, { id: data.id });
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
        Object.assign(this.dialogData.form, { ...this.defaultForm });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_third_party_vendor_login_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {
            api_url,
            app_key,
            app_secret,
            redirect_url,
            extend_params,
            unique_name,
            vendor_name,
            status,
        } = this.dialogData.form;
        const formCopy: any = {
            api_url,
            app_key,
            app_secret,
            redirect_url,
            extend_params,
            unique_name,
            vendor_name,
            status,
        };
        try {
            let extendsStr: any = "{}";
            if (Object.keys(formCopy.extend_params).length > 0) {
                extendsStr = JSON.stringify(JSON.parse(formCopy.extend_params));
            }
            formCopy.extend_params = extendsStr;
            this.sendNotification(HttpType.admin_third_party_vendor_login_store, objectRemoveNull(formCopy));
        } catch (error) {
            Message.warning(<string>LangUtil("json格式不正确"));
        }
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        try {
            formCopy.extend_params = JSON.parse(formCopy.extend_params);
            const temp: any = formCompared(formCopy, this.dialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(temp).length == 0) {
                this.dialogData.bShow = false;
                return;
            }
            // 添加必填参数
            temp.id = this.dialogData.form.id;
            // 发送消息
            this.sendNotification(HttpType.admin_third_party_vendor_login_update, temp);
        } catch (error) {
            Message.warning(<string>LangUtil("json格式不正确"));
        }
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(LangUtil("您是否删除该记录"), LangUtil("提示"), {
            confirmButtonText: LangUtil("确定"),
            cancelButtonText: LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_third_party_vendor_login_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
