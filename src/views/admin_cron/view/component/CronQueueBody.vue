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
            <el-table-column prop="worker_id" :label="tableColumns.worker_id.name" align="center"></el-table-column>
            <el-table-column prop="cron_id" :label="tableColumns.cron_id.name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["cron_id"].options[row.cron_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="unique" :label="tableColumns.unique.name" align="center"> </el-table-column>
            <el-table-column prop="unique_log_id" :label="tableColumns.unique_log_id.name" align="center">
            </el-table-column>
            <el-table-column prop="runtime" :label="tableColumns.runtime.name" align="center"> </el-table-column>
            <el-table-column prop="timeout" :label="tableColumns.timeout.name" align="center"> </el-table-column>
            <el-table-column prop="run_times" :label="tableColumns.run_times.name" align="center"> </el-table-column>
            <el-table-column prop="is_ordered_exec" :label="tableColumns.is_ordered_exec.name" align="center">
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.is_ordered_exec"
                        :active-value="1"
                        :inactive-value="0"
                        @change="onSwitch(row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="status" :label="tableColumns.status.name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["status"].options[row.status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="next_run_date" :label="tableColumns.next_run_date.name" align="center">
            </el-table-column>
            <el-table-column prop="created_at" :label="tableColumns.created_at.name" align="center"> </el-table-column>
            <el-table-column prop="updated_at" :label="tableColumns.updated_at.name" align="center"> </el-table-column>
            <el-table-column prop="result" :label="tableColumns.result.name" align="center"> </el-table-column>
            <el-table-column :label="LangUtil('操作')" align="center" width="200px">
                <template slot-scope="{ row }">
                    <el-button type="primary" @click="handlerPreview(row)" size="small">{{
                        LangUtil("查看")
                    }}</el-button>
                    <el-button type="danger" @click="handlerAgain(row)" size="small">{{
                        LangUtil("重新执行")
                    }}</el-button>
                </template>
            </el-table-column>
            <!--  -->
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminCronProxy from "../../proxy/AdminCronProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { MessageBox } from "element-ui";

@Component({
    components: {
        Pagination,
    },
})
export default class AdminCronBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: AdminCronProxy = this.getProxy(AdminCronProxy);
    // proxy property
    tableColumns = this.myProxy.cronQueueTableData.columns;
    tableData = this.myProxy.cronQueueTableData.list;
    pageInfo = this.myProxy.cronQueueTableData.pageInfo;
    listQuery = this.myProxy.cronQueueListQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQueryCronQueue();
    }

    onSwitch(row: any, el: any) {
        this.myProxy.cronTableSwitch.is_ordered_exec = row.is_ordered_exec;
        this.myProxy.cronTableSwitch.id = row.id;
        this.myProxy.onCronQueueUpdate(true);
    }

    handlerPreview(row: any) {
        this.myProxy.showDialogCronQueuePreview(row);
    }

    handlerAgain(row: any) {
        let confirmText1: any = this.LangUtil("您是否要重新执行该内容");
        let prompt: any = this.LangUtil("提示");
        let determine: any = this.LangUtil("确定");
        let cancel: any = this.LangUtil("取消");
        MessageBox.confirm(confirmText1, prompt, {
            confirmButtonText: determine,
            cancelButtonText: cancel,
            type: "warning",
        })
            .then(() => {
                const data: any = {
                    id: row.id,
                    status: "0",
                };
                this.myProxy.onHandlerAgain(data);
            })
            .catch(() => {});
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
