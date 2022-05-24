<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
            />
            <SearchSelect
                :title="tableColumns.module.name"
                :options="tableColumns.module.options"
                v-model="listQuery.module"
            />
            <SearchSelect
                :title="tableColumns.type.name"
                :options="tableColumns.type.options"
                v-model="listQuery.type"
            />
            <SearchInput :title="tableColumns.key.name" v-model="listQuery.key" />
            <div class="btn-group">
                <div>
                    <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{ $t("common.search") }}</el-button>
                    <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{ $t("common.reset") }}</el-button>
                </div>
                <!-- 导出暂时用不上 -->
                <!-- <div>
                    <el-button @click="heandlerExport()" type="primary">{{ $t("statistic_plat_days.export") }}</el-button>
                </div> -->
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
import SystemLangProxy from "../proxy/SystemLangProxy";
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
export default class SystemLangHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: SystemLangProxy = this.getProxy(SystemLangProxy);
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
