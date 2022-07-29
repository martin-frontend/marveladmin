<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column
                prop="created_date"
                :label="tableColumns['created_date'].name"
                align="center"
                min-width="110px"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.plat_id.display"
                :label="tableColumns['plat_id'].name"
                align="center"
                min-width="130px"
            >
                <template slot-scope="{ row }">
                    <div>
                        <div v-if="row.plat_id === '合计' || row.plat_id === $t('common.total')">
                            {{ "合计" }}
                        </div>
                        <div v-else>
                            <div>{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.coin_name_unique.display"
                prop="coin_name_unique"
                :label="tableColumns['coin_name_unique'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.recharge.display"
                prop="recharge"
                :label="tableColumns['recharge'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.recharge_fee.display"
                prop="recharge_fee"
                :label="tableColumns['recharge_fee'].name"
                min-width="110px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.exchange.display"
                prop="exchange"
                :label="tableColumns['exchange'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.exchange_fee.display"
                prop="exchange_fee"
                :label="tableColumns['exchange_fee'].name"
                min-width="110px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.swap.display"
                prop="swap"
                :label="tableColumns['swap'].name"
                min-width="110px"
                align="center"
            >
            </el-table-column>

            <el-table-column
                v-if="tableColumns.swap_fee.display"
                prop="swap_fee"
                :label="tableColumns['swap_fee'].name"
                min-width="130px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.commission_gold.display"
                prop="commission_gold"
                :label="tableColumns['commission_gold'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.backwater_gold.display"
                prop="backwater_gold"
                :label="tableColumns['backwater_gold'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.stake_bonus.display"
                prop="stake_bonus"
                :label="tableColumns['stake_bonus'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.mail_awards.display"
                prop="mail_awards"
                :label="tableColumns['mail_awards'].name"
                align="center"
                min-width="130px"
            >
            </el-table-column>

            <el-table-column
                v-if="tableColumns.activity_awards.display"
                prop="activity_awards"
                :label="tableColumns['activity_awards'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.win_loss.display"
                prop="win_loss"
                :label="tableColumns['win_loss'].name"
                align="center"
            >
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatCoinDaysProxy from "../proxy/StatisticPlatCoinDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticPlatCoinDaysBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticPlatCoinDaysProxy = this.getProxy(StatisticPlatCoinDaysProxy);
    // proxy property
    get tableColumns() {
        return this.myProxy.tableData.columns;
    }
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    @Watch("myProxy.tableData.updateNum")
    private reload() {
        this.$forceUpdate();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private objectSpanMethod(options: { row: any; column: any; rowIndex: any; columnIndex: any }) {
        const { columnIndex, rowIndex } = options;
        // console.log(options);
        if (columnIndex === 0) {
            if (rowIndex > 0) {
                return {
                    rowspan: 3,
                    colspan: 1,
                };
            } else {
                return {
                    rowspan: 0,
                    colspan: 0,
                };
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-table {
    display: flex;
    flex-direction: column;
}
::v-deep .el-table__footer-wrapper {
    order: -1;
}
::v-deep .el-table__header-wrapper {
    order: -2;
}
@for $i from 1 through 1 {
    ::v-deep .el-table__body .el-table__row:first-child {
        background-color: #f6f7fa;
        td:nth-child(#{$i}) {
            border-right: 0;
        }
        td:nth-child(2) {
            text-align: left;
        }
    }
}
</style>
