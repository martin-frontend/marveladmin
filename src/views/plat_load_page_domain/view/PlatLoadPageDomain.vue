<template>
    <div class="content">
        <PlatLoadPageDomainHeader />
        <PlatLoadPageDomainBody />
        <PlatLoadPageDomainDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatLoadPageDomainMediator from "@/views/plat_load_page_domain/mediator/PlatLoadPageDomainMediator";
import { Component } from "vue-property-decorator";
import PlatLoadPageDomainHeader from "./PlatLoadPageDomainHeader.vue";
import PlatLoadPageDomainDialog from "./PlatLoadPageDomainDialog.vue";
import PlatLoadPageDomainBody from "./PlatLoadPageDomainBody.vue";

@Component({
    components: {
        PlatLoadPageDomainHeader,
        PlatLoadPageDomainDialog,
        PlatLoadPageDomainBody,
    },
})
export default class PlatLoadPageDomain extends AbstractView {
    constructor() {
        super(PlatLoadPageDomainMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
