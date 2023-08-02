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
                            <div :class="row.user_id == info_head.user_id ? 'selfid' : ''">{{ row.user_id }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['username'].name" prop="username" class-name="status-col">
            </el-table-column>

            <el-table-column :label="tableColumns['record_count'].name" prop="record_count" class-name="status-col">
            </el-table-column>

            <el-table-column :label="tableColumns['bet_gold'].name" prop="bet_gold" class-name="status-col">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.bet_gold"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    ></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column prop="win_gold" :label="tableColumns['win_gold'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['valid_bet_gold'].name" prop="valid_bet_gold" class-name="status-col">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.valid_bet_gold"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    ></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['back_water'].name" prop="back_water" class-name="status-col">
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

            <el-table-column :label="tableColumns['self_amount'].name" prop="self_amount" class-name="status-col">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.self_amount" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['credit_rate_self'].name"
                prop="credit_rate_self"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div>
                        {{ row.credit_rate_self }}
                        <span v-if="row.credit_rate_self != '-'">%</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="agent_amount" :label="tableColumns['agent_amount'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.agent_amount" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['credit_rate_subordinate'].name"
                prop="credit_rate_subordinate"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div>
                        {{ row.credit_rate_subordinate }}
                        <span v-if="row.credit_rate_subordinate != '-'">%</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="plat_amount" :label="tableColumns['plat_amount'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.plat_amount" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['credit_rate_superior'].name"
                prop="credit_rate_superior"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div>
                        {{ row.credit_rate_superior }}
                        <span v-if="row.credit_rate_superior != '-'">%</span>
                    </div>
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

            <el-table-column :label="LangUtil('操作')" prop="credit_rate" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="row.user_id !== LangUtil('合计') && row.user_id != info_head.user_id"
                        class="item"
                        type="primary"
                        size="mini"
                        style="height: 30px; margin-left: 5px"
                        @click="handlerQuery(row.user_id)"
                    >
                        {{ LangUtil("查看") }}
                    </el-button>
                </template>
            </el-table-column>
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
import StatisticCreditProxy from "../proxy/StatisticCreditProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
                99: "info",
            };
            return statusMap[status];
        },
    },
})
export default class StatisticCreditBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticCreditProxy = this.getProxy(StatisticCreditProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    info_head = this.myProxy.tableData.info_head;

    handlerQuery(user_id: any) {
        this.myProxy.onQueryUser(user_id);
    }

    showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.selfid {
    font-weight: bold;
}
.flex {
    display: flex;
    align-items: center;
}
</style>
