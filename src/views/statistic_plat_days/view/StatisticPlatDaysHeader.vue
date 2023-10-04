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
                v-show="myProxy.tableData.activeName=='stats'"
                :title="tableColumns.created_date.name"
                :startDate.sync="listQuery['created_date-{>=}']"
                :endDate.sync="listQuery['created_date-{<=}']"
            />
            <SearchDatePicker
                v-show="myProxy.tableData.activeName=='summary'"
                :title="tableColumns.created_date.name"
                :startDate.sync="summaryListQuery['created_date-{>=}']"
                :endDate.sync="summaryListQuery['created_date-{<=}']"
            />
            <SearchInput
                v-if="myProxy.tableData.activeName == 'stats'"
                :title="tableColumns.channel_id.name"
                v-model="listQuery.channel_id"
            />
            <div class="btn-group">
                <div>
                    <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                        LangUtil("查询")
                    }}</el-button>
                    <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                        LangUtil("重置")
                    }}</el-button>
                </div>
                <div>
                    <el-button @click="heandlerFieldSetting()" type="primary">{{ LangUtil("字段配置") }}</el-button>
                    <el-button @click="heandlerExport()" type="primary" :disabled="list.length == 0">
                        {{ LangUtil("导出") }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysProxy from "../proxy/StatisticPlatDaysProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})
export default class StatisticPlatDaysHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy = this.$parent.myProxy;
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    summaryListQuery = this.myProxy.summaryListQuery;
    list = this.myProxy.tableData.list;
    handlerSearch() {
        if (this.myProxy.tableData.activeName == "stats") {
            this.listQuery.page_count = 1;
            this.myProxy.onQuery();
            return
        }
        this.summaryListQuery.page_count = 1;
        this.myProxy.onQuerySummary();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    heandlerFieldSetting() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    heandlerExport() {
        this.myProxy.showFieldSelectionDialog();
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
@media screen and (max-width: 1300px) {
    .btn-group {
        width: 100%;
        flex: auto;
    }
}
</style>
