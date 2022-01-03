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
            <el-table-column :label="tableColumns.id.name" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.name.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.name }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.type.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.currency_type.name" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    {{ row.currency_type }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.currency_scale.name" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    {{ row.currency_scale }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.support_paymethods.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    <el-tag v-for="type in row.support_paymethods" :key="type" type="primary" effect="dark" size="mini">
                        {{ tableColumns.support_paymethods.options[type] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.status.name" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="120px">
                <template slot-scope="{ row }">
                    <el-button v-if="checkUnique(unique.recharge_vendors_update)" class="item" type="primary" @click="handleEdit(row)">{{
                        $t("common.update")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" v-show="tableData.length > 0" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargeVendorsProxy from "../proxy/RechargeVendorsProxy";
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
export default class RechargeVendorsBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: RechargeVendorsProxy = this.getProxy(RechargeVendorsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerQuery() {
        this.myProxy.onQuery();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-tag {
    margin-right: 3px !important;
}
</style>
