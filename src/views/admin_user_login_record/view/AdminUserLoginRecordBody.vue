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
            <el-table-column prop="admin_user_id" :label="`${tableColumns.admin_user_id.name}`" class-name="status-col">
            </el-table-column>

            <el-table-column
                prop="admin_username"
                :label="`${tableColumns.admin_username.name}`"
                class-name="status-col"
            >
            </el-table-column>

            <el-table-column prop="created_at" :label="`${tableColumns.created_at.name}`" class-name="status-col">
            </el-table-column>

            <el-table-column prop="login_ip" :label="`${tableColumns.login_ip.name}`" class-name="status-col">
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
import AdminUserLoginRecordProxy from "../proxy/AdminUserLoginRecordProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class AdminUserLoginRecordBody extends AbstractView {
    LangUtil = LangUtil;

    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: AdminUserLoginRecordProxy = this.getProxy(AdminUserLoginRecordProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
