<template>
    <div class="header-content">
        <div class="group">
            <div>
                <el-button @click="handlerCreate()" type="primary" icon="el-icon-circle-plus-outline">{{$t("common.create")}}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import BlockSystemCoinsProxy from "../proxy/BlockSystemCoinsProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component
export default class BlockSystemCoinsHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: BlockSystemCoinsProxy = this.getProxy(BlockSystemCoinsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    // private handlerSearch() {
    //     this.listQuery.page_count = 1;
    //     this.myProxy.onQuery();
    // }

    // private handlerReset() {
    //     this.myProxy.resetListQuery();
    // }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
