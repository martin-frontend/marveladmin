<template>
    <div>
        <div class="title_class">
            {{ table_title }}
        </div>

        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            :span-method="spanMethod"
            v-loading="net_status.loading"
        >
            <!-- <el-table-column prop="plat_id" :label="tableColumns['plat_id'].name" width="130px" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["plat_id"].options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column prop="vendor_id" :label="tableColumns['vendor_id'].name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["vendor_id"].options[row.vendor_id] }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="time_region_hour_interval"
                :label="tableColumns['time_region_hour_interval'].name"
                align="center"
            >
            <template slot-scope="{ row }">
                <div>
                    {{ tableColumns["time_region_hour_interval"].options[row.time_region_hour_interval] }}
                </div>
            </template>
            </el-table-column>

            <el-table-column prop="vendor_wallet_type" :label="tableColumns['vendor_wallet_type'].name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["vendor_wallet_type"].options[row.vendor_wallet_type] }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="coin_name_unique" :label="tableColumns['coin_name_unique'].name" align="center">
            </el-table-column>

            <el-table-column prop="win_gold" :label="tableColumns['win_gold'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold" :isShowDollar="false" />
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticBetVendorDaysProxy from "../proxy/StatisticBetVendorDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticBetVendorDaysBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticBetVendorDaysProxy = this.getProxy(StatisticBetVendorDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
    chickIsSame(obj_1: any, obj_2: any): boolean {
        return obj_1._myTable_id == obj_2._myTable_id;
    }

    public get table_title(): string {
        return (
            this.tableColumns.plat_id.options[this.listQuery.plat_id] +
            " " +
            this.listQuery["created_date-{>=}"] +
            " - " +
            this.listQuery["created_date-{<=}"] +
            this.LangUtil("平台输赢统计")
        );
    }

    /**栏位合并 */
    spanMethod({ row, column, rowIndex, columnIndex }: { [key: string]: number }) {
        // if (rowIndex === 0) {
        //     if (columnIndex === 0) {
        //         return {
        //             rowspan: row.list.length, //合并的行数
        //             colspan: 3, //合并的列数，设为0则直接不显示
        //         };
        //     } else if (columnIndex < 3) {
        //         //  隐藏单元格，否则单元格会错位，必不可少
        //         return {
        //             rowspan: 0,
        //             colspan: 0,
        //         };
        //     }
        // }

        if (
            column.label === this.tableColumns.vendor_wallet_type.name ||
            column.label === this.tableColumns.vendor_id.name ||
            column.label === this.tableColumns.time_region_hour_interval.name
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
.title_class {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
