<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="
                changePlat();
                handlerSearch();
            "
            :clearable="false"
        />
        <div class="group">
            <SearchDatePicker
                :title="LangUtil('活动时间')"
                :startDate.sync="listQuery['start_time-{<=}']"
                :endDate.sync="listQuery['end_time-{>=}']"
            />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchInput :title="tableColumns.activity_id.name" v-model="listQuery.activity_id" />
            <SearchInput :title="tableColumns.activity_name.name" v-model="listQuery.activity_name" />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchSelect
                :title="tableColumns.task_coin_name_unique.name"
                v-model="listQuery.task_coin_name_unique"
                :options="tableColumns.task_coin_name_unique_options"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
                <el-button @click="handlerExport()" type="primary" icon="el-icon-download" :disabled="list.length == 0">
                    {{ LangUtil("导出") }}
                </el-button>
            </div>
        </div>
        <div class="group">
            <el-button icon="el-icon-circle-plus-outline" @click="handlerCreate()" type="primary" class="item">
                {{ LangUtil("手动添加任务") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatCoinTasksProxy from "../proxy/PlatCoinTasksProxy";
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
export default class PlatCoinTasksHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatCoinTasksProxy = this.getProxy(PlatCoinTasksProxy);
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

    //更换平台切换任务币种
    changePlat() {
        this.listQuery.task_coin_name_unique = "";
        // 活动ID/批次
        if (this.tableColumns.activity_id.options[this.listQuery.plat_id]) {
            this.tableColumns.activity_id_options = this.tableColumns.activity_id.options[this.listQuery.plat_id];
        } else {
            this.tableColumns.activity_id_options = {};
        }
        // 任务币种
        if (this.tableColumns.task_coin_name_unique.options[this.listQuery.plat_id]) {
            this.tableColumns.task_coin_name_unique_options = this.tableColumns.task_coin_name_unique.options[
                this.listQuery.plat_id
            ];
        } else {
            this.tableColumns.task_coin_name_unique_options = {};
        }
    }

    handlerExport() {
        this.myProxy.showFieldSelectionDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
