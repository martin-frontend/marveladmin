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
                :label="tableColumns['created_date'].name"
                prop="created_date"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['plat_id'].name"
                prop="plat_id"
                class-name="status-col"
                min-width="110px"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['coin_a'].name"
                prop="coin_a"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['coin_a_amount'].name"
                prop="coin_a_amount"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['coin_b'].name"
                prop="coin_b"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['coin_b_amount'].name"
                prop="coin_b_amount"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['swap_coin'].name"
                prop="swap_coin"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['system_swap_coin_fee'].name"
                prop="system_swap_coin_fee"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['user_swap_coin_fee'].name"
                prop="user_swap_coin_fee"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatSwapOrdersProxy from "../proxy/StatisticPlatSwapOrdersProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class StatisticPlatSwapOrdersBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticPlatSwapOrdersProxy = this.getProxy(StatisticPlatSwapOrdersProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
