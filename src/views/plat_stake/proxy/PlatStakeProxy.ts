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
        stake_bonus_config: {
            min_coin_count: 0,         // 最小质押解质押金额
            put_in_ratio: 0,             // 输赢金额放入奖池比例
            manual_withdraw_stake_fee: 0, // 手动解质押费
            auto_withdraw_stake_fee: 0,   // 自动解质押费
            is_open_stake: 0,                // 是否允许质押
            pool_type: 0,                    // 奖池分红类型 1-手动输入|2-百分比自动
            put_out_amount: 0,     // 手动输入的分红金额,如果目前的奖池金额,分红的时候就使用奖池金额
            put_out_ratio: 0            // 奖池分红比例
        }
    };
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
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
            this.sendNotification(HttpType.admin_plat_show, { plat_id: plat_id_options_keys[0] });
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.summary.bonus_pool_amount = data.summary.bonus_pool_amount;
        this.tableData.summary.bonus_pool_amount_expect = data.summary.bonus_pool_amount_expect;
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
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plat_stake_log_index, objectRemoveNull(this.listQuery));
    }

    /**设置质押配置 */
    setStakeBonusConfig(data: any) {
        Object.assign(this.tableData.stake_bonus_config, data)
        console.error(this.tableData.stake_bonus_config);

    }
}
