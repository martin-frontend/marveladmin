import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { MD5 } from "@/core/global/MD5";
import { HttpType } from "@/views/admin_user/setting";
import { MessageBox } from "element-ui";
import IAdminUserProxy from "./IAdminUserProxy";
import i18n from "@/lang";

export default class AdminUserProxy extends AbstractProxy implements IAdminUserProxy {
    static NAME = "AdminUserProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_admin_user_table_columns);
        this.sendNotification(HttpType.admin_plat_channel_index, { page_count: 1, page_size: 10000 });
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
            plat_id: { name: "", options: {} },
            admin_user_id: { name: "", options: {} },
            admin_username: { name: "", options: {} },
            nick_name: { name: "", options: {} },
            avatar: { name: "", options: {} },
            cate: { name: "", options: {} },
            type: { name: "", options: {} },
            phone: { name: "", options: {} },
            status: { name: "", options: {} },
            role_id: { name: "", options: {} },
            password: { name: "", options: {} },
            channel_id: { name: "", options: {} },
            google_key: { name: "", options: {} },
            diff_ip_login: { name: "", options: {}},
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        admin_user_id: null,
        admin_username: null,
        nick_name: null,
        cate: null,
        type: null,
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            admin_user_id: null,
            admin_username: "",
            nick_name: "",
            cate: null,
            type: null,
            plat_ids: [],
            role_ids: [],
            password: "",
            password_verify: "",
            google_key: "",
            status: 1,
            channel_ids: [],
            diff_ip_login: 0,
        },
        formSource: null, // 表单的原始数据
    };
    /**渠道数据 */
    channelList = {
        list: [],
        listSource: [],
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
    }
    /**所有的渠道 */
    setChannels(data: any) {
        this.channelList.listSource = data;
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, data, {
            password: "",
            password_verify: "",
        });
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            admin_user_id: null,
            admin_username: null,
            nick_name: null,
            cate: null,
            type: null,
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, data, {
                password: "",
                password_verify: "",
            });
            this.sendNotification(HttpType.admin_admin_user_show, { admin_user_id: data.admin_user_id });
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
            admin_user_id: null,
            admin_username: "",
            nick_name: "",
            cate: null,
            type: null,
            plat_ids: [],
            role_ids: [],
            password: "",
            password_verify: "",
            google_key: "",
            status: 1,
            channel_ids: [],
            diff_ip_login: 0,
        });
    }
    /**筛选渠道列表 */
    channelListFilter() {
        this.channelList.list.length = 0;
        const tempList = this.channelList.listSource.filter((value: any) => {
            // @ts-ignore
            return this.dialogData.form.plat_ids.indexOf(value.plat_id) != -1;
        }, this);
        this.channelList.list.push(...tempList);
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_admin_user_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {
            admin_username,
            nick_name,
            cate,
            type,
            plat_ids,
            role_ids,
            channel_ids,
            password,
            status,
            diff_ip_login,
        } = this.dialogData.form;
        const formCopy: any = {
            admin_username,
            nick_name,
            cate,
            type,
            plat_ids,
            role_ids,
            channel_ids,
            password,
            status,
            diff_ip_login,
        };
        formCopy.plat_ids = JSON.stringify(formCopy.plat_ids);
        formCopy.role_ids = JSON.stringify(formCopy.role_ids);
        formCopy.channel_ids = JSON.stringify(formCopy.channel_ids);
        if (formCopy.password) formCopy.password = MD5.createInstance().hex_md5(formCopy.password);
        this.sendNotification(HttpType.admin_admin_user_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 一些需要特殊处理的参数
        const { password } = formCopy;
        if (password && password != "") {
            formCopy.password = MD5.createInstance().hex_md5(password);
        } else {
            delete formCopy.password;
        }
        // 删除多余无法去除的参数
        delete formCopy.password_verify;
        delete formCopy.update_btn;
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.admin_user_id = this.dialogData.form.admin_user_id;
        // 发送消息
        this.sendNotification(HttpType.admin_admin_user_update, formCopy);
    }
    /**删除数据 */
    onDelete(admin_user_id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该账号"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_admin_user_update, { admin_user_id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
