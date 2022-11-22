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
                    {{ LangUtil("推广代理未开启-请联系管理员开启") }}
                </div>
                <div class="desc" v-else>
                    <p>{{ bonusAllmodel.name }}</p>
                    <p>{{ bonusAllmodel.desc }}</p>
                </div>
            </div>
            <div class="ctrl_group" v-if="myProxy.tableData.bShow">
                <el-button @click="onChangeBanner()" type="primary"> {{ LangUtil("配置说明图片") }}</el-button>
                <el-button @click="onSetTemplate()" type="primary">{{ LangUtil("配置梯度模版") }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatBonusAllProxy = this.getProxy(PlatBonusAllProxy);
    allStockProxy: PlatBonusAllStockProxy = this.getProxy(PlatBonusAllStockProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    bonusAllmodel = this.myProxy.tableData.model;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.admin_plat_bonus_all_stock_set_index();
        this.myProxy.admin_plat_show();
    }

    onChangeBanner() {
        this.myProxy.showBannerDialog();
    }
    onSetTemplate() {
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
