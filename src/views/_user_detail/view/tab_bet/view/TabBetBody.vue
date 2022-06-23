<template>
    <div>
        <div class="statistics">
            {{ $t("plat_users_bet.stastisticList") }} <span>{{ $t("common.totalBet") }}:{{ summary.bet_gold }}</span>
            <span>{{ $t("common.validBet") }}:{{ summary.valid_bet_gold }}</span>
            <span>{{ $t("common.playerWinLoss") }}:<WinLossDisplay :amount="summary.win_gold"/></span>
            <span>{{ $t("common.settleWater") }}:{{ summary.settlement_water }}</span>
            <span>{{ $t("common.playerWater") }}:{{ summary.water }}</span>
        </div>
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
                :label="tableColumns['vendor_id'].name"
                prop="vendor_id"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_id.options[row.vendor_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['vendor_type'].name"
                prop="vendor_type"
                class-name="status-col"
                min-width="70px"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_type.options[row.vendor_type] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['vendor_product_name'].name"
                prop="vendor_product_name"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    <div>{{ row.vendor_product_name }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['order_no'].name"
                prop="order_no"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['coin_name_unique'].name"
                prop="coin_name_unique"
                class-name="status-col"
                min-width="50px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['win_gold'].name"
                prop="win_gold"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold" />
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.time')" align="left" min-width="145px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["bet_at"].name }}：<br />{{ row.bet_at }}</p>
                    <p>{{ tableColumns["settlement_at"].name }}：<br />{{ row.settlement_at }}</p>
                    <p>{{ tableColumns["pull_at"].name }}：<br />{{ row.pull_at }}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['bet_gold'].name"
                prop="bet_gold"
                class-name="status-col"
                min-width="70px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['valid_bet_gold'].name"
                prop="valid_bet_gold"
                class-name="status-col"
                min-width="70px"
            ></el-table-column>
            <el-table-column
                :label="$t('statistic_user_days.water')"
                prop="water"
                class-name="status-col"
                min-width="140px"
            >
                <template slot-scope="{ row }">
                    <div align="left">
                        <div>{{ $t("common.settleWater") }}：{{ row.settlement_water }}</div>
                        <div>
                            {{ $t("common.settleType") }}：{{ tableColumns["water_type"].options[row.water_type] }}
                        </div>
                        <div>{{ $t("common.settleRatio") }}：{{ row.water_rate }}</div>
                        <div>{{ $t("common.userWater") }}：{{ row.water }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['settlement_status'].name"
                prop="settlement_status"
                class-name="status-col"
                min-width="70px"
            >
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.settlement_status.options[row.settlement_status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handlerDetail(row)">{{
                        $t("common.detail")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></Pagination>
        <PlatUserBetDetail :tableColumns="tableColumns" :data="myProxy.dialogData"></PlatUserBetDetail>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabBetProxy from "../proxy/TabBetProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";
import Pagination from "@/components/Pagination.vue";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import PlatUserBetDetail from "@/views/plat_users_bet/view/PlatUserBetDetail.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
        PlatUserBetDetail,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                // 1: "success",
                1: "danger",
                11: "info",
            };
            return statusMap[status];
        },
    },
})
export default class TabBetBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabBetProxy = getProxy(TabBetProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private summary = this.myProxy.tableData.summary;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handlerDetail(data: any) {
        this.myProxy.showDialog(data);
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.statistics {
    font-weight: bold;
    margin-bottom: 16px;
    span {
        margin-left: 20px;
        :nth-child(1) {
            margin-left: 0;
        }
    }
}
</style>
