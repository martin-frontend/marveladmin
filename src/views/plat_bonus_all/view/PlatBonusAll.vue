<template>
    <div class="content">
        <PlatBonusAllHeader />
        <PlatBonusAllBody v-if="myProxy.tableData.bShow" />
        <DialogPlatBonusAllStockModel v-if="stockProxy.tableData.templateBShow" />
        <DialogImgData v-if="myProxy.dialogImgData.bShow" />
        <DialogDividend v-if="myProxy.dividendDialogData.bShow" />
        <DialogUserReceive />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatBonusAllMediator from "@/views/plat_bonus_all/mediator/PlatBonusAllMediator";
import PlatBonusAllProxy from "@/views/plat_bonus_all/proxy/PlatBonusAllProxy";
import PlatBonusAllStockProxy from "@/views/plat_bonus_all/proxy/PlatBonusAllStockProxy";
import { Component } from "vue-property-decorator";
import PlatBonusAllHeader from "./PlatBonusAllHeader.vue";
import PlatBonusAllBody from "./PlatBonusAllBody.vue";
import DialogPlatBonusAllStockModel from "./DialogPlatBonusAllStockModel.vue";
import DialogImgData from "./DialogSetImage.vue";
import DialogDividend from "./DialogDividend.vue";
import DialogUserReceive from "./DialogUserReceive.vue";

@Component({
    components: {
        PlatBonusAllHeader,
        PlatBonusAllBody,
        DialogPlatBonusAllStockModel,
        DialogImgData,
        DialogDividend,
        DialogUserReceive,
    },
})
export default class PlatBonusAll extends AbstractView {
    constructor() {
        super(PlatBonusAllMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatBonusAllProxy = this.getProxy(PlatBonusAllProxy);
    private stockProxy: PlatBonusAllStockProxy = this.getProxy(PlatBonusAllStockProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
