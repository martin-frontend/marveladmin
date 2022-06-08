import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
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
    /**质押分红配置 */
    stake_bonus_config = {
        min_coin_count: 0,         // 最小质押解质押金额
        put_in_ratio: 0,             // 输赢金额放入奖池比例
        manual_withdraw_stake_fee: 0, // 手动解质押费
        auto_withdraw_stake_fee: 0,   // 自动解质押费
        is_open_stake: 0,                // 是否允许质押
        pool_type: 0,                    // 奖池分红类型 1-手动输入|2-百分比自动
        put_out_amount: 0,     // 手动输入的分红金额,如果目前的奖池金额,分红的时候就使用奖池金额
        put_out_ratio: 0            // 奖池分红比例
    }
    /**质押表格相关数据 */
    stakeLogtableData = {
        columns: {
            created_at: { name: '', options: {} },
            created_by: { name: '', options: {} },
            data_belong: { name: '', options: {} },
            end_date: { name: '', options: {} },
            id: { name: '', options: {} },
            plat_id: { name: '', options: {} },
            stake_coin_name_unique: { name: '', options: {} },
            stake_count: { name: '', options: {} },
            start_date: { name: '', options: {} },
            status: { name: '', options: {} },
            total_stake_amount: { name: '', options: {} },
            total_transfer_fee_amount: { name: '', options: {} },
            updated_at: { name: '', options: {} },
            updated_by: { name: '', options: {} },
            validate_stake_amount: { name: '', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            bonus_pool_amount: 0,
            bonus_pool_amount_expect: 0
        },
    };
    /**用户每周质押表格相关数据 */
    stakeUserLogTableData = {
        /**查询条件 */
        listQuery : {
            plat_id: "",
            plat_stake_log_id:"",
            page_count: 1,
            page_size: 20,
        },
        columns: {
            created_at: { name: '', options: [] },
            created_by: { name: '', options: [] },
            data_belong: { name: '', options: [] },
            id: { name: '', options: [] },
            nick_name: { name: '', options: [] },
            plat_id: { name: '', options: [] },
            plat_stake_log_id: { name: '', options: [] },
            stake_coin_name_unique: { name: '', options: [] },
            total_stake_amount: { name: '', options: [] },
            total_transfer_fee_amount: { name: '', options: [] },
            updated_at: { name: '', options: [] },
            updated_by: { name: '', options: [] },
            user_id: { name: '', options: [] },
            validate_stake_amount: { name: '', options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    }
    /**查询条件 */
    listQuery = {
        plat_id: "",
        page_count: 1,
        page_size: 20,
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
        Object.assign(this.stakeLogtableData.columns, data);
        const plat_id_options_keys = Object.keys(this.stakeLogtableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
            this.sendNotification(HttpType.admin_plat_show, { plat_id: plat_id_options_keys[0] });
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.stakeLogtableData.list.length = 0;
        this.stakeLogtableData.list.push(...data.list);
        Object.assign(this.stakeLogtableData.pageInfo, data.pageInfo);
        this.stakeLogtableData.summary.bonus_pool_amount = data.summary.bonus_pool_amount;
        this.stakeLogtableData.summary.bonus_pool_amount_expect = data.summary.bonus_pool_amount_expect;
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
        });
    }

    /**设置质押详情表头 */
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
    onStakeUserLogQuery() {
        this.sendNotification(HttpType.admin_plat_stake_user_log_index, objectRemoveNull(this.stakeUserLogTableData.listQuery));
    }
    /**显示质押详情弹窗 */
    showUserLogDialog(data: any) {
        this.dialogData.bShow = true;
        this.stakeUserLogTableData.listQuery.plat_id = data.plat_id;
        this.stakeUserLogTableData.listQuery.plat_stake_log_id = data.plat_stake_log_id;
        this.sendNotification(HttpType.admin_plat_stake_user_log_index, objectRemoveNull(this.stakeUserLogTableData.listQuery));
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
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plat_stake_log_index, objectRemoveNull(this.listQuery));
    }

    /**设置质押配置 */
    setStakeBonusConfig(data: any) {
        Object.assign(this.stake_bonus_config, data)
    }

    /**奖池表格相关数据 */
    stakePooltableData = {
        columns: {
            auto_withdraw_stake_fee: { name: '', options: [] },
            bonus_config: { name: '', options: [] },
            created_at: { name: '', options: [] },
            created_by: { name: '', options: [] },
            data_belong: { name: '', options: [] },
            date: { name: '', options: [] },
            end_time: { name: '', options: [] },
            id: { name: '', options: [] },
            is_open_stake: { name: '', options: [] },
            manual_withdraw_stake_fee: { name: '', options: [] },
            min_coin_count: { name: '', options: [] },
            plat_id: { name: '', options: [] },
            pool_type: { name: '', options: [] },
            put_in_ratio: { name: '', options: [] },
            put_int_ratio: { name: '', options: [] },
            put_out_amount: { name: '', options: [] },
            put_out_ratio: { name: '', options: [] },
            stake_bonus_config: { name: '', options: [] },
            start_time: { name: '', options: [] },
            status: { name: '', options: [] },
            total_bonus_amount: { name: '', options: [] },
            updated_at: { name: '', options: [] },
            updated_by: { name: '', options: [] },
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
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plat_stake_pool_log_index, objectRemoveNull(this.listQuery));
    }

    /**分红表格相关数据 */
    stakeBonustableData = {
        columns: {
            bonus_coin_name_unique: { name: '', options: [] },
            bonus_pool_amount: { name: '', options: [] },
            created_at: { name: '', options: [] },
            created_by: { name: '', options: [] },
            data_belong: { name: '', options: [] },
            date: { name: '', options: [] },
            hundred_bonus: { name: '', options: [] },
            id: { name: '', options: [] },
            plat_id: { name: '', options: [] },
            put_out_ratio: { name: '', options: [] },
            stake_bonus_config: { name: '', options: [] },
            stake_count: { name: '', options: [] },
            total_bonus_amount: { name: '', options: [] },
            total_stake_amount: { name: '', options: [] },
            updated_at: { name: '', options: [] },
            updated_by: { name: '', options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**奖池设置表头数据 */
    setStakeBonusTableColumns(data: any) {
        Object.assign(this.stakeBonustableData.columns, data);
        const plat_id_options_keys = Object.keys(this.stakeBonustableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
        }
    }
    /**奖池表格数据 */
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
    /**清除数据 */
    public resetData() {
        this.stakeLogtableData.list.length = 0;
        this.stakePooltableData.list.length = 0;
        this.stakeBonustableData.list.length = 0;
        this.stakeBonustableData.pageInfo.pageCurrent = 1;
        this.stakeLogtableData.pageInfo.pageCurrent = 1;
        this.stakePooltableData.pageInfo.pageCurrent = 1;
    }
}