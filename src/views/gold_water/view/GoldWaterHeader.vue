<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns['plat_id'].name"
            v-model="listQuery.plat_id"
            :options="tableColumns['plat_id'].options"
            @change="handlerSearch"
            :clearable="false"
        />
        <div class="group">
            <SearchInput :title="tableColumns['user_id'].name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns['username'].name" v-model="listQuery.username" />
            <SearchInput :title="tableColumns['nick_name'].name" v-model="listQuery.nick_name" />
            <SearchSelect
                :title="tableColumns['status'].name"
                :options="tableColumns['status'].options"
                v-model="listQuery.status"
            />
            <div>
                <el-button @click="handlerSearch()" class="item" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" class="item" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import GoldWaterProxy from "../proxy/GoldWaterProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
    },
})
export default class GoldWaterHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: GoldWaterProxy = this.getProxy(GoldWaterProxy);
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
