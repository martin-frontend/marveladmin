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
                :title="tableColumns['created_at'].name"
                :startDate.sync="date[0]"
                :endDate.sync="date[1]"
                :showTime="true"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.nick_name.name" v-model="listQuery.nick_name" />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUsersBackwaterLogProxy from "../proxy/PlatUsersBackwaterLogProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { dateFormat } from "@/core/global/Functions";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchDatePicker,
    },
})
export default class PlatUsersBackwaterLogHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatUsersBackwaterLogProxy = this.getProxy(PlatUsersBackwaterLogProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private date = [this.listQuery["created_at-{>=}"], this.listQuery["created_at-{<=}"]];
    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.listQuery["created_at-{>=}"] = this.date[0];
        this.listQuery["created_at-{<=}"] = this.date[1];
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.date = [dateFormat(new Date(), "yyyy-MM-dd 00:00:00"), dateFormat(new Date(), "yyyy-MM-dd 23:59:59")];
        this.myProxy.resetListQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
