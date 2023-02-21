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
            <el-table-column prop="created_date" :label="LangUtil('日期')" align="center" width="120">
            </el-table-column>
            <el-table-column :label="LangUtil('用户信息')" align="center" min-width="160">
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
                        <div>
                            <span>{{ tableColumns["is_credit_user"].name }}:</span>
                            <span>{{ tableColumns["is_credit_user"].options[row.is_credit_user] }}</span>
                        </div>
                    </div>
                    <div v-show="row.display === true">{{ LangUtil("合计") }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('充值')" align="center" width="160">
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["recharge_count"].name }}:</span>
                            <span>{{ row.recharge_count }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["recharge"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.recharge" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div v-show="row.display !== true">
                            <span>{{ tableColumns["is_first_recharge"].name }}:</span>
                            <span>{{ row.is_first_recharge === 0 ? LangUtil("否") : LangUtil("是") }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('兑换')" align="center" width="160">
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["exchange_count"].name }}:</span>
                            <span>{{ row.exchange_count }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["exchange"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.exchange" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('推广')" width="160">
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["directly_users"].name }}:</span>
                            <span>{{ row.directly_users }}</span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.commission" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_2"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.commission_2" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_4"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.commission_4" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_8"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.commission_8" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_16"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.commission_16" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_32"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.commission_32" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_64"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.commission_64" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["commission_128"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.commission_128" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('平台赠金')" min-width="180">
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="LangUtil('平台赠送包活动、邮件 用户获得的金币')"
                        placement="top"
                    >
                        <div>
                            <span>{{ LangUtil("平台赠金") }}</span>
                            <i class="el-icon-question"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["gift_gold"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.gift_gold" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_gold"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.backwater_gold" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_2"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.backwater_2" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_4"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.backwater_4" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_8"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.backwater_8" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_16"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.backwater_16" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_32"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.backwater_32" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_64"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.backwater_64" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["backwater_128"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.backwater_128" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('投注')" align="left" min-width="200">
                <template slot-scope="{ row }">
                    <div>
                        <div>
                            <span>{{ tableColumns["total_bet"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.total_bet" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_2"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.bet_2" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_16"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.bet_16" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_8"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.bet_8" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_4"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.bet_4" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_32"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.bet_32" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_64"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.bet_64" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                        <div>
                            <span>{{ tableColumns["bet_128"].name }}:</span>
                            <span>
                                <WinLossDisplay :amount="row.bet_128" :isShowColor="false" :isShowPlus="false" />
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('流水')" align="left" min-width="200">
                <template slot-scope="{ row }">
                    <div>
                        <span>{{ tableColumns["total_water"].name }}:</span>
                        <span>
                            <WinLossDisplay :amount="row.total_water" :isShowColor="false" :isShowPlus="false" />
                        </span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_2"].name }}:</span>
                        <span>
                            <WinLossDisplay :amount="row.water_2" :isShowColor="false" :isShowPlus="false" />
                        </span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_16"].name }}:</span>
                        <span>
                            <WinLossDisplay :amount="row.water_16" :isShowColor="false" :isShowPlus="false" />
                        </span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_8"].name }}:</span>
                        <span>
                            <WinLossDisplay :amount="row.water_8" :isShowColor="false" :isShowPlus="false" />
                        </span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_4"].name }}:</span>
                        <span>
                            <WinLossDisplay :amount="row.water_4" :isShowColor="false" :isShowPlus="false" />
                        </span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_32"].name }}:</span>
                        <span>
                            <WinLossDisplay :amount="row.water_32" :isShowColor="false" :isShowPlus="false" />
                        </span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_64"].name }}:</span>
                        <span>
                            <WinLossDisplay :amount="row.water_64" :isShowColor="false" :isShowPlus="false" />
                        </span>
                    </div>
                    <div>
                        <span>{{ tableColumns["water_128"].name }}:</span>
                        <span>
                            <WinLossDisplay :amount="row.water_128" :isShowColor="false" :isShowPlus="false" />
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('输赢')" align="left" min-width="200">
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
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticUserDaysProxy = this.getProxy(StatisticUserDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
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
