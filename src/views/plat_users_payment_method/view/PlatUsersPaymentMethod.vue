<template>
    <div class="content">
        <PlatUsersPaymentMethodHeader />
        <PlatUsersPaymentMethodBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersPaymentMethodMediator from "@/views/plat_users_payment_method/mediator/PlatUsersPaymentMethodMediator";
import { Component } from "vue-property-decorator";
import PlatUsersPaymentMethodHeader from "./PlatUsersPaymentMethodHeader.vue";
import PlatUsersPaymentMethodBody from "./PlatUsersPaymentMethodBody.vue";

@Component({
    components: {
        PlatUsersPaymentMethodHeader,
        PlatUsersPaymentMethodBody,
    },
})
export default class PlatUsersPaymentMethod extends AbstractView {
    constructor() {
        super(PlatUsersPaymentMethodMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .span_value {
    margin: 0 10px 0 4px;
    color: green;
}
</style>
