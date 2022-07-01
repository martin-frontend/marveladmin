import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_swap_liquidity/setting";
import { MessageBox } from "element-ui";
import IPlatSwapLiquidityProxy from "./IPlatSwapLiquidityProxy";

export default class PlatSwapLiquidityProxy extends AbstractProxy implements IPlatSwapLiquidityProxy {
    static NAME = "PlatSwapLiquidityProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_swap_liquidity_table_columns);
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
            coin_a: { name: "币种A", options: {} },
            coin_a_amount: { name: "币种A数量", options: {} },
            coin_b: { name: "币种B", options: {} },
            coin_b_amount: { name: "币种B数量", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            is_delete: { name: "是否删除", options: Array(2) },
            plat_id: { name: "所属平台", options: {} },
            plat_swap_pair_id: { name: "币对编号", options: {} },
            price: { name: "币价" },
            status: { name: "状态", options: {} },
            swap_fee_ratio: { name: "手续费比率", options: {} },
            system_coin_a_amount: { name: "系统币种A数量", options: {} },
            system_coin_b_amount: { name: "系统币种B数量", options: {} },
            tolerance_params: { name: "容差配置", options: {} },
            type: { name: "类型", option: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_coin_a_amount: { name: "用户币种A数量", options: {} },
            user_coin_b_amount: { name: "用户币种B数量", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
        },
        formSource: null, // 表单的原始数据
    };

    /**更新设置 数据 */
    dialogSetting: any = {
        bShow: false,
        source: null,
        form: <any>{
            plat_swap_pair_id: null,
            swap_fee_ratio: "", //费率
            tolerance_params: [], //容差
            status: 1, //状态
        },
    };

    /**更新流动性 */
    dialogLiquidity: any = {
        bShow: false,
        source: null,
        form: {
            plat_swap_pair_id: null,
            plat_id: null,
            type: 1, //流动性类型: 1-添加|2-移除|3-初始化
            change_coin_a_amount: "0",
            change_coin_b_amount: "0",
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
            plat_id: "",
        });
    }

    /**显示设置弹窗 */
    showSettingDialog(value?: any) {
        const data = JSON.parse(JSON.stringify(value));
        this.dialogSetting.source = JSON.parse(JSON.stringify(value));
        this.dialogSetting.form.plat_swap_pair_id = data.plat_swap_pair_id;
        this.dialogSetting.form.swap_fee_ratio = data.swap_fee_ratio;
        this.dialogSetting.form.tolerance_params = data.tolerance_params;
        this.dialogSetting.form.status = data.status;
        this.dialogSetting.bShow = true;
    }

    /**更新流动性 */
    showLiquidity(row: any, type: any) {
        const data = JSON.parse(JSON.stringify(row));
        console.warn(data);
        this.dialogLiquidity.form.plat_id = data.plat_id;
        this.dialogLiquidity.form.plat_swap_pair_id = data.plat_swap_pair_id;
        this.dialogLiquidity.form.type = type;
        this.dialogLiquidity.source = data;
        this.dialogLiquidity.bShow = true;
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogSetting.bShow = false;
        this.dialogLiquidity.bShow = false;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_swap_liquidity_index, objectRemoveNull(this.listQuery));
    }

    /**更新设置 */
    onSetting() {
        const { tolerance_params, swap_fee_ratio, status, plat_swap_pair_id } = this.dialogSetting.form;
        const data = {
            tolerance_params: JSON.stringify(tolerance_params),
            swap_fee_ratio,
            status,
            plat_swap_pair_id,
        };

        this.sendNotification(HttpType.admin_plat_swap_liquidity_update, data);
    }

    /**更新流动性 */
    onLiquidity() {
        this.sendNotification(HttpType.admin_plat_swap_liquidity_update_liquidity, this.dialogLiquidity.form);
    }
}
