<template>
    <div class="content exchange_orders">
        <ExchangeOrdersHeader />
        <ExchangeOrdersBody />
        <ChangeDialog v-if="myProxy.changeDialogData.bShow" />
        <AutoCheckDialog v-if="autoProxy.autoCheckDialog.bShow" />
        <RemarkDialog v-if="myProxy.remarkDialogData.bShow" />
        <DispatchDialog v-if="myProxy.dispatchDialogData.bShow" />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ExchangeOrdersMediator from "@/views/exchange_orders/mediator/ExchangeOrdersMediator";
import { Component } from "vue-property-decorator";
import ExchangeOrdersHeader from "./ExchangeOrdersHeader.vue";
import ExchangeOrdersBody from "./ExchangeOrdersBody.vue";
import ChangeDialog from "./ChangeDialog.vue";
import AutoCheckDialog from "./AutoCheckDialog.vue";
import ExchangeOrdersProxy from "../proxy/ExchangeOrdersProxy";
import ExchangeAutoCheckProxy from "../proxy/ExchangeAutoCheckProxy";
import RemarkDialog from "./components/RemarkDialog.vue";
import DispatchDialog from "./components/DispatchDialog.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        ExchangeOrdersHeader,
        ExchangeOrdersBody,
        ChangeDialog,
        AutoCheckDialog,
        RemarkDialog,
        DispatchDialog,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class ExchangeOrders extends AbstractView {
    // proxy
    myProxy: ExchangeOrdersProxy = this.getProxy(ExchangeOrdersProxy);
    autoProxy: ExchangeAutoCheckProxy = this.getProxy(ExchangeAutoCheckProxy);

    constructor() {
        super(ExchangeOrdersMediator);
    }

    destroyed() {
        console.error("destoryed", this.autoProxy.listQuery.plat_id);

        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
