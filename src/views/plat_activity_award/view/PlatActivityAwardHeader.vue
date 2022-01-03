<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            :clearable="false"
            @change="handlerSearch"
        />
        <div class="group">
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.activity_id.name" v-model="listQuery.activity_id" />
            <SearchSelect
                :title="tableColumns.settlement_type.name"
                v-model="listQuery.settlement_type"
                :options="tableColumns.settlement_type.options"
            />
            <SearchSelect
                :title="tableColumns.award_type.name"
                v-model="listQuery.award_type"
                :options="tableColumns.award_type.options"
            />
            <SearchDatePicker
                :title="tableColumns.settlement_time_at.name"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<=}']"
            />
            <SearchSelect
                :title="tableColumns.award_status.name"
                v-model="listQuery.award_status"
                :options="tableColumns.award_status.options"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatActivityAwardProxy from "../proxy/PlatActivityAwardProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchDatePicker,
    },
})
export default class PlatActivityAwardHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatActivityAwardProxy = this.getProxy(PlatActivityAwardProxy);
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
