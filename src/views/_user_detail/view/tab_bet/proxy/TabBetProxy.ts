import AbstractProxy from "@/core/abstract/AbstractProxy";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabBetProxy from "./ITabBetProxy";

export default class TabBetProxy extends AbstractProxy implements ITabBetProxy {
    static NAME = "TabBetProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_bet_table_columns);
        this.listQuery.user_id = getPageSetting().user_id;
        this.listQuery.plat_id = getPageSetting().plat_id;
    }

    /**离开页面时调用 */
    leave() {

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
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 10 },
        winLoss: "",
        summary: {
            bet_gold: "",
            valid_bet_gold: "",
            water: "",
            win_gold: "",
        }
    }
    /**查询数据 */
    listQuery: { [key: string]: string | number } = {
        type: "",
        user_id: 0,
        plat_id: 0,
        settlement_status: "",
        vendor_id: "",
        vendor_type: "",
        ori_product_id: "",
        vendor_product_name: "",
        "win_gold-{>=}": "",
        "win_gold-{<}": "",
        "settlement_at-{>=}": "",
        "settlement_at-{<=}": "",
        "bet_at-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        "bet_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        page_count: 1,
        page_size: 10,
    }
    /**表单资料 */
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
            game_info: ""
        },
    }
    /**显示弹窗 */
    showDialog(data: any) {
        this.dialogData.bShow = true;
        Object.assign(this.dialogData, {
            data: JSON.parse(JSON.stringify(data))
        });
        this.sendNotification(HttpType.admin_plat_users_bet_show, { plat_id: this.listQuery.plat_id, bet_id: data.bet_id });
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**设置详情数据 */
    setDetail(data: any) {
        const { nick_name } = this.dialogData.data;
        Object.assign(this.dialogData, {
            data: JSON.parse(JSON.stringify(data))
        });
        this.dialogData.data.nick_name = nick_name;
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
    }
    /**设置表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        Object.assign(this.tableData.summary, data.summary);
    }
    /**重置查询数据 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            type: "",
            settlement_status: "",
            vendor_id: "",
            vendor_type: "",
            ori_product_id: "",
            vendor_product_name: "",
            "win_gold-{>=}": "",
            "win_gold-{<}": "",
            "settlement_at-{>=}": "",
            "settlement_at-{<=}": "",
            "bet_at-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
            "bet_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        })
        this.tableData.winLoss = "";
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_bet_index, objectRemoveNull(this.listQuery));
    }
}
