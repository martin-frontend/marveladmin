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
                        LangUtil("查询")
                    }}</el-button>
                    <el-button @click="handlerReset()" class="header-button" type="primary" icon="el-icon-refresh">{{
                        LangUtil("重置")
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
                {{ LangUtil("新增规则") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatActivityRuleProxy = this.getProxy(PlatActivityRuleProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
