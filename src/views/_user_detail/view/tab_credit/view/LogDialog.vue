<template>
    <el-dialog :title="LangUtil('日志')" :visible.sync="dialogData.bShow" width="700px" :append-to-body="true">
        <div v-loading="net_status.loading">
            <div>
                <span style="margin: 0 5px">
                    {{ myProxy.tableColumns.user_id.name }} {{ dialogData.form.user_id }}
                </span>
                <span style="margin: 0 5px">
                    {{ myProxy.tableColumns.username.name }} {{ dialogData.form.username }}
                </span>
                <span style="margin: 0 5px">
                    {{ myProxy.tableColumns.nick_name.name }} {{ dialogData.form.nick_name }}
                </span>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%; margin-top: 10px"
                border
                size="mini"
                :header-cell-style="{
                    'text-align': 'center',
                }"
                :cell-style="{
                    'text-align': 'center',
                }"
                v-loading="net_status.loading"
            >
                <el-table-column :label="tableColumns['updated_at'].name" prop="updated_at"> </el-table-column>
                <el-table-column
                    :label="tableColumns['credit_rate_invited'].name"
                    prop="credit_rate_invited"
                    min-width="100px"
                >
                    <template slot-scope="{ row }">
                        <span>{{ row.credit_rate_invited }}%</span>
                    </template>
                </el-table-column>
                <el-table-column :label="tableColumns['credit_rate'].name" prop="credit_rate" min-width="100px">
                    <template slot-scope="{ row }">
                        <span>{{ row.credit_rate }}%</span>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></Pagination>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";
import TabCreditProxy from "../proxy/TabCreditProxy";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class LogDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabCreditProxy = getProxy(TabCreditProxy);
    tableColumns: any = this.myProxy.logDialogData.columns;
    dialogData = this.myProxy.logDialogData;
    tableData = this.myProxy.logDialogData.list;
    pageInfo = this.myProxy.logDialogData.pageInfo;
    listQuery = this.myProxy.logDialogData.query;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
.input_title {
    margin-bottom: 20px;
    margin-left: 25px;
}
.dialog_input {
    width: 400px;
    margin-bottom: 10px;
    margin-left: 25px;
}
.confirm {
    text-align: center;
    margin-top: 50px;
}
.ps {
    color: red;
}
</style>
