<template>
    <div class="header-content" style="display: flex; justify-content: space-between;">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            :options="tableColumns.plat_id.options"
            v-model="listQuery.plat_id"
            @change="handlerSearch"
            :clearable="false"
        />
        <el-button @click="handlerManage" type="primary" class="item">{{ LangUtil("分红模版配置") }}</el-button>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticPlatDirectlyCommissionProxy from "../proxy/StatisticPlatDirectlyCommissionProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        SearchSelect,
    },
})
export default class StatisticPlatDirectlyCommissionHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticPlatDirectlyCommissionProxy = this.getProxy(StatisticPlatDirectlyCommissionProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;

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

    handlerManage() {
        this.myProxy.showSettingDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.content {
    margin-bottom: 0px;
    height: 100%;
}
</style>
