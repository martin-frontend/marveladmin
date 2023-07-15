<template>
    <div>
        <div v-if="!myProxy.tableData.isNeedId">
            <el-radio-group v-model="listQuery.agent_type" style="margin-bottom: 8px" @input="handlerSearch">
                <el-radio label="1">{{ tableColumns["agent_type"].options[1] }}</el-radio>
                <el-radio label="2">{{ tableColumns["agent_type"].options[2] }}</el-radio>
            </el-radio-group>
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
                        prop="created_date"
                        :label="tableColumns['created_date'].name"
                        align="center"
                        width="160px"
                    >
                    </el-table-column>
                    <el-table-column :label="tableColumns['plat_id'].name" align="center" min-width="130px">
                        <template slot-scope="{ row }">
                            <div>
                                {{ tableColumns["plat_id"].options[row.plat_id] }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="tableColumns['user_id'].name" align="center" min-width="130px">
                        <template slot-scope="{ row }">
                            <span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        :label="tableColumns['username'].name"
                        align="center"
                        width="100px"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="user_count"
                        :label="tableColumns['user_count'].name"
                        align="center"
                        width="100px"
                    >
                    </el-table-column>
                    <el-table-column prop="day_1" :label="tableColumns['day_1'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_1" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_1, row.user_count) }})</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="day_2" :label="tableColumns['day_2'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_2" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_2, row.user_count) }})</div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="day_3" :label="tableColumns['day_3'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_3" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_3, row.user_count) }})</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="day_4" :label="tableColumns['day_4'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_4" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_4, row.user_count) }})</div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="day_5" :label="tableColumns['day_5'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_5" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_5, row.user_count) }})</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="day_6" :label="tableColumns['day_6'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_6" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_6, row.user_count) }})</div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="day_7" :label="tableColumns['day_7'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_7" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_7, row.user_count) }})</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="day_14" :label="tableColumns['day_14'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_14" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_14, row.user_count) }})</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="day_30" :label="tableColumns['day_30'].name" align="center" width="100px">
                        <template slot-scope="{ row }">
                            <WinLossDisplay :amount="row.day_30" :isShowColor="false" :isShowPlus="false" />
                            <div>({{ toPercent(row.day_30, row.user_count) }})</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
        </div>
        <p v-else class="note">{{ LangUtil("输入代理ID可查询用户代理留存统计") }}</p>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticAgentKeepDaysProxy from "../proxy/StatisticAgentKeepDaysProxy";
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
export default class StatisticAgentKeepDaysBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticAgentKeepDaysProxy = this.getProxy(StatisticAgentKeepDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    toPercent(curAmount: string, total: string) {
        if (total == "0" || curAmount == "0") {
            return "0";
        }
        return Number((Number(curAmount) / Number(total)).toString().match(/^\d+(?:\.\d{0,2})?/));
        //return ((Number(curAmount) / Number(total)) ).toFixed(3) ;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.note {
    color: rgb(180, 3, 3);
}
</style>
