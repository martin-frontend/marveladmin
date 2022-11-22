<template>
    <div class="content">
        <PlatUsersGoldLogHeader />
        <PlatUsersGoldLogBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersGoldLogMediator from "@/views/plat_users_gold_log/mediator/PlatUsersGoldLogMediator";
import { Component } from "vue-property-decorator";
import PlatUsersGoldLogHeader from "./PlatUsersGoldLogHeader.vue";
import PlatUsersGoldLogBody from "./PlatUsersGoldLogBody.vue";

@Component({
    components: {
        PlatUsersGoldLogHeader,
        PlatUsersGoldLogBody,
    },
})
export default class PlatUsersGoldLog extends AbstractView {
    constructor() {
        super(PlatUsersGoldLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
