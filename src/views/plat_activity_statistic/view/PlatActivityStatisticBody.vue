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
            :header-cell-style="{
                'text-align': 'center',
            }"
        >
            <el-table-column
                :label="tableColumns.created_date.name"
                min-width="120px"
                prop="created_date"
                align="center"
            >
            </el-table-column>
            <el-table-column :label="LangUtil('平台信息')" min-width="180px" align="center">
                <template slot-scope="{ row }">
                    <div>{{ LangUtil("平台") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                    <div>{{ LangUtil("渠道") }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.activity_id.name" min-width="130px" prop="activity_id" align="center">
            </el-table-column>
            <el-table-column :label="tableColumns.join_num.name" min-width="130px" prop="join_num" align="center">
            </el-table-column>
            <el-table-column
                :label="tableColumns.award_amount.name"
                min-width="130px"
                prop="award_amount"
                align="center"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.award_amount" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.receive_award_amount.name"
                min-width="130px"
                prop="receive_award_amount"
                align="center"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.receive_award_amount" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.receive_award_num.name"
                min-width="130px"
                prop="receive_award_num"
                align="center"
            >
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="240px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handlerDetail()">{{
                        LangUtil("派奖详情")
                    }}</el-button>
                    <el-button size="mini" type="primary" @click="handlerPlayers(row)">{{
                        LangUtil("参与玩家")
                    }}</el-button>
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
import PlatActivityStatisticProxy from "../proxy/PlatActivityStatisticProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import { objectRemoveNull } from "@/core/global/Functions";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class PlatActivityStatisticBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityStatisticProxy = this.getProxy(PlatActivityStatisticProxy);
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

    // handleEdit(data: any) {
    //     this.myProxy.showDialog(DialogStatus.update, data);
    // }

    handlerDetail() {
        const newQuery: any = { ...objectRemoveNull(this.listQuery) };
        delete newQuery.page_count;
        delete newQuery.page_size;
        delete newQuery.channel_id;

        //@ts-ignore
        this.$router.push({ path: "/layout/plat_activity_award", query: { ...newQuery } });
    }

    handlerPlayers(data: any) {
        this.myProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
