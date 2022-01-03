<template>
    <div>
        <el-table
            @sort-change="tableSortChange"
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            :span-method="spanMethod"
            v-loading="net_status.loading"
        >
            <el-table-column :label="`${tableColumns.created_date.name}`" class-name="status-col" width="180px">
                <template slot-scope="{ row }">
                    {{ row.created_date }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    <template v-if="tableColumns.plat_id.options[row.plat_id]">
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </template>
                    <template v-else>{{ row.plat_id }}</template>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.vendor_id.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    <template v-if="tableColumns.vendor_id.options[row.vendor_id]">
                        {{ tableColumns.vendor_id.options[row.vendor_id] }}
                    </template>
                    <template v-else>
                        {{ row.vendor_id }}
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                sortable="custom"
                prop="bet_gold"
                :label="`${tableColumns.bet_gold.name}`"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                sortable="custom"
                prop="valid_bet_gold"
                :label="`${tableColumns.valid_bet_gold.name}`"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column sortable="custom" prop="win_gold" :label="`${tableColumns.win_gold.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    <WinLoss :amount="row.win_gold" />
                </template>
            </el-table-column>
            <el-table-column
                sortable="custom"
                prop="water"
                :label="`${tableColumns.water.name}`"
                class-name="status-col"
            >
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang='ts'>
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticBetPlatDaysProxy from "../../../proxy/StatisticBetPlatDaysProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import GlobalVar from "@/core/global/GlobalVar";
import WinLoss from "@/components/WinLossDisplay.vue";
import Pagination from "@/components/Pagination.vue";
import { jsonStringify } from "@/core/global/Functions";

@Component({
    components: {
        WinLoss,
        Pagination,
    },
})
export default class StatisticPlatBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticBetPlatDaysProxy = this.getProxy(StatisticBetPlatDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.platListQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 排序
    private tableSortChange(column: any) {
        let order_by = "";
        if (column.order === "descending") {
            order_by = "DESC";
        } else {
            order_by = "ASC";
        }

        // 团队
        Object.assign(this.listQuery, {
            order_by: jsonStringify({ [column.prop]: order_by }),
            page_count: 1,
        });
        this.myProxy.onQuery();
    }

    /**栏位合并 */
    spanMethod({ row, column, rowIndex, columnIndex }: { [key: string]: number }) {
        if (rowIndex === 0) {
            if (columnIndex === 0) {
                return {
                    rowspan: 1, //合并的行数
                    colspan: 3, //合并的列数，设为0则直接不显示
                };
            } else if (columnIndex < 3) {
                //  隐藏单元格，否则单元格会错位，必不可少
                return {
                    rowspan: 0,
                    colspan: 0,
                };
            }
        }
    }
}
</script>
<style scoped lang='scss'>
@import "@/styles/common.scss";
</style>