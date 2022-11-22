import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/exchange_vendors/setting";
import { MessageBox } from "element-ui";
import IExchangeVendorsProxy from "./IExchangeVendorsProxy";
import { jsonToObject } from "@/core/global/Functions";
import i18n from "@/lang";
export default class ExchangeVendorsProxy extends AbstractProxy implements IExchangeVendorsProxy {
    static NAME = "ExchangeVendorsProxy";

    /**在这里获取基础数据，退出页面时，proxy不会销毁，所以只会获取一次 */
    onRegister() {}

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_exchange_vendors_table_columns);
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
            api_url: { name: "", options: {} },
            callback_url: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            english_name: { name: "", options: {} },
            extend_params: { name: " ", options: {} },
            id: { name: "", options: {} },
            is_delete: { name: "", options: Array(2) },
            name: { name: "", options: {} },
            payment_method_type: { name: "", options: {} },
            refund_url: { name: "", options: {} },
            status: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            currency_scale: { name: "", options: {} },
            currency_type: { name: "", options: {} },
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
            id: "",
            name: "",
            english_name: "",
            payment_method_type: [],
            callback_url: "",
            api_url: "",
            refund_url: "",
            extend_params: {},
            status: "1",
            currency_scale: 1,
            currency_type: "",
        },
        formSource: null, // 表单的原始数据
        extendsData: {},
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
        data.status = data.status.toString();
        this.dialogData.formSource = data;
        data.extend_params = jsonToObject(data.extend_params);
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

        if (status == DialogStatus.update) {
            this.sendNotification(HttpType.admin_exchange_vendors_show, { id: data.id });
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
            id: "",
            name: "",
            english_name: "",
            payment_method_type: [],
            callback_url: "",
            api_url: "",
            refund_url: "",
            extend_params: {},
            status: "1",
            currency_scale: 1,
            currency_type: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_exchange_vendors_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        let formCopy: any = Object.assign({}, this.dialogData.form);

        try {
            let extendsStr: any = "{}";
            if (Object.keys(formCopy.extend_params).length > 0) {
                extendsStr = JSON.stringify(JSON.parse(formCopy.extend_params));
            }

            formCopy.extend_params = extendsStr;
            formCopy.payment_method_type = formCopy.payment_method_type.join();
            this.sendNotification(HttpType.admin_exchange_vendors_store, objectRemoveNull(formCopy));
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }

    /**更新数据 */
    onUpdate() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
        try {
            const id = formCopy.id;

            formCopy.payment_method_type = formCopy.payment_method_type.join();
            formCopy.extend_params = JSON.parse(formCopy.extend_params);
            const temp = formCompared(formCopy, this.dialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(temp).length == 0) {
                this.dialogData.bShow = false;
                return false;
            }

            let extendsStr: any = "{}";
            if (temp.extend_params) {
                if (Object.keys(temp.extend_params).length > 0) {
                    extendsStr = JSON.stringify(JSON.parse(temp.extend_params));
                }
                temp.extend_params = extendsStr;
            }

            temp.id = id;
            this.sendNotification(HttpType.admin_exchange_vendors_update, temp);
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
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
                this.sendNotification(HttpType.admin_exchange_vendors_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
