<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="
                    changePlat();
                    handlerSearch();
                "
                :clearable="false"
            />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique_option"
            />
            <SearchSelect
                :title="tableColumns.vendor_type.name"
                v-model="listQuery.vendor_type"
                :options="tableColumns.vendor_type.options"
                @change="handlerSearch()"
            />
            <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />
        </div>
        <div class="group">
            <SearchDatePicker
                :title="LangUtil('投注结算时间')"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<=}']"
                :showTime="true"
            />
            <SearchInput :title="tableColumns.user_id.name" :maxLength="30" v-model="listQuery.user_id" />
            <!-- <SearchSelect
                :title="tableColumns.is_real.name"
                v-model="listQuery.is_real"
                :options="tableColumns.is_real.options"
                @change="handlerSearch"
                :clearable="true"
            /> -->
            <div class="btn_group">
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
                <el-button type="primary" @click="handlerExport()" icon="el-icon-download" :disabled="list.length == 0">
                    {{ LangUtil("导出") }}
                </el-button>
                <!-- <el-button class="add" @click="handlerCreate()" type="primary" icon="el-icon-circle-plus-outline">
                    {{ LangUtil("添加") }}
                </el-button> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUserStatisticRankDaysProxy from "../proxy/PlatUserStatisticRankDaysProxy";
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
export default class PlatUserStatisticRankDaysHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUserStatisticRankDaysProxy = this.getProxy(PlatUserStatisticRankDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    list = this.myProxy.tableData.list;

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

    handlerExport() {
        this.myProxy.showFieldSelectionDialog();
    }

    //更换平台切换对应币种
    changePlat() {
        this.listQuery.coin_name_unique = "";
        //@ts-ignore
        this.tableColumns.coin_name_unique_option = this.tableColumns.coin_name_unique.options[this.listQuery.plat_id];
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
