<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
            style="width: 350px"
        />
        <div class="group">
            <SearchInput :title="tableColumns.category.name" v-model="listQuery.category" />
            <div>
                <el-button @click="handlerSearch" class="header-button" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="header-button">{{
                    LangUtil("重置")
                }}</el-button>
                <el-button class="header-button" type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate">
                    {{ LangUtil("新增") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import CateVendorProductsProxy from "../proxy/CateVendorProductsProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchInput,
        SearchSelect,
    },
})
export default class CateVendorProductsHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: CateVendorProductsProxy = this.getProxy(CateVendorProductsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
        this.handlerSearch();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
