<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.currency_type.name"
                v-model="listQuery.currency_type"
                :options="tableColumns.currency_type.options"
                clearable
                @change="onGetVendorId"
            />
            <SearchSelect
                :title="tableColumns.vendor_id.name"
                v-model="listQuery.vendor_id"
                :options="vendorIdOptions"
                clearable
            />
            <SearchInput :title="tableColumns.vendor_product_name.name" v-model="listQuery.vendor_product_name" />
            <SearchInput :title="tableColumns.ori_product_id.name" v-model="listQuery.ori_product_id" />
            <SearchSelect
                :title="tableColumns.vendor_type.name"
                v-model="listQuery.vendor_type"
                :options="tableColumns.vendor_type.options"
                clearable
            />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
                clearable
            />
            <div>
                <el-button @click="handlerSearch()" class="header-button" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" class="header-button" type="primary" icon="el-icon-search">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <div class="group">
            <el-button
                v-if="checkUnique(unique.vendor_product_store)"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
            >
                {{ $t("common.create") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import VendorProductProxy from "../proxy/VendorProductProxy";
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
export default class VendorProductHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: VendorProductProxy = this.getProxy(VendorProductProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    get vendorIdOptions() {
        return this.myProxy.vendorIdOptions;
    }

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

    private onGetVendorId() {
        this.myProxy.getVendorId();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
