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
            <!-- <el-table-column :label="tableColumns['bet_id'].name" prop="bet_id" min-width="60px"></el-table-column> -->
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns["plat_id"].options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['channel_id'].name"
                prop="channel_id"
                min-width="100px"
            ></el-table-column>
            <el-table-column :label="tableColumns['user_id'].name" prop="user_id" min-width="100px"></el-table-column>
            <el-table-column :label="tableColumns['username'].name" prop="username" min-width="100px"></el-table-column>
            <el-table-column :label="tableColumns['event_type'].name" prop="event_type" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns["event_type"].options[row.event_type] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['event_time'].name"
                prop="event_time"
                min-width="100px"
            ></el-table-column>
            <el-table-column :label="tableColumns['event_status'].name" prop="event_status" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns["event_status"].options[row.event_status] }}
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
import PlatUsersEventRecordProxy from "../proxy/PlatUsersEventRecordProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUsersEventRecordBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersEventRecordProxy = this.getProxy(PlatUsersEventRecordProxy);
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

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
