<template>
    <div>
        <div class="header-content">
            <div class="group">
                <SearchInput :title="tableColumns.id.name" v-model="listQuery.id" />
                <SearchInput :title="tableColumns.name.name" v-model="listQuery.name" />
                <SearchSelect
                    :title="tableColumns.type.name"
                    v-model="listQuery.type"
                    :options="tableColumns.type.options"
                />
                <div class="item_group">
                    <el-button @click="handlerSearch()" class="header-button" type="primary" icon="el-icon-search">{{
                        $t("common.search")
                    }}</el-button>
                    <el-button @click="handlerReset()" class="header-button" type="primary" icon="el-icon-refresh">{{
                        $t("common.reset")
                    }}</el-button>
                </div>
            </div>
        </div>

        <div class="group">
            <el-button
                v-if="checkUnique(unique.plat_activity_rule_store)"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
            >
                {{ $t("common.addRule") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatActivityRuleProxy from "../proxy/PlatActivityRuleProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
    },
})
export default class PlatActivityRuleHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatActivityRuleProxy = this.getProxy(PlatActivityRuleProxy);
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
