<template>
    <div class="content">
        <PlatUserSmsCodeDialog />
        <PlatUserSmsCodeHeader />
        <PlatUserSmsCodeBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUserSmsCodeMediator from "@/views/plat_user_sms_code/mediator/PlatUserSmsCodeMediator";
import { Component } from "vue-property-decorator";
import PlatUserSmsCodeDialog from "./PlatUserSmsCodeDialog.vue";
import PlatUserSmsCodeHeader from "./PlatUserSmsCodeHeader.vue";
import PlatUserSmsCodeBody from "./PlatUserSmsCodeBody.vue";

@Component({
    components: {
        PlatUserSmsCodeDialog,
        PlatUserSmsCodeHeader,
        PlatUserSmsCodeBody,
    },
})
export default class PlatUserSmsCode extends AbstractView {
    constructor() {
        super(PlatUserSmsCodeMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
