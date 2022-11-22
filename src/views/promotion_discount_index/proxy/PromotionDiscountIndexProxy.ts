import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import i18n from "@/lang";
import { HttpType } from "@/views/promotion_discount_index/setting";
import { MessageBox } from "element-ui";
import IPromotionDiscountIndexProxy from "./IPromotionDiscountIndexProxy";

export default class PromotionDiscountIndexProxy extends AbstractProxy implements IPromotionDiscountIndexProxy {
    static NAME = "PromotionDiscountIndexProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_bet_table_columns);
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
            // TODO
            agent_user_id: { name: "", options: {} },
            backwater: { name: "", options: {} },
            backwater_id: { name: "", options: {} },
            backwater_rate: { name: "", options: {} },
            bet_at: { name: "", options: {} },
            bet_gold: { name: "", options: {} },
            bet_id: { name: "", options: {} },
            bonus_gold: { name: "", options: {} },
            channel_id: { name: "", options: {} },
            commission_at: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            data_part: { name: "", options: {} },
            game_info: { name: "", options: {} },
            game_round_no: { name: "", options: {} },
            is_settlement_backwater: { name: "", options: {} },
            nick_name: { name: "", options: {} },
            order_no: { name: "", options: {} },
            ori_product_id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            promotion_type: { name: "", options: {} },
            pull_at: { name: "", options: {} },
            settlement_at: { name: "", options: {} },
            settlement_status: { name: "", options: {} },
            settlement_water: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            user_id: { name: "", options: {} },
            valid_bet_gold: { name: "", options: {} },
            vendor_id: { name: "", options: {} },
            vendor_product_id: { name: "", options: {} },
            vendor_product_name: { name: "", options: {} },
            vendor_type: { name: "", options: {} },
            water: { name: "", options: {} },
            water_rate: { name: "", options: {} },
            water_type: { name: "", options: {} },
            win_gold: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            bet_gold: "",
            release_time: "",
            settlement_water: "",
            total_count: 0,
            valid_bet_gold: "",
            water: "",
            win_gold: "",
        },
    };

    /**日期快捷 */
    pickerOptions = {
        shortcuts: [
            {
                text: i18n.t("common.today"),
                onClick(picker: any) {
                    const start = getTodayOffset();
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: i18n.t("common.yesterday"),
                onClick(picker: any) {
                    const start = getTodayOffset(-1);
                    const end = getTodayOffset(0, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: i18n.t("common.lastWeek"),
                onClick(picker: any) {
                    const start = getTodayOffset(-6);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: i18n.t("common.lastMonth"),
                onClick(picker: any) {
                    const start = getTodayOffset(-30);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: i18n.t("common.last3Month"),
                onClick(picker: any) {
                    const start = getTodayOffset(-60);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
        "settlement_at-{>=}": "",
        "settlement_at-{<=}": "",
        user_id: "",
        agent_user_id: "",
        vendor_type: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            user_id: "",
            plat_id: "",
            order_ids: "",
        },
        formSource: null, // 表单的原始数据
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
        Object.assign(this.tableData.summary, data.summary);
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
            "settlement_at-{>=}": "",
            "settlement_at-{<=}": "",
            user_id: "",
            agent_user_id: "",
            vendor_type: "",
        });
    }
    /**打开添加记录弹窗 */
    showDialog() {
        this.dialogData.bShow = true;
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.resetDialogForm();
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            user_id: "",
            plat_id: "",
            order_ids: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_bet_promotion_discount_index, objectRemoveNull(this.listQuery));
    }

    /**返佣恢复 */
    recover() {
        MessageBox.confirm(<string>i18n.t("user_detail.recoverRecords"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
            center: true,
        })
            .then(() => {
                this.sendNotification(
                    HttpType.admin_plat_users_bet_promotion_discount_recover,
                    objectRemoveNull(this.listQuery)
                );
            })
            .catch(() => {});
    }
    /**添加投注记录 */
    store_fake_bet() {
        this.sendNotification(HttpType.admin_plat_users_bet_store_fake_bet, this.dialogData.form);
    }
}
