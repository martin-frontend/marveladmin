<template>
    <div class="header-content">
        <div class="group">
            <el-button
                v-if="checkUnique(unique.plat_agent_promotion_model_store)"
                size="primary"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate()"
                >{{ $t("common.create") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatAgentPromotionModelProxy from "../proxy/PlatAgentPromotionModelProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class PlatAgentPromotionModelHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatAgentPromotionModelProxy = this.getProxy(PlatAgentPromotionModelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
