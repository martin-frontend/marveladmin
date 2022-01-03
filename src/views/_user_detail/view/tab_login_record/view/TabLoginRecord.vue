<template>
    <div>
        <div class="notice">
            {{$t("user_detail.loginRecordNotice")}}
        </div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column :label="tableColumns['created_at'].name" prop="created_at"></el-table-column>
            <el-table-column :label="tableColumns['device'].name" prop="device"></el-table-column>
            <el-table-column :label="tableColumns['login_ip'].name" prop="login_ip"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabLoginRecordMediator from "../mediator/TabLoginRecordMediator";
import TabLoginRecordProxy from "../proxy/TabLoginRecordProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class TabLoginRecord extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabLoginRecordProxy = getProxy(TabLoginRecordProxy);
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;

    constructor() {
        super(TabLoginRecordMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.notice {
    font-size: 18px;
    margin-bottom: 10px;
}
</style>
