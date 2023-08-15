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
            <el-table-column prop="name" :label="tableColumns.name.name" class-name="status-col" min-width="90px">
            </el-table-column>
            <el-table-column
                prop="tag_users_num"
                :label="tableColumns.tag_users_num.name"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="created_at"
                :label="tableColumns.created_at.name"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="created_by"
                :label="tableColumns.created_by.name"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column :label="LangUtil('平台信息')" min-width="150px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ LangUtil("平台") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                    <!-- <div>{{ LangUtil("渠道") }}：{{ row.channel_id }}</div> -->
                </template>
            </el-table-column>
            <el-table-column prop="remark" :label="tableColumns.remark.name" class-name="status-col" min-width="90px">
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="180px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("详情") }}</el-button>
                    <el-button size="mini" type="danger" @click="handlerDelete(row)">{{ LangUtil("删除") }}</el-button>
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
import UserTagProxy from "../proxy/UserTagProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class UserTagBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: UserTagProxy = this.getProxy(UserTagProxy);
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
