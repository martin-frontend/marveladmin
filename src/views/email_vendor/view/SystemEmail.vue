<template>
    <div class="content">
        <SystemEmailHeader/>
        <SystemEmailBody/>
        <SystemEmailDialog/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import SystemEmailMediator from "@/views/email_vendor/mediator/SystemEmailMediator";
import { Component } from "vue-property-decorator";
import SystemEmailBody from "./SystemEmailBody.vue";
import SystemEmailDialog from "./SystemEmailDialog.vue";
import SystemEmailHeader from "./SystemEmailHeader.vue";

@Component({
    components: {
        SystemEmailBody,
        SystemEmailDialog,
        SystemEmailHeader,
    },
})
export default class SystemEmail extends AbstractView {

    constructor() {
        super(SystemEmailMediator);
    }

    destroyed(){
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
