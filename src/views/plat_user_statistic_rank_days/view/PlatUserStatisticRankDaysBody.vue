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
            @sort-change="tableSortChange"
        >
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" prop="plat_id">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.user_id.name}`" class-name="status-col" prop="user_id">
                <template slot-scope="{ row }">
                    <div>
                        <span
                            v-if="row.is_real == 1"
                            @click="showUserDetail(row.user_id)"
                            style="cursor: pointer; text-decoration: underline"
                            >{{ row.user_id }}</span
                        >
                        <span v-else>
                            {{ row.user_id }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.username.name}`" class-name="status-col" prop="username">
            </el-table-column>
            <el-table-column :label="`${tableColumns.channel_id.name}`" class-name="status-col" prop="channel_id">
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.coin_name_unique.name}`"
                class-name="status-col"
                prop="coin_name_unique"
            />
            <!-- 总充值 -->
            <el-table-column
                :label="`${tableColumns.total_recharge.name}`"
                class-name="status-col"
                prop="total_recharge"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.total_recharge"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <!-- 总兑换 -->
            <el-table-column
                :label="`${tableColumns.total_exchange.name}`"
                class-name="status-col"
                prop="total_exchange"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.total_exchange"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <!-- 总流水 -->
            <el-table-column
                v-if="listQuery.vendor_type == ''"
                :label="`${tableColumns.total_water.name}`"
                sortable="custom"
                class-name="status-col"
                prop="total_water"
                key="0"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.total_water"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <!-- 总输赢 -->
            <el-table-column
                v-if="listQuery.vendor_type == ''"
                sortable="custom"
                :label="`${tableColumns.total_win.name}`"
                class-name="status-col"
                prop="total_win"
                key="1"
            >
                <template slot-scope="{ row }">
                    <div>
                        <WinLossDisplay :amount="row.total_win" :isShowDollar="false" />
                    </div>
                </template>
            </el-table-column>
            <!-- 总投注 -->
            <el-table-column
                v-if="listQuery.vendor_type == ''"
                sortable="custom"
                :label="`${tableColumns.total_bet.name}`"
                class-name="status-col"
                prop="total_bet"
                key="2"
            >
                <template slot-scope="{ row }">
                    <div>
                        <WinLossDisplay
                            :amount="row.total_bet"
                            :isShowDollar="false"
                            :isShowColor="false"
                            :isShowPlus="false"
                        />
                    </div>
                </template>
            </el-table-column>
            <!-- 总投注数量 -->
            <el-table-column
                v-if="listQuery.vendor_type == ''"
                sortable="custom"
                :label="`${tableColumns.total_bet_count.name}`"
                class-name="status-col"
                prop="total_bet_count"
                key="3"
            >
                <template slot-scope="{ row }">
                    <div>
                        {{ row.total_bet_count }}
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column
                v-if="listQuery.vendor_type != ''"
                sortable="custom"
                :label="`${tableColumns[`backwater_${listQuery.vendor_type}`].name}`"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    {{ row[`backwater_${listQuery.vendor_type}`] }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="listQuery.vendor_type != ''"
                sortable="custom"
                :label="`${tableColumns[`bet_${listQuery.vendor_type}`].name}`"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    {{ row[`bet_${listQuery.vendor_type}`] }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="listQuery.vendor_type != ''"
                sortable="custom"
                :label="`${tableColumns[`valid_bet_${listQuery.vendor_type}`].name}`"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    {{ row[`valid_bet_${listQuery.vendor_type}`] }}
                </template>
            </el-table-column> -->
            <el-table-column
                v-if="listQuery.vendor_type != ''"
                sortable="custom"
                :label="`${tableColumns[`water_${listQuery.vendor_type}`].name}`"
                class-name="status-col"
                key="4"
            >
                <template slot-scope="{ row }">
                    {{ row[`water_${listQuery.vendor_type}`] }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="listQuery.vendor_type != ''"
                sortable="custom"
                :label="`${tableColumns[`win_gold_${listQuery.vendor_type}`].name}`"
                class-name="status-col"
                key="5"
            >
                <template slot-scope="{ row }">
                    {{ row[`win_gold_${listQuery.vendor_type}`] }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="listQuery.vendor_type != ''"
                sortable="custom"
                :label="`${tableColumns[`bet_${listQuery.vendor_type}`].name}`"
                class-name="status-col"
                key="6"
            >
                <template slot-scope="{ row }">
                    {{ row[`bet_${listQuery.vendor_type}`] }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="listQuery.vendor_type != ''"
                sortable="custom"
                :label="`${tableColumns[`bet_${listQuery.vendor_type}_count`].name}`"
                class-name="status-col"
                key="7"
            >
                <template slot-scope="{ row }">
                    {{ row[`bet_${listQuery.vendor_type}_count`] }}
                </template>
            </el-table-column>
            <!-- <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button v-if="!row.is_real" size="mini" type="primary" @click="handleEdit(row)">{{
                        LangUtil("编辑")
                    }}</el-button>
                </template>
            </el-table-column> -->
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
import PlatUserStatisticRankDaysProxy from "../proxy/PlatUserStatisticRankDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class PlatUserStatisticRankDaysBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUserStatisticRankDaysProxy = this.getProxy(PlatUserStatisticRankDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowUserDetail(user_id);
    }

    // 排序
    tableSortChange(column: any) {
        let order_by = {};
        if (column.order === "descending") {
            order_by = {
                [column.prop]: "DESC",
            };
        } else {
            order_by = {
                [column.prop]: "ASC",
            };
        }
        this.listQuery.page_count = 1;
        this.listQuery.order_by = JSON.stringify(order_by);
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
