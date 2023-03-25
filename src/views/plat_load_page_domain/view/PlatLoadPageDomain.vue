<template>
    <div class="content">
        <PlatLoadPageDomainHeader />
        <PlatLoadPageDomainBody />
        <PlatLoadPageDomainDialog v-if="myProxy.dialogData.bShow" />
        <TemplateDialog v-if="myProxy.templateDialogData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatLoadPageDomainMediator from "@/views/plat_load_page_domain/mediator/PlatLoadPageDomainMediator";
import { Component } from "vue-property-decorator";
import PlatLoadPageDomainHeader from "./PlatLoadPageDomainHeader.vue";
import PlatLoadPageDomainDialog from "./PlatLoadPageDomainDialog.vue";
import PlatLoadPageDomainBody from "./PlatLoadPageDomainBody.vue";
import TemplateDialog from "./TemplateDialog.vue";
import PlatLoadPageDomainProxy from "../proxy/PlatLoadPageDomainProxy";

@Component({
    components: {
        PlatLoadPageDomainHeader,
        PlatLoadPageDomainDialog,
        PlatLoadPageDomainBody,
        TemplateDialog,
    },
})
export default class PlatLoadPageDomain extends AbstractView {
    myProxy: PlatLoadPageDomainProxy = this.getProxy(PlatLoadPageDomainProxy);

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
