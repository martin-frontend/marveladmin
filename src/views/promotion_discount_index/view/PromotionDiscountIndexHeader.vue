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
                :tip="LangUtil('（北京时间）')"
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
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
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
                    {{ LangUtil("返佣恢復") }}
                    <!-- 返佣恢復 -->
                </el-button>
                <el-button
                    v-if="checkUnique(unique.store_fake_bet)"
                    @click="handlerRecord()"
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                >
                    {{ LangUtil("添加投注记录") }}
                    <!-- 添加投注记录 -->
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PromotionDiscountIndexProxy = this.getProxy(PromotionDiscountIndexProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerRecover() {
        this.myProxy.recover();
    }

    handlerRecord() {
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
