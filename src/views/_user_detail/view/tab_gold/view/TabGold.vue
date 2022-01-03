<template>
    <div class="content">
        <TabGoldHeader />
        <TabGoldBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabGoldMediator from "../mediator/TabGoldMediator";
import TabGoldProxy from "../proxy/TabGoldProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import TabGoldHeader from "../view/TabGoldHeader.vue";
import TabGoldBody from "../view/TabGoldBody.vue";

@Component({
    components: {
        TabGoldHeader,
        TabGoldBody,
    },
})
export default class TabGold extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: TabGoldProxy = getProxy(TabGoldProxy);
    private tableColumns = this.myProxy.tableData.columns;

    constructor() {
        super(TabGoldMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
