<template>
    <div>
        <el-table
            :data="tableData.list"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
            @sort-change="tableSortChange"
        >
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" class-name="status-col" width="130">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['user_id'].name" prop="user_id" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>
                        <div v-if="row.user_id === '合计' || row.user_id === LangUtil('合计')">
                            {{ row.user_id }}
                        </div>
                        <div
                            v-else
                            @click="showUserDetail(row.user_id)"
                            style="cursor: pointer; text-decoration: underline"
                        >
                            <div>{{ row.user_id }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['username'].name" prop="username" class-name="status-col">
            </el-table-column>

            <el-table-column
                :label="tableColumns['record_count'].name"
                prop="record_count"
                class-name="status-col"
                sortable="custom"
            >
            </el-table-column>

            <el-table-column :label="tableColumns['remark'].name" prop="remark" class-name="status-col">
            </el-table-column>

            <el-table-column
                :label="tableColumns['bet_gold'].name"
                prop="bet_gold"
                class-name="status-col"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.bet_gold"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    ></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns.un_settle_count.name"
                prop="un_settle_count"
                min-width="100px"
                align="center"
            >
            </el-table-column>

            <el-table-column
                :label="tableColumns.un_settle_bet_gold.name"
                prop="un_settle_bet_gold"
                min-width="100px"
                align="center"
            >
            </el-table-column>

            <el-table-column prop="win_gold" :label="tableColumns['win_gold'].name" align="center" sortable="custom">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['valid_bet_gold'].name"
                prop="valid_bet_gold"
                class-name="status-col"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.valid_bet_gold"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    ></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['back_water'].name"
                prop="back_water"
                class-name="status-col"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.back_water"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    ></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['back_water_except_user'].name"
                prop="back_water_except_user"
                class-name="status-col"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.back_water_except_user"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    ></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                prop="agent_amount"
                :label="tableColumns['agent_amount'].name"
                align="center"
                sortable="custom"
                width="120px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.agent_amount" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                prop="plat_amount"
                :label="tableColumns['plat_amount'].name"
                align="center"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.plat_amount" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['game_valid_bet_gold'].name"
                prop="game_valid_bet_gold"
                class-name="status-col"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.game_valid_bet_gold"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    ></WinLossDisplay>
                </template>
            </el-table-column>
            <el-table-column prop="amount_to_the_company" :label="LangUtil('到公司货量')" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.amount_to_the_company" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column prop="contribute_to_the_company" :label="LangUtil('给公司贡献')" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.contribute_to_the_company" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <!-- <el-table-column :label="tableColumns['credit_rate'].name" prop="credit_rate" class-name="status-col">
                <template slot-scope="{ row }">
                    <div v-if="row.user_id === '合计' || row.user_id === LangUtil('合计')">
                        -
                    </div>
                    <div v-else>{{ row.credit_rate }}%</div>
                </template>
            </el-table-column> -->
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticAgentCreditProxy from "../proxy/StatisticAgentCreditProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class StatisticAgentCreditBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticAgentCreditProxy = this.getProxy(StatisticAgentCreditProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    // 排序
    tableSortChange(column: any) {
        let order_by = {};
        if (column.order === "descending") {
            order_by = {
                [column.prop]: "DESC",
            };
        } else {
            order_by = {
                [column.prop]: "ASC",
            };
        }
        this.listQuery.page_count = 1;
        this.listQuery.order_by = JSON.stringify(order_by);
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
