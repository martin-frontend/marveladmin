<template>
    <div class="content">
        <CountryDialog v-if="myProxy.dialogData.bShow"/>
        <CountryHeader/>
        <CountryBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import CountryMediator from "@/views/country/mediator/CountryMediator";
import CountryProxy from "../proxy/CountryProxy";
import { Component } from "vue-property-decorator";
import CountryDialog from "./CountryDialog.vue";
import CountryHeader from "./CountryHeader.vue";
import CountryBody from "./CountryBody.vue";

@Component({
    components: {
        CountryDialog,
        CountryHeader,
        CountryBody,
    }
})
export default class Country extends AbstractView {

    constructor() {
        super(CountryMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: CountryProxy = this.getProxy(CountryProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
