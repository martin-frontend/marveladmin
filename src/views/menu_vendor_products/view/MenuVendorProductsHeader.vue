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
                <el-button @click="handlerCreate()" type="primary">
                    {{ LangUtil("添加分类游戏") }}
                </el-button>
                <el-button @click="handlerSort()" type="primary">
                    {{ LangUtil("类型展示排序") }}
                </el-button>
            </div>
        </div>
        <div>
            <el-radio-group
                v-model="listQuery.vendor_type"
                style="margin-right: 10px"
                filterable
                @change="onFilterChange"
            >
                <el-radio
                    class="radio"
                    v-for="(value, key) in tableColumns.vendor_type.options"
                    :key="key"
                    :label="key"
                    >{{ value }}</el-radio
                >
            </el-radio-group>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import MenuVendorProductsProxy from "../proxy/MenuVendorProductsProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class MenuVendorProductsHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: MenuVendorProductsProxy = this.getProxy(MenuVendorProductsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    private handlerSort() {
        this.myProxy.showSort();
    }

    onFilterChange() {
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
