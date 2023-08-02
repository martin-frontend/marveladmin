<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
        />
        <div class="group">
            <SearchDatePicker
                :title="LangUtil('投注结算时间')"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<=}']"
                :showTime="true"
            />
            <SearchInput :title="tableColumns.user_id.name" :maxLength="30" v-model="listQuery.user_id" />
            <div class="btn_group">
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUserStatisticDaysProxy from "../proxy/PlatUserStatisticDaysProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchInput,
        SearchSelect,
        SearchDatePicker,
    },
})
export default class PlatUserStatisticDaysHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUserStatisticDaysProxy = this.getProxy(PlatUserStatisticDaysProxy);
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
.btn_group {
    display: flex;
    width: 100%;
    .add {
        margin-left: auto;
    }
}
</style>
