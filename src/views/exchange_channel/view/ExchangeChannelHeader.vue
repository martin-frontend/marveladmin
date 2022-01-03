<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="myProxy.dialogData.platAllOptions"
                @change="handlerSearch"
                :clearable="false"
            />
        </div>
        <div class="group">
            <SearchSelect
                :title="tableColumns.exchange_vendors_id.name"
                v-model="listQuery.exchange_vendors_id"
                :options="tableColumns.exchange_vendors_id.options"
            />
            <div>
                <el-button class="header-button" @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button class="header-button" @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <div class="group">
            <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                v-if="checkUnique(unique.exchange_channel_store)"
                @click="handlerCreate"
                >{{ $t("common.create") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import ExchangeChannelProxy from "../proxy/ExchangeChannelProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class ExchangeChannelHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: ExchangeChannelProxy = this.getProxy(ExchangeChannelProxy);
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
