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
                    <template v-else>
                        {{ row.plat_id }}
                    </template>
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
            <el-table-column :label="`${tableColumns.vendor_type.name}`" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    <template v-if="tableColumns.vendor_type.options[row.vendor_type]">
                        {{ tableColumns.vendor_type.options[row.vendor_type] }}
                    </template>
                    <template v-else>{{ row.vendor_type }}</template>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.vendor_product_id.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ row.vendor_product_name }}
                </template>
            </el-table-column>

            <el-table-column
                prop="coin_name_unique"
                :label="`${tableColumns.coin_name_unique.name}`"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    {{ row.coin_name_unique }}
                </template>
            </el-table-column>

            <el-table-column
              
                :label="`${tableColumns.bet_gold.name}`"
                prop="bet_gold"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.bet_gold"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column
               
                :label="`${tableColumns.valid_bet_gold.name}`"
                prop="valid_bet_gold"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.valid_bet_gold"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column
                
                :label="`${tableColumns.win_gold.name}`"
                prop="win_gold"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold" :isShowDollar="false"/>
                </template>
            </el-table-column>
            <el-table-column
               
                :label="`${tableColumns.water.name}`"
                prop="water"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.water"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticBetPlatDaysProxy from "../../../proxy/StatisticBetPlatDaysProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import Pagination from "@/components/Pagination.vue";
import { jsonStringify } from "@/core/global/Functions";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class StatisticGameBody extends AbstractView {
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
    private listQuery = this.myProxy.listQuery;

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

    chickIsSame(obj_1: any, obj_2: any): boolean {
        return obj_1._myTable_id == obj_2._myTable_id;
    }

    /**栏位合并 */
    spanMethod({ row, column, rowIndex, columnIndex }: { [key: string]: number }) {
        if (rowIndex === 0) {
            let mergeCols: number = 5;
            if (columnIndex === 0) {
                return {
                    rowspan: row.list.length, //合并的行数
                    colspan: mergeCols, //合并的列数，设为0则直接不显示
                };
            } else if (columnIndex < mergeCols) {
                //  隐藏单元格，否则单元格会错位，必不可少
                return {
                    rowspan: 0,
                    colspan: 0,
                };
            }
        }
        if (
            column.label === this.tableColumns.created_date.name ||
            column.label === this.tableColumns.plat_id.name ||
            column.label === this.tableColumns.vendor_id.name || 
            column.label === this.tableColumns.vendor_type.name || 
            column.label === this.tableColumns.vendor_product_id.name 
        ) {
            let list = this.tableData;
            let len = list.length;
            let _row = 0;

            if (rowIndex - 1 >= 0 && this.chickIsSame(list[rowIndex], list[rowIndex - 1])) {
                return {
                    // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                    rowspan: 0,
                    colspan: 0,
                };
            }
            for (let j = rowIndex; j < len; j++) {
                if (this.chickIsSame(list[rowIndex], list[j])) {
                    _row++;
                } else break;
            }
            const _col = _row > 0 ? 1 : 0;
            return {
                // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                rowspan: _row,
                colspan: _col,
            };
        }
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
