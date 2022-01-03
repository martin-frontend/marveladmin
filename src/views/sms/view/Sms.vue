<template>
    <div class="content">
        <SmsDialog />
        <SmsHeader />
        <SmsBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import SmsMediator from "@/views/sms/mediator/SmsMediator";
import { Component } from "vue-property-decorator";
import SmsDialog from "./SmsDialog.vue";
import SmsHeader from "./SmsHeader.vue";
import SmsBody from "./SmsBody.vue";

@Component({
    components: {
        SmsDialog,
        SmsHeader,
        SmsBody,
    },
})
export default class Sms extends AbstractView {
    constructor() {
        super(SmsMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
