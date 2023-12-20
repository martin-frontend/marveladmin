<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns['plat_id'].name"
            v-model="listQuery.plat_id"
            :options="tableColumns['plat_id'].options"
            @change="handlerSearch"
            :clearable="false"
        />
        <div class="group">
            <SearchInput :title="tableColumns['user_id'].name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns['username'].name" v-model="listQuery.username" />
            <SearchInput :title="tableColumns['nick_name'].name" v-model="listQuery.nick_name" />
            <SearchSelect
                :title="tableColumns['status'].name"
                :options="tableColumns['status'].options"
                v-model="listQuery.status"
            />
            <SearchSelect
                :title="tableColumns['type'].name"
                :options="tableColumns['type'].options"
                v-model="listQuery.type"
            />
            <SearchRange
                :title="tableColumns.water_multiple.name"
                min="0"
                max="9999999"
                :minValue.sync="listQuery['water_multiple-{>=}']"
                :maxValue.sync="listQuery['water_multiple-{<=}']"
                :placeholders="[LangUtil('最小'), LangUtil('最大')]"
            />
            <SearchDatePicker
                :title="tableColumns.created_at.name"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<=}']"
                :showTime="true"
            />
            <div>
                <el-button @click="handlerSearch()" class="item" type="primary" icon="el-icon-search">
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" class="item" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
                <el-button @click="heandlerExport()" type="primary">{{ LangUtil("导出") }}</el-button>
                <el-button @click="heandlerAdd()" type="primary">{{ LangUtil("添加") }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import GoldWaterProxy from "../proxy/GoldWaterProxy";
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
export default class GoldWaterHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: GoldWaterProxy = this.getProxy(GoldWaterProxy);
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

    heandlerExport() {
        this.myProxy.onQueryAll();
    }

    heandlerAdd() {
        this.myProxy.showDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
