<template>
    <div class="content">
        <PlatUsersBackwaterModelDialog/>
        <PlatUsersBackwaterModelHeader/>
        <PlatUsersBackwaterModelBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersBackwaterModelMediator from "@/views/plat_users_backwater_model/mediator/PlatUsersBackwaterModelMediator";
import { Component } from "vue-property-decorator";
import PlatUsersBackwaterModelDialog from "./PlatUsersBackwaterModelDialog.vue";
import PlatUsersBackwaterModelHeader from "./PlatUsersBackwaterModelHeader.vue";
import PlatUsersBackwaterModelBody from "./PlatUsersBackwaterModelBody.vue";

@Component({
    components: {
        PlatUsersBackwaterModelDialog,
        PlatUsersBackwaterModelHeader,
        PlatUsersBackwaterModelBody,
    }
})
export default class PlatUsersBackwaterModel extends AbstractView {

    constructor() {
        super(PlatUsersBackwaterModelMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
