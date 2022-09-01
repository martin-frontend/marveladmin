<template>
    <div>
        <div v-if="tableData.length > 0">
            <el-tabs v-model="myProxy.tabData.activeName" @tab-click="handleClick">
                <el-tab-pane :label="$t('statistic_user_promotion_days_index.group')" name="group"></el-tab-pane>
                <el-tab-pane :label="$t('statistic_user_promotion_days_index.directly')" name="directly"></el-tab-pane>
            </el-tabs>
            <div>
                <div class="user_info">
                    <span v-if="userInfo.startTime">
                        <span>{{ userInfo.startTime }}</span>
                        <span>{{ $t("common.to") }}</span>
                        <span>{{ userInfo.endTime }}</span>
                    </span>
                    <span>{{ $t("common.userID") }} </span>
                    <span>{{ userInfo.user_id }} </span>
                    <span>{{ $t("statistic_user_promotion_days_index.userName") }} </span>
                    <span>{{ userInfo.username }} </span>
                    <span>{{ $t("common.userNickName") }} </span>
                    <span>{{ userInfo.nick_name }} </span>
                    <span>{{ $t("statistic_user_promotion_days_index.channelId") }} </span>
                    <span>{{ userInfo.channel_id }} </span>
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
                    <el-table-column prop="created_date" :label="$t('common.date')" align="center" width="160px">
                    </el-table-column>
                    <!-- 总盈利 -->
                    <el-table-column :label="tableColumns[activeName + '_profit'].name" align="center" width="160px">
                        <template slot="header">
                            <el-tooltip effect="dark" :content="tableColumns['group_profit'].tips" placement="top">
                                <div>
                                    <span>{{ tableColumns["group_profit"].name }}</span>
                                    <i class="el-icon-question"></i>
                                </div>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row[activeName + `_profit`]" />
                        </template>
                    </el-table-column>
                    <!-- 人数 -->
                    <el-table-column
                        :prop="`total_${activeName}_users`"
                        :label="tableColumns[`total_${activeName}_users`].name"
                        align="center"
                        width="80px"
                    >
                    </el-table-column>
                    <!-- 新增 -->
                    <el-table-column
                        :prop="`${activeName}_users`"
                        :label="tableColumns[`${activeName}_users`].name"
                        align="center"
                        width="80px"
                    >
                    </el-table-column>
                    <!-- 首充人数 -->
                    <el-table-column
                        :prop="`${activeName}_first_recharge_count`"
                        :label="tableColumns[`${activeName}_first_recharge_count`].name"
                        align="center"
                        width="80px"
                    >
                    </el-table-column>
                    <!-- 充值笔数 -->
                    <el-table-column
                        :prop="`${activeName}_recharge_count`"
                        :label="tableColumns[`${activeName}_recharge_count`].name"
                        align="center"
                        width="80px"
                    >
                    </el-table-column>
                    <!-- 充值总额 -->
                    <el-table-column
                        :prop="`${activeName}_recharge`"
                        :label="tableColumns[`${activeName}_recharge`].name"
                        align="center"
                        min-width="180px"
                    >
                    </el-table-column>
                    <!-- 兑换笔数 -->
                    <el-table-column
                        :prop="`${activeName}_exchange_count`"
                        :label="tableColumns[`${activeName}_exchange_count`].name"
                        align="center"
                        width="80px"
                    >
                    </el-table-column>
                    <!-- 兑换金额 -->
                    <el-table-column
                        :prop="`${activeName}_exchange`"
                        :label="tableColumns[`${activeName}_exchange`].name"
                        align="center"
                    >
                    </el-table-column>
                    <!-- 推广佣金 -->
                    <el-table-column
                        :prop="`${activeName}_commission`"
                        :label="tableColumns[`${activeName}_commission`].name"
                        align="center"
                        min-width="140px"
                    >
                        <template slot-scope="{ row }">
                            <div class="text-left">
                                <span>{{ tableColumns[`${activeName}_commission`].name }}:</span>
                                <span>{{ row[`${activeName}_commission`] }}</span>
                            </div>
                            <div v-for="i of [2, 4, 8, 16, 32, 64, 128]" :key="i" class="text-left">
                                <span>{{ tableColumns[`${activeName}_commission_${i}`].name }}:</span>
                                <span>{{ row[`${activeName}_commission_${i}`] }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 平台赠送 -->
                    <el-table-column
                        :prop="`${activeName}_gift_gold`"
                        :label="tableColumns[`${activeName}_gift_gold`].name"
                        align="center"
                        min-width="100px"
                    >
                        <template slot="header">
                            <el-tooltip
                                effect="dark"
                                :content="tableColumns[`${activeName}_gift_gold`].tips"
                                placement="top"
                            >
                                <div>
                                    <span>{{ tableColumns[`${activeName}_gift_gold`].name }}</span>
                                    <i class="el-icon-question"></i>
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <!-- 时时反水 -->
                    <el-table-column
                        :prop="`${activeName}_backwater_gold`"
                        :label="tableColumns[`${activeName}_backwater_gold`].name"
                        align="center"
                        min-width="140px"
                    >
                        <template slot-scope="{ row }">
                            <div class="text-left">
                                <span>{{ tableColumns[`${activeName}_backwater_gold`].name }}:</span>
                                <span>{{ row[`${activeName}_backwater_gold`] }}</span>
                            </div>
                            <div v-for="i of [2, 4, 8, 16, 32, 64, 128]" :key="i" class="text-left">
                                <span>{{ tableColumns[`${activeName}_backwater_${i}`].name }}:</span>
                                <span>{{ row[`${activeName}_backwater_${i}`] }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 游戏总投注 -->
                    <el-table-column
                        :prop="`${activeName}_total_bet`"
                        :label="tableColumns[`${activeName}_total_bet`].name"
                        align="center"
                        min-width="140px"
                    >
                        <template slot-scope="{ row }">
                            <div class="text-left">
                                <span>{{ tableColumns[`${activeName}_total_bet`].name }}:</span>
                                <span>{{ row[`${activeName}_total_bet`] }}</span>
                            </div>
                            <div v-for="i of [2, 4, 8, 16, 32, 64, 128]" :key="i" class="text-left">
                                <span>{{ tableColumns[`${activeName}_bet_${i}`].name }}:</span>
                                <span>{{ row[`${activeName}_bet_${i}`] }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 游戏总输赢 -->
                    <el-table-column
                        :prop="`${activeName}_total_win_loss`"
                        :label="tableColumns[`${activeName}_total_win_loss`].name"
                        align="center"
                        min-width="140px"
                    >
                        <template slot-scope="{ row }">
                            <div class="text-left">
                                <span>{{ tableColumns[`${activeName}_total_win_loss`].name }}:</span>
                                <span>{{ row[`${activeName}_total_win_loss`] }}</span>
                            </div>
                            <div v-for="i of [2, 4, 8, 16, 32, 64, 128]" :key="i" class="text-left">
                                <span>{{ tableColumns[`${activeName}_win_loss_${i}`].name }}:</span>
                                <span>{{ row[`${activeName}_win_loss_${i}`] }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 游戏总流水 -->
                    <el-table-column
                        :prop="`${activeName}_total_water`"
                        :label="tableColumns[`${activeName}_total_water`].name"
                        align="center"
                        min-width="140px"
                    >
                        <template slot-scope="{ row }">
                            <div class="text-left">
                                <span>{{ tableColumns[`${activeName}_total_water`].name }}:</span>
                                <span>{{ row[`${activeName}_total_water`] }}</span>
                            </div>
                            <div v-for="i of [2, 4, 8, 16, 32, 64, 128]" :key="i" class="text-left">
                                <span>{{ tableColumns[`${activeName}_water_${i}`].name }}:</span>
                                <span>{{ row[`${activeName}_water_${i}`] }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 游戏总流水 -->
                    <el-table-column
                        :prop="`${activeName}_bonus_pool`"
                        :label="tableColumns[`${activeName}_bonus_pool`].name"
                        align="center"
                        min-width="140px"
                    >
                        <template slot-scope="{ row }">
                            <div class="text-left">
                                <span>{{ tableColumns[`${activeName}_bonus_pool`].name }}:</span>
                                <span>{{ row[`${activeName}_bonus_pool`] }}</span>
                            </div>
                            <div v-for="i of [2, 4, 8, 16, 32, 64, 128]" :key="i" class="text-left">
                                <span>{{ tableColumns[`${activeName}_bonus_pool_${i}`].name }}:</span>
                                <span>{{ row[`${activeName}_bonus_pool_${i}`] }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- 充值手续费 -->
                    <el-table-column
                        :prop="`${activeName}_recharge_fee`"
                        :label="tableColumns[`${activeName}_recharge_fee`].name"
                        align="center"
                        min-width="100px"
                    >
                    </el-table-column>
                    <!-- 兑换手续费 -->
                    <el-table-column
                        :prop="`${activeName}_exchange_fee`"
                        :label="tableColumns[`${activeName}_exchange_fee`].name"
                        align="center"
                        min-width="100px"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <p v-else class="note">{{ $t("statistic_user_promotion_days_index.notice") }}</p>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticUserPromotionDaysIndexProxy from "../proxy/StatisticUserPromotionDaysIndexProxy";
import Pagination from "@/components/Pagination.vue";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticUserPromotionDaysIndexBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticUserPromotionDaysIndexProxy = this.getProxy(StatisticUserPromotionDaysIndexProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    get activeName() {
        return this.myProxy.tabData.activeName;
    }
    get userInfo() {
        return this.myProxy.tableData.userInfo;
    }

    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleClick(tab: any) {
        this.myProxy.tabData.activeName = tab.name;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .user_info {
    margin: 16px 0 6px 0;
    color: rgb(24, 24, 24);
    span {
        margin-right: 6px;
    }
}
.note {
    color: rgb(180, 3, 3);
}
::v-deep .el-table__body .el-table__row:first-child {
    background-color: #f6f7fa;
}

.text-left {
    text-align: left;
}
</style>
