<template>
    <div class="header-content">
        <!--  -->
        <div class="group">
            <SearchSelect
                :title="tableColumns['vendor_id'].name"
                :options="tableColumns['vendor_id'].options"
                v-model="listQuery['vendor_id']"
            />
            <SearchInput :title="tableColumns['vendor_product_name'].name" v-model="listQuery.vendor_product_name" />
            <el-button class="header-button" icon="el-icon-search" @click="handlerSearch()" type="primary">{{
                $t("common.search")
            }}</el-button>
        </div>
        <!-- FILTER -->
        <div class="filter">
            <el-form ref="form" :model="listQuery" label-width="100px" label-position="left">
                <!--  -->
                <el-form-item size="mini" :label="tableColumns['currency_type'].name">
                    <el-radio-group
                        v-model="listFilter.currency_type"
                        style="margin-right: 10px"
                        filterable
                        @change="onFilterChange"
                    >
                        <el-radio class="radio" :label="null">{{ $t("common.all") }}</el-radio>
                        <el-radio
                            class="radio"
                            v-for="(value, key) in tableColumns.currency_type.options"
                            :key="key"
                            :label="key"
                            >{{ value }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <!--  -->
                <el-form-item size="mini" :label="tableColumns['app_types'].name">
                    <el-radio-group
                        v-model="listFilter.app_type"
                        style="margin-right: 10px"
                        filterable
                        @change="onFilterChange"
                    >
                        <el-radio class="radio" :label="null">{{ $t("common.all") }}</el-radio>
                        <el-radio
                            class="radio"
                            v-for="(value, key) in tableColumns.app_types.options"
                            :key="key"
                            :label="Number(key)"
                            >{{ value }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['category'].name">
                    <el-radio-group
                        v-model="listFilter.category"
                        style="margin-right: 10px"
                        filterable
                        @change="onFilterChange"
                    >
                        <el-radio class="radio" :label="null">{{ $t("common.all") }}</el-radio>
                        <el-radio
                            class="radio"
                            v-for="(value, key) in tableColumns.category.options"
                            :key="key"
                            :label="key"
                            >{{ value }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['show_type'].name">
                    <el-radio-group
                        v-model="listFilter.show_type"
                        style="margin-right: 10px"
                        filterable
                        @change="onFilterChange"
                    >
                        <el-radio class="radio" :label="null">{{ $t("common.all") }}</el-radio>
                        <el-radio
                            class="radio"
                            v-for="(value, key) in tableColumns.show_type.options"
                            :key="key"
                            :label="key"
                            >{{ value }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>

        <div class="row">
            <el-button v-if="checkUnique(unique.lobby_model_product_store)" class="item" type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate"
                >{{ $t("common.create") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import LobbyModelProductProxy from "../proxy/LobbyModelProductProxy";
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
export default class LobbyModelProductHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: LobbyModelProductProxy = this.getProxy(LobbyModelProductProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
    private listFilter = this.myProxy.listFilter;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private onFilterChange() {
        this.myProxy.onFilterTable();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-form {
    padding-left: 0;
}
::v-deep .el-radio {
    margin-bottom: 6px;
}
</style>
