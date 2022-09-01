<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column prop="created_date" :label="$t('common.date')" align="center" width="120">
            </el-table-column>
            <el-table-column :label="$t('common.userMsg')" align="center" min-width="160">
                <template slot-scope="{ row }">
                    <div v-show="row.display !== true">
                        <div>
                            <span>{{ tableColumns["plat_id"].name }}:</span>
                            <span>{{ row.plat_id }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["channel_id"].name }}:</span>
                            <span>{{ row.channel_id }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["user_id"].name }}:</span>
                            <span
                                @click="showUserDetail(row.user_id)"
                                style="cursor: pointer; text-decoration: underline"
                                >{{ row.user_id }}</span
                            >
                        </div>
                        <div>
                            <span>{{ tableColumns["nick_name"].name }}:</span>
                            <span>{{ row.nick_name }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["username"].name }}:</span>
                            <span>{{ row.username }}</span>
                        </div>
                    </div>
                    <div v-show="row.display === true">{{ $t("common.total") }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('statistic_user_days.recharge')" align="center" width="160">
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["recharge_count"].name }}:</span>
                            <span>{{ row.recharge_count }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["recharge"].name }}:</span>
                            <span>{{ row.recharge }}</span>
                        </div>
                        <div v-show="row.display !== true">
                            <span>{{ tableColumns["is_first_recharge"].name }}:</span>
                            <span>{{ row.is_first_recharge === 0 ? $t("common.no") : $t("common.yes") }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('statistic_user_days.exchange')" align="center" width="160">
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["exchange_count"].name }}:</span>
                            <span>{{ row.exchange_count }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["exchange"].name }}:</span>
                            <span>{{ row.exchange }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('statistic_user_days.promote')" width="160">
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["directly_users"].name }}:</span>
                            <span>{{ row.directly_users }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission"].name }}:</span>
                            <span>{{ row.commission }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_2"].name }}:</span>
                            <span>{{ row.commission_2 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_4"].name }}:</span>
                            <span>{{ row.commission_4 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_8"].name }}:</span>
                            <span>{{ row.commission_8 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_16"].name }}:</span>
                            <span>{{ row.commission_16 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_32"].name }}:</span>
                            <span>{{ row.commission_32 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_64"].name }}:</span>
                            <span>{{ row.commission_64 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_128"].name }}:</span>
                            <span>{{ row.commission_128 }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('statistic_user_days.bonus')" min-width="180">
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="$t('statistic_user_days.bonusTip')"
                        placement="top"
                    >
                        <div>
                            <span>{{ $t("statistic_user_days.bonus") }}</span>
                            <i class="el-icon-question"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["gift_gold"].name }}:</span>
                            <span>{{ row.gift_gold }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_gold"].name }}:</span>
                            <span>{{ row.backwater_gold }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_2"].name }}:</span>
                            <span>{{ row.backwater_2 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_4"].name }}:</span>
                            <span>{{ row.backwater_4 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_8"].name }}:</span>
                            <span>{{ row.backwater_8 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_16"].name }}:</span>
                            <span>{{ row.backwater_16 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_32"].name }}:</span>
                            <span>{{ row.backwater_32 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_64"].name }}:</span>
                            <span>{{ row.backwater_64 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_128"].name }}:</span>
                            <span>{{ row.backwater_128 }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('statistic_user_days.betting')" align="left" min-width="200">
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["total_bet"].name }}:</span>
                            <span>{{ row.total_bet }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_2"].name }}:</span>
                            <span>{{ row.bet_2 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_16"].name }}:</span>
                            <span>{{ row.bet_16 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_8"].name }}:</span>
                            <span>{{ row.bet_8 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_4"].name }}:</span>
                            <span>{{ row.bet_4 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_32"].name }}:</span>
                            <span>{{ row.bet_32 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_64"].name }}:</span>
                            <span>{{ row.bet_64 }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_128"].name }}:</span>
                            <span>{{ row.bet_128 }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('statistic_user_days.water')" align="left" min-width="200">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ tableColumns["total_water"].name }}:</span>
                        <span>{{ row.total_water }}</span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_2"].name }}:</span>
                        <span>{{ row.water_2 }}</span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_16"].name }}:</span>
                        <span>{{ row.water_16 }}</span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_8"].name }}:</span>
                        <span>{{ row.water_8 }}</span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_4"].name }}:</span>
                        <span>{{ row.water_4 }}</span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_32"].name }}:</span>
                        <span>{{ row.water_32 }}</span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_64"].name }}:</span>
                        <span>{{ row.water_64 }}</span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_128"].name }}:</span>
                        <span>{{ row.water_128 }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('statistic_user_days.WinOrLose')" align="left" min-width="200">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ tableColumns["total_win_loss"].name }}:</span>
                        <WinLossDisplay :amount="row.total_win_loss" />
                    </div>
                    <div>
                        <span>{{ tableColumns["win_loss_2"].name }}:</span>
                        <WinLossDisplay :amount="row.win_loss_2" />
                    </div>
                    <div>
                        <span>{{ tableColumns["win_loss_16"].name }}:</span>
                        <WinLossDisplay :amount="row.win_loss_16" />
                    </div>
                    <div>
                        <span>{{ tableColumns["win_loss_8"].name }}:</span>
                        <WinLossDisplay :amount="row.win_loss_8" />
                    </div>
                    <div>
                        <span>{{ tableColumns["win_loss_4"].name }}:</span>
                        <WinLossDisplay :amount="row.win_loss_4" />
                    </div>
                    <div>
                        <span>{{ tableColumns["win_loss_32"].name }}:</span>
                        <WinLossDisplay :amount="row.win_loss_32" />
                    </div>
                    <div>
                        <span>{{ tableColumns["win_loss_64"].name }}:</span>
                        <WinLossDisplay :amount="row.win_loss_64" />
                    </div>
                    <div>
                        <span>{{ tableColumns["win_loss_128"].name }}:</span>
                        <WinLossDisplay :amount="row.win_loss_128" />
                    </div>
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
import StatisticUserDaysProxy from "../proxy/StatisticUserDaysProxy";
import Pagination from "@/components/Pagination.vue";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticUserDaysBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticUserDaysProxy = this.getProxy(StatisticUserDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.onShowUserDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
// 表格合计样式
::v-deep .el-table__body {
    .el-table__row:first-child {
        background-color: #f6f7fa;
        td:nth-child(1) {
            border-right: 0;
        }
        td:nth-child(2) {
            text-align: left;
        }
    }
    .green {
        color: green;
    }
    .red {
        color: red;
    }
}
</style>
