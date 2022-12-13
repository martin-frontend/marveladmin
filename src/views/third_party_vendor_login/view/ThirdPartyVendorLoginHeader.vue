<template>
    <div class="header-content">
        <div class="group">
            <SearchInput :title="tableColumns.vendor_name.name" v-model="listQuery.vendor_name" />
            <SearchInput :title="tableColumns.unique_name.name" v-model="listQuery.unique_name" />
            <SearchInput :title="tableColumns.api_url.name" v-model="listQuery.api_url" />
            <SearchInput :title="tableColumns.redirect_url.name" v-model="listQuery.redirect_url" />
            <SearchInput :title="tableColumns.app_key.name" v-model="listQuery.app_key" />
            <!-- <SearchInput :title="tableColumns.app_secret.name" v-model="listQuery.app_secret" /> -->
            <SearchInput :title="tableColumns.data_belong.name" v-model="listQuery.data_belong" />
            <SearchInput :title="tableColumns.redirect_url.name" v-model="listQuery.redirect_url" />
            
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
                clearable
            />
            <div>
                <el-button @click="handlerSearch()" class="header-button" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" class="header-button" type="primary" icon="el-icon-search">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
        <div class="group">
            <el-button class="item" type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate()">
                {{ LangUtil("新增") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import ThirdPartyVendorLoginProxy from "../proxy/ThirdPartyVendorLoginProxy";
import { DialogStatus } from "@/core/global/Constant";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        SearchSelect,
        SearchInput,
    },
})
export default class ThirdPartyVendorLoginHeader extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    private myProxy: ThirdPartyVendorLoginProxy = this.getProxy(ThirdPartyVendorLoginProxy);
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
