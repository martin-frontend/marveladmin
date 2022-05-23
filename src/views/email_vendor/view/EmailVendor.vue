<template>
    <div class="content">
        <EmailVendorHeader/>
        <EmailVendorBody/>
        <EmailVendorDialog/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import EmailVendorMediator from "@/views/email_vendor/mediator/EmailVendorMediator";
import { Component } from "vue-property-decorator";
import EmailVendorBody from "./EmailVendorBody.vue";
import EmailVendorDialog from "./EmailVendorDialog.vue";
import EmailVendorHeader from "./EmailVendorHeader.vue";

@Component({
    components: {
        EmailVendorBody,
        EmailVendorDialog,
        EmailVendorHeader,
    },
})
export default class EmailVendor extends AbstractView {

    constructor() {
        super(EmailVendorMediator);
    }

    destroyed(){
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
