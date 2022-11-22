<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
            :width="350"
        />
        <div class="group">
            <SearchDatePicker
                :title="LangUtil('活动时间')"
                :startDate.sync="listQuery['start_time-{<=}']"
                :endDate.sync="listQuery['end_time-{>=}']"
            />
            <SearchInput :title="tableColumns.activity_name.name" v-model="listQuery.activity_name" />
            <SearchInput :title="tableColumns.id.name" v-model="listQuery.id" />
            <SearchSelect
                :title="tableColumns.model_category.name"
                v-model="listQuery.model_category"
                :options="tableColumns.model_category.options"
            />
            <SearchSelect
                :title="tableColumns.publish_status.name"
                v-model="listQuery.publish_status"
                :options="tableColumns.publish_status.options"
            />
            <SearchSelect
                :title="tableColumns.process_status.name"
                v-model="listQuery.process_status"
                :options="tableColumns.process_status.options"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
        <div class="row">
            <el-button
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
                v-if="checkUnique(unique.plat_activity_store)"
            >
                {{ LangUtil("新增") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatActivityProxy from "../proxy/PlatActivityProxy";
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
export default class PlatActivityHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatActivityProxy = this.getProxy(PlatActivityProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
