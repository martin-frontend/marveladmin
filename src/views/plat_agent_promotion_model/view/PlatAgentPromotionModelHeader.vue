<template>
    <div class="header-content">
        <div class="group">
            <el-button
                v-if="checkUnique(unique.plat_agent_promotion_model_store)"
                size="primary"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate()"
                >{{ LangUtil("新增") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatAgentPromotionModelProxy from "../proxy/PlatAgentPromotionModelProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class PlatAgentPromotionModelHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatAgentPromotionModelProxy = this.getProxy(PlatAgentPromotionModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
