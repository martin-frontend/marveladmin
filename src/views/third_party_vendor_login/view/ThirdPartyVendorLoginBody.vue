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
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
        >
            <el-table-column
                :label="tableColumns['vendor_name'].name"
                prop="vendor_name"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['unique_name'].name"
                prop="unique_name"
                min-width="150px"
            ></el-table-column>
            <el-table-column :label="tableColumns['api_url'].name" prop="api_url" min-width="150px"></el-table-column>
            <el-table-column
                :label="tableColumns['redirect_url'].name"
                prop="redirect_url"
                min-width="150px"
            ></el-table-column>
            <el-table-column :label="tableColumns['app_key'].name" prop="app_key" min-width="150px"></el-table-column>
            <el-table-column
                :label="tableColumns['app_secret'].name"
                prop="app_secret"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['data_belong'].name"
                prop="data_belong"
                min-width="150px"
            ></el-table-column>
            <!-- <el-table-column
                :label="tableColumns['extend_params'].name"
                prop="extend_params"
                min-width="150px"
            ></el-table-column> -->
            <el-table-column
                :label="tableColumns['created_by'].name"
                prop="created_by"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['created_at'].name"
                prop="created_at"
                min-width="180px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['updated_by'].name"
                prop="updated_by"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['updated_at'].name"
                prop="updated_at"
                min-width="180px"
            ></el-table-column>
            <el-table-column :label="tableColumns['status'].name" prop="status" min-width="150px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="danger" @click="handlerDelete(row)">{{ LangUtil("删除") }}</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
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
import ThirdPartyVendorLoginProxy from "../proxy/ThirdPartyVendorLoginProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

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
export default class ThirdPartyVendorLoginBody extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: ThirdPartyVendorLoginProxy = this.getProxy(ThirdPartyVendorLoginProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

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
</style>
