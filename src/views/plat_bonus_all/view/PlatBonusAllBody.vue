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
                :label="tableColumns['start_date'].name"
                prop="start_date"
                align="center"
                width="180"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['channel_id'].name"
                prop="channel_id"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['settlement_at'].name"
                prop="settlement_at"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['bonus_all_gold'].name"
                prop="bonus_all_gold"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['bonus_all_received_gold'].name"
                prop="bonus_all_received_gold"
                align="center"
            ></el-table-column>
            <el-table-column :label="tableColumns['stock_gold'].name" prop="stock_gold" align="center">
            </el-table-column>
            <el-table-column :label="tableColumns['type'].name" prop="type" align="center">
                <template slot-scope="{ row }">
                    <p>
                        {{ tableColumns.type.options[row.type] }}
                        <span v-if="row.type == 2"> ({{ (row.auto_rate * 100) >> 0 }}%) </span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['settlement_status'].name" prop="settlement_status" align="center">
                <template slot-scope="{ row }">
                    <p :class="row.settlement_status == 11 ? 'green' : 'red'">
                        {{ tableColumns.settlement_status.options[row.settlement_status] }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" align="center" width="200px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="row.settlement_status == 1"
                        type="primary"
                        @click="onDividendAmount(row)"
                        size="small"
                    >
                        {{ LangUtil("分红金额") }}
                    </el-button>
                    <el-button v-else type="primary" @click="onUserReceive(row)" size="small">
                        {{ LangUtil("玩家领取列表") }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBonusAllProxy from "../proxy/PlatBonusAllProxy";
import PlatBonusAllStockProxy from "../proxy/PlatBonusAllStockProxy";
import PlatAgentPromotionModelProxy from "../proxy/PlatAgentPromotionModelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatBonusAllBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatBonusAllProxy = this.getProxy(PlatBonusAllProxy);
    stockProxy: PlatBonusAllStockProxy = this.getProxy(PlatBonusAllStockProxy);
    agentPromotionModelProxy: PlatAgentPromotionModelProxy = this.getProxy(PlatAgentPromotionModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.admin_plat_bonus_all_stock_set_index();
    }

    onUserReceive(row: any) {
        this.agentPromotionModelProxy.setListQuery(row);
        this.agentPromotionModelProxy.admin_plat_bonus_all_stock_table_columns();
    }

    onDividendAmount(row: any) {
        this.myProxy.onShowDividendDialog(row);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.red {
    color: red;
}
.green {
    color: green;
}
</style>
