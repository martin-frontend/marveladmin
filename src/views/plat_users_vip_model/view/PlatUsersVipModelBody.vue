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
                :label="tableColumns['vip_model_id'].name"
                class-name="status-col"
                prop="vip_model_id"
                width="100px"
            >
            </el-table-column>
            <el-table-column :label="tableColumns['name'].name" class-name="status-col" prop="name"> </el-table-column>
            <el-table-column
                :label="tableColumns['max_vip_level'].name"
                class-name="status-col"
                width="100px"
                prop="max_vip_level"
            >
            </el-table-column>
            <el-table-column :label="tableColumns['types'].name" class-name="status-col" prop="types">
                <template slot-scope="scope">
                    <span v-for="(item, index) in scope.row.types" :key="index">
                        <el-tag type="primary" effect="dark" style="margin-right: 5px" size="medium">{{
                            tableColumns.types.options[item]
                        }}</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.plat_users_vip_model_update)"
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ LangUtil("编辑") }}</el-button
                    >
                    <el-button
                        v-if="checkUnique(unique.plat_users_vip_model_delete)"
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        >{{ LangUtil("删除") }}</el-button
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
import PlatUsersVipModelProxy from "../proxy/PlatUsersVipModelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUsersVipModelBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersVipModelProxy = this.getProxy(PlatUsersVipModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.listQuery.page_count = 1;
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
        this.myProxy.onDelete(data.vip_model_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
