<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                :clearable="false"
                @change="handlerSearch"
            />
        </div>
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_at.name"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<=}']"
                :showTime="true"
            />
            <SearchSelect
                :title="tableColumns.type.name"
                v-model="listQuery.type"
                :options="tableColumns.type.options"
            />
            <SearchInput
                :title="tableColumns.user_id.name"
                :placeholder="$t('common.pleaseEnter')"
                v-model="listQuery.user_id"
            />
            <SearchInput
                :title="tableColumns.nick_name.name"
                :placeholder="$t('common.pleaseEnter')"
                v-model="listQuery.nick_name"
            />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique.options[listQuery.plat_id]"
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
import PlatUsersGoldLogProxy from "../proxy/PlatUsersGoldLogProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})
export default class PlatUsersGoldLogHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatUsersGoldLogProxy = this.getProxy(PlatUsersGoldLogProxy);
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
