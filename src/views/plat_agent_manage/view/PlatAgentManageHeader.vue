<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.user_id.name"
                v-model="listQuery.user_id"
                :options="tableColumns.user_id.options"
            ></SearchSelect>
            <SearchSelect
                :title="tableColumns.agent_real_name.name"
                v-model="listQuery.agent_real_name"
                :options="tableColumns.agent_real_name.options"
            ></SearchSelect>
            <SearchInput :title="tableColumns.customer_user_id.name" v-model="listQuery.customer_user_id" />
            <SearchSelect
                :title="tableColumns.customer_user_source.name"
                :options="tableColumns.customer_user_source.options"
                v-model="listQuery.customer_user_source"
            />
            <SearchSelect
                :title="tableColumns.customer_recharge_times.name"
                :options="customer_recharge_times_options"
                v-model="listQuery.customer_recharge_times"
            />
            <SearchDatePicker
                :title="tableColumns.customer_find_at.name"
                :startDate.sync="listQuery['customer_find_at-{>=}']"
                :endDate.sync="listQuery['customer_find_at-{<=}']"
                :showTime="true"
            />
            <SearchDatePicker
                :title="tableColumns.customer_created_at.name"
                :startDate.sync="listQuery['customer_created_at-{>=}']"
                :endDate.sync="listQuery['customer_created_at-{<=}']"
                :showTime="true"
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
        <div style="margin-top: 10px">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate()">
                {{ LangUtil("新增") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatAgentManageProxy from "../proxy/PlatAgentManageProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchAutoComplete from "@/components/SearchAutoComplete.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})
export default class PlatAgentManageHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatAgentManageProxy = this.getProxy(PlatAgentManageProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
    dialogData = this.myProxy.dialogData;

    customer_recharge_times_options = {
        1: "0",
        2: "＞0",
        3: "＞10"
    }

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerCreate() {
        this.dialogData.isCustomer = false;
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
