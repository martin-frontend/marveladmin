<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="handlerSearch"
                :clearable="false"
            />
        </div>
        <div class="d-flex">
            <div class="notic">
                <div class="no_data" v-if="!myProxy.tableData.bShow">
                    {{ $t("plat_bonus_all_stock_model.text6") }}
                </div>
                <div class="desc" v-else>
                    <p>{{ bonusAllmodel.name }}</p>
                    <p>{{ bonusAllmodel.desc }}</p>
                </div>
            </div>
            <div class="ctrl_group" v-if="myProxy.tableData.bShow">
                <el-button @click="onChangeBanner()" type="primary">
                    {{ $t("plat_bonus_all_stock_model.text7") }}</el-button
                >
                <el-button @click="onSetTemplate()" type="primary">{{
                    $t("plat_bonus_all_stock_model.text8")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatBonusAllProxy from "../proxy/PlatBonusAllProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import PlatBonusAllStockProxy from "../proxy/PlatBonusAllStockProxy";

@Component({
    components: {
        SearchSelect,
        SearchInput,
    },
})
export default class PlatBonusAllHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatBonusAllProxy = this.getProxy(PlatBonusAllProxy);
    private allStockProxy: PlatBonusAllStockProxy = this.getProxy(PlatBonusAllStockProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private bonusAllmodel = this.myProxy.tableData.model;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.admin_plat_bonus_all_stock_set_index();
        this.myProxy.admin_plat_show();
    }

    private onChangeBanner() {
        this.myProxy.showBannerDialog();
    }
    private onSetTemplate() {
        this.allStockProxy.openTemplateSetting();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.d-flex {
    display: flex;
    justify-content: space-between;
    .no_data {
        color: red;
    }
    .ctrl_group {
        display: flex;
        align-items: flex-end;
    }
}
</style>
