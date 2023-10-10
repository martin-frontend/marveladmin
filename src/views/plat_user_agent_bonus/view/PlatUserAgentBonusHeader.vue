<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
                @change="
                    changePlat();
                    handlerSearch();
                "
            />
            <SearchDatePicker
                :title="tableColumns.settlement_at.name"
                :startDate.sync="listQuery.settlement_date_start"
                :endDate.sync="listQuery.settlement_date_end"
                :showTime="true"
            />
            <SearchSelect
                :title="tableColumns.channel_id.name"
                :options="tableColumns.channel_id_options"
                v-model="listQuery.channel_id"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.invite_user_id.name" v-model="listQuery.invite_user_id" />
            <SearchInput :title="tableColumns.agent_user_id.name" v-model="listQuery.agent_user_id" />
        </div>
        <div class="group">
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("导出") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUserAgentBonusProxy from "../proxy/PlatUserAgentBonusProxy";
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
export default class PlatUserAgentBonusHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUserAgentBonusProxy = this.getProxy(PlatUserAgentBonusProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    //更换平台切换对应渠道
    changePlat() {
        this.listQuery.channel_id = "";
        this.tableColumns.channel_id_options = this.tableColumns.channel_id.options[this.listQuery.plat_id];
        const channel_id_keys = Object.keys(this.tableColumns.channel_id_options);
        channel_id_keys.forEach((key: any) => {
            this.tableColumns.channel_id_options[key] = key;
        });
        this.tableColumns.coin_name_unique_option = this.tableColumns.coin_name_unique.options[this.listQuery.plat_id];
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
