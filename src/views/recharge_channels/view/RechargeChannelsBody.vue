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
            <el-table-column :label="`${tableColumns.id.name}`" class-name="status-col" min-width="60px">
                <template slot-scope="{ row }"> {{ row.id }} </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" min-width="100">
                <template slot-scope="{ row }"> {{ tableColumns.plat_id.options[row.plat_id] }} </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.name.name}`" class-name="status-col" min-width="120">
                <template slot-scope="{ row }"> {{ row.name }} </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.vendor_id.name}`" class-name="status-col" min-width="100">
                <template slot-scope="{ row }"> {{ tableColumns.vendor_id.options[row.vendor_id] }} </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.account.name}`" class-name="status-col" min-width="100">
                <template slot-scope="{ row }"> {{ row.account }} </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.secret.name}`" class-name="status-col" min-width="100">
                <template slot-scope="{ row }"> {{ row.secret }} </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.status.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.recharge_channels_show)"
                        @click="handleEdit(row)"
                        class="item"
                        type="primary"
                        icon="el-icon-edit"
                        >{{ LangUtil("编辑") }}</el-button
                    >
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
import RechargeChannelsProxy from "../proxy/RechargeChannelsProxy";
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
            };
            return statusMap[status];
        },
    },
})
export default class RechargeChannelsBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: RechargeChannelsProxy = this.getProxy(RechargeChannelsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
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
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
