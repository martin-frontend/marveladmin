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
            <span>
                {{ LangUtil("投注總人數") }}:
                {{ summary.total_bet_user_num }}
            </span>
        </div>
        <template v-for="(item, index) in myProxy.tableData.summary_coin">
            <div class="statistics" :key="index" v-if="item.coin_name_unique_type != 4">
                {{ converCoinName(item.coin_name_unique) }}
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
                    <WinLossDisplay
                        :amount="item.water"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
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
        </template>
        <el-collapse v-if="activitySummaryCoin.length > 0" class="custom-collapse">
            <el-collapse-item>
                <template slot="title">
                    <div>{{ LangUtil("活动币统计") }}</div>
                </template>
                <div class="statistics">
                    {{ LangUtil("当前统计列表") }}
                    <span>
                        {{ LangUtil("总投注金额") }}:
                        <WinLossDisplay :amount="task_coin_summary.bet_gold" :isShowColor="false" :isShowPlus="false" />
                    </span>
                    <span>
                        {{ LangUtil("有效投注金额") }}:
                        <WinLossDisplay
                            :amount="task_coin_summary.valid_bet_gold"
                            :isShowColor="false"
                            :isShowPlus="false"
                        />
                    </span>
                    <span>{{ LangUtil("玩家输赢") }}:<WinLossDisplay :amount="task_coin_summary.win_gold"/></span>
                    <span>
                        {{ LangUtil("结算流水") }}:
                        <WinLossDisplay
                            :amount="task_coin_summary.settlement_water"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </span>
                    <span>
                        {{ LangUtil("用户流水") }}:
                        <WinLossDisplay
                            :amount="task_coin_summary.water"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </span>
                    <span>
                        {{ tableColumns["water_accelerate"].name }}:
                        <WinLossDisplay
                            :amount="task_coin_summary.water_accelerate"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </span>
                    <span>
                        {{ tableColumns["backwater"].name }}:
                        <WinLossDisplay
                            :amount="task_coin_summary.backwater"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
                    </span>
                    <span>
                        {{ LangUtil("投注總人數") }}:
                        {{ task_coin_summary.total_bet_user_num }}
                    </span>
                </div>
                <div class="statistics" :key="item.name" v-for="item in activitySummaryCoin">
                    {{ converCoinName(item.coin_name_unique) }}
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
                    <span>
                        {{ LangUtil("玩家输赢") }}:<WinLossDisplay :amount="item.win_gold" :isShowDollar="false"
                    /></span>
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
                        <WinLossDisplay
                            :amount="item.water"
                            :isShowColor="false"
                            :isShowPlus="false"
                            :isShowDollar="false"
                        />
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
                </div>
            </el-collapse-item>
        </el-collapse>

        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
            @sort-change="tableSortChange"
        >
            <el-table-column
                :label="tableColumns['vendor_id'].name"
                prop="vendor_id"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_id.options[listQuery.plat_id][row.vendor_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('平台信息')" min-width="200px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div style="text-align: left;">
                        {{ tableColumns.plat_id.name }}:{{ tableColumns.plat_id.options[row.plat_id] }}
                    </div>
                    <div style="text-align: left;">{{ tableColumns.channel_id.name }}:{{ row.channel_id }}</div>
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
            <!-- 游戏类型 -->
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
            <!-- 厂商订单 -->
            <el-table-column
                :label="tableColumns['vendor_order_no'].name"
                prop="vendor_order_no"
                min-width="80px"
                class-name="status-col"
            ></el-table-column>
            <!-- 体育类型 -->
            <el-table-column
                :label="tableColumns['sports_type'].name"
                prop="sports_type"
                min-width="100px"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.sports_type == 0">-</div>
                    <div v-else>
                        <template v-for="(item, index) in row.sports_type.split('|')">
                            <span :key="index">
                                {{ tableColumns["sports_type"].options[item] }}
                                <span v-if="index + 1 != row.sports_type.split('|').length">
                                    x
                                </span>
                            </span>
                        </template>
                    </div>
                </template>
            </el-table-column>
            <!-- 滚球比分 -->
            <el-table-column
                :label="tableColumns['bet_score'].name"
                prop="bet_score"
                min-width="80px"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.bet_score">{{ row.bet_score }}</div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <!-- 下注订单 -->
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
                    <div>{{ converCoinName(row.coin_name_unique) }}</div>
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
            <el-table-column
                :label="tableColumns['win_gold'].name"
                prop="win_gold"
                class-name="status-col"
                sortable="custom"
                width="100px"
            >
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
            <el-table-column :label="LangUtil('投注内容')" header-align="center" align="left" min-width="240px">
                <template slot-scope="{ row }">
                    <template v-if="row.vendor_type == 64">
                        <template v-if="row.bet_type == LangUtil('单注')">
                            <p>{{ LangUtil("投注类型") }}： {{ row.bet_type }}</p>
                            <p>{{ LangUtil("滚球") }}： {{ row.is_inplay }}</p>
                        </template>
                        <template v-else>
                            <div style="display: flex; align-items: center;">
                                <p>{{ LangUtil("投注类型") }}： {{ row.bet_type }} {{ row.league }}</p>
                                <el-button
                                    class="mini"
                                    size="mini"
                                    type="primary"
                                    @click="showMultiDetail(row.combo_list)"
                                    >{{ LangUtil("串关详情") }}
                                </el-button>
                            </div>
                            <p>{{ LangUtil("滚球") }}： -</p>
                        </template>
                        <p>{{ LangUtil("提前结算") }}：{{ row.is_cash_out }}</p>
                        <template v-if="row.bet_type == LangUtil('单注') && row.is_cash_out == LangUtil('是')">
                            <p>{{ LangUtil("返回金额") }}：{{ row.cash_out_amount }}</p>
                            <p>{{ LangUtil("提前结算赔率") }}：{{ row.cash_out_odds }}</p>
                        </template>
                    </template>
                    <p>
                        {{ tableColumns["bet_gold"].name }}：
                        <WinLossDisplay :amount="row.bet_gold" :isShowColor="false" :isShowPlus="false" />
                    </p>
                    <p v-if="row.vendor_type == 64">
                        {{ LangUtil("联赛") }}：
                        <span v-if="row.league && row.league.indexOf('-') > 0">
                            {{ row.league.substring(0, row.league.indexOf("-")) }}<br />
                            {{ row.league.substring(row.league.indexOf("-") + 1) }}
                        </span>
                        <span v-else>{{ row.league }}</span>
                    </p>
                    <p v-if="row.vendor_id != 209">{{ tableColumns["bet_code"].name }}：{{ row.bet_code }}</p>
                    <p v-if="row.vendor_id == 173">{{ LangUtil("开奖结果") }}：{{ row.game_results }}</p>
                    <p v-else-if="row.vendor_id != 136 && row.vendor_id != 209">
                        {{ tableColumns["bet_result"].name }}：{{ row.bet_result }}
                    </p>
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
                    <template v-if="row.vendor_id == 197">
                        <p>{{ LangUtil("开奖结果") }}：{{ row.game_results }}</p>
                        <p>{{ LangUtil("奖期") }}：{{ row.vendor_game_issue }}</p>
                        <p>{{ LangUtil("赔率") }}：{{ row.odds }}</p>
                    </template>
                    <el-button v-if="row.bet_detail_url" @click="showDetailPage(row)" type="text">{{
                        LangUtil("跳转详情")
                    }}</el-button>
                    <template v-if="row.vendor_id == 209">
                        <p>{{ LangUtil("投注玩法") }}：{{ row.play_level }}</p>
                        <p>{{ LangUtil("注数") }}：{{ row.bet_num }}</p>
                        <p>{{ LangUtil("投注内容") }}：{{ translateBallContentText(row) }}</p>
                        <p>{{ LangUtil("下注赔率") }}：{{ row.odds }}</p>
                        <p>{{ LangUtil("倍数") }}：{{ row.multiple }}</p>
                        <p>{{ LangUtil("追号") }}：{{ row.chase }}</p>
                        <p>{{ LangUtil("开奖结果") }}：{{ row.game_results }}</p>
                    </template>
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
    task_coin_summary = this.myProxy.tableData.task_coin_summary;

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

    showMultiDetail(data: any) {
        this.myProxy.showMultiDetail(data);
    }

    showDetailPage(data: any) {
        this.myProxy.showDetailPage(data);
    }

    get activitySummaryCoin() {
        // @ts-ignore
        return this.myProxy.tableData.summary_coin.filter(({ coin_name_unique_type }) => coin_name_unique_type == 4);
    }

    translateBallContentText(row: any) {
        return this.myProxy.lottTranslator.translateBallContentText(row.play_id, row.bet_content);
    }

    converCoinName(coinKey: any) {
        return this.myProxy.converCoinName(coinKey);
    }

    // 排序
    private tableSortChange(column: any) {
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
.statistics {
    margin-bottom: 16px;
    span {
        margin-left: 20px;
        :nth-child(1) {
            margin-left: 0;
        }
    }
}
::v-deep .custom-collapse {
    margin-bottom: 10px;
    border: 0;
    .el-collapse-item__header {
        border: 0;
        color: #000;
        font-size: 16px;
    }
    .el-collapse-item__arrow {
        margin: 0 0 0 8px;
    }
    .statistics {
        color: #000;
        font-size: 16px;
    }
    .el-collapse-item__wrap {
        border: 0;
    }
}
.mini {
    margin-left: 4px;
    padding: 4px 10px;
    max-height: 24px;
}
</style>
