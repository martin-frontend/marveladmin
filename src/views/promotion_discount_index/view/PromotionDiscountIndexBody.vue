<template>
    <div>
        <div class="statistics">
            {{ LangUtil("当前统计列表") }}
            <span>{{ LangUtil("总投注金额") }}:{{ summary.bet_gold }}</span>
            <span>{{ LangUtil("有效投注金额") }}:{{ summary.valid_bet_gold }}</span>
            <span
                >{{ LangUtil("玩家输赢") }}:<a :style="summary.win_gold >= 0 ? 'color:green' : 'color:red'">{{
                    summary.win_gold >= 0 ? "+" + summary.win_gold : summary.win_gold
                }}</a></span
            >
            <span>{{ LangUtil("结算流水") }}:{{ summary.settlement_water }}</span>
            <span>{{ LangUtil("用户流水") }}:{{ summary.water }}</span>
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
                :label="tableColumns['vendor_id'].name"
                prop="vendor_id"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_id.options[row.vendor_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['user_id'].name"
                prop="user_id"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">{{
                        row.user_id
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['vendor_product_name'].name"
                prop="vendor_product_name"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['vendor_type'].name"
                prop="vendor_type"
                min-width="80px"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_type.options[row.vendor_type] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['order_no'].name"
                prop="order_no"
                min-width="80px"
                class-name="status-col"
            ></el-table-column>
            <el-table-column :label="tableColumns['win_gold'].name" prop="win_gold" class-name="status-col">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold" />
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('时间')" header-align="center" align="left" min-width="215px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["bet_at"].name }}：{{ row.bet_at }}</p>
                    <p>{{ tableColumns["settlement_at"].name }}：{{ row.settlement_at }}</p>
                    <p>{{ tableColumns["pull_at"].name }}：{{ row.pull_at }}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['bet_gold'].name"
                prop="bet_gold"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['valid_bet_gold'].name"
                prop="valid_bet_gold"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column :label="LangUtil('流水')" prop="water" class-name="status-col" min-width="170px">
                <template slot-scope="{ row }">
                    <div align="left">
                        <div>{{ LangUtil("结算流水") }}：{{ row.settlement_water }}</div>
                        <div>{{ LangUtil("结算方式") }}：{{ tableColumns["water_type"].options[row.water_type] }}</div>
                        <div>{{ LangUtil("结算比例") }}：{{ row.water_rate }}</div>
                        <div>{{ LangUtil("用户流水") }}：{{ row.water }}</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PromotionDiscountIndexProxy from "../proxy/PromotionDiscountIndexProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                // 1: "success",
                1: "danger",
                11: "info",
            };
            return statusMap[status];
        },
    },
})
export default class PromotionDiscountIndexBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PromotionDiscountIndexProxy = this.getProxy(PromotionDiscountIndexProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    summary = this.myProxy.tableData.summary;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.statistics {
    margin-top: 32px;
    margin-bottom: 16px;
    span {
        margin-left: 20px;
    }
}
</style>
