<template>
    <div class="content">
        <ExchangeVendorsHeader />
        <ExchangeVendorsBody />
        <ExchangeVendorsDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ExchangeVendorsMediator from "@/views/exchange_vendors/mediator/ExchangeVendorsMediator";
import { Vue, Component } from "vue-property-decorator";
//
import ExchangeVendorsHeader from "./ExchangeVendorsHeader.vue";
import ExchangeVendorsBody from "./ExchangeVendorsBody.vue";
import ExchangeVendorsDialog from "./ExchangeVendorsDialog.vue";

@Component({
    components: {
        ExchangeVendorsHeader,
        ExchangeVendorsBody,
        ExchangeVendorsDialog,
    },
})
export default class ExchangeVendors extends AbstractView {
    constructor() {
        super(ExchangeVendorsMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
::v-deep .denger {
    border-color: rgb(240, 180, 180);
    background-color: rgb(250, 189, 189);
    color: rgb(240, 108, 108);
}
::v-deep .tagClass {
    margin-left: 6px;
}
</style>
