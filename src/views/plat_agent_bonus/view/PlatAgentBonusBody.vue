<template>
    <div>
        <div class="statistics">
            {{ $t("plat_users_bet.stastisticList") }}
            <span>{{ tableColumns.group_profit.name }}:{{ summary.group_profit }}</span>
            <span>{{ tableColumns.plat_cost.name }}:{{ summary.plat_cost }}</span>
            <span>{{ tableColumns.bonus_awaiting_num.name }}:{{ summary.bonus_awaiting_num }}</span>
            <span
                >{{ tableColumns.bonus_received_num.name }}:<a
                    :style="summary.bonus_received_num >= 0 ? 'color:green' : 'color:red'"
                    >{{ summary.bonus_received_num }}</a
                ></span
            >
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
                :label="tableColumns.plat_id.name"
                prop="plat_id"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.user_id.name"
                prop="user_id"
                min-width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.start_time.name"
                prop="start_time"
                min-width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.end_time.name"
                prop="end_time"
                min-width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.group_profit.name"
                prop="group_profit"
                min-width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.plat_cost.name"
                prop="plat_cost"
                min-width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.agent_bonus_rate.name"
                prop="agent_bonus_rate"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.bonus_awaiting_num.name"
                prop="bonus_awaiting_num"
                min-width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.bonus_received_num.name"
                prop="bonus_received_num"
                min-width="100px"
                align="center"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.bonus_received_num" />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.settlement_status.name"
                prop="settlement_status"
                min-width="100px"
                align="center"
            >
                <template slot-scope="{ row }"
                    >{{ tableColumns.settlement_status.options[row.settlement_status] }}
                </template></el-table-column
            >
            <el-table-column
                :label="tableColumns.receive_status.name"
                prop="receive_status"
                min-width="100px"
                align="center"
            >
                <template slot-scope="{ row }">{{ tableColumns.receive_status.options[row.receive_status] }} </template>
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
import PlatAgentBonusProxy from "../proxy/PlatAgentBonusProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class PlatAgentBonusBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentBonusProxy = this.getProxy(PlatAgentBonusProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;
    private summary = this.myProxy.tableData.summary;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
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
    }
}
</style>
