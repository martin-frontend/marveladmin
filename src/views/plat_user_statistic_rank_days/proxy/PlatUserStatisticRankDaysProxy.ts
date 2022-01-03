import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, generateUUID, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_user_statistic_rank_days/setting";
import { MessageBox } from "element-ui";
import IPlatUserStatisticRankDaysProxy from "./IPlatUserStatisticRankDaysProxy";

export default class PlatUserStatisticRankDaysProxy extends AbstractProxy implements IPlatUserStatisticRankDaysProxy {
    static NAME = "PlatUserStatisticRankDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_statistic_rank_days_table_columns);
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
            channel_id: { name: "渠道ID", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_date: { name: "统计日期", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "平台用户每日累计ID", options: {} },
            plat_id: { name: "平台ID", options: {} },
            total_bet: { name: "用户总投注", options: {} },
            total_exchange: { name: "用户总兑换", options: {} },
            total_recharge: { name: "用户总充值", options: {} },
            total_valid_bet: { name: "用户总有效投注", options: {} },
            total_water: { name: "用户总流水", options: {} },
            total_win: { name: "用户总输赢", options: {} },
            updated_at: { name: "修改时间", options: {} },
            user_id: { name: "平台用户ID", options: {} },
            username: { name: "用户名", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            bet_2: { name: "棋牌投注", options: {} },
            bet_4: { name: "彩票投注", options: {} },
            bet_8: { name: "捕鱼投注", options: {} },
            bet_16: { name: "电子投注", options: {} },
            bet_32: { name: "真人投注", options: {} },
            bet_64: { name: "体育投注", options: {} },
            bet_128: { name: "电竞投注", options: {} },
            is_real: { name: "数据属性", options: {} },
            total_settlement_water: { name: "用户总原始流水", options: {} },
            valid_bet_2: { name: "棋牌有效投注", options: {} },
            valid_bet_4: { name: "彩票有效投注", options: {} },
            valid_bet_8: { name: "捕鱼有效投注", options: {} },
            valid_bet_16: { name: "电子有效投注", options: {} },
            valid_bet_32: { name: "真人有效投注", options: {} },
            valid_bet_64: { name: "体育有效投注", options: {} },
            valid_bet_128: { name: "电竞有效投注", options: {} },
            water_2: { name: "棋牌流水", options: {} },
            water_4: { name: "彩票流水", options: {} },
            water_8: { name: "捕鱼流水", options: {} },
            water_16: { name: "电子流水", options: {} },
            water_32: { name: "真人流水", options: {} },
            water_64: { name: "体育流水", options: {} },
            water_128: { name: "电竞流水", options: {} },
            win_gold_2: { name: "棋牌输赢金额", options: {} },
            win_gold_4: { name: "彩票输赢金额", options: {} },
            win_gold_8: { name: "捕鱼输赢金额", options: {} },
            win_gold_16: { name: "电子输赢金额", options: {} },
            win_gold_32: { name: "真人输赢金额", options: {} },
            win_gold_64: { name: "体育输赢金额", options: {} },
            win_gold_128: { name: "电竞输赢金额", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        user_id: "",
        page_count: 1,
        page_size: 20,
        plat_id: "",
        is_real: "",
        order_by: "",
        "created_at-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
    };

    /**随机数据 */
    defaultRange: any = {
        total_recharge: {
            //充值
            min: 10000,
            max: 20000,
        },
        total_water: {
            //流水
            min: 10000,
            max: 30000,
        },
        total_win: {
            //输赢
            min: 10000,
            max: 20000,
        },
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            plat_id: "", //平台id
            username: "", //用户帐号(已与vivi确认不用昵称,改为用户帐号)
            created_date: "", //时间(日期)
            total_recharge: "", //充值
            total_water: "", //流水
            total_win: "", //输赢
            user_id: "",
        },
        formSource: null, // 表单的原始数据
        plat_id: "",
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
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            user_id: "",
            page_count: 1,
            page_size: 20,
            order_by: "",
            is_real: "",
            "created_at-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
            "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        });
    }

    /**显示弹窗 */
    showDialog(status: string, obj?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;

        if (status == DialogStatus.update) {
            const data = JSON.parse(JSON.stringify(obj));
            this.dialogData.formSource = data;
            this.dialogData.plat_id = data.plat_id;

            //@ts-ignore
            data.plat_id = this.tableData.columns.plat_id.options[data.plat_id];
            Object.assign(this.dialogData.form, data);
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
            // TODO
            plat_id: "", //平台id
            created_date: "", //时间(日期)
            username: generateUUID().split("-")[0], //用户帐号(已与vivi确认不用昵称,改为用户帐号)
            total_recharge:
                this.getRandom(this.defaultRange.total_recharge.min, this.defaultRange.total_recharge.max) + ".000", //充值
            total_water: this.getRandom(this.defaultRange.total_water.min, this.defaultRange.total_water.max) + ".000", //流水
            total_win: this.getRandom(this.defaultRange.total_win.min, this.defaultRange.total_win.max) + ".000", //输赢
            user_id: "",
        });
        this.dialogData.plat_id = "";
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_user_statistic_rank_days_index, objectRemoveNull(this.listQuery));
    }

    /**打开用户详情 */
    onShowUserDetail(user_id: any) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    onAdd() {
        let formCopy = <any>{};
        const { plat_id, created_date, username, total_recharge, total_water, total_win } = this.dialogData.form;

        formCopy = {
            plat_id,
            created_date,
            username,
            total_recharge,
            total_water,
            total_win,
        };

        this.sendNotification(HttpType.admin_plat_user_statistic_rank_days_store, objectRemoveNull(formCopy));
    }

    onUpdate() {
        const {
            user_id,
            plat_id,
            created_date,
            username,
            total_recharge,
            total_water,
            total_win,
        } = this.dialogData.form;
        let formCopy = <any>{};
        formCopy = {
            user_id,
            plat_id,
            created_date,
            username,
            total_recharge,
            total_water,
            total_win,
        };
        formCopy = objectRemoveNull(formCopy);
        //@ts-ignore
        formCopy.id = this.dialogData.formSource.id;
        formCopy.plat_id = this.getPlatId(plat_id);
        this.sendNotification(HttpType.admin_plat_user_statistic_rank_days_update, formCopy);
    }

    getPlatId(val: any) {
        const keys = Object.keys(this.tableData.columns.plat_id.options);
        return keys.includes(val) ? val : this.dialogData.plat_id;
    }
    /**取随机数 */
    getRandom(min: any, max: any) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
