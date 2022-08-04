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
                prop="stake_bonus_fee_amount"
                :label="tableColumns['stake_bonus_fee_amount'].name"
                align="center"
                min-width="130px"
            >
            </el-table-column>
            <el-table-column
                prop="stake_bonus_received_amount"
                :label="tableColumns['stake_bonus_received_amount'].name"
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
            <el-table-column prop="win_loss_amount" :label="tableColumns['win_loss_amount'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_loss_amount" />
                </template>
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
import StatisticPlatCoinDaysDateProxy from "../proxy/StatisticPlatCoinDaysDateProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticPlatCoinDaysDateBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticPlatCoinDaysDateProxy = this.getProxy(StatisticPlatCoinDaysDateProxy);
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
