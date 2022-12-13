<template>
    <div>
        <div class="notice">
            {{ LangUtil("只展示最近20次登陆日志") }}
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
            <el-table-column :label="tableColumns['device'].name" prop="device">
                <template slot-scope="{ row }"> {{ row.device }} ({{ LangUtil("人数") }} {{ row.user_device_count }})</template>
            </el-table-column>
            <el-table-column :label="tableColumns['login_ip'].name" prop="login_ip">
                <template slot-scope="{ row }">
                    {{ row.login_ip }} ({{ LangUtil("人数") }} {{ row.user_login_ip_count }} / {{ row.ip_location }})
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabLoginRecordMediator from "../mediator/TabLoginRecordMediator";
import TabLoginRecordProxy from "../proxy/TabLoginRecordProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class TabLoginRecord extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabLoginRecordProxy = getProxy(TabLoginRecordProxy);
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;

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
