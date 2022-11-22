<template>
    <div class="header-content">
        <div class="group">
            <div class="group">
                <el-button
                    v-if="checkUnique(unique.plat_bonus_all_stock_model_store)"
                    size="primary"
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    @click="handlerCreate()"
                    >{{ LangUtil("新增") }}</el-button
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatBonusAllStockModelProxy from "../proxy/PlatBonusAllStockModelProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class PlatBonusAllStockModelHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatBonusAllStockModelProxy = this.getProxy(PlatBonusAllStockModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
