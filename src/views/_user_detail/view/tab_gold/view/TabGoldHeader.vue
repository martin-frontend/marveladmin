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
            <div>
                <el-button class="header-button" type="primary" icon="el-icon-search" @click="handlerSearch">{{
                    $t("common.search")
                }}</el-button>
                <el-button class="header-button" type="primary" icon="el-icon-refresh" @click="handlerReset">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabGoldProxy from "../proxy/TabGoldProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
    },
})
export default class TabGoldHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: TabGoldProxy = getProxy(TabGoldProxy);
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    private handlerReset() {
        this.myProxy.resetListQuery();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
