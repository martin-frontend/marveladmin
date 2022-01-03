<template>
    <div class="header-content">
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_date.name"
                :startDate.sync="listQuery['created_date-{>=}']"
                :endDate.sync="listQuery['created_date-{<=}']"
            />
            <div>
                <el-button class="header-button" @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button class="header-button" @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
            <div class="description">{{ $t("user_detail.userDataHint") }}</div>
        </div>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabWaterProxy from "../proxy/TabWaterProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchDatePicker,
    },
})
export default class TabWaterHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: TabWaterProxy = getProxy(TabWaterProxy);
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
.description {
    flex: 1;
    text-align: right;
}
</style>
