<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
            />
            <SearchSelect
                :title="tableColumns.type.name"
                :options="tableColumns.type.options"
                v-model="listQuery.type"
            />
            <SearchInput :title="tableColumns.key.name" v-model="listQuery.key" />
            <SearchInput :title="tableColumns.zh_CN.name" v-model="listQuery.zh_CN" />
            <SearchInput :title="tableColumns.en_EN.name" v-model="listQuery.en_EN" />
            <div class="btn-group">
                <div>
                    <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{ $t("common.search") }}</el-button>
                    <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{ $t("common.reset") }}</el-button>
                    <el-button @click="heandlerImport()" type="primary">导入</el-button>
                    <el-button @click="heandlerExport()" type="primary">{{ $t("statistic_plat_days.export") }}</el-button>
                </div>
                
            </div>
        </div>
        <div class="row">
            <el-button @click="handlerCreate" type="primary" class="item">{{ $t("common.create") }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatLangProxy from "../proxy/PlatLangProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
    },
})
export default class PlatLangHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatLangProxy = this.getProxy(PlatLangProxy);
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
    private heandlerExport() {
        this.myProxy.onQueryAll();
    }
    private heandlerImport() {
        //TODO...导入功能
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.btn-group {
    flex: 1;
    display: flex;
    justify-content: space-between;
}
</style>
