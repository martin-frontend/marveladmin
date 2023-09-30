import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, generateUUID, getTodayOffset, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_user_statistic_rank_days/setting";
import IPlatUserStatisticRankDaysProxy from "./IPlatUserStatisticRankDaysProxy";
import { BaseInfo } from "@/components/vo/commonVo";
import { checkUnique, unique } from "@/core/global/Permission";

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
            coin_name_unique: { name: '币种', options: {} },
            created_at: { name: '创建时间', options: {} },
            created_date: { name: '日期', options: {} },
            data_belong: { name: '数据归属标记', options: {} },
            id: { name: 'ID', options: {} },
            is_real: { name: '是否真实', options: {} },
            plat_id: { name: '平台ID', options: {} },
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
            updated_at: { name: '修改时间', options: {} },
            user_id: { name: '平台用户ID', options: {} },
            username: { name: '用户名', options: {} },
            valid_bet_2: { name: '棋牌有效投注', options: {} },
            valid_bet_4: { name: '彩票有效投注', options: {} },
            valid_bet_8: { name: '捕鱼有效投注', options: {} },
            valid_bet_16: { name: '电子有效投注', options: {} },
            valid_bet_32: { name: '真人有效投注', options: {} },
            valid_bet_64: { name: '体育电竞有效投注', options: {} },
            valid_bet_128: { name: '链游有效投注', options: {} },
            vendor_type: { name: '游戏类型', options: {} },
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
            real_name: { name: LangUtil("真实姓名"), options: {} },
            phone: { name: LangUtil("手机号"), options: {} },
            email: { name: LangUtil("邮箱"), options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery: any = {
        user_id: "",
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        order_by: "",
        vendor_type: "",
        coin_name_unique: "",
        "created_at-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
    };

    fieldSelectionData = {
        bShow: false,
        baseData: [
            "plat_id",
            "user_id",
            "username",
            "real_name",
            "phone",
            "email",
            "channel_id",
            "coin_name_unique",
            "total_recharge",
            "total_exchange",
        ],
        fieldOptions: <any>[
        ],
    };

    /**导出 相关数据 */
    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
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

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            user_id: "",
            page_count: 1,
            page_size: 20,
            order_by: "",
            channel_id: "",
            vendor_type: "",
            coin_name_unique: "",
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
        if (checkUnique(unique.admin_plat_user_statistic_rank_days_index2)) {
            this.sendNotification(HttpType.admin_plat_user_statistic_rank_days_index2, objectRemoveNull(this.listQuery));
        } else {
            this.sendNotification(HttpType.admin_plat_user_statistic_rank_days_index, objectRemoveNull(this.listQuery));
        }
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

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil("用户排行榜汇总")}-${plat_name}`;
        return name;
    }

    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        if (checkUnique(unique.admin_plat_user_statistic_rank_days_index2)) {
            this.sendNotification(HttpType.admin_plat_user_statistic_rank_days_index2, objectRemoveNull(queryCopy));
        } else {
            this.sendNotification(HttpType.admin_plat_user_statistic_rank_days_index, objectRemoveNull(queryCopy));
        }
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData(500);
        }
    }

    /**导出excel */
    exportExcel() {
        const newData = JSON.parse(JSON.stringify(this.exportData.list));

        const exportField = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item)
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            exportField,
            this.tableData.columns,
            newData,
            ["plat_id"],
            []
        );
    }

    resetExportData(timeout: any) {
        setTimeout(() => {
            this.exportData.isExportExcel = false;
            this.exportData.list = [];
            Object.assign(this.exportData.pageInfo, {
                pageCurrent: 0,
            });
        }, timeout);
    }

    /** 批次進度 */
    get percentage() {
        return Math.round((this.exportData.pageInfo.pageCurrent / this.exportData.pageInfo.pageCount) * 100);
    }

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.fieldSelectionData.fieldOptions = [];
        this.fieldSelectionData.fieldOptions = [... this.fieldSelectionData.baseData];
        if (this.listQuery.vendor_type == '') {
            this.fieldSelectionData.fieldOptions.push("total_water");
            this.fieldSelectionData.fieldOptions.push("total_win");
            this.fieldSelectionData.fieldOptions.push("total_bet");
            this.fieldSelectionData.fieldOptions.push("total_bet_count");
        } else if (this.listQuery.vendor_type == 2) {
            this.fieldSelectionData.fieldOptions.push("water_2");
            this.fieldSelectionData.fieldOptions.push("win_gold_2");
            this.fieldSelectionData.fieldOptions.push("bet_2");
            this.fieldSelectionData.fieldOptions.push("bet_2_count");
        } else if (this.listQuery.vendor_type == 4) {
            this.fieldSelectionData.fieldOptions.push("water_4");
            this.fieldSelectionData.fieldOptions.push("win_gold_4");
            this.fieldSelectionData.fieldOptions.push("bet_4");
            this.fieldSelectionData.fieldOptions.push("bet_4_count");
        } else if (this.listQuery.vendor_type == 8) {
            this.fieldSelectionData.fieldOptions.push("water_8");
            this.fieldSelectionData.fieldOptions.push("win_gold_8");
            this.fieldSelectionData.fieldOptions.push("bet_8");
            this.fieldSelectionData.fieldOptions.push("bet_8_count");
        } else if (this.listQuery.vendor_type == 16) {
            this.fieldSelectionData.fieldOptions.push("water_16");
            this.fieldSelectionData.fieldOptions.push("win_gold_16");
            this.fieldSelectionData.fieldOptions.push("bet_16");
            this.fieldSelectionData.fieldOptions.push("bet_16_count");
        } else if (this.listQuery.vendor_type == 32) {
            this.fieldSelectionData.fieldOptions.push("water_32");
            this.fieldSelectionData.fieldOptions.push("win_gold_32");
            this.fieldSelectionData.fieldOptions.push("bet_32");
            this.fieldSelectionData.fieldOptions.push("bet_32_count");
        } else if (this.listQuery.vendor_type == 64) {
            this.fieldSelectionData.fieldOptions.push("water_64");
            this.fieldSelectionData.fieldOptions.push("win_gold_64");
            this.fieldSelectionData.fieldOptions.push("bet_64");
            this.fieldSelectionData.fieldOptions.push("bet_64_count");
        } else if (this.listQuery.vendor_type == 128) {
            this.fieldSelectionData.fieldOptions.push("water_128");
            this.fieldSelectionData.fieldOptions.push("win_gold_128");
            this.fieldSelectionData.fieldOptions.push("bet_128");
            this.fieldSelectionData.fieldOptions.push("bet_128_count");
        }
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }
}