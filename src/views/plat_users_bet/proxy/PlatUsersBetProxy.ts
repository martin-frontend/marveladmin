import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_users_bet/setting";
import { MessageBox } from "element-ui";
import IPlatUsersBetProxy from "./IPlatUsersBetProxy";
import i18n from "@/lang";

export default class PlatUsersBetProxy extends AbstractProxy implements IPlatUsersBetProxy {
    static NAME = "PlatUsersBetProxy";

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
            pull_at: { name: "", options: {} },
            promotion_type: { name: "", options: {} },
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
            win_gold: { name: "", options: {} },
            water_type: { name: "", options: {} },
            water_rate: { name: "", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            water_accelerate: { name: "", options: {} },
            water_rate_accelerate: { name: "", options: {} },
            username: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            bet_gold: "",
            settlement_water: "",
            valid_bet_gold: "",
            water: "",
            win_gold: "",
            water_accelerate: "",
        },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        "settlement_at-{>=}": "",
        "settlement_at-{<=}": "",
        "bet_at-{>=}": dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
        "bet_at-{<=}": dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
        user_id: "",
        nick_name: "",
        order_no: "",
        vendor_id: "",
        vendor_type: "",
        settlement_status: "",
        ori_product_id: "",
        vendor_product_name: "",
        page_count: 1,
        page_size: 20,
        "win_gold-{>=}": <any>"",
        "win_gold-{<}": <any>"",
        coin_name_unique: "",
        username: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        data: {
            order_no: "",
            nick_name: "",
            user_id: "",
            vendor_product_name: "",
            vendor_type: "",
            vendor_id: "",
            settlement_status: "",
            bet_at: "",
            settlement_at: "",
            pull_at: "",
            bet_gold: "",
            valid_bet_gold: "",
            win_gold: "",
            settlement_water: "",
            water_type: "",
            water_rate: "",
            water: "",
            game_info: "",
        },
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
        const { bet_gold, valid_bet_gold, water, win_gold, water_accelerate } = data.summary;
        Object.assign(this.tableData.summary, data.summary);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        const { nick_name } = this.dialogData.data;
        Object.assign(this.dialogData, {
            data: JSON.parse(JSON.stringify(data)),
        });
        Object.assign(this.dialogData.data, {
            nick_name: nick_name,
        });
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "settlement_at-{>=}": "",
            "settlement_at-{<=}": "",
            "bet_at-{>=}": dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
            "bet_at-{<=}": dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
            user_id: "",
            nick_name: "",
            order_no: "",
            vendor_id: "",
            vendor_type: "",
            settlement_status: "",
            ori_product_id: "",
            vendor_product_name: "",
            "win_gold-{>=}": "",
            "win_gold-{<}": "",
            coin_name_unique: "",
            username: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        Object.assign(this.dialogData, {
            bShow: true,
            data: JSON.parse(JSON.stringify(data)),
        });
        this.sendNotification(HttpType.admin_plat_users_bet_show, { plat_id: data.plat_id, bet_id: data.bet_id });
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_bet_index, objectRemoveNull(this.listQuery));
    }

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

    /**显示用户详情弹窗 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
