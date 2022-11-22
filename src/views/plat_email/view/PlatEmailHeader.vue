<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                v-model="listQuery.plat_id"
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                @change="handlerSearch"
                :clearable="false"
            />
        </div>
        <div class="group">
            <el-button
                @click="handlerCreate()"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                v-if="checkUnique(unique.plat_email_store) || checkUnique(unique.plat_email_store_attachment)"
                >{{ LangUtil("新增") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatEmailProxy from "../proxy/PlatEmailProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import { EmailTab } from "../proxy/IPlatEmailProxy";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class PlatEmailHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    // Iproxy property
    EmailTab = EmailTab;

    handlerSearch() {
        if (EmailTab.Plat == this.myProxy.tableData.activeName) {
            this.listQuery.page_count = 1;
            this.myProxy.onQuery();
        } else {
            this.myProxy.userListQuery.page_count = 1;
            this.myProxy.userListQuery.plat_id = this.listQuery.plat_id;
            this.myProxy.onUserQuery();
        }
    }
    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
