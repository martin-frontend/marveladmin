import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_asset_wallet/setting";
import { MessageBox } from "element-ui";
import IPlatAssetWalletProxy from "./IPlatAssetWalletProxy";

export default class PlatAssetWalletProxy extends AbstractProxy implements IPlatAssetWalletProxy {
    static NAME = "PlatAssetWalletProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_asset_wallet_table_columns);
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
            chain_name: { name: "交易链" },
            coin_name_unique: { name: "币种" },
            plat_id: { options: {} },
            total_amount: { name: "当前总资产" },
            withdraw_able_amount: { name: "当前可用资产" },
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

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list = data;
        console.warn("list >>", this.tableData.list);
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_asset_wallet_index, objectRemoveNull(this.listQuery));
    }
}
