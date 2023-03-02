<template>
    <div class="content">
        <TabCreditHeader />
        <TabCreditBody />
        <EditDialog />
        <LogDialog/>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCreditMediator from "../mediator/TabCreditMediator";
import TabCreditProxy from "../proxy/TabCreditProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import TabCreditBody from "../view/TabCreditBody.vue";
import TabCreditHeader from "../view/TabCreditHeader.vue";
import EditDialog from "./EditDialog.vue";
import LogDialog from "./LogDialog.vue";

@Component({
    components: {
        TabCreditBody,
        TabCreditHeader,
        EditDialog,
        LogDialog,
    },
})
export default class TabCredit extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: TabCreditProxy = getProxy(TabCreditProxy);

    constructor() {
        super(TabCreditMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
