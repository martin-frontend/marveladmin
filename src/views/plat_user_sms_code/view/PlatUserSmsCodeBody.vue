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
            <el-table-column :label="tableColumns.id.name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.user_id.name" class-name="status-col" min-width="120px">
                <template slot-scope="{ row }">
                    <span
                        v-if="row.user_id.length > 4"
                        @click="showUserDetail(row.user_id)"
                        style="cursor: pointer; text-decoration: underline"
                        >{{ row.user_id }}</span
                    >
                    <span v-else style="cursor: pointer; text-decoration: underline">{{ row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.mobile.name" class-name="status-col" min-width="120px">
                <template slot-scope="{ row }">
                    {{ row.mobile }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.area_code.name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.area_code }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.code_type.name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.code_type.options[row.code_type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.plat_id.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.code.name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.code }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.type.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.status.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.created_at.name" class-name="status-col" min-width="145px">
                <template slot-scope="{ row }">
                    {{ row.created_at }}
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
import PlatUserSmsCodeProxy from "../proxy/PlatUserSmsCodeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                0: "danger",
                1: "success",
            };
            return statusMap[status];
        },
    },
})
export default class PlatUserSmsCodeBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUserSmsCodeProxy = this.getProxy(PlatUserSmsCodeProxy);
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

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
