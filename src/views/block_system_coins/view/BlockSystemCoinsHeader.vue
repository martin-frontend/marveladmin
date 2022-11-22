<template>
    <div class="header-content">
        <div class="group">
            <div>
                <el-button @click="handlerCreate()" type="primary" icon="el-icon-circle-plus-outline">{{
                    LangUtil("新增")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: BlockSystemCoinsProxy = this.getProxy(BlockSystemCoinsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    //  handlerSearch() {
    //     this.listQuery.page_count = 1;
    //     this.myProxy.onQuery();
    // }

    //  handlerReset() {
    //     this.myProxy.resetListQuery();
    // }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
