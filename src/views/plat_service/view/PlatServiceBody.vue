<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane
                :label="$t('plat_service.CommonIssueConfig')"
                :name="commonIssueTag"
                :key="commonIssueTag"
            ></el-tab-pane>
        </el-tabs>
        <CommonIssue v-if="activeName == ServiceTag.CommonIssueConfig" />
    </div>
</template>
<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatServiceProxy = this.getProxy(PlatServiceProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    // Iproxy property
    private ServiceTag = ServiceTag;

    private commonIssueTag = ServiceTag.CommonIssueConfig;
    private activeName = this.commonIssueTag;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
