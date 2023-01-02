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
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" min-width="110px">
                <template slot-scope="{ row }">
                    {{ getPlat_id(row.plat_id) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="admin_user_id"
                :label="`${tableColumns.admin_user_id.name}`"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="admin_username"
                :label="`${tableColumns.admin_username.name}`"
                class-name="status-col"
                min-width="100ox"
            >
            </el-table-column>
            <el-table-column :label="`${tableColumns.cate.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.cate.options[row.cate] }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.type.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="created_at"
                :label="`${tableColumns.created_at.name}`"
                class-name="status-col"
                min-width="120px"
            >
            </el-table-column>
            <el-table-column :label="`${tableColumns.permission_id.name}`" class-name="status-col" min-width="110px">
                <template slot-scope="{ row }">
                    {{ tableColumns.permission_id.options[row.permission_id] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="LangUtil('操作')"
                class-name="status-col"
                min-width="100px"
                v-if="checkUnique(unique.admin_admin_user_log_show)"
            >
                <template slot-scope="{ row }">
                    <el-button @click="handleEdit(row)" type="primary">{{ LangUtil("详情") }}</el-button>
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
import AdminUserLogUserProxy from "../proxy/AdminUserLogUserProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class AdminUserLogUserBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: AdminUserLogUserProxy = this.getProxy(AdminUserLogUserProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    getPlat_id(plat_id: string) {
        if (this.tableColumns.plat_id.options[plat_id]) {
            return this.tableColumns.plat_id.options[plat_id];
        }
        return plat_id;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
