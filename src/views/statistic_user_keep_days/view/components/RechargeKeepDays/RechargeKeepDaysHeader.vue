<template>
    <div></div>
    <!-- <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            :clearable="false"
            @change="handlerSearch"
        />
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_at.name"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<=}']"
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
    </div> -->
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticUserKeepDaysProxy from "../../../proxy/StatisticUserKeepDaysProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
    },
})
export default class RechargeKeepDaysHeader extends AbstractView {


}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
