<template>
    <div>
        <div v-if="Object.keys(commission_info.commission_config).length == 0" style="color: #F56C6C">
            {{ LangUtil("功能未开启-请联系客服开启") }}
        </div>
        <div v-else>
            <div style="font-size: 18px; font-weight: bold;">
                <div style="margin-bottom: 8px">{{ LangUtil("模版名称") }}：{{ commission_info.desc }}</div>
                <div style="margin-bottom: 8px">{{ LangUtil("结算周期") }}：{{ commission_info.name }}</div>
            </div>
            <div>
                {{
                    LangUtil(
                        "结算时间说明：如果分红周期是1个自然月，分红发放时间为每月1日；如果分红周期选择的是半个自然月，分红发放时间为每月1日和16日；如果分红周期选择的是1周，分红发放时间为每周一。"
                    )
                }}
            </div>
            <el-table
                :data="tableData"
                border
                fit
                highlight-current-row
                style="width: 100%; margin-top: 16px;"
                size="mini"
                v-loading="net_status.loading"
            >
                <el-table-column
                    class-name="status-col"
                    :label="tableColumns.settlement_date_start.name"
                    prop="settlement_date_start"
                >
                </el-table-column>
                <el-table-column
                    class-name="status-col"
                    :label="tableColumns.settlement_date.name"
                    prop="settlement_date"
                >
                </el-table-column>
                <el-table-column
                    class-name="status-col"
                    :label="tableColumns.direct_total_win_loss.name"
                    prop="direct_total_win_loss"
                >
                    <template slot-scope="{ row }">
                        {{ row.direct_total_win_loss.coin_name_unique }}: {{ row.direct_total_win_loss.value }}
                    </template>
                </el-table-column>
                <el-table-column
                    class-name="status-col"
                    :label="tableColumns.direct_commission.name"
                    prop="direct_commission"
                >
                    <template slot-scope="{ row }">
                        {{ row.direct_commission.coin_name_unique }}: {{ row.direct_commission.value }}
                    </template>
                </el-table-column>
                <el-table-column
                    class-name="status-col"
                    :label="tableColumns.already_direct_commission.name"
                    prop="already_direct_commission"
                >
                    <template slot-scope="{ row }">
                        {{ row.already_direct_commission.coin_name_unique }}: {{ row.already_direct_commission.value }}
                    </template>
                </el-table-column>
                <el-table-column
                    class-name="status-col"
                    :label="tableColumns.settlement_type.name"
                    prop="settlement_type"
                >
                    <template slot-scope="{ row }">
                        {{ tableColumns.settlement_type.options[row.settlement_type] }}
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                    <el-button size="mini" type="primary" @click="handleDetail()">
                        {{ LangUtil("代理分红明细") }}
                    </el-button>
                </el-table-column>
            </el-table>
            <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
        </div>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDirectlyCommissionProxy from "../proxy/StatisticPlatDirectlyCommissionProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class StatisticPlatDirectlyCommissionBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDirectlyCommissionProxy = this.getProxy(StatisticPlatDirectlyCommissionProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    commission_info = this.myProxy.tableData.commission_info;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handleDetail() {
        this.myProxy.showDetailDialog();
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
