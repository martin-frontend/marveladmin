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
            <SearchSelect
                :title="tableColumns.channel_id.name"
                v-model="listQuery.channel_id"
                :options="tableColumns.channel_id.options"
                :is-use-key="true"
            />
            <SearchDatePicker
                :title="tableColumns.created_date.name"
                :startDate.sync="listQuery['created_date-{>=}']"
                :endDate.sync="listQuery['created_date-{<=}']"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
                <el-button @click="exportExcel" type="primary" icon="el-icon-download" :disabled="list.length == 1">
                    {{ LangUtil("导出") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
// import StatisticPlatDaysDeliverChannelProxy from "../proxy/StatisticPlatDaysDeliverChannelProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
    },
})
export default class StatisticPlatDaysDeliverChannelHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy = this.$parent.myProxy;
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    list = this.myProxy.tableData.list;

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

    exportExcel() {
        this.myProxy.showFieldSelectionDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
