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
            <el-table-column :label="tableColumns.id.name" class-name="status-col" width="100px">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.plat_id.name" class-name="status-col" width="200px">
                <template slot-scope="scope">
                    {{ tableColumns.plat_id.options[scope.row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.email_vendor_id.name" class-name="status-col" width="200px">
                <template slot-scope="scope">
                    {{ tableColumns.email_vendor_id.options[scope.row.email_vendor_id] }}
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.status.name" class-name="status-col" width="150px">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">
                        {{ tableColumns.status.options[scope.row.status] }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.updated_at.name" class-name="status-col">
                <template slot-scope="scope">
                    {{ scope.row.updated_at }}
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.updated_by.name" class-name="status-col" width="200px">
                <template slot-scope="scope">
                    {{ scope.row.updated_by }}
                </template>
            </el-table-column>

            <el-table-column :label="$t('common.operating')" class-name="status-col" width="200px">
                <template slot-scope="{ row }">
                    <el-button class="item" size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(row)">{{
                        $t("common.update")
                    }}</el-button>
                    <el-button class="item" size="mini" type="danger" icon="" @click="handlerDelete(row)">{{
                        $t("common.delete")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" v-show="tableData.length > 0"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import PlatEmailVendorProxy from "../proxy/PlatEmailVendorProxy";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: number) {
            const statusMap: { [key: number]: string } = {
                1: "success",
                98: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class PlatEmailVendorBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatEmailVendorProxy = this.getProxy(PlatEmailVendorProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.myProxy.listQuery.page_count = 1;
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
