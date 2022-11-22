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
                class-name="status-col"
                :label="tableColumns.backwater_model_id.name"
                prop="backwater_model_id"
                width="80px"
                class=""
            >
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.name.name" prop="name"> </el-table-column>
            <el-table-column class-name="status-col" :label="LangUtil('操作')" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.plat_users_backwater_model_delete)"
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        >{{ LangUtil("删除") }}</el-button
                    >
                    <el-button
                        v-if="checkUnique(unique.plat_users_backwater_model_update)"
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
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
import PlatUsersBackwaterModelProxy from "../proxy/PlatUsersBackwaterModelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUsersBackwaterModelBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersBackwaterModelProxy = this.getProxy(PlatUsersBackwaterModelProxy);
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
        this.myProxy.onDelete(data.backwater_model_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
