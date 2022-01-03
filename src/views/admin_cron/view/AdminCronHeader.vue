<template>
    <div>
        <el-tabs v-model="myProxy.tabsStatus" @tab-click="handlerTabs">
            <el-tab-pane :label="$t('admin_cron.tabsText1')" name="cron_queue"></el-tab-pane>
            <el-tab-pane :label="$t('admin_cron.tabsText2')" name="cron"></el-tab-pane>
        </el-tabs>

        <CronHeader v-if="tabsStatus === 'cron'" />
        <CronQueueHeader v-else />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import AdminCronProxy from "../proxy/AdminCronProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import CronHeader from "./component/CronHeader.vue";
import CronQueueHeader from "./component/CronQueueHeader.vue";

@Component({
    components: {
        CronHeader,
        CronQueueHeader,
    },
})
export default class AdminCronHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: AdminCronProxy = this.getProxy(AdminCronProxy);
    // proxy property

    get tabsStatus() {
        return this.myProxy.tabsStatus;
    }

    private handlerTabs(value: any) {
        this.myProxy.onTabsChange(value.name);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
