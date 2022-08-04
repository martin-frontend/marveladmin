<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                :clearable="false"
                @change="handlerSearch(true)"
            />
        </div>
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_date.name"
                :startDate.sync="listQuery['created_date-{>=}']"
                :endDate.sync="listQuery['created_date-{<=}']"
            />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique.options[listQuery.plat_id]"
                :clearable="false"
            />
            <div class="btn-group">
                <div>
                    <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                        $t("common.search")
                    }}</el-button>
                    <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                        $t("common.reset")
                    }}</el-button>
                </div>
                <div>
                    <el-button @click="heandlerExport()" type="primary">{{
                        $t("statistic_plat_days.export")
                    }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticPlatCoinDaysProxy from "../proxy/StatisticPlatCoinDaysProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})
export default class StatisticPlatCoinDaysHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: StatisticPlatCoinDaysProxy = this.getProxy(StatisticPlatCoinDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch(resetCoinNameUnique: boolean = false) {
        this.listQuery.page_count = 1;

        if (resetCoinNameUnique) {
            this.listQuery.coin_name_unique = this.myProxy.coin_name_unique_keys[0];
        }

        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }
    private heandlerExport() {
        this.myProxy.onExportExcel();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.btn-group {
    flex: 1;
    display: flex;
    justify-content: space-between;
}
@media screen and (max-width: 1300px) {
    .btn-group {
        width: 100%;
        flex: auto;
    }
}
</style>
