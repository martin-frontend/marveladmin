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
            :span-method="mergeRowMethod"
        >
            <el-table-column
                prop="created_date"
                :label="tableColumns['created_date'].name"
                align="center"
                min-width="110px"
            >
            </el-table-column>
            <el-table-column :label="tableColumns['plat_id'].name" align="center" min-width="130px">
                <template slot-scope="{ row }">
                    <div>
                        <div v-if="row.plat_id === '合计' || row.plat_id === LangUtil('合计')">
                            {{ LangUtil("合计") }}
                        </div>
                        <div v-else>
                            <div>{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="coin_name_unique" :label="tableColumns['coin_name_unique'].name" align="center">
            </el-table-column>
            <el-table-column prop="recharge_amount" :label="tableColumns['recharge_amount'].name" align="center">
            </el-table-column>
            <el-table-column
                prop="recharge_fee_amount"
                :label="tableColumns['recharge_fee_amount'].name"
                min-width="110px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="recharge_third_fee_amount"
                :label="tableColumns['recharge_third_fee_amount'].name"
                min-width="110px"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="exchange_amount" :label="tableColumns['exchange_amount'].name" align="center">
            </el-table-column>
            <el-table-column
                prop="exchange_fee_amount"
                :label="tableColumns['exchange_fee_amount'].name"
                min-width="110px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="exchange_third_fee_amount"
                :label="tableColumns['exchange_third_fee_amount'].name"
                min-width="110px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="swap_amount"
                :label="tableColumns['swap_amount'].name"
                min-width="110px"
                align="center"
            >
            </el-table-column>

            <el-table-column
                prop="swap_fee_amount"
                :label="tableColumns['swap_fee_amount'].name"
                min-width="130px"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="commission_amount" :label="tableColumns['commission_amount'].name" align="center">
            </el-table-column>
            <el-table-column
                prop="commission_received_amount"
                :label="tableColumns['commission_received_amount'].name"
                align="center"
                min-width="130px"
            >
            </el-table-column>
            <el-table-column prop="backwater_amount" :label="tableColumns['backwater_amount'].name" align="center">
            </el-table-column>
            <el-table-column prop="stake_bonus_amount" :label="tableColumns['stake_bonus_amount'].name" align="center">
            </el-table-column>
            <el-table-column
                prop="stake_bonus_received_amount"
                :label="tableColumns['stake_bonus_received_amount'].name"
                align="center"
                min-width="130px"
            >
            </el-table-column>
            <el-table-column
                prop="stake_bonus_fee_amount"
                :label="tableColumns['stake_bonus_fee_amount'].name"
                align="center"
                min-width="130px"
            >
            </el-table-column>
            <el-table-column
                prop="stake_bonus_pool_amount"
                :label="tableColumns['stake_bonus_pool_amount'].name"
                align="center"
                min-width="130px"
            >
            </el-table-column>
            <el-table-column
                prop="mail_awards_amount"
                :label="tableColumns['mail_awards_amount'].name"
                align="center"
                min-width="130px"
            >
            </el-table-column>
            <el-table-column
                prop="mail_awards_received_amount"
                :label="tableColumns['mail_awards_received_amount'].name"
                align="center"
                min-width="140px"
            >
            </el-table-column>

            <el-table-column
                prop="activity_awards_amount"
                :label="tableColumns['activity_awards_amount'].name"
                align="center"
            >
            </el-table-column>

            <el-table-column
                prop="activity_awards_received_amount"
                :label="tableColumns['activity_awards_received_amount'].name"
                align="center"
                min-width="130px"
            >
            </el-table-column>
            <el-table-column
                prop="manual_deduct_amount"
                :label="tableColumns['manual_deduct_amount'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="win_loss_amount" :label="tableColumns['win_loss_amount'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :isShowDollar="false" :amount="row.win_loss_amount" />
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatCoinDaysProxy = this.getProxy(StatisticPlatCoinDaysProxy);
    // proxy property
    get tableColumns() {
        return this.myProxy.tableData.columns;
    }
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    @Watch("myProxy.tableData.updateNum")
    reload() {
        this.$forceUpdate();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 合并行
    mergeRowMethod(options: { row: any; column: any; rowIndex: any; columnIndex: any }) {
        const { columnIndex, row, rowIndex } = options;

        // columnIndex 代表列数，从0开始计数,我们要合并的字段属于第一列，取0
        if (columnIndex == 0 && row.plat_id != "合计") {
            return {
                rowspan: row.rowNum, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
                colspan: row.rowNum > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
            };
        } else if ((columnIndex == 0 && row.plat_id == "合计") || (columnIndex == 1 && row.plat_id == "合计")) {
            return {
                rowspan: row.rowNum, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
                colspan: row.rowNum > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
            };
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
        // background-color: #f6f7fa;
        td:nth-child(#{$i}) {
            border-right: 0;
        }
        td:nth-child(2) {
            text-align: left;
        }
    }
}
</style>
