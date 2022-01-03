<template>
    <div>
        <div class="statistics">
            {{ $t("plat_users_bet.stastisticList") }}
            <span>{{ $t("common.totalBet") }}:{{ summary.bet_gold }}</span>
            <span>{{ $t("common.validBet") }}:{{ summary.valid_bet_gold }}</span>
            <span
                >{{ $t("common.playerWinLoss") }}:<a :style="summary.win_gold >= 0 ? 'color:green' : 'color:red'">{{
                    summary.win_gold >= 0 ? "+" + summary.win_gold : summary.win_gold
                }}</a></span
            >
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
                :label="tableColumns['user_id'].name"
                prop="user_id"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">{{
                        row.user_id
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['vendor_product_name'].name"
                prop="vendor_product_name"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['vendor_type'].name"
                prop="vendor_type"
                min-width="80px"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_type.options[row.vendor_type] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['order_no'].name"
                prop="order_no"
                min-width="80px"
                class-name="status-col"
            ></el-table-column>
            <el-table-column :label="tableColumns['win_gold'].name" prop="win_gold" class-name="status-col">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold" />
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.time')" header-align="center" align="left" min-width="215px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["bet_at"].name }}：{{ row.bet_at }}</p>
                    <p>{{ tableColumns["settlement_at"].name }}：{{ row.settlement_at }}</p>
                    <p>{{ tableColumns["pull_at"].name }}：{{ row.pull_at }}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['bet_gold'].name"
                prop="bet_gold"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['valid_bet_gold'].name"
                prop="valid_bet_gold"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="$t('statistic_user_days.water')"
                prop="water"
                class-name="status-col"
                min-width="170px"
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
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.settlement_status.options[row.settlement_status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.plat_users_bet_show)"
                        >{{ $t("common.detail") }}</el-button
                    >
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
import PlatUsersBetProxy from "../proxy/PlatUsersBetProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
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
export default class PlatUsersBetBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;
    private summary = this.myProxy.tableData.summary;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.statistics {
    margin-bottom: 16px;
    span {
        margin-left: 20px;
    }
}
</style>
