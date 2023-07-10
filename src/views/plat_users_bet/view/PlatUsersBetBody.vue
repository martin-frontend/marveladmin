<template>
    <div>
        <div class="statistics">
            {{ LangUtil("当前统计列表") }}
            <span>
                {{ LangUtil("总投注金额") }}:
                <WinLossDisplay :amount="summary.bet_gold" :isShowColor="false" :isShowPlus="false" />
            </span>
            <span>
                {{ LangUtil("有效投注金额") }}:
                <WinLossDisplay :amount="summary.valid_bet_gold" :isShowColor="false" :isShowPlus="false" />
            </span>
            <span>{{ LangUtil("玩家输赢") }}:<WinLossDisplay :amount="summary.win_gold"/></span>
            <span>
                {{ LangUtil("结算流水") }}:
                <WinLossDisplay
                    :amount="summary.settlement_water"
                    :isShowColor="false"
                    :isShowPlus="false"
                    :isShowDollar="false"
                />
            </span>
            <span>
                {{ LangUtil("用户流水") }}:
                <WinLossDisplay
                    :amount="summary.water"
                    :isShowColor="false"
                    :isShowPlus="false"
                    :isShowDollar="false"
                />
            </span>
            <span>
                {{ tableColumns["water_accelerate"].name }}:
                <WinLossDisplay
                    :amount="summary.water_accelerate"
                    :isShowColor="false"
                    :isShowPlus="false"
                    :isShowDollar="false"
                />
            </span>
            <span>
                {{ tableColumns["backwater"].name }}:
                <WinLossDisplay
                    :amount="summary.backwater"
                    :isShowColor="false"
                    :isShowPlus="false"
                    :isShowDollar="false"
                />
            </span>
        </div>
        <div class="statistics" v-for="(item, index) in myProxy.tableData.summary_coin" :key="index">
            {{ item.coin_name_unique }}
            <span>
                {{ LangUtil("总投注金额") }}:
                <WinLossDisplay
                    :amount="item.bet_gold"
                    :isShowColor="false"
                    :isShowPlus="false"
                    :isShowDollar="false"
                />
            </span>
            <span>
                {{ LangUtil("有效投注金额") }}:
                <WinLossDisplay
                    :amount="item.valid_bet_gold"
                    :isShowColor="false"
                    :isShowPlus="false"
                    :isShowDollar="false"
                />
            </span>
            <span> {{ LangUtil("玩家输赢") }}:<WinLossDisplay :amount="item.win_gold" :isShowDollar="false"/></span>
            <span>
                {{ LangUtil("结算流水") }}:
                <WinLossDisplay
                    :amount="item.settlement_water"
                    :isShowColor="false"
                    :isShowPlus="false"
                    :isShowDollar="false"
                />
            </span>
            <span>
                {{ LangUtil("用户流水") }}:
                <WinLossDisplay :amount="item.water" :isShowColor="false" :isShowPlus="false" :isShowDollar="false" />
            </span>
            <span>
                {{ tableColumns["backwater"].name }}:
                <WinLossDisplay
                    :amount="item.backwater_coin"
                    :isShowColor="false"
                    :isShowPlus="false"
                    :isShowDollar="false"
                />
            </span>
            <!-- <span>{{ tableColumns["water_accelerate"].name }}:{{ item.water_accelerate }}</span> -->
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
                :label="tableColumns['is_credit_user'].name"
                prop="is_credit_user"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.is_credit_user.options[row.is_credit_user] }}</div>
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
                :label="tableColumns['vendor_order_no'].name"
                prop="vendor_order_no"
                min-width="80px"
                class-name="status-col"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['order_no'].name"
                prop="order_no"
                min-width="80px"
                class-name="status-col"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['coin_name_unique'].name"
                prop="coin_name_unique"
                min-width="150px"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div>{{ row.coin_name_unique }}</div>
                    <div>
                        {{ tableColumns["bet_gold_coin"].name }}:
                        <WinLossDisplay
                            :amount="row.bet_gold_coin"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </div>
                    <div>
                        {{ tableColumns["valid_bet_gold_coin"].name }}:
                        <WinLossDisplay
                            :amount="row.valid_bet_gold_coin"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </div>
                    <div>
                        {{ tableColumns["win_gold_coin"].name }}:
                        <WinLossDisplay :amount="row.win_gold_coin" :isShowDollar="false" />
                    </div>
                    <div>
                        {{ tableColumns["settlement_water_coin"].name }}:
                        <WinLossDisplay
                            :amount="row.settlement_water_coin"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </div>
                    <div>
                        {{ tableColumns["water_coin"].name }}:
                        <WinLossDisplay
                            :amount="row.water_coin"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </div>
                    <div>
                        {{ tableColumns["backwater"].name }}:
                        <WinLossDisplay
                            :amount="row.backwater_coin"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </div>
                    <div>
                        {{ tableColumns["gold_scale"].name }}:
                        {{ row.gold_scale }}
                    </div>
                    <div>
                        {{ tableColumns["vendor_coin_name_unicode"].name }}:
                        <WinLossDisplay
                            :amount="row.vendor_coin_name_unicode"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </div>
                    <div>
                        {{ tableColumns["vendor_win_gold"].name }}:
                        <WinLossDisplay :amount="row.vendor_win_gold" :isShowDollar="false" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['win_gold'].name" prop="win_gold" class-name="status-col">
                <template slot-scope="{ row }">
                    <div v-if="row.win_gold == '-'">{{ row.win_gold }}</div>
                    <WinLossDisplay v-else :amount="row.win_gold" />
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('时间')" header-align="center" align="left" min-width="215px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["bet_at"].name }}：{{ row.bet_at }}</p>
                    <p>{{ tableColumns["settlement_at"].name }}：{{ row.settlement_at }}</p>
                    <p>{{ tableColumns["pull_at"].name }}：{{ row.pull_at }}</p>
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
                    <p v-if="row.vendor_id == 173">{{ LangUtil("开奖结果") }}：{{ row.game_results }}</p>
                    <p v-else-if="row.vendor_id != 136">{{ tableColumns["bet_result"].name }}：{{ row.bet_result }}</p>
                    <p v-if="row.vendor_id == 136">{{ LangUtil("彩种") }}：{{ row.vendor_game_name }}</p>
                    <p v-if="row.vendor_id == 136">{{ LangUtil("玩法") }}：{{ row.vendor_game_rules }}</p>
                    <p v-if="row.vendor_id == 136">{{ LangUtil("奖期") }}：{{ row.vendor_game_issue }}</p>
                    <p v-if="row.vendor_type == 64">{{ LangUtil("盘口") }}：{{ row.market_type_text }}</p>
                    <p v-if="row.vendor_type == 64">{{ LangUtil("赔率") }}：{{ row.odds }}</p>
                    <p v-if="row.user_level">{{ LangUtil("等级") }}：{{ row.user_level }}</p>
                    <template v-if="row.vendor_id == 187">
                        <p>{{ LangUtil("倍率") }}：{{ row.agdz_betx }}</p>
                        <p>{{ LangUtil("捕获鱼总价值") }}：{{ row.agdz_totalfishcost }}</p>
                        <p>{{ LangUtil("Jackpot抽水") }}：{{ row.agdz_totaljpcontribute }}</p>
                        <p>{{ LangUtil("Jackpot") }}：{{ row.agdz_totaljackpot }}</p>
                        <p>{{ LangUtil("第一名奖励") }}：{{ row.agdz_totalfirstprize }}</p>
                    </template>
                    <el-button v-if="row.bet_detail_url" @click="showDetailPage(row)" type="text">{{
                        LangUtil("跳转详情")
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['valid_bet_gold'].name"
                prop="valid_bet_gold"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.valid_bet_gold" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('流水')" prop="water" class-name="status-col" min-width="170px">
                <template slot-scope="{ row }">
                    <div align="left">
                        <div>
                            {{ LangUtil("结算流水") }}：
                            <WinLossDisplay
                                :amount="row.settlement_water"
                                :isShowColor="false"
                                :isShowPlus="false"
                                :isShowDollar="false"
                            />
                        </div>
                        <div>{{ LangUtil("结算方式") }}：{{ tableColumns["water_type"].options[row.water_type] }}</div>
                        <div>{{ LangUtil("结算比例") }}：{{ row.water_rate * 100 }}%</div>
                        <div>
                            {{ LangUtil("用户流水") }}：
                            <span v-if="row.water == '-'">{{ row.water }}</span>
                            <span v-else>
                                <WinLossDisplay
                                    :amount="row.water"
                                    :isShowColor="false"
                                    :isShowPlus="false"
                                    :isShowDollar="false"
                                />
                            </span>
                        </div>
                        <div>
                            {{ tableColumns["water_accelerate"].name }}：
                            <WinLossDisplay
                                :amount="row.water_accelerate"
                                :isShowColor="false"
                                :isShowPlus="false"
                                :isShowDollar="false"
                            />
                        </div>
                        <div>{{ LangUtil("加速流水比例") }}：{{ row.water_rate_accelerate * 100 }}%</div>
                        <div>
                            {{ tableColumns["backwater"].name }}:
                            <WinLossDisplay
                                :amount="row.backwater"
                                :isShowColor="false"
                                :isShowPlus="false"
                                :isShowDollar="false"
                            />
                        </div>
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
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.plat_users_bet_show)"
                        >{{ LangUtil("详情") }}</el-button
                    >
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    summary = this.myProxy.tableData.summary;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }

    showDetailPage(data: any) {
        this.myProxy.showDetailPage(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.statistics {
    margin-bottom: 16px;
    span {
        margin-left: 20px;
        :nth-child(1) {
            margin-left: 0;
        }
    }
}
</style>
