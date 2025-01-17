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
            <el-table-column
                prop="time_period"
                :label="tableColumns['time_period'].name"
                align="center"
                min-width="300"
            >
            </el-table-column>
            <el-table-column :label="LangUtil('平台信息')" min-width="180" align="center">
                <template slot-scope="{ row }">
                    <div>
                        <div v-if="row.plat_id === '合计' || row.plat_id === LangUtil('合计')">
                            {{ LangUtil("合计") }}
                        </div>
                        <div v-else>
                            <div align="left">
                                <p>{{ LangUtil("平台") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</p>
                                <p>{{ LangUtil("渠道") }}：{{ row.channel_id }}</p>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.new_register.name" align="center" prop="new_register">
            </el-table-column>
            <el-table-column :label="tableColumns.active_user.name" align="center" prop="active_user">
            </el-table-column>
            <el-table-column :label="tableColumns.recharge.name" align="center" prop="recharge">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.recharge"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.recharge_user.name"
                align="center"
                prop="recharge_user"
                min-width="100"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.new_user_recharge.name"
                align="center"
                prop="new_user_recharge"
                min-width="100"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.new_user_recharge"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.new_recharge_user.name"
                align="center"
                prop="new_recharge_user"
                min-width="100"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.old_user_recharge.name"
                align="center"
                prop="old_user_recharge"
                min-width="120"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.old_user_recharge"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.old_recharge_user.name"
                align="center"
                prop="old_recharge_user"
                min-width="120"
            >
            </el-table-column>
            <el-table-column :label="tableColumns.exchange.name" align="center" prop="exchange" min-width="100">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.exchange"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.nor_exchange.name" align="center" prop="nor_exchange" min-width="100">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.nor_exchange"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.blog_exchange.name"
                align="center"
                prop="blog_exchange"
                min-width="100"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.blog_exchange"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.exchange_user.name" align="center" prop="exchange_user">
            </el-table-column>
            <el-table-column :label="tableColumns.net_rech.name" align="center" prop="net_rech">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.net_rech" :isShowDollar="false" />
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.win_loss.name" align="center" prop="win_loss">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_loss" :isShowDollar="false" />
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.water.name" align="center" prop="water">
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
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDaysChannelCoreChannelProxy from "../../proxy/StatisticPlatDaysChannelCoreChannelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticPlatDaysChannelCoreChannelChannelBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDaysChannelCoreChannelProxy = this.getProxy(StatisticPlatDaysChannelCoreChannelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.channelList;
    pageInfo = this.myProxy.tableData.channePageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handleClick() {
        this.myProxy.onChangeTab();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
@for $i from 1 through 1 {
    ::v-deep .el-table__body .el-table__row:first-child {
        td:nth-child(#{$i}) {
            border-right: 0;
        }
        td:nth-child(2) {
            text-align: left;
        }
    }
}
</style>
