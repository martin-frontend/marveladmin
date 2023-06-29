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
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" width="200px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.register_ip.name}`" class-name="status-col" prop="register_ip" />
            <el-table-column
                :label="`${tableColumns.register_ip_count.name}`"
                class-name="status-col"
                prop="register_ip_count"
            />
            <el-table-column
                :label="`${tableColumns.register_ip_locked_count.name}`"
                class-name="status-col"
                prop="register_ip_locked_count"
            />
            <el-table-column :label="`${tableColumns.created_at.name}`" class-name="status-col" prop="created_at" />
            <el-table-column :label="`${tableColumns.status.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ tableColumns.status.options[row.status] }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.remark.name}`" class-name="status-col" prop="remark" />

            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_user_show)"
                        >{{ LangUtil("编辑") }}</el-button
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
import PlatRegisterSameIpLogProxy from "../proxy/PlatRegisterSameIpLogProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatRegisterSameIpLogBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatRegisterSameIpLogProxy = this.getProxy(PlatRegisterSameIpLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
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
