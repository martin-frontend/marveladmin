<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.platAll.options"
            @change="handlerSearch"
            :clearable="false"
        />
        <div class="group">
            <SearchSelect
                :title="tableColumns.sms_id.name"
                v-model="listQuery.sms_id"
                :options="tableColumns.sms_id.options"
            />
            <SearchInput
                :title="tableColumns.sms_api_uname.name"
                :placeholder="LangUtil('请输入')"
                v-model="listQuery.sms_api_uname"
                :maxLength="30"
                :width="430"
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
        <div class="group">
            <el-button
                @click="handlerCreate()"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                v-if="checkUnique(unique.plat_sms_store)"
                >{{ LangUtil("新增") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatSmsProxy from "../proxy/PlatSmsProxy";
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
    },
})
export default class PlatSmsHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatSmsProxy = this.getProxy(PlatSmsProxy);
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
