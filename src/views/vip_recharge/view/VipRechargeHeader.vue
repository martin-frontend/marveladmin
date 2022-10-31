<template>
    <div class="header-content">
        <div class="group">
            <div>
                <SearchSelect
                    :title="$t('common.belongingPlat')"
                    :options="platTableColumns.plat_id.options"
                    v-model="listQuery.plat_id"
                    @change="changePlat()"
                    :clearable="false"
                />
                <SearchSelect
                    :title="$t('common.coin_name')"
                    :options="platTableColumns.coin_name_unique_option"
                    v-model="listQuery.coin_name_unique"
                    :clearable="false"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import VipRechargeProxy from "../proxy/VipRechargeProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class VipRechargeHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: VipRechargeProxy = this.getProxy(VipRechargeProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
    private platTableColumns = this.myProxy.tableData.plat_columns;

    //更换平台切换对应渠道
    private changePlat() {
        //@ts-ignore
        this.platTableColumns.coin_name_unique_option = this.platTableColumns.coin_name_unique.options[
            this.listQuery.plat_id
        ];
        //设定选取币种第一个
        const coin_name_unique_options_keys = Object.keys(this.platTableColumns.coin_name_unique_option);
        this.listQuery.coin_name_unique = coin_name_unique_options_keys[0];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
