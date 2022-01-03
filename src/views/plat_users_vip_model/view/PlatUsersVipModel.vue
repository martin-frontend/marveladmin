<template>
    <div class="content">
        <PlatUsersVipModelDialog />
        <PlatUsersVipModelHeader />
        <PlatUsersVipModelBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersVipModelMediator from "@/views/plat_users_vip_model/mediator/PlatUsersVipModelMediator";
import { Component } from "vue-property-decorator";
import PlatUsersVipModelDialog from "./PlatUsersVipModelDialog.vue";
import PlatUsersVipModelHeader from "./PlatUsersVipModelHeader.vue";
import PlatUsersVipModelBody from "./PlatUsersVipModelBody.vue";

@Component({
    components: {
        PlatUsersVipModelDialog,
        PlatUsersVipModelHeader,
        PlatUsersVipModelBody,
    },
})
export default class PlatUsersVipModel extends AbstractView {
    constructor() {
        super(PlatUsersVipModelMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
