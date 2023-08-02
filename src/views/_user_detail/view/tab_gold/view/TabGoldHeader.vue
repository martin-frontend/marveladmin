<template>
    <div class="header-content">
        <div class="group">
            <SearchDatePicker
                :title="tableColumns['created_at'].name"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<=}']"
            />

            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique.options[listQuery.plat_id]"
            />

            <SearchSelect
                :title="tableColumns.type.name"
                v-model="listQuery.type"
                :options="tableColumns.type.options"
            />
            <SearchInput :title="tableColumns.vendor_order_no.name" v-model="listQuery.vendor_order_no" />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" />
            <div>
                <el-button class="header-button" type="primary" icon="el-icon-search" @click="handlerSearch">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button class="header-button" type="primary" icon="el-icon-refresh" @click="handlerReset">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabGoldProxy from "../proxy/TabGoldProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import SearchInput from "@/components/SearchInput.vue";
@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})
export default class TabGoldHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: TabGoldProxy = getProxy(TabGoldProxy);
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    handlerReset() {
        this.myProxy.resetListQuery();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
