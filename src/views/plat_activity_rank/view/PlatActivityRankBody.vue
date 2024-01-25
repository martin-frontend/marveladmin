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
            <el-table-column :label="tableColumns.plat_id.name" prop="plat_id" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.activity_name.name" prop="activity_name" align="center">
            </el-table-column>
            <el-table-column :label="tableColumns.id.name" prop="id" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.process_status.name" prop="process_status" align="center">
                <template slot-scope="{ row }">
                    <div :class="row.process_status | statusFilter">
                        {{ tableColumns.process_status.options[row.process_status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.start_time.name" prop="start_time" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.end_time.name" prop="end_time" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.extend_status.name" prop="extend_status" align="center">
                <template slot-scope="{ row }">
                    <el-switch
                        @change="handleToggle(row.id, row.extend_status)"
                        v-model="row.extend_status"
                        :active-value="1"
                        :inactive-value="2"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.num.name" prop="num" align="center"> </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handlerDetail(row)">
                        {{ LangUtil("详情") }}
                    </el-button>
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
import PlatActivityRankProxy from "../proxy/PlatActivityRankProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "prepare",
                11: "proceed",
                21: "close",
                91: "end",
            };
            return statusMap[status];
        },
    },
})
export default class PlatActivityRankBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityRankProxy = this.getProxy(PlatActivityRankProxy);
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

    handlerDetail(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    handleToggle(id: number, status: number) {
        this.myProxy.onUpdateStatus(id, status);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.prepare {
    color: #ff4949;
}
.proceed {
    color: #13ce66;
}
.close {
    color: #c9c92e;
}
.end {
    color: #c9c9c9;
}
</style>
