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
                :title="tableColumns['settlement_at'].name"
                :startDate.sync="listQuery['settlement_at-{>=}']"
                :endDate.sync="listQuery['settlement_at-{<=}']"
                :showTime="true"
                :tip="$t('plat_users_bet.defaultTime')"
                :pickerOptions="myProxy.pickerOptions"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.agent_user_id.name" v-model="listQuery.agent_user_id" />
            <SearchSelect
                :title="tableColumns.vendor_type.name"
                v-model="listQuery.vendor_type"
                :options="tableColumns.vendor_type.options"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <div class="group">
            <div>
                <el-button
                    v-if="checkUnique(unique.promotion_discount_recover)"
                    @click="handlerRecover()"
                    type="warning"
                    icon="el-icon-refresh"
                >
                    返佣恢復
                </el-button>
                <el-button
                    v-if="checkUnique(unique.store_fake_bet)"
                    @click="handlerRecord()"
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                >
                    添加投注记录
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PromotionDiscountIndexProxy from "../proxy/PromotionDiscountIndexProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchDatePicker,
        SearchRange,
    },
})
export default class PromotionDiscountIndexHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PromotionDiscountIndexProxy = this.getProxy(PromotionDiscountIndexProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerRecover() {
        this.myProxy.recover();
    }

    private handlerRecord() {
        this.myProxy.showDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.group {
    margin-top: 5px;
}
</style>
