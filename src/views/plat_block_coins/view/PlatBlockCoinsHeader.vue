<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="handlerSearch"
                :clearable="false"
            />
            <div>
                <el-button class="header-button" @click="handlerSearch()" type="primary">{{
                    $t("common.search")
                }}</el-button>
                <el-button class="header-button" @click="handlerReset()" type="primary">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <div class="group">
            <el-button @click="handlerCreate()" type="primary" icon="el-icon-circle-plus-outline">{{
                $t("common.create")
            }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatBlockCoinsProxy from "../proxy/PlatBlockCoinsProxy";
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
export default class PlatBlockCoinsHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatBlockCoinsProxy = this.getProxy(PlatBlockCoinsProxy);
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
