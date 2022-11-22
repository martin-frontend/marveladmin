<template>
    <div class="content">
        <PlatActivityRuleDialog />
        <PlatActivityRuleHeader />
        <PlatActivityRuleBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatActivityRuleMediator from "@/views/plat_activity_rule/mediator/PlatActivityRuleMediator";
import { Component } from "vue-property-decorator";
import PlatActivityRuleDialog from "./PlatActivityRuleDialog.vue";
import PlatActivityRuleHeader from "./PlatActivityRuleHeader.vue";
import PlatActivityRuleBody from "./PlatActivityRuleBody.vue";

@Component({
    components: {
        PlatActivityRuleDialog,
        PlatActivityRuleHeader,
        PlatActivityRuleBody,
    },
})
export default class PlatActivityRule extends AbstractView {
    constructor() {
        super(PlatActivityRuleMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
