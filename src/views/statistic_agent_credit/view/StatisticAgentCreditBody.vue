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
                        <div v-if="row.user_id === '合计' || row.user_id === $t('common.total')">
                            {{ row.user_id }}
                        </div>
                        <div
                            v-else
                            @click="showUserDetail(row.user_id)"
                            style="cursor: pointer; text-decoration: underline"
                        >
                            <div>{{ row.user_id }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['username'].name" prop="username" class-name="status-col">
            </el-table-column>

            <el-table-column :label="tableColumns['record_count'].name" prop="record_count" class-name="status-col">
            </el-table-column>

            <el-table-column :label="tableColumns['remark'].name" prop="remark" class-name="status-col">
            </el-table-column>

            <el-table-column :label="tableColumns['bet_gold'].name" prop="bet_gold" class-name="status-col">
            </el-table-column>

            <el-table-column prop="win_gold" :label="tableColumns['win_gold'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['backwater_game'].name" prop="backwater_game" class-name="status-col">
            </el-table-column>

            <el-table-column :label="tableColumns['back_water'].name" prop="back_water" class-name="status-col">
            </el-table-column>

            <el-table-column
                :label="tableColumns['back_water_except_user'].name"
                prop="back_water_except_user"
                class-name="status-col"
            >
            </el-table-column>

            <el-table-column prop="agent_amount" :label="tableColumns['agent_amount'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.agent_amount" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column prop="plat_amount" :label="tableColumns['plat_amount'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.plat_amount" :isShowDollar="false"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['credit_rate'].name" prop="credit_rate" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ row.credit_rate }}%</div>
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
import StatisticAgentCreditProxy from "../proxy/StatisticAgentCreditProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticAgentCreditBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticAgentCreditProxy = this.getProxy(StatisticAgentCreditProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
