<template>
    <div>
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
                prop="created_date"
                :label="tableColumns['created_date'].name"
                align="center"
                width="110px"
            >
            </el-table-column>

            <el-table-column :label="LangUtil('平台信息')" align="left" width="150px">
                <template slot-scope="{ row }">
                    <div>
                        <div v-if="row.plat_id === '合计' || row.plat_id === LangUtil('合计')">{{ row.plat_id }}</div>
                        <div v-else>
                            <div>{{ LangUtil("平台") }}：{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                            <div>{{ LangUtil("渠道") }}：{{ row.channel_id }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.new_register.display"
                prop="new_register"
                :label="tableColumns['new_register'].name"
                align="center"
            >
            </el-table-column>
            <!-- <el-table-column
                prop="new_user"
                v-if="tableColumns['new_user']"
                :label="tableColumns['new_user'].name"
                align="center"
            >
            </el-table-column> -->
            <el-table-column
                v-if="tableColumns.active_user.display"
                prop="active_user"
                :label="tableColumns['active_user'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.recharge.display"
                prop="recharge"
                :label="tableColumns['recharge'].name"
                align="center"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.recharge" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.recharge_user.display"
                prop="recharge_user"
                :label="tableColumns['recharge_user'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.new_recharge_user.display"
                prop="new_recharge_user"
                :label="tableColumns['new_recharge_user'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.exchange.display"
                prop="exchange"
                :label="tableColumns['exchange'].name"
                align="center"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.exchange" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.exchange_user.display"
                prop="exchange_user"
                :label="tableColumns['exchange_user'].name"
                align="center"
            >
            </el-table-column>

            <el-table-column
                v-if="tableColumns.new_exchange_user.display"
                prop="new_exchange_user"
                :label="tableColumns['new_exchange_user'].name"
                align="center"
            >
            </el-table-column>
            <el-table-column
                v-if="tableColumns.gift_gold.display"
                prop="gift_gold"
                :label="tableColumns['gift_gold'].name"
                align="center"
                min-width="100px"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['gift_gold'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["gift_gold"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.gift_gold" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.backwater_gold.display"
                prop="backwater_gold"
                :label="tableColumns['backwater_gold'].name"
                align="center"
                min-width="100px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['backwater_gold'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["backwater_gold"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.backwater_gold" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column prop="agent_bonus_gold" :label="tableColumns['agent_bonus_gold'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.agent_bonus_gold" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.commission_gold.display"
                prop="commission_gold"
                :label="tableColumns['commission_gold'].name"
                align="center"
                min-width="100px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['commission_gold'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["commission_gold"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.commission_gold" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>

            <el-table-column
                v-if="tableColumns.win_loss.display"
                prop="win_loss"
                :label="tableColumns['win_loss'].name"
                align="center"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_loss"></WinLossDisplay>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.water.display"
                prop="water"
                :label="tableColumns['water'].name"
                align="center"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.water"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDaysProxy from "../proxy/StatisticPlatDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticPlatDaysBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDaysProxy = this.getProxy(StatisticPlatDaysProxy);
    // proxy property
    get tableColumns() {
        return this.myProxy.tableData.columns;
    }
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    @Watch("myProxy.tableData.updateNum")
    reload() {
        this.$forceUpdate();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-table {
    display: flex;
    flex-direction: column;
}
::v-deep .el-table__footer-wrapper {
    order: -1;
}
::v-deep .el-table__header-wrapper {
    order: -2;
}
@for $i from 1 through 1 {
    ::v-deep .el-table__body .el-table__row:first-child {
        background-color: #f6f7fa;
        td:nth-child(#{$i}) {
            border-right: 0;
        }
        td:nth-child(2) {
            text-align: left;
        }
    }
}
</style>
