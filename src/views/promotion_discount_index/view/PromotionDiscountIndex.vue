<template>
    <div class="content">
        <PromotionDiscountIndexDialog v-if="myProxy.dialogData.bShow" />
        <PromotionDiscountIndexHeader />
        <PromotionDiscountIndexBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PromotionDiscountIndexMediator from "@/views/promotion_discount_index/mediator/PromotionDiscountIndexMediator";
import PromotionDiscountIndexProxy from "@/views/promotion_discount_index/proxy/PromotionDiscountIndexProxy";
import { Component } from "vue-property-decorator";
import PromotionDiscountIndexDialog from "./PromotionDiscountIndexDialog.vue";
import PromotionDiscountIndexHeader from "./PromotionDiscountIndexHeader.vue";
import PromotionDiscountIndexBody from "./PromotionDiscountIndexBody.vue";

@Component({
    components: {
        PromotionDiscountIndexDialog,
        PromotionDiscountIndexHeader,
        PromotionDiscountIndexBody,
    },
})
export default class PromotionDiscountIndex extends AbstractView {
    constructor() {
        super(PromotionDiscountIndexMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PromotionDiscountIndexProxy = this.getProxy(PromotionDiscountIndexProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
