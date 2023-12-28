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
                :label="tableColumns['admin_user_id'].name"
                prop="admin_user_id"
                class-name="status-col"
                width="100px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['admin_username'].name"
                prop="admin_username"
                class-name="status-col"
                width="150px"
            ></el-table-column>
            <el-table-column :label="tableColumns['cate'].name" prop="cate" class-name="status-col" width="100px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["cate"].options[row.cate] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['type'].name" prop="type" class-name="status-col" width="100px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["type"].options[row.type] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                class-name="status-col"
                width="150px"
            ></el-table-column>
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-tag
                        v-for="type in row.plat_ids"
                        :key="type"
                        type="primary"
                        effect="dark"
                        size="mini"
                        style="margin-right: 5px"
                    >
                        {{ tableColumns["plat_id"].options[type] }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['channel_id'].name" prop="channel_id" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.channel_id }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['role_id'].name" prop="role_id" class-name="status-col">
                <template slot-scope="{ row }">
                    <span v-if="row.role_ids && row.role_ids.length > 0">
                        <el-tag
                            v-for="type in row.role_ids"
                            :key="type"
                            type="primary"
                            effect="dark"
                            size="mini"
                            style="margin-right: 5px"
                        >
                            {{ tableColumns["role_id"].options[type] }}
                        </el-tag>
                    </span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['status'].name" prop="status" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        v-if="checkUnique(unique.admin_user_delete) && row.update_btn == 1"
                        >{{ LangUtil("删除") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_user_show) && row.update_btn == 1"
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
import AdminUserProxy from "../proxy/AdminUserProxy";
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
export default class AdminUserBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: AdminUserProxy = this.getProxy(AdminUserProxy);
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
        this.myProxy.channelListFilter();
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.admin_user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
