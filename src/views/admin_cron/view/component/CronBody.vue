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
            <el-table-column prop="id" :label="tableColumns.id.name" align="center"> </el-table-column>
            <el-table-column prop="name" :label="tableColumns.name.name" align="center"> </el-table-column>
            <el-table-column prop="frequency" :label="tableColumns.frequency.name" align="center"> </el-table-column>
            <el-table-column prop="content" :label="tableColumns.content.name" align="center"> </el-table-column>
            <el-table-column prop="timeout" :label="tableColumns.timeout.name" align="center"> </el-table-column>
            <el-table-column prop="next_run_date" :label="tableColumns.next_run_date.name" align="center" width="110px">
            </el-table-column>
            <el-table-column prop="desc" :label="tableColumns.desc.name" align="center"> </el-table-column>
            <el-table-column
                prop="is_ordered_exec"
                :label="tableColumns.is_ordered_exec.name"
                align="center"
                width="110px"
            >
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.is_ordered_exec"
                        :active-value="1"
                        :inactive-value="0"
                        @change="onSwitch(row, 'is_ordered_exec')"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="status" :label="tableColumns.status.name" align="center">
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.status"
                        :active-value="1"
                        :inactive-value="0"
                        @change="onSwitch(row, 'status')"
                    ></el-switch>
                </template>
            </el-table-column>
            <!--  -->
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ $t("common.update") }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminCronProxy from "../../proxy/AdminCronProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class AdminCronBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: AdminCronProxy = this.getProxy(AdminCronProxy);
    // proxy property
    private tableColumns = this.myProxy.cronTableData.columns;
    private tableData = this.myProxy.cronTableData.list;
    private pageInfo = this.myProxy.cronTableData.pageInfo;
    private listQuery = this.myProxy.cronListQuery;

    private handlerQuery() {
        this.myProxy.onQueryCron();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQueryCron();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialogCron(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    private onSwitch(row: any, el: any) {
        this.myProxy.cronTableSwitch[el] = row[el];
        this.myProxy.cronTableSwitch.id = row.id;
        this.myProxy.onCronUpdate(true);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
