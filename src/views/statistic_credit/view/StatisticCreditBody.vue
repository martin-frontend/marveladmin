<template>
    <div>
        <el-table :data="tableData" border fit highlight-current-row style="width: 100%" size="mini"
            v-loading="net_status.loading">
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" class-name="status-col" width="100px">
            </el-table-column>
            <el-table-column :label="tableColumns['user_id'].name" prop="user_id" class-name="status-col" >
            </el-table-column>

            <el-table-column :label="tableColumns['username'].name" prop="username" class-name="status-col"
                ></el-table-column>

            <el-table-column :label="tableColumns['record_count'].name" prop="record_count" class-name="status-col"
                ></el-table-column>

            <el-table-column :label="tableColumns['bet_gold'].name" prop="bet_gold" class-name="status-col"
                ></el-table-column>

            <el-table-column :label="tableColumns['win_gold'].name" prop="win_gold" class-name="status-col"
                ></el-table-column>

            <el-table-column :label="tableColumns['water'].name" prop="water" class-name="status-col" >
            </el-table-column>

            <el-table-column :label="tableColumns['back_water'].name" prop="back_water" class-name="status-col"
                ></el-table-column>

            <el-table-column :label="tableColumns['agent_amount'].name" prop="agent_amount" class-name="status-col"
                ></el-table-column>

            <el-table-column :label="tableColumns['plat_amount'].name" prop="plat_amount" class-name="status-col"
                ></el-table-column>

            <el-table-column :label="tableColumns['credit_rate'].name" prop="credit_rate" class-name="status-col"
                >
                <template slot-scope="{ row }">
                    <div>{{row.credit_rate }}%</div>
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
import StatisticCreditProxy from "../proxy/StatisticCreditProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
                99: "info",
            };
            return statusMap[status];
        },
    },
})
export default class StatisticCreditBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticCreditProxy = this.getProxy(StatisticCreditProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    private handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        //this.myProxy.onDelete(data.admin_user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
