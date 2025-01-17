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
            :cell-style="{
                'text-align': 'center',
            }"
        >
            <el-table-column :label="tableColumns['id'].name" prop="id" min-width="60px"></el-table-column>
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns["plat_id"].options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['user_id'].name" prop="user_id" min-width="110px">
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline"
                        >ID：{{ row.user_id }}</span
                    >
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                min-width="80px"
            ></el-table-column>
            <el-table-column :label="tableColumns['type'].name" prop="type" min-width="100px">
                <template slot-scope="{ row }">
                    <span>{{ tableColumns.type.options[row.type] }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['coin_name_unique'].name" prop="coin_name_unique" min-width="110px">
                <template slot-scope="{ row }">
                    <span>{{ converCoinName(row.coin_name_unique) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['gold_before'].name" prop="gold_before" min-width="110px">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.gold_before"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['gold'].name" prop="gold" min-width="100px">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.gold" :isShowColor="false" :isShowPlus="false" :isShowDollar="false" />
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['balance'].name" prop="balance" min-width="90px">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.balance"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['remark'].name" prop="remark" min-width="80px"></el-table-column>

            <el-table-column :label="LangUtil('订单')" width="300px" align="left">
                <template slot-scope="{ row }">
                    <div style="text-align: start;">{{ tableColumns["order_no"].name }}:{{ row.order_no }}</div>
                    <div style="text-align: start;">
                        {{ tableColumns["vendor_order_no"].name }}:{{ row.vendor_order_no }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['created_at'].name"
                min-width="155px"
                prop="created_at"
            ></el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersGoldLogProxy from "../proxy/PlatUsersGoldLogProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class PlatUsersGoldLogBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    LangUtil = LangUtil;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUsersGoldLogProxy = this.getProxy(PlatUsersGoldLogProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }

    converCoinName(coinKey: any) {
        return this.tableColumns.coin_name_unique.options[this.listQuery.plat_id][coinKey];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
