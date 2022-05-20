<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="handlerSearch"
            />
        </div>
        <div class="group">
            <SearchInput :title="tableColumns.user_id.name" :maxLength="30" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.mobile.name" :maxLength="30" v-model="listQuery.mobile" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchSelect
                :title="tableColumns.code_type.name"
                v-model="listQuery.code_type"
                :options="tableColumns.code_type.options"
            />

            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{ $t("common.search") }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{ $t("common.reset") }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUserSmsCodeProxy from "../proxy/PlatUserSmsCodeProxy";
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
    },
})
export default class PlatUserSmsCodeHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatUserSmsCodeProxy = this.getProxy(PlatUserSmsCodeProxy);
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
