<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
            style="width: 350px"
        />

        <div class="group">
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" />
            <div>
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
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUsersVendorGoldLogAlarmProxy from "../proxy/PlatUsersVendorGoldLogAlarmProxy";
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
    },
})
export default class PlatUsersVendorGoldLogAlarmHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatUsersVendorGoldLogAlarmProxy = this.getProxy(PlatUsersVendorGoldLogAlarmProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
