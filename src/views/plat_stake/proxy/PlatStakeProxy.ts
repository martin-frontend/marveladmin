import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_stake/setting";
import { MessageBox } from "element-ui";
import IPlatStakeProxy from "./IPlatStakeProxy";

export default class PlatStakeProxy extends AbstractProxy implements IPlatStakeProxy {
    static NAME = "PlatStakeProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_stake_log_table_columns);
        this.sendNotification(HttpType.admin_plat_stake_pool_log_table_columns);
        this.sendNotification(HttpType.admin_plat_stake_bonus_log_table_columns);
        this.sendNotification(HttpType.admin_plat_stake_user_log_table_columns);
        this.sendNotification(HttpType.admin_plat_stake_bonus_user_log_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.stakeLogtableData.list = [];
        Object.assign(this.stakeLogtableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
    }

    private page_size = 20;
    dialogData = {
        bShow: false,
        form: {
            put_in_ratio: 0, // 输赢金额放入奖池比例
            put_out_ratio: 0, // 奖池分红比例
            auto_withdraw_stake_fee: 0, // 自动解质押费
            manual_withdraw_stake_fee: 0, // 手动解质押费
            min_coin_count: 0, // 最小质押解质押金额
            is_open_stake: 0, // 是否允许质押
        },
    };
    /**质押分红配置 */
    stake_bonus_config = {
        min_coin_count: 0, // 最小质押解质押金额
        put_in_ratio: 0, // 输赢金额放入奖池比例
        put_out_ratio: 0, // 奖池分红比例
        manual_withdraw_stake_fee: 0, // 手动解质押费
        auto_withdraw_stake_fee: 0, // 自动解质押费
        is_open_stake: 0, // 是否允许质押
    };
    /**质押表格相关数据 */
    stakeLogtableData = {
        columns: {
            auto_withdraw_stake_fee: { name: "", options: [] },
            created_at: { name: "", options: [] },
            created_by: { name: "", options: [] },
            data_belong: { name: "", options: [] },
            end_date: { name: "", options: [] },
            id: { name: "", options: [] },
            is_open_stake: { name: "", options: [] },
            manual_withdraw_stake_fee: { name: "", options: [] },
            min_coin_count: { name: "", options: [] },
            plat_id: { name: "", options: [] },
            pool_type: { name: "", options: [] },
            put_in_ratio: { name: "", options: [] },
            put_out_amount: { name: "", options: [] },
            put_out_ratio: { name: "", options: [] },
            stake_coin_name_unique: { name: "", options: [] },
            stake_count: { name: "", options: [] },
            start_date: { name: "", options: [] },
            status: { name: "", options: [] },
            total_stake_amount: { name: "", options: [] },
            total_transfer_fee_amount: { name: "", options: [] },
            updated_at: { name: "", options: [] },
            updated_by: { name: "", options: [] },
            validate_stake_amount: { name: "", options: [] },
            bonus_pool_amount: { name: "", options: [] },
            bonus_pool_amount_expect: { name: "", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            bonus_pool_amount: 0,
            bonus_pool_amount_expect: 0,
        },
    };
    /**质押详情表格相关数据 */
    stakeUserLogTableData = {
        dialogData: {
            bShow: false,
        },
        /**查询条件 */
        listQuery: {
            plat_id: "",
            plat_stake_log_id: "",
            order_by: "",
            page_count: 1,
            page_size: this.page_size,
        },
        columns: {
            created_at: { name: "", options: [] },
            created_by: { name: "", options: [] },
            data_belong: { name: "", options: [] },
            id: { name: "", options: [] },
            nick_name: { name: "", options: [] },
            plat_id: { name: "", options: [] },
            plat_stake_log_id: { name: "", options: [] },
            stake_coin_name_unique: { name: "", options: [] },
            total_stake_amount: { name: "", options: [] },
            total_transfer_fee_amount: { name: "", options: [] },
            updated_at: { name: "", options: [] },
            updated_by: { name: "", options: [] },
            user_id: { name: "", options: [] },
            validate_stake_amount: { name: "", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        page_count: 1,
        page_size: this.page_size,
    };

    /**设置质押配置 */
    setStakeBonusConfig(data: any) {
        Object.assign(this.stake_bonus_config, data);
    }
    /**显示质押配置弹窗 */
    showBonusConfigDialog() {
        Object.assign(this.dialogData.form, this.stake_bonus_config);
        this.dialogData.form.put_in_ratio = Math.floor(this.stake_bonus_config.put_in_ratio * 100);
        this.dialogData.form.put_out_ratio = Math.floor(this.stake_bonus_config.put_out_ratio * 100);
        this.dialogData.form.auto_withdraw_stake_fee = Math.floor(
            this.stake_bonus_config.auto_withdraw_stake_fee * 100
        );
        this.dialogData.form.manual_withdraw_stake_fee = Math.floor(
            this.stake_bonus_config.manual_withdraw_stake_fee * 100
        );
        this.dialogData.bShow = true;
    }
    /**隐藏质押配置弹窗 */
    hideBonusConfigDialog() {
        this.dialogData.bShow = false;
    }
    /**更新质押配置弹窗 */
    onUpdateStakeConfig() {
        let config = {
            put_in_ratio: (this.dialogData.form.put_in_ratio * 0.01).toFixed(4),
            put_out_ratio: (this.dialogData.form.put_out_ratio * 0.01).toFixed(4),
            auto_withdraw_stake_fee: (this.dialogData.form.auto_withdraw_stake_fee * 0.01).toFixed(4),
            manual_withdraw_stake_fee: (this.dialogData.form.manual_withdraw_stake_fee * 0.01).toFixed(4),
            min_coin_count: this.dialogData.form.min_coin_count,
            is_open_stake: this.dialogData.form.is_open_stake,
        };
        // console.error(config);

        let copyForm = {
            plat_id: this.listQuery.plat_id,
            stake_bonus_config: JSON.stringify(config),
        };
        this.sendNotification(HttpType.admin_plat_stake_config_update, copyForm);
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.stakeLogtableData.columns, data);
        const plat_id_options_keys = Object.keys(this.stakeLogtableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }
    /**获取平台资料 */
    onPlatShow() {
        this.sendNotification(HttpType.admin_plat_stake_config_show, { plat_id: this.listQuery.plat_id });
    }
    /**表格数据 */
    setTableData(data: any) {
        this.stakeLogtableData.list.length = 0;
        this.stakeLogtableData.list.push(...data.list);
        Object.assign(this.stakeLogtableData.pageInfo, data.pageInfo);
        this.stakeLogtableData.summary.bonus_pool_amount = data.summary.bonus_pool_amount;
        this.stakeLogtableData.summary.bonus_pool_amount_expect = data.summary.bonus_pool_amount_expect;
    }
    /**查询 */
    onQuery() {
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plat_stake_log_index, objectRemoveNull(this.listQuery));
        this.onPlatShow();
        this.onStakePoolQuery();
        this.onStakeBonusQuery();
    }

    /**质押详情表头 */
    setStakeUserLogTableColumns(data: any) {
        Object.assign(this.stakeUserLogTableData.columns, data);
    }
    /**质押详情表格数据 */
    setStakeUserLogTableData(data: any) {
        this.stakeUserLogTableData.list.length = 0;
        this.stakeUserLogTableData.list.push(...data.list);
        Object.assign(this.stakeUserLogTableData.pageInfo, data.pageInfo);
    }
    /**质押详情查询 */
    onStakeUserLogQuery(data: any = null) {
        this.stakeUserLogTableData.listQuery.order_by = "";
        let copyQuery = JSON.parse(JSON.stringify(this.stakeUserLogTableData.listQuery));
        if (data) {
            Object.assign(copyQuery, { order_by: JSON.stringify(data) });
        }

        this.sendNotification(HttpType.admin_plat_stake_user_log_index, objectRemoveNull(copyQuery));
    }
    /**显示质押详情弹窗 */
    showUserLogDialog(data: any) {
        this.stakeUserLogTableData.dialogData.bShow = true;
        this.stakeUserLogTableData.listQuery.plat_id = data.plat_id;
        this.stakeUserLogTableData.listQuery.plat_stake_log_id = data.plat_stake_log_id;
        this.sendNotification(
            HttpType.admin_plat_stake_user_log_index,
            objectRemoveNull(this.stakeUserLogTableData.listQuery)
        );
    }

    /**奖池表格相关数据 */
    stakePooltableData = {
        dialogData: {
            bShow: false,
            form: {
                id: "",
                plat_id: "",
                pool_type: 0,
                put_in_amount: "",
                put_in_ratio: "",
            },
            formSource: {
                put_in_amount: "",
                put_in_ratio: "",
            },
        },
        columns: {
            auto_withdraw_stake_fee: { name: "", options: [] },
            bonus_config: { name: "", options: [] },
            created_at: { name: "", options: [] },
            created_by: { name: "", options: [] },
            data_belong: { name: "", options: [] },
            date: { name: "", options: [] },
            end_time: { name: "", options: [] },
            id: { name: "", options: [] },
            is_open_stake: { name: "", options: [] },
            manual_withdraw_stake_fee: { name: "", options: [] },
            min_coin_count: { name: "", options: [] },
            plat_id: { name: "", options: [] },
            pool_type: { name: "", options: [] },
            put_in_ratio: { name: "", options: [] },
            put_out_amount: { name: "", options: [] },
            put_out_ratio: { name: "", options: [] },
            stake_bonus_config: { name: "", options: [] },
            start_time: { name: "", options: [] },
            status: { name: "", options: [] },
            total_bonus_amount: { name: "", options: [] },
            updated_at: { name: "", options: [] },
            updated_by: { name: "", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**奖池设置表头数据 */
    setStakePoolTableColumns(data: any) {
        Object.assign(this.stakePooltableData.columns, data);
        const plat_id_options_keys = Object.keys(this.stakePooltableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
        }
    }
    /**奖池表格数据 */
    setStakePoolTableData(data: any) {
        this.stakePooltableData.list.length = 0;
        this.stakePooltableData.list.push(...data.list);
        Object.assign(this.stakePooltableData.pageInfo, data.pageInfo);
    }
    /**奖池查询 */
    onStakePoolQuery() {
        console.warn(" /**奖池查询 */");
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plat_stake_pool_log_index, objectRemoveNull(this.listQuery));
    }
    /**显示奖池设定 */
    showPoolDialog(data: any) {
        this.stakePooltableData.dialogData.form.id = data.id;
        this.stakePooltableData.dialogData.form.plat_id = this.listQuery.plat_id;
        if (data.bonus_config.length == 0) {
            Object.assign(this.stakePooltableData.dialogData.form, {
                pool_type: 2,
                put_in_amount: 0,
                put_in_ratio: (this.stake_bonus_config.put_in_ratio * 100).toFixed(2),
            });
            Object.assign(this.stakePooltableData.dialogData.formSource, {
                put_in_amount: 0,
                put_in_ratio: (this.stake_bonus_config.put_in_ratio * 100).toFixed(2),
            });
        } else {
            Object.assign(this.stakePooltableData.dialogData.form, {
                pool_type: Number(data.bonus_config.pool_type),
                put_in_amount: data.bonus_config.put_in_amount.toString(),
                put_in_ratio: (data.bonus_config.put_in_ratio * 100).toFixed(2),
            });
            Object.assign(this.stakePooltableData.dialogData.formSource, {
                put_in_amount: data.bonus_config.put_in_amount,
                put_in_ratio: (data.bonus_config.put_in_ratio * 100).toFixed(2),
            });
        }

        this.stakePooltableData.dialogData.bShow = true;
    }
    /**隐藏奖池设定 */
    hidePoolDialog() {
        this.stakePooltableData.dialogData.bShow = false;
    }
    /**更新奖池配置 */
    updateStakeConfig() {
        let form = this.stakePooltableData.dialogData.form;
        let bonus_config = {
            pool_type: form.pool_type,
            put_in_ratio: (Number(form.put_in_ratio) * 0.01).toFixed(4),
            put_in_amount: form.put_in_amount,
        };
        let pool_type = form.pool_type;
        if (pool_type == 1) {
            //手动
            bonus_config.put_in_ratio = (Number(form.put_in_ratio) * 0.01).toFixed(4);
        } else {
            bonus_config.put_in_amount = form.put_in_amount;
        }
        const copyForm = {
            id: form.id,
            bonus_config: JSON.stringify(bonus_config),
        };
        this.sendNotification(HttpType.admin_plat_stake_pool_log_update, objectRemoveNull(copyForm));
    }
    /**重置奖池配置 */
    resetPoolDialog(type: number) {
        let form = this.stakePooltableData.dialogData.form;
        let source = this.stakePooltableData.dialogData.formSource;
        if (type == 1 && source && source.put_in_ratio) {
            form.put_in_ratio = source.put_in_ratio;
        } else {
            form.put_in_amount = source.put_in_amount;
        }
    }

    /**分红表格相关数据 */
    stakeBonustableData = {
        columns: {
            bonus_coin_name_unique: { name: "", options: [] },
            bonus_pool_amount: { name: "", options: [] },
            created_at: { name: "", options: [] },
            created_by: { name: "", options: [] },
            data_belong: { name: "", options: [] },
            date: { name: "", options: [] },
            hundred_bonus: { name: "", options: [] },
            id: { name: "", options: [] },
            plat_id: { name: "", options: [] },
            put_out_ratio: { name: "", options: [] },
            stake_bonus_config: { name: "", options: [] },
            stake_count: { name: "", options: [] },
            total_bonus_amount: { name: "", options: [] },
            total_stake_amount: { name: "", options: [] },
            updated_at: { name: "", options: [] },
            updated_by: { name: "", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**分红详情表格相关数据 */
    stakeBonusUserLogtableData = {
        dialogData: {
            bShow: false,
        },
        /**查询条件 */
        listQuery: {
            plat_id: "",
            date: "",
            order_by: "",
            page_count: 1,
            page_size: this.page_size,
        },
        columns: {
            id: { name: "", options: [] },
            plat_id: { name: "", options: [] },
            user_id: { name: "", options: [] },
            stake_amount: { name: "", options: [] },
            stake_ratio: { name: "", options: [] },
            bonus_amount: { name: "", options: [] },
            settlement_at: { name: "", options: [] },
            nick_name: { name: "", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**分红设置表头数据 */
    setStakeBonusTableColumns(data: any) {
        Object.assign(this.stakeBonustableData.columns, data);
        const plat_id_options_keys = Object.keys(this.stakeBonustableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
        }
    }
    /**分红表格数据 */
    setStakeBonusTableData(data: any) {
        this.stakeBonustableData.list.length = 0;
        this.stakeBonustableData.list.push(...data.list);
        Object.assign(this.stakeBonustableData.pageInfo, data.pageInfo);
    }
    /**分红查询 */
    onStakeBonusQuery() {
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plat_stake_bonus_log_index, objectRemoveNull(this.listQuery));
    }
    /**显示分红详情弹窗 */
    showBonusUserLogDialog(data: any) {
        this.stakeBonusUserLogtableData.list.length = 0;
        this.stakeBonusUserLogtableData.pageInfo.pageCurrent = 1;
        this.stakeBonusUserLogtableData.dialogData.bShow = true;
        this.stakeBonusUserLogtableData.listQuery.plat_id = data.plat_id;
        this.stakeBonusUserLogtableData.listQuery.date = data.date;
        this.onStakeBonusUserLogQuery();
    }
    /**分红详情表头数去 */
    setStakeBonusUserLogTableColumns(data: any) {
        Object.assign(this.stakeBonusUserLogtableData.columns, data);
    }
    /**分紅詳情表格数据 */
    setStakeBonusUserLogTableData(data: any) {
        this.stakeBonusUserLogtableData.list.length = 0;
        this.stakeBonusUserLogtableData.list.push(...data.list);
        Object.assign(this.stakeBonusUserLogtableData.pageInfo, data.pageInfo);
    }
    /**分红详情查询 */
    onStakeBonusUserLogQuery(data: any = null) {
        this.stakeBonusUserLogtableData.listQuery.order_by = "";
        let copyQuery = JSON.parse(JSON.stringify(this.stakeBonusUserLogtableData.listQuery));
        if (data) {
            Object.assign(copyQuery, { order_by: JSON.stringify(data) });
        }

        this.sendNotification(HttpType.admin_plat_stake_bonus_user_log_index, objectRemoveNull(copyQuery));
    }

    /**清除数据 */
    public resetData() {
        this.stakeLogtableData.list.length = 0;
        this.stakePooltableData.list.length = 0;
        this.stakeBonustableData.list.length = 0;
        this.stakeBonustableData.pageInfo.pageCurrent = 1;
        this.stakeLogtableData.pageInfo.pageCurrent = 1;
        this.stakePooltableData.pageInfo.pageCurrent = 1;
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
