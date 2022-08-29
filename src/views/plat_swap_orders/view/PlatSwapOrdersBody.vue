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
                :label="tableColumns['order_no'].name"
                prop="order_no"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['trade_time'].name"
                prop="trade_time"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['user_id'].name"
                prop="user_id"
                class-name="status-col"
                min-width="100px"
            >
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</div>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['coin_a'].name"
                prop="coin_a"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['coin_a_amount'].name"
                prop="coin_a_amount"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['coin_b'].name"
                prop="coin_b"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['coin_b_amount'].name"
                prop="coin_b_amount"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['swap_coin'].name"
                prop="swap_coin"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['swap_coin_fee'].name"
                prop="swap_coin_fee"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column :label="tableColumns.trade_status.name" class-name="status-col" width="90">
                <template slot-scope="{ row }">
                    <el-tag :type="row.trade_status | statusFilter">
                        {{ tableColumns.trade_status.options[row.trade_status] }}
                    </el-tag>
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
import PlatSwapOrdersProxy from "../proxy/PlatSwapOrdersProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import PlatUserProxy from "@/views/plat_user/proxy/PlatUserProxy";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class PlatSwapOrdersBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatSwapOrdersProxy = this.getProxy(PlatSwapOrdersProxy);
    private userProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
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
        this.userProxy.onShowDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
