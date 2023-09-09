<template>
    <div class="header-content">
        <div class="group">
            <SearchInput :title="tableColumns.vendor_id.name" v-model="listQuery.vendor_id" />
            <SearchInput :title="tableColumns.vendor_name.name" v-model="listQuery.vendor_name" />
            <SearchInput :title="tableColumns.vendor_name_unique.name" v-model="listQuery.vendor_name_unique" />
            <SearchSelect
                :title="tableColumns.settle_coin_name_unique.name"
                v-model="listQuery.settle_coin_name_unique"
                :options="tableColumns.settle_coin_name_unique.options"
                clearable
            />
            <SearchSelect
                :title="tableColumns.vendor_wallet_type.name"
                v-model="listQuery.vendor_wallet_type"
                :options="tableColumns.vendor_wallet_type.options"
                clearable
            />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
                clearable
            />
            <SearchInput
                :title="tableColumns.vendor_coin_name_unique.name"
                v-model="listQuery.vendor_coin_name_unique"
            />
            <div>
                <el-button @click="handlerSearch()" class="header-button" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" class="header-button" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
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
import SearchInput from "@/components/SearchInput.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
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

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerTest() {
        this.myProxy.testDialogData.bShow = true;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
