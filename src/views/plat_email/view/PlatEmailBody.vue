<template>
    <div>
        <el-tabs v-model="myProxy.tableData.activeName">
            <el-tab-pane :label="$t('plat_email.PlatMail')" :name="EmailTab.Plat"> </el-tab-pane>
            <el-tab-pane :label="$t('plat_email.UserMail')" :name="EmailTab.User"> </el-tab-pane>
        </el-tabs>
        <PlatEmailList v-if="isEmailList" />
        <PlatEmailUserList v-if="!isEmailList" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatEmailProxy from "../proxy/PlatEmailProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import PlatEmailList from "./components/PlatEmailList.vue";
import PlatEmailUserList from "./components/PlatEmailUserList.vue";
import { EmailTab } from "../proxy/IPlatEmailProxy";

@Component({
    components: {
        PlatEmailList,
        PlatEmailUserList,
        Pagination,
    },
})
export default class PlatEmailBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;
    // Iproxy property
    private EmailTab = EmailTab;

    get isEmailList() {
        return this.myProxy.tableData.activeName == EmailTab.Plat;
    }

    @Watch("myProxy.tableData.activeName")
    tabChange(value: string) {
        if (this.isEmailList) {
            this.listQuery.page_count = 1;
            this.myProxy.onQuery();
        } else {
            this.myProxy.userListQuery.page_count = 1;
            this.myProxy.userListQuery.plat_id = this.listQuery.plat_id;
            this.myProxy.onUserQuery();
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
