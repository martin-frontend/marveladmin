<template>
    <div>
        <div class="group">
            <SearchSelect
                :title="tableColumns.settle_coin_name_unique.name"
                v-model="listQuery.settle_coin_name_unique"
                :options="tableColumns.settle_coin_name_unique.options"
                clearable
                @change="handlerSearch"
            />
        </div>
        <div class="row">
            <el-button
                v-if="checkUnique(unique.vendor_store)"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
                >{{ LangUtil("新增") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import VendorProxy from "../proxy/VendorProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class VendorHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: VendorProxy = this.getProxy(VendorProxy);
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerTest() {
        this.myProxy.testDialogData.bShow = true;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
