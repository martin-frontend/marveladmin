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
                    >{{ $t("common.create") }}</el-button
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatBonusAllStockModelProxy from "../proxy/PlatBonusAllStockModelProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class PlatBonusAllStockModelHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatBonusAllStockModelProxy = this.getProxy(PlatBonusAllStockModelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
