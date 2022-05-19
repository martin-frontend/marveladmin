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
            <el-table-column :label="tableColumns.email_vendor_id.name" class-name="status-col" width="150px">
                <template slot-scope="scope">
                    {{ scope.row.email_vendor_id }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.email_vendor_name.name" class-name="status-col" width="150px">
                <template slot-scope="scope">
                    {{ scope.row.email_vendor_name }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.email_vendor_name_unique.name" class-name="status-col" width="150px">
                <template slot-scope="{ row }">
                    {{ row.email_vendor_name_unique }}
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
            <!-- <el-table-column :label="$t('common.operating')" class-name="status-col" width="210px">
                <template slot-scope="{ row }">
                    <el-button v-if="checkUnique(unique.sms_update)" class="item" type="primary" icon="el-icon-edit" @click="handleEdit(row)">{{
                        $t("common.update")
                    }}</el-button>
                    <el-button v-if="checkUnique(unique.sms_delete)" class="item" type="danger" icon="" @click="handlerDelete(row)">{{
                        $t("common.delete")
                    }}</el-button>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" class-name="status-col" width="200px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ $t("common.update") }}</el-button
                    >
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
import SystemEmailProxy from "../proxy/SystemEmailProxy";

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
export default class SystemEmailBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: SystemEmailProxy = this.getProxy(SystemEmailProxy);
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
        console.log("data=====",data);
        console.log("status.options====",this.myProxy.tableData.columns.status.options);
        
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.sms_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
