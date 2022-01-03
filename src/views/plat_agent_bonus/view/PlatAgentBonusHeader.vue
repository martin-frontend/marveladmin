<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
                @change="handlerSearch"
                :clearable="false"
            />
        </div>
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.settlement_at.name"
                :startDate.sync="listQuery['start_time-{>=}']"
                :endDate.sync="listQuery['end_time-{<=}']"
            />
             <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchSelect
                :title="tableColumns.settlement_status.name"
                :options="tableColumns.settlement_status.options"
                v-model="listQuery.settlement_status"
            />
             <SearchSelect
                :title="tableColumns.receive_status.name"
                :options="tableColumns.receive_status.options"
                v-model="listQuery.receive_status"
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
import PlatAgentBonusProxy from "../proxy/PlatAgentBonusProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})
export default class PlatAgentBonusHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatAgentBonusProxy = this.getProxy(PlatAgentBonusProxy);
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
