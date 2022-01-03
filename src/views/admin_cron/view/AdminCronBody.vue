<template>
    <div>
        <CronBody v-if="tabsStatus === 'cron'" />
        <CronQueueBody v-else />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminCronProxy from "../proxy/AdminCronProxy";
import GlobalVar from "@/core/global/GlobalVar";
import CronBody from "./component/CronBody.vue";
import CronQueueBody from "./component/CronQueueBody.vue";

@Component({
    components: {
        CronBody,
        CronQueueBody,
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
    get tabsStatus() {
        return this.myProxy.tabsStatus;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
