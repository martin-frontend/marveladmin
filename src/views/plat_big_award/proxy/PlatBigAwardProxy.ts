import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { HttpType } from "@/views/plat_big_award/setting";
import { MessageBox } from "element-ui";
import IPlatBigAwardProxy from "./IPlatBigAwardProxy";

export default class PlatBigAwardProxy extends AbstractProxy implements IPlatBigAwardProxy {
    static NAME = "PlatBigAwardProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_big_award_table_columns);
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
            id: { name: "ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            plat_id: { name: "平台ID", options: [] },
            vendor_id: { name: "厂商ID", options: [] },
            game_id: { name: "游戏ID", options: [] },
            user_id: { name: "玩家ID", options: [] },
            username: { name: "玩家昵称", options: [] },
            award_time: { name: "爆奖时间", options: [] },
            award_uri: { name: "大额爆奖图片相对访问路径", options: [] },
            withdraw_uri: { name: "大额提现图片相对访问路径", options: [] },
            is_delete: { name: "是否删除", options: ["否", "是"] },
            created_by: { name: "创建人", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_by: { name: "更新人", options: [] },
            updated_at: { name: "修改时间", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "award_time-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        "award_time-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        user_id: "",
        username: "",
        vendor_id: "",
        game_id: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            plat_id: "",
            user_id: "",
            username: "",
            vendor_id: "",
            game_id: "",
            award_time: "",
            award_uri: "",
            withdraw_uri: "",
        },
        formSource: null, // 表单的原始数据
        fileList: <any>[{ url: "" }],
        fileList1: <any>[{ url: "" }],
        uploadType: "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
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
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "award_time-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
            "award_time-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            user_id: "",
            username: "",
            vendor_id: "",
            game_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.status = status;
        this.dialogData.bShow = true;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.dialogData.fileList[0].url = data.award_url;
            this.dialogData.fileList1[0].url = data.withdraw_url;
            this.sendNotification(HttpType.admin_plat_big_award_show, { id: data.id });
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
            user_id: "",
            username: "",
            vendor_id: "",
            game_id: "",
            award_time: "",
            award_uri: "",
            withdraw_uri: "",
        });
        this.dialogData.fileList[0].url = "";
        this.dialogData.fileList1[0].url = "";
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_big_award_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {
            plat_id,
            user_id,
            username,
            vendor_id,
            game_id,
            award_time,
            award_uri,
            withdraw_uri,
        } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            user_id,
            username,
            vendor_id,
            game_id,
            award_time,
            award_uri,
            withdraw_uri,
        };
        this.sendNotification(HttpType.admin_plat_big_award_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);

        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        formCopy.id = this.dialogData.form.id;
        formCopy.award_uri = this.dialogData.form.award_uri;
        formCopy.withdraw_uri = this.dialogData.form.withdraw_uri;
        // 发送消息
        this.sendNotification(HttpType.admin_plat_big_award_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_big_award_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**图片上传 */
    uploadImage(data: any) {
        this.sendNotification(HttpType.admin_resource_upload, data);
    }

    /**图片上传 写入图片url*/
    uploadSuccess(body: any) {
        if (this.dialogData.uploadType == "award_uri") {
            this.dialogData.form.award_uri = body.uri;
            this.dialogData.fileList = [{ url: body.url }];
        } else {
            this.dialogData.form.withdraw_uri = body.uri;
            this.dialogData.fileList1 = [{ url: body.url }];
        }
    }
}
