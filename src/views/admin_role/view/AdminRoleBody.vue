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
                :label="tableColumns['role_id'].name"
                prop="role_id"
                class-name="status-col"
                width="100px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['name'].name"
                prop="name"
                class-name="status-col"
                width="150px"
            ></el-table-column>
            <el-table-column :label="tableColumns['desc'].name" prop="desc"> </el-table-column>
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['status'].name" prop="status" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="180px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handlerPermission(row)"
                        v-if="checkUnique(unique.admin_role_setting_show)"
                        >{{ $t("common.setting") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_role_show)"
                        >{{ $t("common.update") }}</el-button
                    >
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
import AdminRoleProxy from "../proxy/AdminRoleProxy";
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
export default class AdminRoleBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: AdminRoleProxy = this.getProxy(AdminRoleProxy);
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

    private handlerPermission(data: any) {
        this.myProxy.showDialogSetting(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
