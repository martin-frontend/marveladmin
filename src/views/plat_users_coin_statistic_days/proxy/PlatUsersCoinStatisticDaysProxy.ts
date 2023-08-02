import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_coin_statistic_days/setting";
import { MessageBox } from "element-ui";
import IPlatUsersCoinStatisticDaysProxy from "./IPlatUsersCoinStatisticDaysProxy";

export default class PlatUsersCoinStatisticDaysProxy extends AbstractProxy implements IPlatUsersCoinStatisticDaysProxy {
    static NAME = "PlatUsersCoinStatisticDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_coin_statistic_days_table_columns);
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
        columns: <any>{
            backwater_2: { name: '棋牌挖矿流水', options: {} },
            backwater_4: { name: '彩票挖矿流水', options: {} },
            backwater_8: { name: '捕鱼挖矿流水', options: {} },
            backwater_16: { name: '电子挖矿流水', options: {} },
            backwater_32: { name: '真人挖矿流水', options: {} },
            backwater_64: { name: '体育电竞挖矿流水', options: {} },
            backwater_128: { name: '链游挖矿流水', options: {} },
            bet_2: { name: '棋牌投注', options: {} },
            bet_2_count: { name: '棋牌投注数量', options: {} },
            bet_4: { name: '彩票投注', options: {} },
            bet_4_count: { name: '彩票投注数量', options: {} },
            bet_8: { name: '捕鱼投注', options: {} },
            bet_8_count: { name: '捕鱼投注数量', options: {} },
            bet_16: { name: '电子投注', options: {} },
            bet_16_count: { name: '电子投注数量', options: {} },
            bet_32: { name: '真人投注', options: {} },
            bet_32_count: { name: '真人投注数量', options: {} },
            bet_64: { name: '体育电竞投注', options: {} },
            bet_64_count: { name: '体育电竞投注数量', options: {} },
            bet_128: { name: '链游投注', options: {} },
            bet_128_count: { name: '链游投注数量', options: {} },
            channel_id: { name: '渠道ID', options: {} },
            coin_name_unique: { name: '币种', options: {} },//S
            created_at: { name: '创建时间', options: {} },//X
            created_date: { name: '日期', options: {} },
            data_belong: { name: '数据归属标记', options: {} },//X
            id: { name: 'ID', options: {} },//X
            plat_id: { name: '平台ID', options: {} },//S
            total_backwater: { name: '总挖矿流水', options: {} },
            total_bet: { name: '总投注', options: {} },
            total_bet_count: { name: '总投注数量', options: {} },
            total_exchange: { name: '总兑换', options: {} },
            total_exchange_count: { name: '总兑换数量', options: {} },
            total_recharge: { name: '总充值', options: {} },
            total_recharge_count: { name: '总充值数量', options: {} },
            total_settlement_water: { name: '用户总原始流水', options: {} },
            total_valid_bet: { name: '总有效投注', options: {} },
            total_water: { name: '总流水', options: {} },
            total_win: { name: '总输赢', options: {} },
            updated_at: { name: '修改时间', options: {} },//S
            user_id: { name: '平台用户ID', options: {} },//S
            username: { name: '用户名', options: {} },
            valid_bet_2: { name: '棋牌有效投注', options: {} },
            valid_bet_4: { name: '彩票有效投注', options: {} },
            valid_bet_8: { name: '捕鱼有效投注', options: {} },
            valid_bet_16: { name: '电子有效投注', options: {} },
            valid_bet_32: { name: '真人有效投注', options: {} },
            valid_bet_64: { name: '体育电竞有效投注', options: {} },
            valid_bet_128: { name: '链游有效投注', options: {} },
            water_2: { name: '棋牌流水', options: {} },
            water_4: { name: '彩票流水', options: {} },
            water_8: { name: '捕鱼流水', options: {} },
            water_16: { name: '电子流水', options: {} },
            water_32: { name: '真人流水', options: {} },
            water_64: { name: '体育电竞流水', options: {} },
            water_128: { name: '链游流水', options: {} },
            win_gold_2: { name: '棋牌输赢金额', options: {} },
            win_gold_4: { name: '彩票输赢金额', options: {} },
            win_gold_8: { name: '捕鱼输赢金额', options: {} },
            win_gold_16: { name: '电子输赢金额', options: {} },
            win_gold_32: { name: '真人输赢金额', options: {} },
            win_gold_64: { name: '体育电竞输赢金额', options: {} },
            win_gold_128: { name: '链游输赢金额', options: {} },
            coin_name_unique_option: {},
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        user_id: "",
        coin_name_unique: "",
        "created_at-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null
            // TODO
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const coin_name_unique_options_keys = Object.keys(this.tableData.columns.coin_name_unique.options);
        if (plat_id_options_keys.length > 0 && coin_name_unique_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (this.listQuery.plat_id) {
                //@ts-ignore
                this.tableData.columns.coin_name_unique_option = this.tableData.columns.coin_name_unique.options[this.listQuery.plat_id];
                this.onQuery();
            }
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
            user_id: "",
            page_count: 1,
            page_size: 20,
            coin_name_unique: "",
            "created_at-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
            "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
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
        this.sendNotification(HttpType.admin_plat_users_coin_statistic_days_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
    }

    /**更新数据 */
    onUpdate() {
    }

    /**删除数据 */
    onDelete(id: any) {
    }
}
