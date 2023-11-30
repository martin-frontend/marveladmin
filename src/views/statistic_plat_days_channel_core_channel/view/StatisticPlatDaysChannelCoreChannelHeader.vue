<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="changePlat()"
                :clearable="false"
            />
            <SearchInput
                :title="tableColumns.user_id.name"
                v-model="listQuery.user_id"
                v-if="myProxy.tabName == 'group'"
            />
            <SearchDatePicker
                :title="tableColumns.time_period.name"
                :startDate.sync="listQuery['time_period-{>=}']"
                :endDate.sync="listQuery['time_period-{<=}']"
                :showTime="true"
                :clearable="false"
            />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique.options[listQuery.plat_id]"
            />
        </div>
        <div>
            <SearchSelect
                v-if="myProxy.tabName == 'channel'"
                :title="tableColumns.channel_id.name"
                v-model="listQuery.channel_id"
                :options="tableColumns.channel_id_options"
                :multiple="true"
                width="600"
            />
            <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                {{ LangUtil("查询") }}
            </el-button>
            <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                {{ LangUtil("重置") }}
            </el-button>
            <el-button
                @click="exportExcel"
                type="primary"
                icon="el-icon-download"
                :disabled="list.length == 1 || list.length == 0"
            >
                {{ LangUtil("导出") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysChannelCoreChannelProxy from "../proxy/StatisticPlatDaysChannelCoreChannelProxy";
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
        SearchDatePicker,
    },
})
export default class StatisticPlatDaysChannelCoreChannelHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticPlatDaysChannelCoreChannelProxy = this.getProxy(StatisticPlatDaysChannelCoreChannelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;

    get list() {
        return this.myProxy.tabName == "channel"
            ? this.myProxy.tableData.channelList
            : this.myProxy.tableData.groupList;
    }

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

    exportExcel() {
        this.myProxy.showFieldSelectionDialog();
    }

    //更换平台切换对应币种
    changePlat() {
        this.listQuery.channel_id = "";
        this.listQuery.coin_name_unique = "";
        this.tableColumns.channel_id_options = this.tableColumns.channel_id.options[this.listQuery.plat_id];
        const channel_id_keys = Object.keys(this.tableColumns.channel_id_options);
        channel_id_keys.forEach((key: any) => {
            this.tableColumns.channel_id_options[key] = key;
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
