import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_bonus_all/setting";
import { MessageBox } from "element-ui";
import IPlatBonusAllProxy from "./IPlatBonusAllProxy";

export default class PlatBonusAllProxy extends AbstractProxy implements IPlatBonusAllProxy {
    static NAME = "PlatBonusAllProxy";

    /**进入页面时调用 */
    enter() {
        this.admin_plat_bonus_all_stock_set_table_columns();
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
        list: <any>[],
        bShow: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        // 平台数据详情
        detail: <any>{ all_bonus_model_id: 0, all_bonus_config: {} },
        // 配置模板
        model: <any>{ all_bonus_model_id: 0, name: "", desc: "" },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
    };

    /**图片弹窗相关数据 */
    dialogImgData = {
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

    /**分红金额 弹窗数据 */
    dividendDialogData: any = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            id: null,
            type: "",
            plat_id: "",
            auto_rate: 0,
            bonus_all_gold: "0",
        },
        formSource: null, // 表单的原始数据
    };

    /**取得表头数据 */
    admin_plat_bonus_all_stock_set_table_columns() {
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_set_table_columns);
    }

    /**设置表头数据 */
    receive_admin_plat_bonus_all_stock_set_table_columns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEYS = Object.keys(this.tableData.columns.plat_id.options);
        if (PLAT_ID_OPTIONS_KEYS.length > 0) {
            if (!PLAT_ID_OPTIONS_KEYS.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = PLAT_ID_OPTIONS_KEYS[0];
            }
            this.admin_plat_bonus_all_stock_set_index();
            this.admin_plat_show();
        }
    }
    /**表格数据  setTableData*/
    receive_admin_plat_bonus_all_stock_set_index(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**关闭弹窗 */
    hideDialog() {
        this.dialogImgData.bShow = false;
        this.dividendDialogData.bShow = false;
        this.tableData.bShow = false;
    }

    /**取plat 数据 */
    admin_plat_show() {
        this.sendNotification(HttpType.admin_plat_show, { plat_id: this.listQuery.plat_id });
    }
    /**写入plat 数据 setPlatDetail*/
    receive_admin_plat_show(data: any) {
        console.warn("/**写入plat 数据 */", data);
        this.tableData.detail = data;
        this.tableData.bShow = data.all_bonus_model_id ? true : false;
        if (data.all_bonus_model_id) {
            this.admin_plat_bonus_all_stock_model_show(data.all_bonus_model_id);
        }
        Object.assign(this.dialogImgData.form, data.bonus_all_banner);
    }
    /**取bonus 模板詳情 */
    admin_plat_bonus_all_stock_model_show(all_bonus_model_id: any) {
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_model_show, {
            all_bonus_model_id,
        });
    }
    /**寫入 写数平台模版说明 setPlatModeDesc*/
    receive_admin_plat_bonus_all_stock_model_show(body: any) {
        Object.assign(this.tableData.model, body);
        console.warn("写数平台模板詳情", body);
    }

    /**配置说明图片*/
    showBannerDialog() {
        this.dialogImgData.bShow = true;
        Object.assign(this.dialogImgData.form, this.dialogImgData.formSource);
    }

    /**查询 */
    admin_plat_bonus_all_stock_set_index() {
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_set_index, objectRemoveNull(this.listQuery));
    }

    /**图片更换 onHandleChange*/
    admin_resource_upload(data: any) {
        this.sendNotification(HttpType.admin_resource_upload, data);
    }

    /**配置图片确认 onSetBanner*/
    admin_plat_update() {
        const banner = JSON.stringify(this.dialogImgData.form);
        if (banner == JSON.stringify(this.dialogImgData.formSource)) {
            this.dialogImgData.bShow = false;
            return false;
        }
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: this.listQuery.plat_id,
            bonus_all_banner: banner,
        });
    }

    /**图片更换完成 */
    onBannerUploadSuccess(data: any) {
        this.dialogImgData.form[this.dialogImgData.currentKey] = data.url;
        this.dialogImgData.update++;
    }

    /**显示整盘分红金额 弹窗 */
    onShowDividendDialog({ id, type, plat_id, auto_rate, bonus_all_gold }: any) {
        this.dividendDialogData.form.id = id;
        this.dividendDialogData.form.type = type.toString();
        this.dividendDialogData.form.plat_id = plat_id;
        this.dividendDialogData.form.auto_rate = (auto_rate * 100) >> 0;
        this.dividendDialogData.form.bonus_all_gold = bonus_all_gold;
        this.dividendDialogData.formSource = JSON.parse(JSON.stringify(this.dividendDialogData.form));
        this.dividendDialogData.bShow = true;
    }

    /**整盘分红金额 更新数据 onUpdate*/
    admin_plat_bonus_all_stock_set_update() {
        const id = this.dividendDialogData.form.id;
        const type = this.dividendDialogData.form.type;
        const bonusAllGold = this.dividendDialogData.form.bonus_all_gold;
        const autoRate = this.dividendDialogData.form.auto_rate;
        const formCopy: any = formCompared(this.dividendDialogData.form, this.dividendDialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗

        if (Object.keys(formCopy).length == 0) {
            console.log(4);
            this.dividendDialogData.bShow = false;
            return;
        }
        // // 添加必填参数
        formCopy.id = id;
        formCopy.type = type;
        if (formCopy.type == "1") {
            formCopy.bonus_all_gold = bonusAllGold;
        } else {
            formCopy.auto_rate = autoRate / 100;
        }

        this.sendNotification(HttpType.admin_plat_bonus_all_stock_set_update, formCopy);
    }
}
