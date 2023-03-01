<template>
    <div>
        <div class="statistics">
            {{ LangUtil("当前统计列表") }} <span>{{ LangUtil("总投注金额") }}:{{ summary.bet_gold }}</span>
            <span>{{ LangUtil("有效投注金额") }}:{{ summary.valid_bet_gold }}</span>
            <span>{{ LangUtil("玩家输赢") }}:<WinLossDisplay :amount="summary.win_gold"/></span>
            <span>{{ LangUtil("结算流水") }}:{{ summary.settlement_water }}</span>
            <span>{{ LangUtil("用户流水") }}:{{ summary.water }}</span>
        </div>
        <div class="statistics" v-for="(item, index) in myProxy.tableData.summary_coin" :key="index">
            {{ item.coin_name_unique }}
            <span>{{ LangUtil("总投注金额") }}:{{ item.bet_gold }}</span>
            <span>{{ LangUtil("有效投注金额") }}:{{ item.valid_bet_gold }}</span>
            <span>{{ LangUtil("玩家输赢") }}:<WinLossDisplay :amount="item.win_gold" :isShowDollar="false"/></span>
            <span>{{ LangUtil("结算流水") }}:{{ item.settlement_water }}</span>
            <span>{{ LangUtil("用户流水") }}:{{ item.water }}</span>
            <!-- <span>{{ tableColumns["water_accelerate"].name }}:{{ item.water_accelerate }}</span> -->
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
                min-width="150px"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div>{{ row.coin_name_unique }}</div>
                    <div>{{ tableColumns["bet_gold_coin"].name }}: {{ row.bet_gold_coin }}</div>
                    <div>{{ tableColumns["valid_bet_gold_coin"].name }}: {{ row.valid_bet_gold_coin }}</div>
                    <div>
                        {{ tableColumns["win_gold_coin"].name }}:
                        <WinLossDisplay :amount="row.win_gold_coin" :isShowDollar="false" />
                    </div>
                    <div>{{ tableColumns["settlement_water_coin"].name }}: {{ row.settlement_water_coin }}</div>
                    <div>{{ tableColumns["water_coin"].name }}: {{ row.water_coin }}</div>
                </template>
            </el-table-column>
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
            <el-table-column :label="LangUtil('时间')" align="left" min-width="145px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["bet_at"].name }}：<br />{{ row.bet_at }}</p>
                    <p>{{ tableColumns["settlement_at"].name }}：<br />{{ row.settlement_at }}</p>
                    <p>{{ tableColumns["pull_at"].name }}：<br />{{ row.pull_at }}</p>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('投注内容')" header-align="center" align="left" min-width="215px">
                <template slot-scope="{ row }">
                    <p>
                        {{ tableColumns["bet_gold"].name }}：
                        <WinLossDisplay :amount="row.bet_gold" :isShowColor="false" :isShowPlus="false" />
                    </p>
                    <p v-if="row.vendor_type == 64">
                        {{ LangUtil("联赛") }}：
                        <span v-if="row.league">
                            {{ row.league.substring(0, row.league.indexOf("-")) }}<br />
                            {{ row.league.substring(row.league.indexOf("-") + 1) }}
                        </span>
                    </p>
                    <p>{{ tableColumns["bet_code"].name }}：{{ row.bet_code }}</p>
                    <p>{{ tableColumns["bet_result"].name }}：{{ row.bet_result }}</p>
                    <p v-if="row.vendor_type == 64">{{ LangUtil("盘口") }}：{{ row.market_type_text }}</p>
                    <p v-if="row.vendor_type == 64">{{ LangUtil("赔率") }}：{{ row.odds }}</p>
                    <el-button @click="showDetailPage(row)" type="text">{{ LangUtil("跳转详情") }}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['valid_bet_gold'].name"
                prop="valid_bet_gold"
                class-name="status-col"
                min-width="70px"
            ></el-table-column>
            <el-table-column :label="LangUtil('流水')" prop="water" class-name="status-col" min-width="150px">
                <template slot-scope="{ row }">
                    <div align="left">
                        <div>{{ LangUtil("结算流水") }}：{{ row.settlement_water }}</div>
                        <div>{{ LangUtil("结算方式") }}：{{ tableColumns["water_type"].options[row.water_type] }}</div>
                        <div>{{ LangUtil("结算比例") }}：{{ row.water_rate }}</div>
                        <div>{{ LangUtil("用户流水") }}：{{ row.water }}</div>
                        <div>{{ tableColumns["water_accelerate"].name }}：{{ row.water_accelerate }}</div>
                        <div>{{ LangUtil("加速流水比例") }}：{{ row.water_rate_accelerate }}</div>
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
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handlerDetail(row)">{{ LangUtil("详情") }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></Pagination>
        <PlatUserBetDetail :tableColumns="tableColumns" :data="myProxy.dialogData"></PlatUserBetDetail>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabBetProxy = getProxy(TabBetProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    summary = this.myProxy.tableData.summary;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handlerDetail(data: any) {
        this.myProxy.showDialog(data);
    }

    showDetailPage(data: any) {
        this.myProxy.showDetailPage(data);
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
