<template>
    <div class="content">
        <RechargeVendorsHeader />
        <RechargeVendorsBody />
        <RechargeDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import RechargeVendorsMediator, { IRechargeVendors } from "../mediator/RechargeVendorsMediator";
import { Component } from "vue-property-decorator";
//
import RechargeVendorsHeader from "./RechargeVendorsHeader.vue";
import RechargeVendorsBody from "./RechargeVendorsBody.vue";
import RechargeDialog from "./RechargeVendorsDialog.vue";

@Component({
    components: {
        RechargeVendorsHeader,
        RechargeVendorsBody,
        RechargeDialog,
    },
})
export default class RechargeVendors extends AbstractView {
    constructor() {
        super(RechargeVendorsMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss"></style>
