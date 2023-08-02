<template>
    <div class="content recharge_orders">
        <RechargeOrdersDialog />
        <RechargeOrdersHeader />
        <RechargeOrdersBody />
        <RemarkDialog />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import RechargeOrdersMediator from "@/views/recharge_orders/mediator/RechargeOrdersMediator";
import { Component } from "vue-property-decorator";
import RechargeOrdersDialog from "./RechargeOrdersDialog.vue";
import RechargeOrdersHeader from "./RechargeOrdersHeader.vue";
import RechargeOrdersBody from "./RechargeOrdersBody.vue";
import RemarkDialog from "./components/RemarkDialog.vue";
import RechargeOrdersProxy from "../proxy/RechargeOrdersProxy";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        RechargeOrdersDialog,
        RechargeOrdersHeader,
        RemarkDialog,
        RechargeOrdersBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class RechargeOrders extends AbstractView {
    // proxy
    myProxy: RechargeOrdersProxy = this.getProxy(RechargeOrdersProxy);
    constructor() {
        super(RechargeOrdersMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
