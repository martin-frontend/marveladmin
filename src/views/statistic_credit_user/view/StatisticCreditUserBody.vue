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
            <el-table-column :label="tableColumns.plat_id.name" prop="plat_id" min-width="160px" align="center">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.user_id.name"
                prop="user_id"
                min-width="140px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.username.name"
                prop="username"
                min-width="140px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.invite_user_id.name"
                prop="invite_user_id"
                min-width="140px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.invite_username.name"
                prop="invite_username"
                min-width="140px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.coin_name_unique.name"
                prop="coin_name_unique"
                min-width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.record_count.name"
                prop="record_count"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.bet_gold_coin.name"
                prop="bet_gold_coin"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.win_gold_coin.name"
                prop="win_gold_coin"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.valid_bet_gold_coin.name"
                prop="valid_bet_gold_coin"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.backwater_coin.name"
                prop="backwater_coin"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.backwater_except_user_coin.name"
                prop="backwater_except_user_coin"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.credit_rate_self.name"
                prop="credit_rate_self"
                min-width="100px"
                align="center"
            >
                <template slot-scope="{ row }"> {{ row.credit_rate_self }}% </template></el-table-column
            >
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticCreditUserProxy from "../proxy/StatisticCreditUserProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class StatisticCreditUserBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticCreditUserProxy = this.getProxy(StatisticCreditUserProxy);
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

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
