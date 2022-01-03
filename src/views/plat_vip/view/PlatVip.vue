<template>
    <div class="content plat_vip">
        <PlatVipHeader />
        <PlatVipBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatVipMediator from "@/views/plat_vip/mediator/PlatVipMediator";
import { Component } from "vue-property-decorator";
import PlatVipHeader from "./PlatVipHeader.vue";
import PlatVipBody from "./PlatVipBody.vue";

@Component({
    components: {
        PlatVipHeader,
        PlatVipBody,
    },
})
export default class PlatVip extends AbstractView {
    constructor() {
        super(PlatVipMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
