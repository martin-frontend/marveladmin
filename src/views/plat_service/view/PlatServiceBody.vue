<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane :label="LangUtil('常见问题配置')" :name="commonIssueTag" :key="commonIssueTag"></el-tab-pane>
        </el-tabs>
        <CommonIssue v-if="activeName == ServiceTag.CommonIssueConfig" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatServiceProxy from "../proxy/PlatServiceProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { ServiceTag } from "../proxy/IPlatServiceProxy";
import CommonIssue from "./components/CommonIssue.vue";

@Component({
    components: {
        CommonIssue,
    },
})
export default class PlatServiceBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatServiceProxy = this.getProxy(PlatServiceProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    // Iproxy property
    ServiceTag = ServiceTag;

    commonIssueTag = ServiceTag.CommonIssueConfig;
    activeName = this.commonIssueTag;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
